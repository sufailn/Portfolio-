"use client"

import { useState } from 'react';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useSound } from '@/components/sound-provider';
import { SoundButton } from '@/components/ui/sound-button';
import ProjectDetails from './project-details';

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

// Enhanced animation variants for better visual appeal
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.1
        }
    }
};

const projectVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 30
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 300,
            damping: 15,
            duration: 0.5
        }
    },
    hover: {
        y: -5,
        scale: 1.02,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        transition: {
            type: "spring",
            stiffness: 400,
            damping: 10
        }
    }
};

const imageVariants: Variants = {
    hover: {
        scale: 1.1,
        transition: {
            duration: 0.8,
            ease: [0.25, 0.1, 0.25, 1.0]
        }
    }
};

export default function Projects({ projects }: ProjectsProps) {
    const { playClickSound } = useSound();
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    const handleProjectClick = (project: Project) => {
        playClickSound();
        const index = projects.findIndex(p => p.title === project.title);
        setCurrentIndex(index >= 0 ? index : 0);
        setSelectedProject(project);
    };

    const handleCloseProject = () => {
        setSelectedProject(null);
    };

    const handleNavigate = (indexOrAction: number | 'all') => {
        if (indexOrAction === 'all') {
            setSelectedProject(null);
            return;
        }

        setCurrentIndex(indexOrAction);
        setSelectedProject(projects[indexOrAction]);
    };

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

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            className="group relative overflow-hidden rounded-xl bg-card/30 h-[350px] sm:h-[400px] border border-white/10 shadow-md hover:border-primary/20 transition-all duration-300"
                            variants={projectVariants}
                            whileHover="hover"
                            onHoverStart={() => playClickSound()}
                            onClick={() => handleProjectClick(project)}
                        >
                            <div className="h-full relative overflow-hidden rounded-xl">
                                <motion.div variants={imageVariants} className="h-full w-full">
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        priority={index < 3}
                                        className="object-cover"
                                        loading={index < 3 ? "eager" : "lazy"}
                                    />
                                </motion.div>
                                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80 backdrop-blur-[1px] group-hover:backdrop-blur-[3px] transition-all duration-300">
                                    <div className="p-5 sm:p-8 h-full flex flex-col justify-between text-white">
                                        <div className="space-y-3">
                                            <motion.h3
                                                className="text-xl sm:text-2xl font-bold text-white"
                                                initial={{ opacity: 0.9 }}
                                                whileHover={{ opacity: 1, x: 3 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                {project.title}
                                            </motion.h3>
                                            <motion.p
                                                className="text-sm sm:text-base text-white/90 line-clamp-3"
                                                initial={{ opacity: 0.8 }}
                                                whileHover={{ opacity: 1 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                {project.description}
                                            </motion.p>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                                {project.tech.slice(0, 5).map((tech, techIndex) => (
                                                    <motion.span
                                                        key={techIndex}
                                                        className="px-2 py-1 text-xs rounded-full bg-white/10 text-white/90 border border-white/10 hover:bg-white/20 cursor-pointer"
                                                        whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.2)" }}
                                                        whileTap={{ scale: 0.95 }}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            playClickSound();
                                                        }}
                                                    >
                                                        {tech}
                                                    </motion.span>
                                                ))}
                                            </div>
                                            <SoundButton
                                                className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium transform transition-all duration-300 group-hover:scale-105"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleProjectClick(project);
                                                }}
                                            >
                                                View Project
                                            </SoundButton>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Project details modal */}
            <AnimatePresence>
                {selectedProject && (
                    <ProjectDetails
                        project={selectedProject}
                        onClose={handleCloseProject}
                        onBack={handleCloseProject}
                        allProjects={projects}
                        currentIndex={currentIndex}
                        onNavigate={handleNavigate}
                    />
                )}
            </AnimatePresence>
        </section>
    );
}