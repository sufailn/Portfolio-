"use client"
import { motion } from 'framer-motion';
import { Globe, Server, Database, Code2, Layers, Briefcase, GraduationCap } from 'lucide-react';
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
            TECHNOLOGY STACK
          </motion.h2>
          <motion.p
            variants={cardVariants}
            className="text-muted-foreground max-w-3xl font-light"
          >
            Frontend Developer with 3+ years of experience building high-performance, production-ready web applications,
            specializing in modern frameworks and responsive design
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 auto-rows-fr">

          {/* Frontend */}
          <SkillCard
            icon={<Globe className="h-8 w-8 text-primary" />}
            title="Frontend"
            skills={[
              { name: "React/Next.js", level: 95 },
              { name: "TypeScript", level: 90 },
              { name: "Angular", level: 85 },
              { name: "HTML5/CSS3", level: 95 },
              { name: "Tailwind CSS", level: 95 },
            ]}
          />

          {/* Backend */}
          <SkillCard
            icon={<Server className="h-8 w-8 text-primary" />}
            title="Backend"
            skills={[
              { name: "Node.js", level: 85 },
              { name: "Express.js", level: 80 },
              { name: "Python", level: 75 },
              { name: "Flask/Django", level: 70 },
              { name: "PHP", level: 65 },
            ]}
          />

          {/* Database */}
          <SkillCard
            icon={<Database className="h-8 w-8 text-primary" />}
            title="Database"
            skills={[
              { name: "MongoDB", level: 85 },
              { name: "PostgreSQL", level: 80 },
              { name: "MySQL", level: 80 },
              { name: "Supabase", level: 85 },
              { name: "Neon", level: 75 },
            ]}
          />

          {/* DevOps & Tools */}
          <SkillCard
            icon={<Code2 className="h-8 w-8 text-primary" />}
            title="DevOps & Tools"
            skills={[
              { name: "Git/GitHub", level: 90 },
              { name: "AWS", level: 75 },
              { name: "CI/CD", level: 80 },
              { name: "CMS (Sanity/WP)", level: 85 },
              { name: "REST APIs", level: 95 },
            ]}
          />
        </div>

        <motion.h3
          variants={cardVariants}
          className="text-2xl mt-20 mb-8 text-center text-primary"
        >
          Additional Skills
        </motion.h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 auto-rows-fr">
          {/* Soft Skills */}
          <SkillCard
            icon={<Briefcase className="h-8 w-8 text-primary" />}
            title="Professional Skills"
            skills={[
              { name: "Problem Solving", level: 95 },
              { name: "Project Management", level: 85 },
              { name: "Communication", level: 90 },
              { name: "Critical Thinking", level: 90 },
              { name: "Continuous Learning", level: 95 },
            ]}
          />

          {/* Methodologies */}
          <SkillCard
            icon={<Layers className="h-8 w-8 text-primary" />}
            title="Methodologies"
            skills={[
              { name: "Agile/SCRUM", level: 90 },
              { name: "Responsive Design", level: 95 },
              { name: "SEO Optimization", level: 85 },
              { name: "Accessibility (WCAG)", level: 80 },
              { name: "Performance Tuning", level: 90 },
            ]}
          />

          {/* Languages */}
          <SkillCard
            icon={<GraduationCap className="h-8 w-8 text-primary" />}
            title="Languages & Education"
            skills={[
              { name: "English", level: 95 },
              { name: "Malayalam", level: 100 },
              { name: "Hindi", level: 85 },
              { name: "MCA Degree", level: 100 },
              { name: "BCA Degree", level: 100 },
            ]}
          />
        </div>
      </motion.div>
    </section>
  );
}
