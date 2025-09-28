"use client"
import React, { useEffect } from 'react';
import { motion, useAnimationControls } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { useInView } from 'react-intersection-observer';
import { Button } from '@/components/ui/button';
import { Github, Linkedin, Mail, Phone, Code2, BracesIcon, Terminal, Hash, Database, Download } from 'lucide-react';
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
    // Simplified animation with reduced complexity
    controls.start({
      y: [y, y - 10, y],
      transition: {
        duration: Math.min(duration, 3), // Cap duration to improve performance
        repeat: Infinity,
        repeatType: "reverse",
        delay: Math.min(delay, 0.5), // Cap delay to improve initial load
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

  // We're not using floating icons for the bjornflow.com style
  const floatingIcons: FloatingIconProps[] = [];

  return (
    <section
      ref={heroRef}
      id="home"
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden pt-16"
    >
      {/* Background - Simplified black style like bjornflow.com */}
      <div className="absolute inset-0 bg-black">
        {/* Optional subtle grid overlay */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-20"></div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-10 md:gap-20">
          <motion.div
            className="md:w-1/2"
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            {/* Intro text with bjornflow style */}
            <motion.p
              className="text-white/70 mb-4 font-space-grotesk tracking-wide leading-tight"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Hi, I&apos;m Sufail Ahammed N
            </motion.p>

            {/* Main heading with large, space-grotesk font */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight font-space-grotesk leading-tight">
              <motion.span
                className="block text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                CREATIVE
              </motion.span>
              <motion.span
                className="block text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <TypeAnimation
                  sequence={[
                    'WEBFLOW',
                    1500,
                    'NEXTJS',
                    1500,
                    'REACT',
                    1500,
                    'SANITY CMS',
                    1500,
                    'WORDPRESS',
                    1500,
                    'MERN STACK',
                    1500,
                  ] as const}
                  wrapper="span"
                  speed={30}
                  repeat={Infinity}
                />
              </motion.span>
              <motion.span
                className="block text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                DEVELOPER
              </motion.span>
            </h1>


            <div className="flex items-center mt-8 gap-6">
              <motion.div
                className="w-full md:w-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-1 h-1 bg-white rounded-full"></div>
                  <div className="h-px w-20 md:w-40 bg-gradient-to-r from-white to-transparent"></div>
                  <div className="flex items-center space-x-2">
                    <span className="text-white/80 text-xs md:text-sm uppercase tracking-wider">MERN STACK CERTIFIED DEVELOPER</span>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <Button
                variant="outline"
                size="lg"
                className="border-white/20 hover:bg-white/5 text-white rounded-none px-8 py-6 h-auto"
                asChild
              >
                <a href="#contact" className="flex items-center gap-2 uppercase tracking-wider text-sm">
                  Get In Touch
                </a>
              </Button>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.1 }}
              >
                <Button
                  variant="ghost"
                  size="lg"
                  className="border border-white/40 hover:bg-white hover:text-black text-white rounded-none px-8 py-6 h-auto transition-all duration-300"
                  asChild
                >
                  <a
                    href="/documents/Sufail_Ahammed_N_CV.pdf"
                    download="Sufail_Ahammed_N_CV.pdf"
                    className="flex items-center gap-2 uppercase tracking-wider text-sm"
                  >
                    <Download className="h-4 w-4" />
                    Download CV
                  </a>
                </Button>
              </motion.div>
            </div>
          </motion.div>


          {/* <motion.div
            className="md:w-1/2 relative h-80 md:h-[500px]"
            initial={{ opacity: 0, scale: 0.9, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1.2, type: "spring", stiffness: 100, damping: 15 }}
          >
            <div className="relative w-full h-full group">
             
              <div className="relative w-full h-full overflow-hidden">
                <Image
                  src="/images/model_bw.png"
                  alt="Sufail Ahammed N"
                  fill
                  className="object-contain grayscale contrast-110 brightness-90 transition-all duration-1000 group-hover:brightness-100 group-hover:contrast-125"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  quality={85}
                />

              
                <motion.div
                  className="absolute inset-0 opacity-40 mix-blend-multiply"
                  style={{
                    backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)`,
                    backgroundSize: '20px 20px',
                  }}
                  animate={{
                    backgroundPosition: ['0px 0px', '20px 20px']
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />

               
                <motion.div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: `
                      linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
                      linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
                    `,
                    backgroundSize: '40px 40px',
                  }}
                  animate={{
                    opacity: [0.1, 0.3, 0.1]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />

               
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-white/40 rounded-full"
                    style={{
                      left: `${20 + Math.random() * 60}%`,
                      top: `${20 + Math.random() * 60}%`,
                    }}
                    animate={{
                      y: [0, -10, 0],
                      x: [0, 5, 0],
                      opacity: [0.4, 0.8, 0.4],
                      scale: [1, 1.2, 1]
                    }}
                    transition={{
                      duration: 2 + Math.random() * 2,
                      repeat: Infinity,
                      delay: Math.random() * 2,
                      ease: "easeInOut"
                    }}
                  />
                ))}

               
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />

                
                <motion.div
                  className="absolute inset-4 border border-white/20 pointer-events-none"
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1.5, delay: 0.8 }}
                >
               
                  <div className="absolute -top-1 -left-1 w-4 h-4 border-l-2 border-t-2 border-white/40"></div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 border-r-2 border-t-2 border-white/40"></div>
                  <div className="absolute -bottom-1 -left-1 w-4 h-4 border-l-2 border-b-2 border-white/40"></div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 border-r-2 border-b-2 border-white/40"></div>
                </motion.div>

               
                <motion.div
                  className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                  animate={{
                    y: [0, 320, 0]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                />
              </div>

              
              <motion.div
                className="absolute -inset-4 bg-gradient-to-r from-white/5 via-white/10 to-white/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none blur-xl"
                animate={{
                  scale: [1, 1.05, 1]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
          </motion.div> */}
        </div>

        {/* Social icons - bottom fixed position on right side */}
        <motion.div
          className="fixed bottom-8 right-0 z-10 hidden md:flex flex-col gap-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          {[
            { href: "https://github.com/sufailn", icon: Github, label: "GitHub" },
            { href: "https://linkedin.com/in/sufail-ahammed-n", icon: Linkedin, label: "LinkedIn" },
            { href: "mailto:sufailahammed316@gmail.com", icon: Mail, label: "Email" }
          ].map((social, index) => (
            <a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white transition-colors p-2"
            >
              <social.icon className="h-5 w-5" />
            </a>
          ))}
          <div className="h-20 w-px bg-white/20 mx-auto"></div>
        </motion.div>
      </div>
    </section>
  );
} 