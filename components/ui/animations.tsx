"use client"

import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

interface FadeInProps {
    children: React.ReactNode
    direction?: 'up' | 'down' | 'left' | 'right'
    delay?: number
    className?: string
    viewOffset?: number
    duration?: number
    distance?: number
}

export function FadeIn({
    children,
    direction = 'up',
    delay = 0,
    className = '',
    viewOffset = 0.1,
    duration = 0.5,
    distance = 20,
}: FadeInProps) {
    const ref = useRef(null)
    const isInView = useInView(ref, {
        once: true,
        amount: viewOffset
    })

    const getDirection = () => {
        switch (direction) {
            case 'up':
                return { y: distance }
            case 'down':
                return { y: -distance }
            case 'left':
                return { x: distance }
            case 'right':
                return { x: -distance }
            default:
                return { y: distance }
        }
    }

    return (
        <motion.div
            ref={ref}
            initial={{
                opacity: 0,
                ...getDirection()
            }}
            animate={isInView ? {
                opacity: 1,
                x: 0,
                y: 0,
                transition: {
                    duration: duration,
                    delay: delay,
                    ease: [0.25, 0.1, 0.25, 1.0],
                }
            } : {}}
            className={className}
        >
            {children}
        </motion.div>
    )
}

interface FadeInStaggerProps {
    children: React.ReactNode
    delay?: number
    className?: string
}

export function FadeInStagger({
    children,
    delay = 0.05,
    className = '',
}: FadeInStaggerProps) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, amount: 0.1 })

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={{
                visible: { transition: { staggerChildren: delay } },
            }}
            className={className}
        >
            {children}
        </motion.div>
    )
}

interface FadeInStaggerItemProps {
    children: React.ReactNode
    direction?: 'up' | 'down' | 'left' | 'right'
    duration?: number
    distance?: number
    className?: string
}

export function FadeInStaggerItem({
    children,
    direction = 'up',
    duration = 0.5,
    distance = 20,
    className = '',
}: FadeInStaggerItemProps) {
    const getDirection = () => {
        switch (direction) {
            case 'up':
                return { y: distance }
            case 'down':
                return { y: -distance }
            case 'left':
                return { x: distance }
            case 'right':
                return { x: -distance }
            default:
                return { y: distance }
        }
    }

    return (
        <motion.div
            variants={{
                hidden: {
                    opacity: 0,
                    ...getDirection()
                },
                visible: {
                    opacity: 1,
                    x: 0,
                    y: 0,
                    transition: {
                        duration: duration,
                        ease: [0.25, 0.1, 0.25, 1.0],
                    }
                },
            }}
            className={className}
        >
            {children}
        </motion.div>
    )
}

interface ParallaxScrollProps {
    children: React.ReactNode
    speed?: number
    className?: string
}

export function ParallaxScroll({
    children,
    speed = 0.1,
    className = '',
}: ParallaxScrollProps) {
    const ref = useRef(null)

    return (
        <motion.div
            ref={ref}
            className={className}
            style={{
                translateY: useTransform(
                    useScroll({
                        target: ref,
                        offset: ["start end", "end start"]
                    }).scrollYProgress,
                    [0, 1],
                    [0, -speed * 100]
                ),
            }}
        >
            {children}
        </motion.div>
    )
}

// For smoother transitions between sections
interface SmoothSectionProps {
    children: React.ReactNode
    className?: string
    id?: string
}

export function SmoothSection({
    children,
    className = '',
    id,
}: SmoothSectionProps) {
    return (
        <motion.section
            id={id}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-10%" }}
            className={className}
        >
            {children}
        </motion.section>
    )
}