"use client"
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useSound } from '@/components/sound-provider';

export default function SkillCard({ icon, title, skills }: { icon: React.ReactNode; title: string; skills: { name: string; level: number; }[] }) {
  const [isInView, setIsInView] = useState(false);
  const { playClickSound } = useSound();

  // Animation for skills
  const skillItemVariants = {
    hidden: { opacity: 0 },
    visible: (i: number) => ({
      opacity: 1,
      transition: {
        delay: 0.05 * i,
        duration: 0.3
      }
    })
  };

  return (
    <motion.div
      onViewportEnter={() => setIsInView(true)}
      className="h-full"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="h-full flex flex-col">
        <div className="mb-3">
          <h3 className="text-lg font-mono uppercase tracking-tight mb-1">{title}</h3>
          <div className="h-[1px] w-12 bg-border"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3 mt-3">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              custom={index}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={skillItemVariants}
              className="border border-border px-3 py-2 hover:border-primary/50 transition-colors cursor-default"
            >
              <span className="font-mono text-sm">{skill.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}