"use client"
import { motion } from 'framer-motion';
import { Globe, Server, Database, Code2 } from 'lucide-react';
import SkillCard from './SkillCard';

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.2
    }
  }
};

export default function SkillsSection() {
  return (
    <section id="skills" className="py-20 px-4 bg-secondary/30">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-6xl mx-auto"
      >
        <h2 className="text-3xl font-bold text-center mb-12">Technical Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <SkillCard
            icon={<Globe className="h-8 w-8" />}
            title="Frontend"
            skills={[
              { name: "React/Next.js", level: 90 },
              { name: "Angular", level: 85 },
              { name: "TypeScript", level: 80 },
              { name: "Tailwind CSS", level: 95 },
            ]}
          />
          <SkillCard
            icon={<Server className="h-8 w-8" />}
            title="Backend"
            skills={[
              { name: "Node.js", level: 85 },
              { name: "Express.js", level: 80 },
              { name: "Python/Flask", level: 75 },
              { name: "RESTful APIs", level: 90 },
            ]}
          />
          <SkillCard
            icon={<Database className="h-8 w-8" />}
            title="Database"
            skills={[
              { name: "MongoDB", level: 85 },
              { name: "SQLite", level: 80 },
              { name: "PostgreSQL", level: 75 },
            ]}
          />
          <SkillCard
            icon={<Code2 className="h-8 w-8" />}
            title="Tools & Others"
            skills={[
              { name: "Git", level: 90 },
            ]}
          />
        </div>
      </motion.div>
    </section>
  );
} 