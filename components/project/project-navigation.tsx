import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ChevronRight, ChevronLeft } from 'lucide-react';
import { SoundButton } from '../ui/sound-button';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.1
        }
    }
};

const projectVariants = {
    hidden: {
        opacity: 0,
        y: 30
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring" as const,
            stiffness: 300,
            damping: 15,
            duration: 0.5
        }
    },
};

interface ProjectNavigationProps {
    projects: Array<{
        title: string;
        description: string;
        image: string;
        tech: string[];
        link: string;
    }>;
    currentIndex: number;
    onNavigate: (index: number | 'all') => void;
}

export default function ProjectNavigation({ projects, currentIndex, onNavigate }: ProjectNavigationProps) {
    const nextIndex = (currentIndex + 1) % projects.length;
    const prevIndex = (currentIndex - 1 + projects.length) % projects.length;

    return (
        <div className="py-4 md:py-6 px-3 md:px-4 bg-gradient-to-b from-black/20 to-transparent">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    className="flex items-center justify-between mb-3 sm:mb-4"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <h3 className="text-base sm:text-xl font-bold">Related Projects</h3>
                    <SoundButton
                        variant="ghost"
                        size="sm"
                        className="text-primary hover:text-primary/90 text-xs sm:text-sm"
                        onClick={() => onNavigate('all')}
                        aria-label="View all projects"
                    >
                        <ArrowLeft className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
                        All projects
                    </SoundButton>
                </motion.div>

                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div
                        className="relative group cursor-pointer rounded-lg overflow-hidden bg-card/10 p-2 sm:p-3 border border-primary/10 hover:border-primary/30 transition-colors"
                        variants={projectVariants}
                        whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                        onClick={() => onNavigate(prevIndex)}
                        aria-label={`View previous project: ${projects[prevIndex].title}`}
                    >
                        <div className="flex items-center">
                            <div className="mr-2 sm:mr-3 bg-primary/20 p-1 sm:p-2 rounded-full">
                                <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground">Previous</p>
                                <h4 className="text-foreground text-xs sm:text-sm font-medium truncate max-w-[140px] sm:max-w-none">{projects[prevIndex].title}</h4>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        className="relative group cursor-pointer rounded-lg overflow-hidden bg-card/10 p-2 sm:p-3 border border-primary/10 hover:border-primary/30 transition-colors"
                        variants={projectVariants}
                        whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                        onClick={() => onNavigate(nextIndex)}
                        aria-label={`View next project: ${projects[nextIndex].title}`}
                    >
                        <div className="flex items-center justify-end">
                            <div>
                                <p className="text-xs text-muted-foreground text-right">Next</p>
                                <h4 className="text-foreground text-xs sm:text-sm font-medium truncate max-w-[140px] sm:max-w-none text-right">{projects[nextIndex].title}</h4>
                            </div>
                            <div className="ml-2 sm:ml-3 bg-primary/20 p-1 sm:p-2 rounded-full">
                                <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}