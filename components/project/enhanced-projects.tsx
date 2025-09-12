"use client"

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

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

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
};

const projectVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0
    }
};

export default function Projects({ projects }: ProjectsProps) {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <section id="projects" className="py-24 px-4 bg-gradient-to-b from-background to-secondary/10">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                        Featured Projects
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        A showcase of my recent work and technical capabilities
                    </p>
                </motion.div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            variants={projectVariants}
                            className="group relative overflow-hidden rounded-xl bg-card"
                            onHoverStart={() => setHoveredIndex(index)}
                            onHoverEnd={() => setHoveredIndex(null)}
                        >
                            <div className="aspect-video relative overflow-hidden">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className={`absolute inset-0 bg-black/60 transition-opacity duration-300 ${hoveredIndex === index ? 'opacity-100' : 'opacity-0'
                                    }`}>
                                    <div className="p-6 h-full flex flex-col justify-center items-center text-white">
                                        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                                        <p className="text-sm text-center mb-4 line-clamp-3">
                                            {project.description}
                                        </p>
                                        <div className="flex flex-wrap justify-center gap-2 mb-4">
                                            {project.tech.map((tech, techIndex) => (
                                                <span
                                                    key={techIndex}
                                                    className="px-2 py-1 text-xs rounded-full bg-primary/20 text-primary-foreground"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                        <Link
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
                                        >
                                            View Project
                                        </Link>
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