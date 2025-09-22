"use client"

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, X, RefreshCcw, ExternalLink, Home } from 'lucide-react';
import { SoundButton } from '@/components/ui/sound-button';
import { useSound } from '@/components/sound-provider';

interface SiteViewerProps {
    url: string;
    title: string;
    onBack: () => void;
    onClose: () => void;
}

export default function SiteViewer({ url, title, onBack, onClose }: SiteViewerProps) {
    const { playClickSound } = useSound();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);

    const handleRefresh = () => {
        playClickSound();
        setIsLoading(true);
        setError(false);
        // This will reload the iframe
        const iframe = document.getElementById('site-iframe') as HTMLIFrameElement;
        if (iframe) {
            iframe.src = url;
        }
    };

    const handleIframeLoad = () => {
        setIsLoading(false);
    };

    const handleIframeError = () => {
        setIsLoading(false);
        setError(true);
    };

    return (
        <motion.div
            className="fixed inset-0 bg-black/95 z-50 flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            {/* Header with controls */}
            <div className="bg-card/90 backdrop-blur-md border-b border-border/30 p-2 sm:p-3 flex items-center justify-between">
                <div className="flex items-center space-x-1 sm:space-x-2">
                    <SoundButton
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 sm:h-9 sm:w-9 rounded-full hover:bg-primary/10"
                        onClick={() => {
                            playClickSound();
                            onBack();
                        }}
                    >
                        <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                    </SoundButton>

                    <SoundButton
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 sm:h-9 sm:w-9 rounded-full hover:bg-primary/10"
                        onClick={() => {
                            playClickSound();
                            onClose();
                        }}
                    >
                        <Home className="h-4 w-4 sm:h-5 sm:w-5" />
                    </SoundButton>

                    <SoundButton
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 sm:h-9 sm:w-9 rounded-full hover:bg-primary/10"
                        onClick={handleRefresh}
                    >
                        <RefreshCcw className="h-4 w-4 sm:h-5 sm:w-5" />
                    </SoundButton>
                </div>

                <div className="flex-1 text-center truncate px-2 sm:px-4">
                    <h2 className="text-xs sm:text-sm font-medium truncate">{title}</h2>
                    <p className="text-xs text-muted-foreground truncate hidden sm:block">{url}</p>
                </div>

                <div className="flex items-center space-x-1 sm:space-x-2">
                    <SoundButton
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 sm:h-9 sm:w-9 rounded-full hover:bg-primary/10"
                        asChild
                    >
                        <a href={url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4 sm:h-5 sm:w-5" />
                        </a>
                    </SoundButton>

                    <SoundButton
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 sm:h-9 sm:w-9 rounded-full hover:bg-primary/10"
                        onClick={() => {
                            playClickSound();
                            onClose();
                        }}
                    >
                        <X className="h-4 w-4 sm:h-5 sm:w-5" />
                    </SoundButton>
                </div>
            </div>

            {/* Loading indicator */}
            <AnimatePresence>
                {isLoading && (
                    <motion.div
                        className="absolute inset-0 flex items-center justify-center bg-black/50 z-10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <div className="flex flex-col items-center">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-3 sm:mb-4"></div>
                            <p className="text-white text-xs sm:text-sm">Loading website...</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Error state */}
            <AnimatePresence>
                {error && (
                    <motion.div
                        className="absolute inset-0 flex items-center justify-center bg-black/80 z-10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <div className="max-w-md p-4 sm:p-6 bg-card rounded-lg text-center mx-2">
                            <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">Unable to load website</h3>
                            <p className="text-muted-foreground text-sm mb-3 sm:mb-4">
                                The website could not be loaded in this viewer. This might be due to security restrictions set by the website.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center">
                                <SoundButton size="sm" onClick={handleRefresh}>
                                    <RefreshCcw className="mr-2 h-4 w-4" />
                                    Try Again
                                </SoundButton>
                                <SoundButton size="sm" variant="outline" asChild>
                                    <a href={url} target="_blank" rel="noopener noreferrer">
                                        Open in New Tab <ExternalLink className="ml-2 h-4 w-4" />
                                    </a>
                                </SoundButton>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Website iframe */}
            <div className="flex-1 relative">
                <iframe
                    id="site-iframe"
                    src={url}
                    className="w-full h-full border-0"
                    onLoad={handleIframeLoad}
                    onError={handleIframeError}
                    sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                    title={`${title} website`}
                />
            </div>
        </motion.div>
    );
}