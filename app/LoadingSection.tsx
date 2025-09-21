"use client"

import { motion } from 'framer-motion';

interface LoadingSectionProps {
    title: string;
}

export default function LoadingSection({ title }: LoadingSectionProps) {
    return (
        <section className="py-20 flex justify-center items-center">
            <div className="text-center">
                <h2 className="text-3xl font-space-grotesk font-bold mb-4">{title}</h2>
                <div className="flex justify-center space-x-2">
                    <motion.div
                        className="h-3 w-3 bg-primary rounded-full"
                        animate={{
                            scale: [1, 1.5, 1],
                            opacity: [1, 0.5, 1]
                        }}
                        transition={{
                            duration: 1,
                            repeat: Infinity,
                            repeatType: "loop",
                            ease: "easeInOut",
                            times: [0, 0.5, 1]
                        }}
                    />
                    <motion.div
                        className="h-3 w-3 bg-primary rounded-full"
                        animate={{
                            scale: [1, 1.5, 1],
                            opacity: [1, 0.5, 1]
                        }}
                        transition={{
                            duration: 1,
                            repeat: Infinity,
                            repeatType: "loop",
                            ease: "easeInOut",
                            delay: 0.2,
                            times: [0, 0.5, 1]
                        }}
                    />
                    <motion.div
                        className="h-3 w-3 bg-primary rounded-full"
                        animate={{
                            scale: [1, 1.5, 1],
                            opacity: [1, 0.5, 1]
                        }}
                        transition={{
                            duration: 1,
                            repeat: Infinity,
                            repeatType: "loop",
                            ease: "easeInOut",
                            delay: 0.4,
                            times: [0, 0.5, 1]
                        }}
                    />
                </div>
            </div>
        </section>
    );
}
