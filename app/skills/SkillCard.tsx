"use client"
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export default function SkillCard({ icon, title, skills }: { icon: React.ReactNode; title: string; skills: { name: string; level: number; }[] }) {
  return (
    <Card className="p-6 hover:shadow-lg transition-shadow bg-card/50 backdrop-blur-sm">
      <div className="flex items-center gap-3 mb-6">
        {icon}
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      <div className="space-y-4">
        {skills.map((skill, index) => (
          <div key={index}>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">{skill.name}</span>
              <span className="text-sm text-muted-foreground">{skill.level}%</span>
            </div>
            <Progress value={skill.level} className="h-2" />
          </div>
        ))}
      </div>
    </Card>
  );
} 