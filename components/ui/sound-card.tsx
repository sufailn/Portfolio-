"use client"

import React from 'react';
import { Card } from '@/components/ui/card';
import { useSound } from '@/components/sound-provider';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SoundCardProps {
    playOnHover?: boolean;
    playOnClick?: boolean;
    hoverEffect?: 'scale' | 'glow' | 'lift' | 'none';
    animationVariants?: any;
    className?: string;
    children: React.ReactNode;
}

const SoundCard = React.forwardRef<HTMLDivElement, SoundCardProps>(
    ({
        className,
        playOnHover = true,
        playOnClick = true,
        hoverEffect = 'scale',
        animationVariants,
        children,
        ...props
    }, ref) => {
        const { playClickSound } = useSound();

        const handleHover = () => {
            if (playOnHover) {
                playClickSound();
            }
        };

        const handleClick = () => {
            if (playOnClick) {
                playClickSound();
            }
        };

        // Default animation variants
        const defaultVariants = {
            initial: {
                opacity: 0,
                y: 20
            },
            animate: {
                opacity: 1,
                y: 0
            }
        };

        const getHoverStyle = () => {
            switch (hoverEffect) {
                case 'scale':
                    return { scale: 1.03 };
                case 'glow':
                    return { boxShadow: "0 0 8px rgba(255, 255, 255, 0.5)" };
                case 'lift':
                    return { y: -5 };
                default:
                    return {};
            }
        };

        return React.createElement(
            motion.div,
            {
                initial: "initial",
                whileInView: "animate",
                viewport: { once: true, margin: "-50px" },
                variants: animationVariants || defaultVariants,
                transition: { duration: 0.5 },
                whileHover: getHoverStyle(),
                whileTap: { scale: 0.98 },
                onHoverStart: handleHover,
                onClick: handleClick,
                className: cn("transition-all", className),
                ref: ref,
                ...props
            },
            React.createElement(
                Card,
                { className: "overflow-hidden h-full" },
                children
            )
        );
    }
);

SoundCard.displayName = 'SoundCard';

export { SoundCard };