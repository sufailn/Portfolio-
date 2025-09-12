import HeroSection from './hero/HeroSection';
import SkillsSection from './skills/SkillsSection';
import ProjectsSection from './projects/ProjectsSection';
import WorkflowSection from './workflow/WorkflowSection';
import ContactSection from './contact/ContactSection';
import FooterSection from './footer/FooterSection';
import { Navbar } from '@/components/navbar';
import CareerSection from './career/CareerSection';

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <CareerSection />
      <SkillsSection />
      <ProjectsSection />
      <WorkflowSection />
      <ContactSection />
      <FooterSection />
    </main>
  );
}
