// app/Admin/[[...tool]]/StudioPageClient.tsx

'use client';

import { NextStudio } from 'next-sanity/studio';
import config from '../../../sanity.config'; // Make sure this path is correct

export default function StudioPageClient() {
  return <NextStudio config={config} />;
}
