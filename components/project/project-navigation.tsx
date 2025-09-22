import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ChevronRight } from 'lucide-react';
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

export default function ProjectNavigation({ projects, currentIndex, onNavigate }: any) {
    const nextIndex = (currentIndex + 1) % projects.length;
    const prevIndex = (currentIndex - 1 + projects.length) % projects.length;

    return (
        <div className="py-6 md:py-10 px-4 md:px-6 bg-gradient-to-b from-black/50 to-transparent">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    className="flex items-center justify-between mb-6"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <h3 className="text-xl md:text-2xl font-bold text-white">More Projects</h3>
                    <SoundButton
                        variant="ghost"
                        className="text-white hover:text-primary"
                        onClick={() => onNavigate('all')}
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to all projects
                    </SoundButton>
                </motion.div>

                <motion.div
                    className="grid grid-cols-2 gap-4 md:gap-6"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div
                        className="relative group cursor-pointer rounded-lg overflow-hidden bg-card/10 p-4 border border-white/10"
                        variants={projectVariants}
                        whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                        onClick={() => onNavigate(prevIndex)}
                    >
                        <div className="flex items-center">
                            <div className="mr-4 bg-primary/20 p-2 rounded-full">
                                <ArrowLeft className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                                <p className="text-xs text-white/60">Previous Project</p>
                                <h4 className="text-white font-medium truncate">{projects[prevIndex].title}</h4>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        className="relative group cursor-pointer rounded-lg overflow-hidden bg-card/10 p-4 border border-white/10"
                        variants={projectVariants}
                        whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                        onClick={() => onNavigate(nextIndex)}
                    >
                        <div className="flex items-center justify-end">
                            <div>
                                <p className="text-xs text-white/60 text-right">Next Project</p>
                                <h4 className="text-white font-medium truncate">{projects[nextIndex].title}</h4>
                            </div>
                            <div className="ml-4 bg-primary/20 p-2 rounded-full">
                                <ChevronRight className="h-4 w-4 text-primary" />
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}