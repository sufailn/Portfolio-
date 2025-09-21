"use client"
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function SkillCard({ icon, title, skills }: { icon: React.ReactNode; title: string; skills: { name: string; level: number; }[] }) {
  const [isInView, setIsInView] = useState(false);
  const [animatedLevels, setAnimatedLevels] = useState<number[]>(skills.map(() => 0));

  useEffect(() => {
    if (isInView) {
      const timers = skills.map((skill, index) => {
        return setTimeout(() => {
          setAnimatedLevels(prev => {
            const newValues = [...prev];
            newValues[index] = skill.level;
            return newValues;
          });
        }, 300 + index * 200); // Staggered start for each skill
      });

      return () => {
        timers.forEach(timer => clearTimeout(timer));
      };
    }
  }, [isInView, skills]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      viewport={{ once: true, margin: "-50px" }}
      onViewportEnter={() => setIsInView(true)}
      className="h-full"
    >
      <Card className="p-6 hover:shadow-lg transition-shadow bg-card/50 backdrop-blur-sm flex flex-col h-full">
        <div className="flex items-center gap-3 mb-6">
          {icon}
          <h3 className="text-xl font-semibold">{title}</h3>
        </div>
        <div className="space-y-4 flex-grow">
          {skills.map((skill, index) => (
            <div key={index}>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">{skill.name}</span>
                <motion.span
                  className="text-sm text-muted-foreground"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.2 }}
                >
                  {Math.round(animatedLevels[index])}%
                </motion.span>
              </div>
              <Progress
                value={animatedLevels[index]}
                className="h-2"
              />
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}