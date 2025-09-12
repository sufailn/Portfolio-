"use client"

import { motion } from 'framer-motion';

const timeline = [
    {
        period: "2024–2025",
        title: "Full Stack Developer",
        organization: "Com Digital Marketing",
        type: "work"
    },
    {
        period: "2022–2024",
        title: "Master of Computer Applications",
        organization: "KTU",
        type: "education"
    },
    {
        period: "2019–2022",
        title: "Bachelor of Computer Applications",
        organization: "Calicut University",
        type: "education"
    }
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.3,
            delayChildren: 0.2
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.9 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1
    }
};

const lineVariants = {
    hidden: { scaleY: 0 },
    visible: {
        scaleY: 1,
        transition: { duration: 1 }
    }
};

const dotVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
        scale: 1,
        opacity: 1,
        transition: { duration: 0.5 }
    }
};

export default function CareerSection() {
    return (
        <section id="career" className="py-20 md:py-32 px-4 bg-gradient-to-b from-background to-background/50">
            <div className="max-w-6xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-20 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70"
                >
                    Career Journey
                </motion.h2>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="relative"
                >
                    {/* Animated vertical line - hidden on mobile */}
                    <motion.div
                        variants={lineVariants}
                        className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-gradient-to-b from-primary/80 via-primary/50 to-primary/20"
                        style={{ originY: 0 }}
                    />

                    {/* Mobile vertical line */}
                    <motion.div
                        variants={lineVariants}
                        className="md:hidden absolute left-[20px] sm:left-[40px] h-full w-px bg-gradient-to-b from-primary/80 via-primary/50 to-primary/20"
                        style={{ originY: 0 }}
                    />

                    {timeline.map((item, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            whileHover={{ scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            className={`flex items-start md:items-center mb-8 md:mb-16 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''
                                } ${
                                // Mobile layout adjustments
                                'flex-row pl-[40px] sm:pl-[60px] md:pl-0'
                                }`}
                        >
                            {/* Timeline content */}
                            <motion.div
                                className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:text-right md:pr-8' : 'md:pl-8'
                                    }`}
                                whileHover={{ x: index % 2 === 0 ? -5 : 5 }}
                            >
                                <div className="p-4 md:p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-colors">
                                    <h3 className="text-xl md:text-2xl font-semibold text-primary mb-2">{item.title}</h3>
                                    <p className="text-base md:text-lg text-muted-foreground mb-1">{item.organization}</p>
                                    <p className="text-sm text-muted-foreground/70">{item.period}</p>
                                    <span className="inline-block px-3 py-1 mt-2 text-xs rounded-full bg-primary/10 text-primary">
                                        {item.type}
                                    </span>
                                </div>
                            </motion.div>

                            {/* Center dot - Desktop */}
                            <div className="hidden md:flex w-2/12 justify-center relative">
                                <motion.div
                                    variants={dotVariants}
                                    whileHover={{ scale: 1.2 }}
                                    className="w-4 md:w-5 h-4 md:h-5 rounded-full bg-primary ring-4 ring-primary/20 shadow-lg shadow-primary/20"
                                />
                            </div>

                            {/* Left dot - Mobile */}
                            <div className="md:hidden absolute left-[16px] sm:left-[36px] top-[24px]">
                                <motion.div
                                    variants={dotVariants}
                                    whileHover={{ scale: 1.2 }}
                                    className="w-4 h-4 rounded-full bg-primary ring-4 ring-primary/20 shadow-lg shadow-primary/20"
                                />
                            </div>

                            {/* Spacer - Desktop only */}
                            <div className="hidden md:block md:w-5/12" />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}