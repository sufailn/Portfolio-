"use client"
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Workflow, Palette, Code, Monitor } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      staggerChildren: 0.3
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1
  }
};

const iconContainerVariants = {
  hidden: { opacity: 0, rotate: -180, scale: 0 },
  visible: {
    opacity: 1,
    rotate: 0,
    scale: 1
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
    <section className="py-24 px-4 bg-gradient-to-b from-background via-secondary/5 to-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-radial from-primary/5 via-transparent to-transparent blur-2xl" />
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-radial from-secondary/5 via-transparent to-transparent blur-2xl" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-6xl mx-auto relative z-10"
      >
        <div className="text-center mb-16">
          <motion.h2
            variants={containerVariants}
            className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70"
          >
            My Development Process
          </motion.h2>
          <motion.p
            variants={containerVariants}
            className="text-center text-muted-foreground max-w-2xl mx-auto"
          >
            A streamlined approach to bringing your digital vision to life in four carefully crafted stages
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {workflowSteps.map((step, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{
                y: -8,
                scale: 1.02,
                transition: { type: "spring", stiffness: 400, damping: 10 }
              }}
              className="relative h-full group"
            >
              <Card className="relative p-8 h-full bg-card/50 backdrop-blur-sm border-primary/10 
                             transition-all duration-300 overflow-hidden
                             before:absolute before:inset-0 before:bg-gradient-to-br before:from-primary/5 before:to-transparent before:opacity-0
                             before:transition-opacity before:duration-300 group-hover:before:opacity-100">
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    {/* Animated Number */}
                    <motion.span
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.2, duration: 0.5 }}
                      className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary/60 to-primary/20"
                    >
                      {step.number}
                    </motion.span>

                    {/* Animated Icon */}
                    <motion.div
                      variants={iconContainerVariants}
                      whileHover={{
                        scale: 1.1,
                        rotate: 360,
                        transition: { duration: 0.6 }
                      }}
                      className="p-3 rounded-xl bg-primary/10 text-primary relative
                               after:absolute after:inset-0 after:rounded-xl after:border-2 after:border-primary/20 after:scale-110 after:opacity-0
                               after:transition-all after:duration-300 group-hover:after:scale-100 group-hover:after:opacity-100"
                    >
                      {step.icon}
                    </motion.div>
                  </div>

                  {/* Content */}
                  <motion.h3
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.3 }}
                    className="text-xl font-semibold mb-3 text-foreground/90"
                  >
                    {step.title}
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.4 }}
                    className="text-muted-foreground text-sm leading-relaxed"
                  >
                    {step.description}
                  </motion.p>
                </div>

                {/* Progress Line */}
                <motion.div
                  className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-primary/30 via-primary/20 to-transparent"
                  initial={{ scaleX: 0, originX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: index * 0.2 }}
                />

                {/* Decorative Elements */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.5 }}
                  transition={{ delay: index * 0.3 }}
                  className="absolute -top-4 -right-4 w-24 h-24 bg-primary/5 rounded-full blur-2xl pointer-events-none"
                />
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
} 