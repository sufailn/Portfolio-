"use client"

import { motion, AnimatePresence } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useSound } from '@/components/sound-provider';
import Image from 'next/image';

export default function AppLoader() {
    const { isLoading } = useSound();
    const [shouldRender, setShouldRender] = useState(true);
    const [loadingProgress, setLoadingProgress] = useState(0);

    // Simulate loading progress
    useEffect(() => {
        const interval = setInterval(() => {
            setLoadingProgress(prev => {
                const newProgress = prev + Math.random() * 10;
                return newProgress > 100 ? 100 : newProgress;
            });
        }, 150);

        return () => clearInterval(interval);
    }, []);

    // Wait for a minimum loading time to show the loader
    useEffect(() => {
        const minLoadingTime = setTimeout(() => {
            if (!isLoading && loadingProgress >= 100) {
                setShouldRender(false);
            }
        }, 2000);

        return () => clearTimeout(minLoadingTime);
    }, [isLoading, loadingProgress]);

    return (
        <AnimatePresence>
            {shouldRender && (
                <motion.div
                    className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <motion.div className="flex flex-col items-center justify-center">
                        <motion.div
                            className="mb-12 relative w-28 h-28 md:w-36 md:h-36"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Image
                                src="/images/model_bw.png"
                                alt="Sufail Ahammed N"
                                fill
                                className="object-contain rounded-full"
                            />
                            <motion.div
                                className="absolute -inset-1 rounded-full border-2 border-primary border-dashed"
                                animate={{ rotate: 360 }}
                                transition={{
                                    duration: 8,
                                    repeat: Infinity,
                                    ease: "linear"
                                }}
                            />
                        </motion.div>

                        <motion.h1
                            className="text-4xl md:text-5xl font-bold font-space-grotesk text-white mb-8"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            Sufail Ahammed N
                        </motion.h1>

                        <div className="w-full max-w-md px-4">
                            <div className="h-1 w-full bg-white/20 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-primary rounded-full"
                                    initial={{ width: "0%" }}
                                    animate={{ width: `${loadingProgress}%` }}
                                    transition={{ duration: 0.3 }}
                                />
                            </div>

                            <div className="flex justify-between mt-2 text-sm text-white/60">
                                <span>Loading experience</span>
                                <span>{Math.round(loadingProgress)}%</span>
                            </div>
                        </div>

                        <motion.div
                            className="mt-12 grid grid-cols-3 gap-8 text-white/80"
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