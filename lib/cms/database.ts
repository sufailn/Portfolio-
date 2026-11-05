import { unstable_noStore as noStore } from 'next/cache';
import { neon } from '@neondatabase/serverless';
import { defaultSiteContent, siteContentSchema, type SiteContent } from './content';

let tableReady: Promise<void> | undefined;

function dateFromMonthYear(value: string, lastDay = false) {
  const match = value.trim().match(/^([A-Za-z]+)\s+(\d{4})$/);
  if (!match) {
    const year = value.trim().match(/^\d{4}$/)?.[0];
    return year ? `${year}-${lastDay ? '12-31' : '01-01'}` : '';
  }
  const month = new Date(`${match[1]} 1, ${match[2]}`);
  if (Number.isNaN(month.getTime())) return '';
  const year = month.getFullYear();
  const monthIndex = month.getMonth();
  const day = lastDay ? new Date(year, monthIndex + 1, 0).getDate() : 1;
  return `${year}-${String(monthIndex + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

function migrateLegacyContent(value: unknown): unknown {
  if (typeof value !== 'object' || value === null) return value;
  const content = value as Record<string, unknown>;
  const career = content.career;
  if (typeof career !== 'object' || career === null) return value;
  const timeline = (career as Record<string, unknown>).timeline;
  if (!Array.isArray(timeline)) return value;

  return {
    ...content,
    career: {
      ...career,
      timeline: timeline.map((entry) => {
        if (typeof entry !== 'object' || entry === null) return entry;
        const item = entry as Record<string, unknown>;
        if (typeof item.startDate === 'string') return item;
        if (typeof item.period !== 'string') {
          return { ...item, startDate: '', endDate: '', isCurrent: false };
        }

        const match = item.period.match(/^(.+?)\s*[-–]\s*(.+)$/);
        if (!match) {
          return { ...item, startDate: '', endDate: '', isCurrent: false };
        }

        const startDate = dateFromMonthYear(match[1]);
        const current = /^present$/i.test(match[2].trim());
        let endDate = current ? '' : dateFromMonthYear(match[2], true);
        if (!current && startDate && endDate && endDate < startDate) {
          const [year, month] = endDate.split('-');
          endDate = `${Number(year) + 1}-${month}-${endDate.slice(-2)}`;
        }
        return { ...item, startDate, endDate, isCurrent: current };
      }),
    },
  };
}

function getDatabase() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error('DATABASE_URL is not configured. Add your Neon PostgreSQL connection string.');
  }

  return neon(connectionString);
}

async function ensureContentTable() {
  const sql = getDatabase();
  if (!tableReady) {
    tableReady = sql`
      CREATE TABLE IF NOT EXISTS portfolio_content (
        id TEXT PRIMARY KEY,
        content JSONB NOT NULL,
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `.then(() => undefined).catch((error: unknown) => {
      tableReady = undefined;
      throw error;
    });
  }
  await tableReady;
  return sql;
}

export async function getSiteContent(): Promise<SiteContent> {
  noStore();
  if (!process.env.DATABASE_URL) {
    return defaultSiteContent;
  }

  const sql = await ensureContentTable();
  const rows = await sql`
    SELECT content FROM portfolio_content WHERE id = 'portfolio' LIMIT 1
  `;
  if (!rows[0]) {
    return defaultSiteContent;
  }

  return siteContentSchema.parse(migrateLegacyContent(rows[0].content));
}

export async function saveSiteContent(content: SiteContent): Promise<void> {
  const sql = await ensureContentTable();
  await sql`
    INSERT INTO portfolio_content (id, content, updated_at)
    VALUES ('portfolio', ${JSON.stringify(content)}::jsonb, NOW())
    ON CONFLICT (id)
    DO UPDATE SET content = EXCLUDED.content, updated_at = NOW()
  `;
}
