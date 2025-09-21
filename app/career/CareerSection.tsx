"use client"

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Calendar, Clock, Briefcase, GraduationCap, MapPin } from 'lucide-react';

const timeline = [
    {
        period: "Mar 2024 - Jun 2025",
        title: "Full Stack Developer",
        organization: "Com Digital Marketing",
        location: "Wayanad, India",
        description: "Managed development of scalable web applications focusing on clean, maintainable code. Enhanced backend system performance by 30% and improved frontend responsiveness, resulting in 20% increased user satisfaction.",
        type: "work"
    },
    {
        period: "Jan 2022 - Feb 2024",
        title: "Freelance Frontend Developer",
        organization: "Self-employed",
        location: "Calicut, India",
        description: "Developed responsive landing pages and SPAs using modern frontend technologies. Built reusable components, optimized performance, and implemented SEO and accessibility best practices.",
        type: "work"
    },
    {
        period: "Jun 2024 - Sep 2024",
        title: "Web Development Intern",
        organization: "Inmakes Infotech Pvt. Ltd",
        location: "Kochi, India",
        description: "Increased user engagement 25% by developing MEAN stack apps with responsive UI and optimized backend.",
        type: "work"
    },
    {
        period: "2022 - 2024",
        title: "Master of Computer Applications",
        organization: "APJ Abdul Kalam Technological University",
        location: "Kozhikode, India",
        description: "Advanced studies in software development, data structures, algorithms, and modern web technologies.",
        type: "education"
    },
    {
        period: "2019 - 2022",
        title: "Bachelor of Computer Applications",
        organization: "University of Calicut",
        location: "Malappuram, India",
        description: "Foundation in computer science, programming fundamentals, and software development principles.",
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

// Real-time clock component
const RealtimeClock = () => {
    const [time, setTime] = useState<string>("");
    const [date, setDate] = useState<string>("");

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const hours = now.getHours().toString().padStart(2, '0');
            const minutes = now.getMinutes().toString().padStart(2, '0');
            const seconds = now.getSeconds().toString().padStart(2, '0');
            setTime(`${hours}:${minutes}:${seconds}`);

            const options: Intl.DateTimeFormatOptions = {
                weekday: 'short',
                month: 'short',
                day: 'numeric'
            };
            setDate(now.toLocaleDateString('en-US', options));
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center"
        >
            <div className="glassmorphism-clock text-center px-4 py-2 rounded-xl flex flex-col items-center backdrop-blur-md bg-primary/5 border border-primary/20 shadow-lg">
                <div className="flex items-center gap-2 mb-1">
                    <Clock className="w-4 h-4 text-primary/80" />
                    <span className="font-mono text-xl md:text-2xl font-medium text-primary">{time}</span>
                </div>
                <div className="text-xs text-muted-foreground/70">{date}</div>
            </div>
        </motion.div>
    );
};

export default function CareerSection() {
    return (
        <section id="career" className="py-20 md:py-32 px-4 bg-gradient-to-b from-background to-background/50">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center mb-12 md:mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="mb-4 md:mb-0"
                    >
                        <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70 mb-2 font-space-grotesk">
                            Career Journey
                        </h2>
                        <p className="text-white/70 max-w-xl">
                            My professional timeline showcasing my experience and growth in the tech industry
                        </p>
                    </motion.div>

                    <RealtimeClock />
                </div>

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
                        className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-[2px] bg-gradient-to-b from-primary/80 via-primary/50 to-primary/20"
                        style={{ originY: 0 }}
                    />

                    {/* Mobile vertical line */}
                    <motion.div
                        variants={lineVariants}
                        className="md:hidden absolute left-[20px] sm:left-[40px] h-full w-[2px] bg-gradient-to-b from-primary/80 via-primary/50 to-primary/20"
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
                                <div className="p-5 md:p-6 rounded-xl bg-card/30 backdrop-blur-md border border-white/10 hover:border-primary/30 transition-all shadow-xl hover:shadow-primary/5 glassmorphism-card relative overflow-hidden">
                                    {/* Background icon for visual interest */}
                                    <div className="absolute -bottom-10 -right-10 opacity-5 transform rotate-12">
                                        {item.type === 'work' ? (
                                            <Briefcase className="w-32 h-32" />
                                        ) : (
                                            <GraduationCap className="w-32 h-32" />
                                        )}
                                    </div>

                                    <div className="flex items-center mb-3 gap-2 justify-start">
                                        <div className={`p-2 rounded-full ${item.type === 'work' ? 'bg-blue-500/10 text-blue-400' : 'bg-purple-500/10 text-purple-400'}`}>
                                            {item.type === 'work' ? <Briefcase className="w-4 h-4" /> : <GraduationCap className="w-4 h-4" />}
                                        </div>
                                        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${item.type === 'work' ? 'bg-blue-500/10 text-blue-400' : 'bg-purple-500/10 text-purple-400'}`}>
                                            {item.period}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-semibold text-primary mb-2 font-space-grotesk">{item.title}</h3>
                                    <p className="text-base text-white mb-1 font-space-grotesk">{item.organization}</p>
                                    <p className="text-sm text-muted-foreground/70 flex items-center gap-1 mb-3">
                                        <MapPin className="w-3 h-3 text-muted-foreground/50" />
                                        <span>{item.location}</span>
                                    </p>
                                    <p className="text-sm text-white/80 relative z-10">{item.description}</p>
                                </div>
                            </motion.div>

                            {/* Center dot - Desktop */}
                            <div className="hidden md:flex w-2/12 justify-center relative">
                                <motion.div
                                    variants={dotVariants}
                                    whileHover={{ scale: 1.2 }}
                                    className="w-5 md:w-6 h-5 md:h-6 rounded-full bg-gradient-to-r from-primary to-primary/80 ring-4 ring-primary/10 shadow-lg shadow-primary/20 backdrop-blur-sm border border-white/20"
                                />
                            </div>

                            {/* Left dot - Mobile */}
                            <div className="md:hidden absolute left-[16px] sm:left-[36px] top-[24px]">
                                <motion.div
                                    variants={dotVariants}
                                    whileHover={{ scale: 1.2 }}
                                    className="w-5 h-5 rounded-full bg-gradient-to-r from-primary to-primary/80 ring-4 ring-primary/10 shadow-lg shadow-primary/20 backdrop-blur-sm border border-white/20"
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