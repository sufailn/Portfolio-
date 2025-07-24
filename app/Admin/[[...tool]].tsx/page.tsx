// app/Admin/[[...tool]]/page.tsx

export const dynamic = 'force-static';

export const metadata = {
  title: 'Sanity Studio',
};

import StudioPageClient from './StudioPageClient';

export default function StudioPage() {
  return <StudioPageClient />;
}
