"use client"

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ChevronLeft, Home, X, ExternalLink } from 'lucide-react';
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
                        className="relative bg-card/95 rounded-2xl shadow-xl max-w-5xl w-full max-h-[95vh] overflow-hidden flex flex-col"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    >
                        {/* Navigation Bar */}
                        <div className="flex items-center justify-between p-2 sm:p-4 border-b border-border/30">
                            <div className="flex items-center space-x-2 sm:space-x-4">
                                <SoundButton
                                    variant="ghost"
                                    size="icon"
                                    className="rounded-full hover:bg-primary/10"
                                    onClick={() => {
                                        playClickSound();
                                        onBack();
                                    }}
                                >
                                    <ChevronLeft className="h-5 w-5" />
                                </SoundButton>

                                <SoundButton
                                    variant="ghost"
                                    size="icon"
                                    className="rounded-full hover:bg-primary/10"
                                    onClick={() => {
                                        playClickSound();
                                        onClose();
                                    }}
                                >
                                    <Home className="h-5 w-5" />
                                </SoundButton>
                            </div>

                            <h2 className="text-sm sm:text-lg font-medium flex-1 text-center truncate px-1 sm:px-2">{project.title}</h2>

                            <SoundButton
                                variant="ghost"
                                size="icon"
                                className="rounded-full hover:bg-primary/10"
                                onClick={() => {
                                    playClickSound();
                                    onClose();
                                }}
                            >
                                <X className="h-5 w-5" />
                            </SoundButton>
                        </div>

                        {/* Project Content - Scrollable */}
                        <div className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                                {/* Project Image */}
                                <motion.div
                                    className="relative h-48 sm:h-64 md:h-[400px] rounded-xl overflow-hidden shadow-lg"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                    />
                                </motion.div>

                                {/* Project Details */}
                                <div className="space-y-4 sm:space-y-6">
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 }}
                                    >
                                        <h3 className="text-xl sm:text-2xl font-bold mb-2">{project.title}</h3>
                                        <p className="text-muted-foreground text-sm sm:text-base">{project.description}</p>
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4 }}
                                        className="space-y-4"
                                    >
                                        <h4 className="text-base sm:text-lg font-medium">Technologies Used</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {project.tech.map((tech, index) => (
                                                <motion.span
                                                    key={index}
                                                    className="px-2 py-1 sm:px-3 sm:py-1 bg-primary/10 text-primary rounded-full text-xs sm:text-sm"
                                                    whileHover={{ scale: 1.05, backgroundColor: "rgba(var(--primary), 0.2)" }}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    {tech}
                                                </motion.span>
                                            ))}
                                        </div>
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5 }}
                                    >
                                        <h4 className="text-base sm:text-lg font-medium mb-2 sm:mb-4">Project Details</h4>
                                        <p className="text-muted-foreground text-sm sm:text-base mb-4 sm:mb-6">
                                            This project showcases my expertise in {project.tech.join(", ")}.
                                            The implementation focuses on delivering a seamless user experience
                                            while ensuring performance and scalability.
                                        </p>

                                        <SoundButton
                                            className="inline-flex items-center"
                                            onClick={() => {
                                                playClickSound();
                                                setShowSiteViewer(true);
                                            }}
                                        >
                                            Visit Live Site <ExternalLink className="ml-2 h-4 w-4" />
                                        </SoundButton>
                                    </motion.div>
                                </div>
                            </div>

                            {/* Additional Project Information */}
                            <motion.div
                                className="mt-6 sm:mt-10 p-4 sm:p-6 bg-primary/5 rounded-xl border border-primary/10"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                            >
                                <h4 className="text-base sm:text-lg font-medium mb-3">Key Features</h4>
                                <ul className="list-disc list-inside space-y-1 sm:space-y-2 text-muted-foreground text-sm sm:text-base">
                                    <li>Responsive design ensuring perfect display across all device sizes</li>
                                    <li>Optimized performance with efficient loading strategies</li>
                                    <li>Intuitive user interface with smooth animations and transitions</li>
                                    <li>Accessible design following WCAG guidelines</li>
                                    <li>Modern architecture using the latest best practices</li>
                                </ul>
                            </motion.div>
                        </div>

                        {/* Project Navigation */}
                        <ProjectNavigation
                            projects={allProjects}
                            currentIndex={currentIndex}
                            onNavigate={onNavigate}
                        />

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