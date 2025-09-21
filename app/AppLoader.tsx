"use client"

import { motion, AnimatePresence } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useSound } from '@/components/sound-provider';

export default function AppLoader() {
    const { isLoading } = useSound();
    const [shouldRender, setShouldRender] = useState(true);

    // Wait for a minimum loading time to show the loader
    useEffect(() => {
        const minLoadingTime = setTimeout(() => {
            if (!isLoading) {
                setShouldRender(false);
            }
        }, 2000);

        return () => clearTimeout(minLoadingTime);
    }, [isLoading]);

    return (
        <AnimatePresence>
            {shouldRender && (
                <motion.div
                    className="fixed inset-0 bg-background flex flex-col items-center justify-center z-50"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="mb-8 text-center"
                    >
                        <motion.h1
                            className="text-4xl md:text-6xl font-bold mb-2 font-space-grotesk"
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            Sufail Ahammed N
                        </motion.h1>
                        <motion.p
                            className="text-muted-foreground text-lg"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                        >
                            Full Stack Developer
                        </motion.p>
                    </motion.div>

                    <div className="flex items-center space-x-3">
                        {[0, 1, 2, 3, 4].map((index) => (
                            <motion.div
                                key={index}
                                className="h-3 w-3 rounded-full bg-primary"
                                animate={{
                                    scale: [1, 1.3, 1],
                                    opacity: [0.3, 1, 0.3]
                                }}
                                transition={{
                                    duration: 1.2,
                                    repeat: Infinity,
                                    repeatType: "loop",
                                    ease: "easeInOut",
                                    delay: index * 0.1,
                                    times: [0, 0.5, 1]
                                }}
                            />
                        ))}
                    </div>

                    <motion.p
                        className="mt-8 text-sm text-muted-foreground"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.7 }}
                        transition={{ delay: 0.8, duration: 0.5 }}
                    >
                        Preparing your experience...
                    </motion.p>
                </motion.div>
            )}
        </AnimatePresence>
    );
}