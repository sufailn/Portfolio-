"use client"

import { useState } from 'react';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useSound } from '@/components/sound-provider';
import { SoundButton } from '@/components/ui/sound-button';
import ProjectDetails from './project-details';
import { Grid3X3, List, ExternalLink, ArrowRight } from 'lucide-react';

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
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

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
        <section id="projects" className="py-16 sm:py-24 px-4 bg-background border-t border-b border-border">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    className="mb-10 sm:mb-16 flex flex-col sm:flex-row items-start sm:items-center justify-between"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true, margin: "-50px" }}
                >
                    <div className="text-left">
                        <h2 className="text-2xl font-mono uppercase tracking-tight mb-3">
                            RELEVANT PROJECTS
                        </h2>
                        <p className="text-sm text-muted-foreground">
                            A collection of my most recent work
                        </p>
                    </div>

                    <div className="flex items-center gap-2 mt-4 sm:mt-0">
                        <div className="flex rounded-full border border-border p-1">
                            <SoundButton
                                onClick={() => setViewMode('grid')}
                                variant={viewMode === 'grid' ? "default" : "ghost"}
                                size="sm"
                                className={`rounded-full ${viewMode === 'grid' ? 'bg-foreground text-background' : ''}`}
                                aria-label="Grid view"
                            >
                                <Grid3X3 className="h-4 w-4" />
                            </SoundButton>
                            <SoundButton
                                onClick={() => setViewMode('list')}
                                variant={viewMode === 'list' ? "default" : "ghost"}
                                size="sm"
                                className={`rounded-full ${viewMode === 'list' ? 'bg-foreground text-background' : ''}`}
                                aria-label="List view"
                            >
                                <List className="h-4 w-4" />
                            </SoundButton>
                        </div>
                        <span className="text-xs font-mono uppercase tracking-wider">LIST VIEW</span>
                    </div>
                </motion.div>                {viewMode === 'grid' ? (
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
                                className="group relative overflow-hidden rounded-xl bg-card/30 h-[350px] sm:h-[400px] border border-border shadow-md hover:border-primary/20 transition-all duration-300"
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
                                                    className="text-xl sm:text-2xl font-mono uppercase tracking-tight text-white"
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
                                                    {project.tech.slice(0, 3).map((tech, techIndex) => (
                                                        <motion.span
                                                            key={techIndex}
                                                            className="px-2 py-1 text-xs bg-white/10 text-white/90 border border-white/10 hover:bg-white/20 cursor-pointer"
                                                            whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.2)" }}
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
                                                    className="inline-flex  items-center justify-center px-4 py-2 border border-white/20 bg-white/10 hover:bg-white/20 text-black text-sm font-medium transform transition-all duration-300 group-hover:scale-105"
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
                ) : (
                    <motion.div
                        className="flex flex-col gap-4"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                    >
                        {projects.map((project, index) => (
                            <motion.div
                                key={index}
                                className="group border-b border-border pb-6 last:border-0"
                                variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                                }}
                                onClick={() => handleProjectClick(project)}
                            >
                                <div className="grid grid-cols-12 gap-4 items-center">
                                    <div className="col-span-1 opacity-60 font-mono text-sm">
                                        <span>{index < 9 ? `0${index + 1}` : index + 1}</span>
                                        <span className="mx-2">/</span>
                                        <span>{projects.length < 10 ? `0${projects.length}` : projects.length}</span>
                                    </div>

                                    <div className="col-span-2 hidden md:block">
                                        <span className="uppercase text-sm opacity-60 font-medium">{new Date().getFullYear()}</span>
                                    </div>

                                    <div className="col-span-11 md:col-span-4 font-mono uppercase tracking-tight text-lg md:text-xl cursor-pointer group-hover:text-primary transition-colors">
                                        {project.title}
                                    </div>

                                    <div className="col-span-11 md:col-span-5 text-sm opacity-80 flex flex-wrap items-center gap-x-4 gap-y-2">
                                        {project.tech.map((tech, techIndex) => (
                                            <span key={techIndex} className="inline-block">
                                                {tech}
                                                {techIndex < project.tech.length - 1 && <span className="mx-2 opacity-40">/</span>}
                                            </span>
                                        ))}

                                        <SoundButton
                                            variant="link"
                                            size="sm"
                                            className="text-sm ml-auto hover:text-primary transition-colors p-0 h-auto"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                window.open(project.link, '_blank');
                                            }}
                                        >
                                            <ExternalLink className="h-4 w-4 mr-1" /> Visit
                                        </SoundButton>

                                        <SoundButton
                                            variant="link"
                                            size="sm"
                                            className="text-sm hover:text-primary transition-colors p-0 h-auto"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleProjectClick(project);
                                            }}
                                        >
                                            View <ArrowRight className="h-4 w-4 ml-1" />
                                        </SoundButton>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
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