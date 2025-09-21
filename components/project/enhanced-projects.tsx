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

// Simpler animation variants for better performance on mobile
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.1
        }
    }
};

const projectVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 20
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.4
        }
    }
};

export default function Projects({ projects }: ProjectsProps) {
    return (
        <section id="projects" className="py-16 sm:py-24 px-4 bg-gradient-to-b from-background to-secondary/10">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    className="text-center mb-10 sm:mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true, margin: "-50px" }}
                >
                    <h2 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                        Featured Projects
                    </h2>
                    <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
                        A showcase of my recent work and technical capabilities
                    </p>
                </motion.div>

                <div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
                >
                    {projects.map((project, index) => (
                        <div
                            key={index}
                            className="group relative overflow-hidden rounded-xl bg-card/30 h-[350px] sm:h-[400px] border border-white/10 shadow-md hover:border-primary/20 transition-all duration-300"
                        >
                            <div className="h-full relative overflow-hidden rounded-xl">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    priority={index < 3}
                                    className="object-cover transition-transform duration-500 ease-out"
                                    loading={index < 3 ? "eager" : "lazy"}
                                />
                                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80 backdrop-blur-[1px]">
                                    <div className="p-5 sm:p-8 h-full flex flex-col justify-between text-white">
                                        <div className="space-y-3">
                                            <h3 className="text-xl sm:text-2xl font-bold text-white">
                                                {project.title}
                                            </h3>
                                            <p className="text-sm sm:text-base text-white/90 line-clamp-3">
                                                {project.description}
                                            </p>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                                {project.tech.slice(0, 5).map((tech, techIndex) => (
                                                    <span
                                                        key={techIndex}
                                                        className="px-2 py-1 text-xs rounded-full bg-white/10 text-white/90 border border-white/10"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                            <Link
                                                href={project.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium"
                                            >
                                                View Project
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}