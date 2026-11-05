import { NextResponse } from 'next/server';
import { constantTimeEqual, createAdminSession, getAdminCredentials, adminCookieName } from '@/lib/cms/auth';

export async function POST(request: Request) {
  const sessionSecret = process.env.ADMIN_SESSION_SECRET;
  if (!sessionSecret || sessionSecret.length < 32) {
    return NextResponse.json(
      { error: 'Admin login is not configured. Set ADMIN_EMAIL, ADMIN_PASSWORD, and a 32-character ADMIN_SESSION_SECRET.' },
      { status: 503 }
    );
  }

  let body: { email?: unknown; password?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  if (typeof body.email !== 'string' || typeof body.password !== 'string') {
    return NextResponse.json({ error: 'Enter your admin email and password.' }, { status: 400 });
  }

  let credentials: ReturnType<typeof getAdminCredentials>;
  try {
    credentials = getAdminCredentials();
  } catch {
    return NextResponse.json(
      { error: 'Admin login is not configured. Set ADMIN_EMAIL, ADMIN_PASSWORD, and ADMIN_SESSION_SECRET.' },
      { status: 503 }
    );
  }

  const emailMatches = constantTimeEqual(body.email.toLowerCase(), credentials.email);
  const passwordMatches = constantTimeEqual(body.password, credentials.password);
  if (!emailMatches || !passwordMatches) {
    return NextResponse.json({ error: 'Email or password is incorrect.' }, { status: 401 });
  }

  const token = await createAdminSession(credentials.email);
  const response = NextResponse.json({ ok: true });
  response.cookies.set(adminCookieName, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 8,
  });
  return response;
}
