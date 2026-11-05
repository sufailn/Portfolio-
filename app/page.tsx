import HeroSection from './hero/HeroSection';
import CareerSection from './career/CareerSection';
import SkillsSection from './skills/SkillsSection';
import ProjectsSection from './projects/ProjectsSection';
import WorkflowSection from './workflow/WorkflowSection';
import ContactSection from './contact/ContactSection';
import FooterSection from './footer/FooterSection';
import { getSiteContent } from '@/lib/cms/database';

export default async function Home() {
  const content = await getSiteContent();

  return (
    <main className="min-h-screen bg-black text-white">
      {content.hero.enabled && <HeroSection content={content.hero} />}
      {content.career.enabled && <CareerSection content={content.career} />}
      {content.skills.enabled && <SkillsSection content={content.skills} />}
      {content.projects.enabled && <ProjectsSection content={content.projects} />}
      {content.workflow.enabled && <WorkflowSection content={content.workflow} />}
      {content.contact.enabled && <ContactSection content={content.contact} />}
      {content.footer.enabled && <FooterSection content={content.footer} />}
    </main>
  );
}
