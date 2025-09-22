"use client"

import { motion, AnimatePresence } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useSound } from '@/components/sound-provider';
import Image from 'next/image';

export default function AppLoader() {
    const { isLoading } = useSound();
    const [shouldRender, setShouldRender] = useState(true);
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [currentText, setCurrentText] = useState('');
    const [textIndex, setTextIndex] = useState(0);

    const loadingTexts = [
        "Preparing portfolio",
        "Loading projects",
        "Initializing experience",
        "Almost ready",
        "Setting up workspace"
    ];

    // Simulate loading progress
    useEffect(() => {
        const interval = setInterval(() => {
            setLoadingProgress(prev => {
                const newProgress = prev + Math.random() * 5;
                return newProgress > 100 ? 100 : newProgress;
            });
        }, 100);

        return () => clearInterval(interval);
    }, []);

    // Text typing effect
    useEffect(() => {
        const textInterval = setInterval(() => {
            setTextIndex(prev => (prev + 1) % loadingTexts.length);
        }, 2000);

        return () => clearInterval(textInterval);
    }, []);

    useEffect(() => {
        let i = 0;
        const typing = setInterval(() => {
            if (i <= loadingTexts[textIndex].length) {
                setCurrentText(loadingTexts[textIndex].substring(0, i));
                i++;
            } else {
                clearInterval(typing);
            }
        }, 50);

        return () => clearInterval(typing);
    }, [textIndex]);

    // Wait for a minimum loading time to show the loader
    useEffect(() => {
        const minLoadingTime = setTimeout(() => {
            if (!isLoading && loadingProgress >= 100) {
                setShouldRender(false);
            }
        }, 3000);

        return () => clearTimeout(minLoadingTime);
    }, [isLoading, loadingProgress]);

    return (
        <AnimatePresence>
            {shouldRender && (
                <motion.div
                    className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1.0] }}
                >
                    <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
                    <motion.div className="flex flex-col items-center justify-center max-w-md px-4">
                        <motion.h1
                            className="text-xl md:text-2xl font-mono text-white/80 mb-16"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1.0] }}
                        >
                            <span className="text-primary">SUFAIL</span>.DEV
                        </motion.h1>

                        <motion.div
                            className="relative w-full h-[1px] bg-white/10 mb-8"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 2, ease: [0.25, 0.1, 0.25, 1.0] }}
                        >
                            <motion.div
                                className="absolute top-0 left-0 h-full bg-primary"
                                style={{ width: `${loadingProgress}%` }}
                            />
                        </motion.div>

                        <motion.div
                            className="flex justify-between w-full text-sm text-white/60 mb-12 font-mono"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            <span className="h-6">{currentText}<span className="animate-pulse">_</span></span>
                            <span className="text-xs">{Math.round(loadingProgress)}%</span>
                        </motion.div>

                        <motion.div
                            className="mt-12 flex flex-wrap justify-center gap-2 text-white/80"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            <div className="text-center">
                                <div className="text-3xl font-bold">5+</div>
                                <div className="text-sm mt-1">Years Experience</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold">30+</div>
                                <div className="text-sm mt-1">Projects</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold">15+</div>
                                <div className="text-sm mt-1">Technologies</div>
                            </div>
                        </motion.div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}