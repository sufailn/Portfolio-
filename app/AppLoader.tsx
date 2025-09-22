"use client"

import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useSound } from '@/components/sound-provider';
import Image from 'next/image';

export default function AppLoader() {
    const { isLoading } = useSound();
    const [shouldRender, setShouldRender] = useState(true);
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [currentText, setCurrentText] = useState('');
    const [textIndex, setTextIndex] = useState(0);
    const [displayProgress, setDisplayProgress] = useState(0);
    const [isComplete, setIsComplete] = useState(false);

    // Motion values for smooth animations
    const count = useMotionValue(0);
    const rounded = useTransform(count, (latest) => Math.round(latest));

    // Counter motion values for stats
    const experienceCount = useMotionValue(0);
    const projectsCount = useMotionValue(0);
    const technologiesCount = useMotionValue(0);

    // Transform values for display
    const experienceDisplay = useTransform(experienceCount, (latest) => Math.round(latest));
    const projectsDisplay = useTransform(projectsCount, (latest) => Math.round(latest));
    const technologiesDisplay = useTransform(technologiesCount, (latest) => Math.round(latest));

    const loadingTexts = [
        "Initializing systems",
        "Loading components",
        "Preparing workspace",
        "Optimizing performance",
        "Finalizing setup",
        "Ready to launch"
    ];

    // Enhanced loading progress simulation
    useEffect(() => {
        let progressTimer: NodeJS.Timeout;
        let currentProgress = 0;

        const updateProgress = () => {
            const increment = Math.random() * 3 + 1; // 1-4% increments
            currentProgress = Math.min(currentProgress + increment, 100);
            setLoadingProgress(currentProgress);

            // Animate the counter
            animate(count, currentProgress, {
                duration: 0.5,
                ease: "easeOut"
            });

            if (currentProgress < 100) {
                const delay = Math.random() * 200 + 100; // 100-300ms delay
                progressTimer = setTimeout(updateProgress, delay);
            } else {
                setIsComplete(true);
            }
        };

        updateProgress();
        return () => clearTimeout(progressTimer);
    }, [count]);

    // Enhanced text cycling with better timing
    useEffect(() => {
        if (loadingProgress >= 100) return;

        const textInterval = setInterval(() => {
            setTextIndex(prev => (prev + 1) % loadingTexts.length);
        }, 1800);

        return () => clearInterval(textInterval);
    }, [loadingProgress]);

    // Improved typing effect
    useEffect(() => {
        let i = 0;
        setCurrentText('');

        const typing = setInterval(() => {
            if (i <= loadingTexts[textIndex].length) {
                setCurrentText(loadingTexts[textIndex].substring(0, i));
                i++;
            } else {
                clearInterval(typing);
            }
        }, 30); // Faster typing

        return () => clearInterval(typing);
    }, [textIndex, loadingTexts]);

    // Update display progress for smooth visual feedback
    useEffect(() => {
        const updateDisplay = () => {
            setDisplayProgress(prev => {
                const diff = loadingProgress - prev;
                return prev + diff * 0.1; // Smooth catch-up
            });
        };

        const displayTimer = setInterval(updateDisplay, 16); // 60fps
        return () => clearInterval(displayTimer);
    }, [loadingProgress]);

    // Enhanced exit timing
    useEffect(() => {
        if (isComplete && !isLoading) {
            // Start counter animations when loading is complete
            animate(experienceCount, 5, { duration: 2, ease: "easeOut" });
            animate(projectsCount, 30, { duration: 2.5, ease: "easeOut", delay: 0.2 });
            animate(technologiesCount, 15, { duration: 2.8, ease: "easeOut", delay: 0.4 });

            const exitTimer = setTimeout(() => {
                setShouldRender(false);
            }, 1200); // Longer display of 100% before exit

            return () => clearTimeout(exitTimer);
        }
    }, [isComplete, isLoading, experienceCount, projectsCount, technologiesCount]);

    return (
        <AnimatePresence>
            {shouldRender && (
                <motion.div
                    className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50 overflow-hidden"
                    initial={{ opacity: 1 }}
                    exit={{
                        opacity: 0,
                        scale: 1.1,
                        filter: "blur(10px)"
                    }}
                    transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1.0] }}
                >
                    {/* Animated background grid */}
                    <div className="absolute inset-0 bg-grid-pattern opacity-5">
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-white/5"
                            animate={{
                                x: ["-100%", "100%"]
                            }}
                            transition={{
                                duration: 8,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                        />
                    </div>

                    {/* Floating particles */}
                    {[...Array(12)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-white/20 rounded-full"
                            initial={{
                                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
                                y: (typeof window !== 'undefined' ? window.innerHeight : 800) + 10,
                            }}
                            animate={{
                                y: -10,
                                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
                            }}
                            transition={{
                                duration: Math.random() * 10 + 10,
                                repeat: Infinity,
                                ease: "linear",
                                delay: Math.random() * 5,
                            }}
                        />
                    ))}

                    <motion.div className="relative z-10 flex flex-col items-center justify-center max-w-lg px-4">
                        {/* Enhanced logo */}
                        <motion.div
                            className="mb-20"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                                duration: 1.2,
                                ease: [0.25, 0.1, 0.25, 1.0],
                                delay: 0.2
                            }}
                        >
                            <motion.h1
                                className="text-3xl md:text-4xl font-mono text-white text-center"
                                whileHover={{ scale: 1.05 }}
                            >
                                <motion.span
                                    className="text-white drop-shadow-lg"
                                    animate={{
                                        textShadow: [
                                            "0 0 10px rgba(255, 255, 255, 0.3)",
                                            "0 0 20px rgba(255, 255, 255, 0.5)",
                                            "0 0 10px rgba(255, 255, 255, 0.3)"
                                        ]
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                >
                                    SUFAIL
                                </motion.span>
                                <span className="text-white/70">.DEV</span>
                            </motion.h1>
                            <motion.div
                                className="w-full h-[2px] bg-gradient-to-r from-transparent via-white to-transparent mt-4"
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ duration: 1.5, delay: 0.8 }}
                            />
                        </motion.div>

                        {/* Enhanced progress section */}
                        <motion.div
                            className="w-full space-y-8"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                        >
                            {/* Circular progress indicator */}
                            <div className="flex items-center justify-center mb-8">
                                <motion.div
                                    className="relative w-32 h-32"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ duration: 0.8, delay: 0.8 }}
                                >
                                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                                        {/* Background circle */}
                                        <circle
                                            cx="60"
                                            cy="60"
                                            r="50"
                                            fill="none"
                                            stroke="rgba(255,255,255,0.1)"
                                            strokeWidth="3"
                                        />
                                        {/* Progress circle */}
                                        <motion.circle
                                            cx="60"
                                            cy="60"
                                            r="50"
                                            fill="none"
                                            stroke="url(#progressGradient)"
                                            strokeWidth="3"
                                            strokeLinecap="round"
                                            strokeDasharray={314}
                                            initial={{ strokeDashoffset: 314 }}
                                            animate={{
                                                strokeDashoffset: 314 - (314 * displayProgress) / 100
                                            }}
                                            transition={{ duration: 0.5, ease: "easeOut" }}
                                        />
                                        <defs>
                                            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                                <stop offset="0%" stopColor="rgb(255, 255, 255)" />
                                                <stop offset="50%" stopColor="rgb(200, 200, 200)" />
                                                <stop offset="100%" stopColor="rgb(255, 255, 255)" />
                                            </linearGradient>
                                        </defs>
                                    </svg>

                                    {/* Animated counter in center */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <motion.div className="text-center">
                                            <motion.span
                                                className="text-2xl font-mono font-bold text-white"
                                                key={Math.floor(displayProgress)}
                                            >
                                                {Math.round(displayProgress)}
                                            </motion.span>
                                            <div className="text-xs text-white/60 font-mono">PERCENT</div>
                                        </motion.div>
                                    </div>
                                </motion.div>
                            </div>

                            {/* Linear progress bar */}
                            <motion.div
                                className="relative w-full h-1 bg-white/10 rounded-full overflow-hidden"
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ duration: 1, delay: 1 }}
                            >
                                <motion.div
                                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-white via-gray-300 to-white rounded-full"
                                    initial={{ width: "0%" }}
                                    animate={{ width: `${displayProgress}%` }}
                                    transition={{ duration: 0.5, ease: "easeOut" }}
                                />
                                <motion.div
                                    className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-transparent via-white/30 to-transparent"
                                    animate={{ x: ["-100%", "100%"] }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "linear"
                                    }}
                                />
                            </motion.div>

                            {/* Status text with better animation */}
                            <motion.div
                                className="flex justify-between items-center text-white/80 font-mono"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 1.2 }}
                            >
                                <div className="flex items-center space-x-2">
                                    <motion.div
                                        className="w-2 h-2 bg-white rounded-full"
                                        animate={{
                                            scale: [1, 1.2, 1],
                                            opacity: [1, 0.7, 1]
                                        }}
                                        transition={{
                                            duration: 1.5,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }}
                                    />
                                    <motion.span
                                        className="text-sm"
                                        key={currentText}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                    >
                                        {currentText}
                                        <motion.span
                                            className="opacity-60"
                                            animate={{ opacity: [0, 1, 0] }}
                                            transition={{
                                                duration: 1,
                                                repeat: Infinity,
                                                ease: "easeInOut"
                                            }}
                                        >
                                            _
                                        </motion.span>
                                    </motion.span>
                                </div>

                                <motion.span
                                    className="text-xs px-3 py-1 border border-white/20 rounded-full bg-white/5"
                                    animate={isComplete ? {
                                        backgroundColor: "rgba(255, 255, 255, 0.2)",
                                        borderColor: "rgba(255, 255, 255, 0.5)"
                                    } : {}}
                                >
                                    {isComplete ? "COMPLETE" : `${Math.round(displayProgress)}%`}
                                </motion.span>
                            </motion.div>
                        </motion.div>

                        {/* Enhanced stats section */}
                        <motion.div
                            className="mt-16 grid grid-cols-3 gap-8 text-white"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 1.4 }}
                        >
                            {[
                                { motionValue: experienceDisplay, label: "Years Experience", delay: 0.1 },
                                { motionValue: projectsDisplay, label: "Projects", delay: 0.2 },
                                { motionValue: technologiesDisplay, label: "Technologies", delay: 0.4 }
                            ].map((stat, index) => (
                                <motion.div
                                    key={index}
                                    className="text-center"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{
                                        duration: 0.6,
                                        delay: 1.6 + stat.delay,
                                        type: "spring",
                                        stiffness: 100
                                    }}
                                    whileHover={{ scale: 1.1 }}
                                >
                                    <motion.div
                                        className="text-2xl md:text-3xl font-bold text-white mb-1"
                                        animate={{
                                            textShadow: [
                                                "0 0 5px rgba(255, 255, 255, 0.3)",
                                                "0 0 10px rgba(255, 255, 255, 0.6)",
                                                "0 0 5px rgba(255, 255, 255, 0.3)"
                                            ]
                                        }}
                                        transition={{
                                            duration: 3,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                            delay: stat.delay
                                        }}
                                    >
                                        <motion.span>{stat.motionValue}</motion.span>
                                        <span>+</span>
                                    </motion.div>
                                    <div className="text-xs font-mono uppercase tracking-wider opacity-60">
                                        {stat.label}
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}