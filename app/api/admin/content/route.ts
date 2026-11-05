import { NextResponse } from 'next/server';
import { hasAdminSession } from '@/lib/cms/auth';
import { getSiteContent, saveSiteContent } from '@/lib/cms/database';
import { siteContentSchema } from '@/lib/cms/content';

export async function GET() {
  if (!(await hasAdminSession())) {
    return NextResponse.json({ error: 'Please sign in to manage portfolio content.' }, { status: 401 });
  }

  try {
    return NextResponse.json(await getSiteContent());
  } catch (error) {
    console.error('Unable to load portfolio content:', error);
    return NextResponse.json({ error: 'Could not load content. Check the Neon DATABASE_URL setting.' }, { status: 503 });
  }
}

export async function PUT(request: Request) {
  if (!(await hasAdminSession())) {
    return NextResponse.json({ error: 'Please sign in to manage portfolio content.' }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const result = siteContentSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      { error: `Content is incomplete or invalid: ${result.error.issues[0]?.path.join('.') || 'unknown field'}` },
      { status: 400 }
    );
  }

  try {
    await saveSiteContent(result.data);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Unable to save portfolio content:', error);
    return NextResponse.json({ error: 'Could not save content. Check the Neon DATABASE_URL setting.' }, { status: 503 });
  }
}
