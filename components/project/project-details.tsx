"use client"

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ChevronLeft, Home, X, ExternalLink, ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSound } from '@/components/sound-provider';
import { SoundButton } from '@/components/ui/sound-button';
import ProjectNavigation from './project-navigation';
import SiteViewer from './site-viewer';

interface Project {
    title: string;
    description: string;
    image: string;
    tech: string[];
    link: string;
}

interface ProjectDetailsProps {
    project: Project | null;
    onClose: () => void;
    onBack: () => void;
    allProjects: Project[];
    currentIndex: number;
    onNavigate: (index: number | 'all') => void;
}

export default function ProjectDetails({
    project,
    onClose,
    onBack,
    allProjects,
    currentIndex,
    onNavigate
}: ProjectDetailsProps) {
    const { playClickSound } = useSound();
    const [showSiteViewer, setShowSiteViewer] = useState(false);
    const [showScrollTop, setShowScrollTop] = useState(false);

    // Handle scroll event to show/hide the scroll-to-top button
    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const scrollTop = e.currentTarget.scrollTop;
        setShowScrollTop(scrollTop > 300);
    };

    // Scroll to top function
    const scrollToTop = () => {
        const contentEl = document.getElementById('project-content');
        if (contentEl) {
            contentEl.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    };

    if (!project) return null;

    return (
        <AnimatePresence>
            {showSiteViewer ? (
                <SiteViewer
                    url={project.link}
                    title={project.title}
                    onBack={() => setShowSiteViewer(false)}
                    onClose={onClose}
                />
            ) : (
                <motion.div
                    className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-2 sm:p-4 md:p-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <motion.div
                        className="relative bg-white dark:bg-black text-black dark:text-white rounded-2xl shadow-xl max-w-5xl w-full max-h-[95vh] overflow-hidden flex flex-col"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    >
                        {/* Navigation Bar */}
                        <div className="flex items-center justify-between p-3 sm:p-4 border-b border-border/30">
                            <div className="flex items-center space-x-3 sm:space-x-4">
                                <SoundButton
                                    variant="ghost"
                                    size="icon"
                                    className="rounded-md hover:bg-secondary/50"
                                    onClick={() => {
                                        playClickSound();
                                        onBack();
                                    }}
                                    aria-label="Back to projects"
                                >
                                    <ChevronLeft className="h-5 w-5" />
                                </SoundButton>

                                <div className="flex gap-2 items-center">
                                    <div className="h-2 w-2 bg-primary rounded-full"></div>
                                    <h2 className="text-lg font-mono uppercase truncate px-1 sm:px-0 tracking-tight text-black dark:text-white">{project.title}</h2>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <span className="text-xs font-mono opacity-60 hidden sm:inline-block">
                                    {currentIndex + 1} / {allProjects.length}
                                </span>

                                <SoundButton
                                    variant="ghost"
                                    size="icon"
                                    className="rounded-md hover:bg-secondary/50"
                                    onClick={() => {
                                        playClickSound();
                                        onClose();
                                    }}
                                    aria-label="Close"
                                >
                                    <X className="h-5 w-5" />
                                </SoundButton>
                            </div>
                        </div>

                        {/* Project Content - Scrollable */}
                        <div
                            id="project-content"
                            className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6"
                            onScroll={handleScroll}
                        >
                            {/* Visit Site Button - Prominent on mobile, always visible at top */}
                            <motion.div
                                className="mb-6 sm:hidden"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                <SoundButton
                                    className="w-full flex items-center justify-center border border-border bg-white/10 dark:bg-black/20 text-black dark:text-white py-3 rounded-md backdrop-blur-sm hover:bg-primary/10 transition-colors"
                                    onClick={() => {
                                        playClickSound();
                                        setShowSiteViewer(true);
                                    }}
                                    aria-label={`Visit ${project.title} website`}
                                >
                                    VISIT SITE <ExternalLink className="ml-2 h-4 w-4" />
                                </SoundButton>
                            </motion.div>
                            <div className="flex flex-col gap-6">
                                {/* Project details header */}
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                    <div className="flex items-center space-x-4">
                                        <span className="text-xs sm:text-sm font-mono opacity-60">TC: </span>
                                        <div className="flex flex-wrap gap-2">
                                            {project.tech.map((tech, index) => (
                                                <motion.span
                                                    key={index}
                                                    className="px-2 py-0.5 border border-border text-xs text-black dark:text-white"
                                                    whileHover={{ backgroundColor: "rgba(var(--primary), 0.1)" }}
                                                >
                                                    {tech}
                                                </motion.span>
                                            ))}
                                        </div>
                                    </div>

                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.3 }}
                                        className="hidden sm:block"
                                    >
                                        <SoundButton
                                            size="sm"
                                            className="inline-flex items-center border border-black/20 dark:border-white/20 bg-white/20 dark:bg-black/20 text-black dark:text-white hover:bg-white/40 dark:hover:bg-black/40 transition-colors"
                                            onClick={() => {
                                                playClickSound();
                                                setShowSiteViewer(true);
                                            }}
                                            aria-label={`Visit ${project.title} website`}
                                        >
                                            VISIT SITE <ExternalLink className="ml-2 h-4 w-4" />
                                        </SoundButton>
                                    </motion.div>
                                </div>

                                {/* Project Image */}
                                <motion.div
                                    className="relative w-full h-64 sm:h-[500px] overflow-hidden"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        className="object-cover"
                                        sizes="100vw"
                                    />
                                </motion.div>

                                {/* Project Description & Details */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                                    <div className="md:col-span-1">
                                        <div className="space-y-2">
                                            <h4 className="text-sm font-mono opacity-70 uppercase text-black dark:text-white">Description</h4>
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.35 }}
                                            >
                                                <p className="text-sm sm:text-base text-black dark:text-white">{project.description}</p>
                                            </motion.div>
                                        </div>
                                    </div>

                                    <div className="md:col-span-2">
                                        <div className="space-y-2">
                                            <h4 className="text-sm font-mono opacity-70 uppercase text-black dark:text-white">Key Features</h4>
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.4 }}
                                                className="space-y-1"
                                            >
                                                <ul className="list-disc list-inside space-y-1 sm:space-y-2 text-sm sm:text-base text-black dark:text-white">
                                                    <li>Responsive design ensuring perfect display across all device sizes</li>
                                                    <li>Optimized performance with efficient loading strategies</li>
                                                    <li>Intuitive user interface with smooth animations</li>
                                                    <li>Accessible design following WCAG guidelines</li>
                                                </ul>
                                            </motion.div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Scroll to top button */}
                        <AnimatePresence>
                            {showScrollTop && (
                                <motion.div
                                    className="absolute bottom-20 right-4 z-10"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <SoundButton
                                        size="icon"
                                        className="rounded-full shadow-lg bg-primary text-primary-foreground hover:bg-primary/90"
                                        onClick={() => {
                                            playClickSound();
                                            scrollToTop();
                                        }}
                                        aria-label="Scroll to top"
                                    >
                                        <ArrowUp className="h-5 w-5" />
                                    </SoundButton>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Project Navigation - More responsive */}
                        <div className="border-t border-border/30">
                            <ProjectNavigation
                                projects={allProjects}
                                currentIndex={currentIndex}
                                onNavigate={onNavigate}
                            />
                        </div>

                        {/* Footer Actions */}
                        <div className="border-t border-border/30 p-3 sm:p-4 flex flex-col sm:flex-row gap-2 sm:gap-0 sm:justify-between sm:items-center">
                            <SoundButton
                                variant="outline"
                                size="sm"
                                className="w-full sm:w-auto"
                                onClick={() => {
                                    playClickSound();
                                    onBack();
                                }}
                            >
                                <ChevronLeft className="mr-2 h-4 w-4" /> Back to Projects
                            </SoundButton>

                            <SoundButton
                                variant="default"
                                size="sm"
                                className="w-full sm:w-auto"
                                onClick={() => {
                                    playClickSound();
                                    onClose();
                                }}
                            >
                                Return Home
                            </SoundButton>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}