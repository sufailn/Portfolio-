import { unstable_noStore as noStore } from 'next/cache';
import { neon } from '@neondatabase/serverless';
import { defaultSiteContent, siteContentSchema, type SiteContent } from './content';

let tableReady: Promise<void> | undefined;

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

  return siteContentSchema.parse(rows[0].content);
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
