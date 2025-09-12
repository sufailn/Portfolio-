"use client"
import React, { useEffect } from 'react';
import { motion, useAnimationControls } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { useInView } from 'react-intersection-observer';
import { Button } from '@/components/ui/button';
import { Github, Linkedin, Mail, Phone, Code2, BracesIcon, Terminal, Hash, Database } from 'lucide-react';
import Image from 'next/image';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0
  }
};

interface FloatingIconProps {
  icon: React.ElementType;
  delay: number;
  duration: number;
  x: number;
  y: number;
}

const FloatingIcon = ({ icon: Icon, delay, duration, x, y }: FloatingIconProps) => {
  const controls = useAnimationControls();

  useEffect(() => {
    controls.start({
      y: [y, y - 20, y],
      x: [x, x + 10, x],
      transition: {
        duration,
        repeat: Infinity,
        repeatType: "reverse",
        delay,
      },
    });
  }, [controls, delay, duration, x, y]);

  return (
    <motion.div
      animate={controls}
      className="absolute text-primary/20 transform"
      style={{ left: `${x}%`, top: `${y}%` }}
    >
      <Icon className="w-8 h-8 md:w-12 md:h-12" />
    </motion.div>
  );
};

export default function HeroSection() {
  const [heroRef, heroInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const floatingIcons: FloatingIconProps[] = [
    { icon: Code2, delay: 0, duration: 4, x: 15, y: 20 },
    { icon: BracesIcon, delay: 1, duration: 5, x: 85, y: 30 },
    { icon: Terminal, delay: 2, duration: 4.5, x: 25, y: 80 },
    { icon: Hash, delay: 1.5, duration: 5.5, x: 75, y: 70 },
    { icon: Database, delay: 2.5, duration: 4.8, x: 50, y: 50 },
  ];

  return (
    <section
      ref={heroRef}
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-radial from-primary/5 via-transparent to-transparent blur-2xl" />
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-radial from-secondary/5 via-transparent to-transparent blur-2xl" />
      </div>

      {/* Floating Icons */}
      {floatingIcons.map((iconProps, index) => (
        <FloatingIcon key={index} {...iconProps} />
      ))}

      {/* Main Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="block mb-2">Hi, I am</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary/60">
                <TypeAnimation
                  sequence={[
                    'Sufail Ahammed N',
                    1000,
                    'Full-Stack Developer',
                    1000,
                    'MERN Stack Developer',
                    1000,
                    'React Developer',
                    1000,
                    'Next.js Developer',
                    1000,
                    'Open Source Contributor',
                    1000
                  ] as const}
                  wrapper="span"
                  speed={50}
                  repeat={Infinity}
                />
              </span>
            </h1>

            <p className="text-muted-foreground text-lg md:text-xl mb-8">
              MCA graduate with passion for creating user-friendly web applications.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button
                variant="default"
                size="lg"
                className="bg-primary hover:bg-primary/90"
                asChild
              >
                <a href="#contact" className="flex items-center gap-2">
                  Get in Touch
                  <Mail className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="#projects">View Projects</a>
              </Button>
            </div>

            <div className="flex gap-4 justify-center">
              {[
                { href: "https://github.com/sufailn", icon: Github, label: "GitHub" },
                { href: "https://linkedin.com/in/sufail-ahammed-n", icon: Linkedin, label: "LinkedIn" },
                { href: "mailto:sufailahammed316@gmail.com", icon: Mail, label: "Email" },
                { href: "tel:+919562026070", icon: Phone, label: "Phone" }
              ].map((social: { href: string; icon: React.ElementType; label: string }, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button variant="ghost" size="icon" className="hover:bg-primary/10 hover:text-primary">
                    <social.icon className="h-5 w-5" />
                  </Button>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 