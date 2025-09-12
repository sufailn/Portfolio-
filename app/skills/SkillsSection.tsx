"use client"
import { motion } from 'framer-motion';
import { Globe, Server, Database, Code2 } from 'lucide-react';
import SkillCard from './SkillCard';

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

export default function SkillsSection() {
  return (
    <section id="skills" className="py-24 px-4 bg-gradient-to-b from-secondary/10 to-background relative overflow-hidden">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-6xl mx-auto relative z-10"
      >
        <div className="text-center mb-16">
          <motion.h2
            variants={cardVariants}
            className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70"
          >
            Technical Skills
          </motion.h2>
          <motion.p
            variants={cardVariants}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            A comprehensive overview of my technical expertise and proficiency levels
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Frontend */}
          <SkillCard
            icon={<Globe className="h-8 w-8" />}
            title="Frontend"
            skills={[
              { name: "React/Next.js", level: 90 },
              { name: "Angular", level: 85 },
              { name: "TypeScript", level: 80 },
              { name: "Tailwind CSS", level: 95 },
              { name: "Sanity CMS", level: 80 },
              { name: "WordPress", level: 75 },
              { name: "JSON", level: 85 },
            ]}
          />

          {/* Backend */}
          <SkillCard
            icon={<Server className="h-8 w-8" />}
            title="Backend"
            skills={[
              { name: "Node.js", level: 85 },
              { name: "Express.js", level: 80 },
              { name: "Python/Flask", level: 75 },
              { name: "RESTful APIs", level: 90 },
              { name: "Supabase", level: 80 },
              { name: "PHP", level: 70 },
            ]}
          />

          {/* Database */}
          <SkillCard
            icon={<Database className="h-8 w-8" />}
            title="Database"
            skills={[
              { name: "MongoDB", level: 85 },
              { name: "SQLite", level: 80 },
              { name: "PostgreSQL", level: 75 },
              { name: "Neon Postgres", level: 85 },
              { name: "Microsoft Excel", level: 80 },
            ]}
          />

          {/* Tools & Others */}
          <SkillCard
            icon={<Code2 className="h-8 w-8" />}
            title="Tools & Others"
            skills={[
              { name: "Git", level: 90 },
              { name: "Docker", level: 80 },
              { name: "AWS", level: 75 },
              { name: "CMS (Sanity, WordPress)", level: 80 },
              { name: "Microsoft Excel", level: 80 },
            ]}
          />
        </div>
      </motion.div>
    </section>
  );
}
