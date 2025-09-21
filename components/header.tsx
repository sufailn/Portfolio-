"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Volume2, VolumeX, BellDot, Github, Linkedin, Mail, Sun, Moon } from 'lucide-react'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { useSound } from './sound-provider'

const Header = () => {
    const [time, setTime] = useState<string>("")
    const [date, setDate] = useState<string>("")
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const { theme, setTheme } = useTheme()
    const { isSoundEnabled, toggleSound, playClickSound } = useSound()

    // Menu items inspired by bjornflow.com
    const menuItems = [
        { href: "#", label: "HOME" },
        { href: "#projects", label: "WORK" },
        { href: "#skills", label: "SKILLS" },
        { href: "#career", label: "CAREER" },
        { href: "#contact", label: "CONTACT" },
    ]

    const [amPm, setAmPm] = useState<string>("AM")

    useEffect(() => {
        const updateTime = () => {
            const now = new Date()
            const hours24 = now.getHours()
            const hours = (hours24 % 12 || 12).toString().padStart(2, '0') // Convert to 12-hour format
            const minutes = now.getMinutes().toString().padStart(2, '0')
            const seconds = now.getSeconds().toString().padStart(2, '0')
            setTime(`${hours}:${minutes}:${seconds}`)
            setAmPm(hours24 >= 12 ? "PM" : "AM")

            const options: Intl.DateTimeFormatOptions = {
                weekday: 'short',
                month: 'short',
                day: 'numeric'
            }
            setDate(now.toLocaleDateString('en-US', options))
        }

        updateTime()
        const interval = setInterval(updateTime, 1000)

        return () => clearInterval(interval)
    }, [])

    return (
        <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/85 backdrop-blur-md">
            <div className="max-w-screen-2xl mx-auto">
                <div className="flex justify-between items-center px-4 sm:px-6 h-16">
                    {/* Logo Area */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, type: "tween" }}
                        className="flex items-center"
                    >
                        <Link href="/" className="font-space-grotesk text-xl font-semibold tracking-wider">
                            SUFAIL <span className="text-primary">NALAKATH.</span>
                        </Link>
                    </motion.div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        {menuItems.map((item, i) => (
                            <motion.a
                                key={i}
                                href={item.href}
                                onClick={playClickSound}
                                className="text-sm tracking-widest font-medium text-white/80 hover:text-white transition-colors nav-link"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.3,
                                    delay: i * 0.05, // Reduced delay for faster loading
                                    type: "tween" // Use simpler animation type
                                }}
                            >
                                {item.label}
                            </motion.a>
                        ))}
                    </nav>

                    {/* Right side - Clock & Controls */}
                    <div className="flex items-center justify-end gap-4 sm:gap-6">
                        {/* Social Links */}
                        <div className="hidden sm:flex space-x-3 items-center">
                            <motion.a
                                href="https://github.com/sufailn"
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={playClickSound}
                                className="text-white/70 hover:text-white transition-colors"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                            >
                                <Github className="h-4 w-4" />
                            </motion.a>
                            <motion.a
                                href="https://www.linkedin.com/in/sufailahammed"
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={playClickSound}
                                className="text-white/70 hover:text-white transition-colors"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            >
                                <Linkedin className="h-4 w-4" />
                            </motion.a>
                            <motion.a
                                href="mailto:sufailahammed316@gmail.com"
                                onClick={playClickSound}
                                className="text-white/70 hover:text-white transition-colors"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                            >
                                <Mail className="h-4 w-4" />
                            </motion.a>
                        </div>

                        {/* Sound toggle button */}
                        <motion.button
                            onClick={() => {
                                toggleSound()
                                playClickSound()
                            }}
                            className="hidden sm:flex items-center text-xs sm:text-sm text-white/70 hover:text-white"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <span className="mr-2 hidden sm:inline">TURN {isSoundEnabled ? "OFF" : "ON"} SOUND</span>
                            {isSoundEnabled ? (
                                <Volume2 className="h-4 w-4" />
                            ) : (
                                <VolumeX className="h-4 w-4" />
                            )}
                        </motion.button>

                        {/* Theme toggle button */}
                        <motion.button
                            onClick={() => {
                                setTheme(theme === 'dark' ? 'light' : 'dark')
                                playClickSound()
                            }}
                            className="hidden sm:flex items-center text-xs sm:text-sm text-white/70 hover:text-white"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            <span className="mr-2 hidden sm:inline">TURN {theme === 'dark' ? 'ON' : 'OFF'} LIGHTS</span>
                            {theme === 'dark' ? (
                                <Sun className="h-4 w-4" />
                            ) : (
                                <Moon className="h-4 w-4" />
                            )}
                        </motion.button>

                        {/* Clock - styled like bjornflow.com */}
                        <motion.div
                            className="text-right font-mono text-sm sm:text-base text-white/90"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            {time} <span className="hidden sm:inline">{amPm}</span>
                        </motion.div>

                        {/* Mobile Menu Button */}
                        <motion.button
                            className="md:hidden flex items-center justify-center ml-2"
                            onClick={() => {
                                setIsMenuOpen(!isMenuOpen)
                                playClickSound()
                            }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            <div className="flex flex-col gap-1.5">
                                <span className={`block w-5 h-0.5 bg-white transition-transform duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                                <span className={`block w-5 h-0.5 bg-white transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                                <span className={`block w-5 h-0.5 bg-white transition-transform duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                            </div>
                        </motion.button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <motion.div
                    className={`md:hidden absolute inset-x-0 bg-black/95 backdrop-blur-md transition-all duration-300 ease-in-out border-t border-white/10 ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}
                    initial={false}
                    animate={{ maxHeight: isMenuOpen ? 500 : 0, opacity: isMenuOpen ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="py-3 px-6">
                        {menuItems.map((item, i) => (
                            <motion.a
                                key={i}
                                href={item.href}
                                onClick={() => {
                                    setIsMenuOpen(false)
                                    playClickSound()
                                }}
                                className="block py-2.5 text-white/80 hover:text-white font-medium tracking-widest text-sm"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: isMenuOpen ? 1 : 0, x: isMenuOpen ? 0 : -10 }}
                                transition={{ duration: 0.3, delay: i * 0.05 }}
                            >
                                {item.label}
                            </motion.a>
                        ))}

                        <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                            <button
                                onClick={() => {
                                    toggleSound()
                                    playClickSound()
                                }}
                                className="flex items-center text-sm text-white/70 hover:text-white"
                            >
                                <span className="mr-2">SOUND {isSoundEnabled ? "OFF" : "ON"}</span>
                                {isSoundEnabled ? (
                                    <Volume2 className="h-4 w-4" />
                                ) : (
                                    <VolumeX className="h-4 w-4" />
                                )}
                            </button>

                            <button
                                onClick={() => {
                                    setTheme(theme === 'dark' ? 'light' : 'dark')
                                    playClickSound()
                                }}
                                className="text-sm text-white/70 hover:text-white"
                            >
                                <span className="mr-2">TURN {theme === 'dark' ? 'ON' : 'OFF'} LIGHTS</span>
                                {theme === 'dark' ? (
                                    <Sun className="h-4 w-4 inline-block" />
                                ) : (
                                    <Moon className="h-4 w-4 inline-block" />
                                )}
                            </button>
                        </div>

                        {/* Mobile Social Links */}
                        <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-center space-x-6">
                            <a
                                href="https://github.com/sufailn"
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={playClickSound}
                                className="text-white/70 hover:text-white transition-colors"
                            >
                                <Github className="h-5 w-5" />
                            </a>
                            <a
                                href="https://www.linkedin.com/in/sufailahammed"
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={playClickSound}
                                className="text-white/70 hover:text-white transition-colors"
                            >
                                <Linkedin className="h-5 w-5" />
                            </a>
                            <a
                                href="mailto:sufailahammed316@gmail.com"
                                onClick={playClickSound}
                                className="text-white/70 hover:text-white transition-colors"
                            >
                                <Mail className="h-5 w-5" />
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </header>
    )
}


export default Header