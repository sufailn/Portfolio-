import EnhancedProjects from '@/components/project/enhanced-projects';
import type { SiteContent } from '@/lib/cms/content';

export default function ProjectsSection({ content }: { content: SiteContent['projects'] }) {
  return (
    <EnhancedProjects
      projects={content.items}
      heading={content.heading}
      description={content.description}
    />
  );
}
