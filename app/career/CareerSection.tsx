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
            staggerChildren: 0.2
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5
        }
    }
};

export default function CareerSection() {
    return (
        <section id="career" className="py-20 px-4 bg-gradient-to-b from-background to-background/50">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-16">Career Journey</h2>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="relative"
                >
                    {/* Vertical line */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-primary/20" />

                    {timeline.map((item, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className={`flex items-center mb-12 ${index % 2 === 0 ? 'flex-row-reverse' : ''
                                }`}
                        >
                            {/* Timeline content */}
                            <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'pl-8'}`}>
                                <h3 className="text-xl font-semibold text-primary">{item.title}</h3>
                                <p className="text-muted-foreground">{item.organization}</p>
                                <p className="text-sm text-muted-foreground/70">{item.period}</p>
                            </div>

                            {/* Center dot */}
                            <div className="w-2/12 flex justify-center">
                                <div className="w-4 h-4 rounded-full bg-primary ring-4 ring-primary/20" />
                            </div>

                            <div className="w-5/12" /> {/* Spacer */}
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}