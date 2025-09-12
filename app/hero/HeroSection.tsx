"use client"
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { useInView } from 'react-intersection-observer';
import { Button } from '@/components/ui/button';
import { Github, Linkedin, Mail, Phone } from 'lucide-react';
import { Navbar } from '@/components/navbar';
import Image from 'next/image';
import { ArrowRight, Code2, Laptop, Rocket } from 'lucide-react';
import Link from 'next/link';

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

export default function HeroSection() {
  const [heroRef, heroInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  return (
    <section
      ref={heroRef}
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden pt-16"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={heroInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-center z-10 px-4"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          <TypeAnimation
            sequence={['Hi, I am Sufail Ahammed N', 1000, 'Full Stack Developer', 1000]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
          />
        </h1>
        <p className="text-muted-foreground text-lg md:text-xl mb-8 max-w-2xl mx-auto">
          MCA graduate specializing in MEAN stack, React, Next.js, and Tailwind CSS.
          Building scalable web applications with a focus on performance and user experience.
        </p>
        <div className="flex gap-4 justify-center mb-8">
          <Button variant="default" size="lg" asChild>
            <a href="#contact">Get in Touch</a>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <a href="#projects">View Projects</a>
          </Button>
        </div>
        <div className="flex gap-4 justify-center">
          <a href="https://github.com/sufailn" target="_blank" rel="noopener noreferrer">
            <Button variant="ghost" size="icon">
              <Github className="h-5 w-5" />
            </Button>
          </a>
          <a href="https://linkedin.com/in/sufail-ahammed-n" target="_blank" rel="noopener noreferrer">
            <Button variant="ghost" size="icon">
              <Linkedin className="h-5 w-5" />
            </Button>
          </a>
          <a href="mailto:sufailahammed316@gmail.com">
            <Button variant="ghost" size="icon">
              <Mail className="h-5 w-5" />
            </Button>
          </a>
          <a href="tel:+919562026070">
            <Button variant="ghost" size="icon">
              <Phone className="h-5 w-5" />
            </Button>
          </a>
        </div>
      </motion.div>
    </section>
  );
} 