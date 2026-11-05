"use client"
import { motion } from 'framer-motion';
import { Globe, Server, Database, Code2, Layers, Briefcase, GraduationCap } from 'lucide-react';
import SkillCard from './SkillCard';
import type { SiteContent } from '@/lib/cms/content';

const skillIcons = { Globe, Server, Database, Code2, Layers, Briefcase, GraduationCap };

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0
  }
};

export default function SkillsSection({ content }: { content: SiteContent['skills'] }) {
  return (
    <section id="skills" className="py-24 px-4 bg-background border-t border-b border-border relative overflow-hidden">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-7xl mx-auto relative z-10"
      >
        <div className="mb-16">
          <motion.h2
            variants={cardVariants}
            className="text-2xl font-mono uppercase tracking-tight mb-4 text-black dark:text-white"
          >
            {content.heading}
          </motion.h2>
          <motion.p
            variants={cardVariants}
            className="text-muted-foreground max-w-3xl font-light"
          >
            {content.description}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 auto-rows-fr">

          {content.groups.slice(0, 4).map((group) => {
            const Icon = skillIcons[group.icon as keyof typeof skillIcons] || Code2;
            return <SkillCard key={group.title} icon={<Icon className="h-8 w-8 text-primary" />} title={group.title} skills={group.skills} />;
          })}
        </div>

        <motion.h3
          variants={cardVariants}
          className="text-2xl mt-20 mb-8 text-center text-primary"
        >
          {content.additionalHeading}
        </motion.h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 auto-rows-fr">
          {content.groups.slice(4).map((group) => {
            const Icon = skillIcons[group.icon as keyof typeof skillIcons] || Code2;
            return <SkillCard key={group.title} icon={<Icon className="h-8 w-8 text-primary" />} title={group.title} skills={group.skills} />;
          })}
        </div>
      </motion.div>
    </section>
  );
}
