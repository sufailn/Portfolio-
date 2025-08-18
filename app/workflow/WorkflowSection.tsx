"use client"
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Workflow, Palette, Code, Monitor } from 'lucide-react';

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

const workflowSteps = [
  {
    number: "01",
    title: "UX / Wireframing",
    description: "Creating intuitive user flows and wireframes to establish the foundation of your digital presence.",
    icon: <Workflow className="h-6 w-6" />
  },
  {
    number: "02",
    title: "Web Design",
    description: "Crafting visually stunning and responsive designs that align with your brand identity.",
    icon: <Palette className="h-6 w-6" />
  },
  {
    number: "03",
    title: "Web Development",
    description: "Building robust and scalable applications using cutting-edge technologies.",
    icon: <Code className="h-6 w-6" />
  },
  {
    number: "04",
    title: "Testing & Deployment",
    description: "Rigorous testing and seamless deployment to ensure optimal performance.",
    icon: <Monitor className="h-6 w-6" />
  }
];

export default function WorkflowSection() {
  return (
    <section className="py-20 px-4 bg-secondary/30">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-6xl mx-auto"
      >
        <h2 className="text-3xl font-bold text-center mb-4">My Way of Getting Things Done</h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Fast and transparent, the path to owning a website that will represent your brand in the best of light is only 4 weeks away.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {workflowSteps.map((step, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { delay: index * 0.2 } }
              }}
              className="relative"
            >
              <Card className="p-6 bg-card/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-4xl font-bold text-primary/20">{step.number}</span>
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
} 