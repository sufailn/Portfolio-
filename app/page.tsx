import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import HeroSection from './hero/HeroSection';
import LoadingSection from './LoadingSection';
import { getSiteContent } from '@/lib/cms/database';

// Dynamic imports for non-critical sections
const CareerSection = dynamic(() => import('./career/CareerSection'), {
  loading: () => <LoadingSection title="Career" />,
  ssr: false
});

const SkillsSection = dynamic(() => import('./skills/SkillsSection'), {
  loading: () => <LoadingSection title="Skills" />,
  ssr: false
});

const ProjectsSection = dynamic(() => import('./projects/ProjectsSection'), {
  loading: () => <LoadingSection title="Projects" />,
  ssr: false
});

const WorkflowSection = dynamic(() => import('./workflow/WorkflowSection'), {
  loading: () => <LoadingSection title="Workflow" />,
  ssr: false
});

const ContactSection = dynamic(() => import('./contact/ContactSection'), {
  loading: () => <LoadingSection title="Contact" />,
  ssr: false
});

const FooterSection = dynamic(() => import('./footer/FooterSection'), {
  loading: () => <div className="h-20"></div>,
  ssr: false
});

export default async function Home() {
  const content = await getSiteContent();

  return (
    <main className="min-h-screen bg-black text-white">
      {content.hero.enabled && <HeroSection content={content.hero} />}
      {content.career.enabled && (
        <Suspense fallback={<LoadingSection title="Career" />}>
          <CareerSection content={content.career} />
        </Suspense>
      )}
      {content.skills.enabled && (
        <Suspense fallback={<LoadingSection title="Skills" />}>
          <SkillsSection content={content.skills} />
        </Suspense>
      )}
      {content.projects.enabled && (
        <Suspense fallback={<LoadingSection title="Projects" />}>
          <ProjectsSection content={content.projects} />
        </Suspense>
      )}
      {content.workflow.enabled && (
        <Suspense fallback={<LoadingSection title="Workflow" />}>
          <WorkflowSection content={content.workflow} />
        </Suspense>
      )}
      {content.contact.enabled && (
        <Suspense fallback={<LoadingSection title="Contact" />}>
          <ContactSection content={content.contact} />
        </Suspense>
      )}
      {content.footer.enabled && (
        <Suspense fallback={<div className="h-20"></div>}>
          <FooterSection content={content.footer} />
        </Suspense>
      )}
    </main>
  );
}
