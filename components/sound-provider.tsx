"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode, useRef } from 'react'

type SoundContextType = {
    isSoundEnabled: boolean
    toggleSound: () => void
    playClickSound: () => void
    isInitialized: boolean
}

const SoundContext = createContext<SoundContextType | undefined>(undefined)

export function SoundProvider({ children }: { children: ReactNode }) {
    const [isSoundEnabled, setIsSoundEnabled] = useState(false)
    const [isInitialized, setIsInitialized] = useState(false)
    const backgroundAudioRef = useRef<HTMLAudioElement | null>(null)
    const clickAudioRef = useRef<HTMLAudioElement | null>(null)

    // Lazy initialize audio elements only after user interaction
    const initializeAudio = () => {
        if (isInitialized) return;

        if (typeof window !== 'undefined') {
            // Background ambient sound
            const bgAudio = new Audio('/sounds/ambient.mp3')
            bgAudio.loop = true
            bgAudio.volume = 0.1
            bgAudio.preload = 'none' // Don't preload audio
            backgroundAudioRef.current = bgAudio

            // Click sound for interactions
            const clickSound = new Audio('/sounds/click.mp3')
            clickSound.volume = 0.3
            clickSound.preload = 'none' // Don't preload audio
            clickAudioRef.current = clickSound

            setIsInitialized(true)
        }
    }

    // Handle sound toggling
    const toggleSound = () => {
        // Initialize audio on first interaction
        if (!isInitialized) {
            initializeAudio()
        }

        setIsSoundEnabled(prev => {
            const newState = !prev

            if (newState && backgroundAudioRef.current) {
                backgroundAudioRef.current.play().catch(e => {
                    console.error('Failed to play audio:', e)
                    return false
                })
            } else if (backgroundAudioRef.current) {
                backgroundAudioRef.current.pause()
            }

            return newState
        })

        // Play click sound when toggling
        if (clickAudioRef.current && isInitialized) {
            clickAudioRef.current.currentTime = 0
            clickAudioRef.current.play().catch(e => console.error('Failed to play click sound:', e))
        }
    }

    // Function to play click sound on interactions
    const playClickSound = () => {
        if (!isInitialized) {
            initializeAudio()
        }

        if (clickAudioRef.current && isSoundEnabled) {
            clickAudioRef.current.currentTime = 0
            clickAudioRef.current.play().catch(e => console.error('Failed to play click sound:', e))
        }
    }

    // Cleanup when component unmounts
    useEffect(() => {
        return () => {
            if (backgroundAudioRef.current) {
                backgroundAudioRef.current.pause()
                backgroundAudioRef.current.src = ''
            }
            if (clickAudioRef.current) {
                clickAudioRef.current.src = ''
            }
        }
    }, [])

    return (
        <SoundContext.Provider value={{ isSoundEnabled, toggleSound, playClickSound, isInitialized }}>
            {children}
        </SoundContext.Provider>
    )
}

export function useSound() {
    const context = useContext(SoundContext)
    if (context === undefined) {
        throw new Error('useSound must be used within a SoundProvider')
    }
    return context
}