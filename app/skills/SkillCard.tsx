"use client"
import { Progress } from '@/components/ui/progress';
import { SoundCard } from '@/components/ui/sound-card';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useSound } from '@/components/sound-provider';

export default function SkillCard({ icon, title, skills }: { icon: React.ReactNode; title: string; skills: { name: string; level: number; }[] }) {
  const [isInView, setIsInView] = useState(false);
  const [animatedLevels, setAnimatedLevels] = useState<number[]>(skills.map(() => 0));
  const { playClickSound } = useSound();

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

  // Custom animation variants for the skill card
  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    },
    whileHover: {
      scale: 1.03,
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)",
      transition: { duration: 0.2 }
    }
  };

  // Animation for progress bars
  const progressVariants = {
    initial: { width: "0%" },
    animate: (level: number) => ({
      width: `${level}%`
    })
  };

  return (
    <motion.div
      onViewportEnter={() => setIsInView(true)}
      className="h-full"
    >
      <SoundCard
        className="h-full"
        hoverEffect="lift"
        animationVariants={cardVariants}
        playOnHover={true}
      >
        <div className="p-6 bg-card/50 backdrop-blur-sm flex flex-col h-full">
          <div className="flex items-center gap-3 mb-6">
            <motion.div
              whileHover={{ rotate: [0, -10, 10, -10, 0] }}
              transition={{ duration: 0.5 }}
              onClick={() => playClickSound()}
              className="cursor-pointer"
            >
              {icon}
            </motion.div>
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
                <div className="relative h-2 bg-secondary/30 rounded-full overflow-hidden">
                  <motion.div
                    className="absolute top-0 left-0 h-full bg-primary rounded-full"
                    initial="initial"
                    animate="animate"
                    custom={animatedLevels[index]}
                    variants={progressVariants}
                    transition={{ duration: 1, delay: 0.3 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </SoundCard>
    </motion.div>
  );
}