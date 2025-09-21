import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import HeroSection from './hero/HeroSection';
import LoadingSection from './LoadingSection';

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

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <HeroSection />
      <Suspense fallback={<LoadingSection title="Career" />}>
        <CareerSection />
      </Suspense>
      <Suspense fallback={<LoadingSection title="Skills" />}>
        <SkillsSection />
      </Suspense>
      <Suspense fallback={<LoadingSection title="Projects" />}>
        <ProjectsSection />
      </Suspense>
      <Suspense fallback={<LoadingSection title="Workflow" />}>
        <WorkflowSection />
      </Suspense>
      <Suspense fallback={<LoadingSection title="Contact" />}>
        <ContactSection />
      </Suspense>
      <Suspense fallback={<div className="h-20"></div>}>
        <FooterSection />
      </Suspense>
    </main>
  );
}
