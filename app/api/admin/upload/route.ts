import { randomUUID } from 'node:crypto';
import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
import { hasAdminSession } from '@/lib/cms/auth';

const maximumFileSize = 4 * 1024 * 1024;
const allowedTypes = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'application/pdf']);

export async function POST(request: Request) {
  if (!(await hasAdminSession())) {
    return NextResponse.json({ error: 'Please sign in to upload media.' }, { status: 401 });
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json({ error: 'Media uploads are not configured. Set BLOB_READ_WRITE_TOKEN.' }, { status: 503 });
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: 'Upload request could not be read.' }, { status: 400 });
  }

  const file = formData.get('file');
  if (typeof file === 'string' || file === null) {
    return NextResponse.json({ error: 'Choose an image or PDF to upload.' }, { status: 400 });
  }
  if (!allowedTypes.has(file.type)) {
    return NextResponse.json({ error: 'Allowed formats: JPG, PNG, WebP, GIF, or PDF.' }, { status: 400 });
  }
  if (file.size > maximumFileSize) {
    return NextResponse.json({ error: 'Files must be 4 MB or smaller.' }, { status: 413 });
  }

  const safeName = file.name.replace(/[^\w.-]/g, '_').slice(-100) || 'upload';
  try {
    const blob = await put(`${randomUUID()}-${safeName}`, file, {
      access: 'public',
      contentType: file.type,
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });
    return NextResponse.json({ url: blob.url });
  } catch (error) {
    console.error('Unable to upload portfolio media:', error);
    return NextResponse.json({ error: 'Upload failed. Check the Vercel Blob configuration.' }, { status: 503 });
  }
}
