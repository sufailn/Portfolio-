"use client"

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { SoundButton } from '@/components/ui/sound-button';

// Mock gallery images based on the project image
const createGalleryImages = (mainImage: string) => {
    return [
        mainImage,
        mainImage,
        mainImage,
        mainImage
    ];
};

export default function ProjectGallery({ projectImage }: { projectImage: string }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const galleryImages = createGalleryImages(projectImage);

    const handlePrevious = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentIndex(prev => (prev - 1 + galleryImages.length) % galleryImages.length);
    };

    const handleNext = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentIndex(prev => (prev + 1) % galleryImages.length);
    };

    return (
        <div className="relative mt-8 rounded-xl overflow-hidden">
            <div className="relative aspect-video overflow-hidden rounded-xl">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="relative w-full h-full"
                >
                    <Image
                        src={galleryImages[currentIndex]}
                        alt={`Project view ${currentIndex + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </motion.div>

                {/* Navigation controls */}
                <div className="absolute inset-0 flex items-center justify-between px-4">
                    <SoundButton
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10 rounded-full bg-black/30 text-white hover:bg-black/50"
                        onClick={handlePrevious}
                    >
                        <ChevronLeft className="h-6 w-6" />
                    </SoundButton>

                    <SoundButton
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10 rounded-full bg-black/30 text-white hover:bg-black/50"
                        onClick={handleNext}
                    >
                        <ChevronRight className="h-6 w-6" />
                    </SoundButton>
                </div>

                {/* Zoom button */}
                <SoundButton
                    variant="ghost"
                    size="icon"
                    className="absolute bottom-4 right-4 h-10 w-10 rounded-full bg-black/30 text-white hover:bg-black/50"
                >
                    <ZoomIn className="h-5 w-5" />
                </SoundButton>
            </div>

            {/* Thumbnails */}
            <div className="flex mt-4 gap-2 overflow-x-auto pb-2">
                {galleryImages.map((img, idx) => (
                    <motion.div
                        key={idx}
                        className={`relative w-20 h-20 rounded-md overflow-hidden cursor-pointer border-2 ${idx === currentIndex ? 'border-primary' : 'border-transparent'
                            }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setCurrentIndex(idx)}
                    >
                        <Image
                            src={img}
                            alt={`Thumbnail ${idx + 1}`}
                            fill
                            className="object-cover"
                        />
                    </motion.div>
                ))}
            </div>
        </div>
    );
}