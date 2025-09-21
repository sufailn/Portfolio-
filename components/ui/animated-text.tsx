"use client"

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useSound } from '@/components/sound-provider';

interface AnimatedTextProps {
    text: string;
    className?: string;
    variant?: 'header' | 'subheader' | 'body' | 'highlight';
    delay?: number;
    duration?: number;
    onClick?: () => void;
    children?: React.ReactNode;
}

// Animation variants for different text styles
const textVariants: Record<string, Variants> = {
    header: {
        hidden: { opacity: 0, y: 20 },
        visible: (custom) => ({
            opacity: 1,
            y: 0,
            transition: {
                duration: custom.duration || 0.5,
                delay: custom.delay || 0,
                ease: [0.25, 0.1, 0.25, 1.0]
            }
        }),
        hover: {
            scale: 1.01,
            transition: {
                duration: 0.2
            }
        }
    },
    subheader: {
        hidden: { opacity: 0, y: 15 },
        visible: (custom) => ({
            opacity: 1,
            y: 0,
            transition: {
                duration: custom.duration || 0.4,
                delay: custom.delay || 0,
                ease: [0.25, 0.1, 0.25, 1.0]
            }
        }),
        hover: {
            scale: 1.01,
            x: 3,
            transition: {
                duration: 0.2
            }
        }
    },
    body: {
        hidden: { opacity: 0, y: 10 },
        visible: (custom) => ({
            opacity: 1,
            y: 0,
            transition: {
                duration: custom.duration || 0.3,
                delay: custom.delay || 0,
                ease: [0.25, 0.1, 0.25, 1.0]
            }
        })
    },
    highlight: {
        hidden: { opacity: 0, scale: 0.98 },
        visible: (custom) => ({
            opacity: 1,
            scale: 1,
            transition: {
                duration: custom.duration || 0.4,
                delay: custom.delay || 0,
                ease: [0.25, 0.1, 0.25, 1.0]
            }
        }),
        hover: {
            scale: 1.05,
            transition: {
                duration: 0.2
            }
        }
    }
};

// Default class names for different variants
const defaultClassNames: Record<string, string> = {
    header: 'text-3xl md:text-4xl lg:text-5xl font-bold',
    subheader: 'text-xl md:text-2xl font-semibold',
    body: 'text-base md:text-lg',
    highlight: 'font-medium text-primary'
};

export function AnimatedText({
    text,
    className,
    variant = 'body',
    delay = 0,
    duration,
    onClick,
    children
}: AnimatedTextProps) {
    const { playClickSound } = useSound();

    const handleClick = () => {
        playClickSound();
        if (onClick) onClick();
    };

    return (
        <motion.div
            className={cn(defaultClassNames[variant], className)}
            initial="hidden"
            whileInView="visible"
            whileHover="hover"
            viewport={{ once: true, margin: "-50px" }}
            variants={textVariants[variant]}
            custom={{ delay, duration }}
            onClick={handleClick}
        >
            {text || children}
        </motion.div>
    );
}

// For sentence animations where each word animates separately
export function AnimatedSentence({
    text,
    className,
    variant = 'body',
    staggerDelay = 0.03,
    initialDelay = 0,
    duration = 0.3
}: AnimatedTextProps & { staggerDelay?: number, initialDelay?: number }) {
    const words = text.split(' ');
    const { playClickSound } = useSound();

    return (
        <motion.p
            className={cn(defaultClassNames[variant], className)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            onClick={() => playClickSound()}
        >
            {words.map((word, i) => (
                <motion.span
                    key={i}
                    className="inline-block"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                        transition: {
                            duration,
                            delay: initialDelay + i * staggerDelay,
                        },
                    }}
                    viewport={{ once: true }}
                >
                    {word}{' '}
                </motion.span>
            ))}
        </motion.p>
    );
}

// For letter-by-letter animations
export function AnimatedLetters({
    text,
    className,
    variant = 'highlight',
    staggerDelay = 0.02,
    initialDelay = 0,
    duration = 0.2
}: AnimatedTextProps & { staggerDelay?: number, initialDelay?: number }) {
    const letters = text.split('');
    const { playClickSound } = useSound();

    return (
        <motion.div
            className={cn(defaultClassNames[variant], className, "overflow-hidden")}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            onClick={() => playClickSound()}
        >
            {letters.map((letter, i) => (
                <motion.span
                    key={i}
                    className="inline-block"
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                        transition: {
                            duration,
                            delay: initialDelay + i * staggerDelay,
                        },
                    }}
                    viewport={{ once: true }}
                >
                    {letter === ' ' ? '\u00A0' : letter}
                </motion.span>
            ))}
        </motion.div>
    );
}