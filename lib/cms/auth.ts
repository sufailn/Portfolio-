import { createHash, timingSafeEqual } from 'node:crypto';
import { cookies } from 'next/headers';
import { SignJWT, jwtVerify } from 'jose';

export const adminCookieName = 'portfolio-admin-session';
const sessionIssuer = 'portfolio-admin';
const sessionDurationSeconds = 60 * 60 * 8;

function getSessionSecret() {
  const value = process.env.ADMIN_SESSION_SECRET;
  if (!value || value.length < 32) {
    throw new Error('ADMIN_SESSION_SECRET must be set to a random value of at least 32 characters.');
  }
  return new TextEncoder().encode(value);
}

export function getAdminCredentials() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password) {
    throw new Error('ADMIN_EMAIL and ADMIN_PASSWORD must be configured.');
  }
  return { email: email.toLowerCase(), password };
}

export async function createAdminSession(email: string) {
  return new SignJWT({ email })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuer(sessionIssuer)
    .setIssuedAt()
    .setExpirationTime(`${sessionDurationSeconds}s`)
    .sign(getSessionSecret());
}

export async function hasAdminSession() {
  const token = cookies().get(adminCookieName)?.value;
  if (!token) {
    return false;
  }

  try {
    const { payload } = await jwtVerify(token, getSessionSecret(), { issuer: sessionIssuer });
    return payload.email === process.env.ADMIN_EMAIL?.toLowerCase();
  } catch {
    return false;
  }
}

export function constantTimeEqual(left: string, right: string) {
  const leftDigest = createHash('sha256').update(left).digest();
  const rightDigest = createHash('sha256').update(right).digest();
  return timingSafeEqual(leftDigest, rightDigest);
}
