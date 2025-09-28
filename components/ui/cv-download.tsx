"use client"

import { motion } from 'framer-motion';
import { Download, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSound } from '@/components/sound-provider';

interface CVDownloadProps {
    variant?: 'button' | 'icon' | 'card';
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

export default function CVDownload({ variant = 'button', size = 'md', className = '' }: CVDownloadProps) {
    const { playClickSound } = useSound();

    const handleDownload = () => {
        playClickSound();

        // Track download event if you have analytics
        if (typeof window !== 'undefined' && (window as any).gtag) {
            (window as any).gtag('event', 'download', {
                event_category: 'CV',
                event_label: 'Sufail Ahammed N CV',
            });
        }
    }; if (variant === 'icon') {
        return (
            <motion.a
                href="/documents/Sufail_Ahammed_N_CV.pdf"
                download="Sufail_Ahammed_N_CV.pdf"
                onClick={handleDownload}
                className={`inline-flex items-center justify-center text-white/70 hover:text-white transition-colors ${className}`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                title="Download CV"
            >
                <Download className={`${size === 'sm' ? 'h-3 w-3' : size === 'lg' ? 'h-5 w-5' : 'h-4 w-4'}`} />
            </motion.a>
        );
    }

    if (variant === 'card') {
        return (
            <motion.div
                className={`bg-white/5 border border-white/10 rounded-lg p-6 hover:bg-white/10 transition-all duration-300 ${className}`}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
            >
                <a
                    href="/documents/Sufail_Ahammed_N_CV.pdf"
                    download="Sufail_Ahammed_N_CV.pdf"
                    onClick={handleDownload}
                    className="block text-center"
                >
                    <div className="flex items-center justify-center mb-4">
                        <div className="bg-white/10 rounded-full p-4">
                            <FileText className="h-8 w-8 text-white" />
                        </div>
                    </div>
                    <h3 className="text-white font-mono text-lg mb-2 uppercase tracking-tight">Resume</h3>
                    <p className="text-white/60 text-sm mb-4">Download my latest CV</p>
                    <div className="flex items-center justify-center text-white/80 text-sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download PDF
                    </div>
                </a>
            </motion.div>
        );
    }

    // Default button variant
    const sizeClasses = {
        sm: 'px-4 py-2 text-xs',
        md: 'px-6 py-3 text-sm',
        lg: 'px-8 py-4 text-base',
    };

    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            <Button
                variant="outline"
                className={`border-white/20 hover:bg-white hover:text-black text-white rounded-none transition-all duration-300 ${sizeClasses[size]} ${className}`}
                asChild
            >
                <a
                    href="/documents/Sufail_Ahammed_N_CV.pdf"
                    download="Sufail_Ahammed_N_CV.pdf"
                    onClick={handleDownload}
                    className="flex items-center gap-2 uppercase tracking-wider font-mono"
                >
                    <Download className="h-4 w-4" />
                    Download CV
                </a>
            </Button>
        </motion.div>
    );
}