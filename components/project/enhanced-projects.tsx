"use client"

import { motion, Variants } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

interface Project {
    title: string;
    description: string;
    image: string;
    tech: string[];
    link: string;
}

interface ProjectsProps {
    projects: Project[];
}

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.3,
            delayChildren: 0.2
        }
    }
};

const projectVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 50,
        scale: 0.95
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.5,
            ease: "easeOut"
        }
    }
};

export default function Projects({ projects }: ProjectsProps) {
    return (
        <section id="projects" className="py-24 px-4 bg-gradient-to-b from-background to-secondary/10">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, type: "spring", stiffness: 100, damping: 20 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                        Featured Projects
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        A showcase of my recent work and technical capabilities
                    </p>
                </motion.div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            variants={projectVariants}
                            className="group relative overflow-hidden rounded-2xl bg-card/30 h-[400px] md:h-[450px] border border-white/10 shadow-lg hover:border-primary/20 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5"
                        >
                            <div className="h-full relative overflow-hidden rounded-2xl">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                                />
                                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/90 backdrop-blur-[2px] opacity-90 group-hover:opacity-100 transition-opacity duration-500">
                                    <div className="p-8 md:p-10 h-full flex flex-col justify-between text-white">
                                        <div className="space-y-4">
                                            <h3 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80 transform group-hover:-translate-y-1 transition-transform duration-300">
                                                {project.title}
                                            </h3>
                                            <p className="text-base md:text-lg text-white/90 line-clamp-3 md:line-clamp-4 transform group-hover:translate-y-0 transition-transform duration-300">
                                                {project.description}
                                            </p>
                                        </div>

                                        <div className="space-y-6">
                                            <div className="flex flex-wrap gap-2">
                                                {project.tech.map((tech, techIndex) => (
                                                    <span
                                                        key={techIndex}
                                                        className="px-3 py-1.5 text-xs font-medium rounded-full bg-white/10 text-white/90 backdrop-blur-sm border border-white/10 hover:bg-white/20 hover:border-white/30 transform hover:scale-105 transition-all duration-300"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                            <Link
                                                href={project.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 hover:scale-105 transform transition-all duration-300 shadow-lg shadow-primary/20"
                                            >
                                                View Project
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}