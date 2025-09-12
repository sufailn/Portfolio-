"use client"

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';

const socialLinks = [
  {
    icon: <Github className="w-5 h-5" />,
    href: "https://github.com/sufailn",
    label: "GitHub"
  },
  {
    icon: <Linkedin className="w-5 h-5" />,
    href: "https://www.linkedin.com/in/sufail-n/",
    label: "LinkedIn"
  },
  {
    icon: <Twitter className="w-5 h-5" />,
    href: "https://twitter.com/yourusername",
    label: "Twitter"
  },
  {
    icon: <Mail className="w-5 h-5" />,
    href: "mailto:your.email@example.com",
    label: "Email"
  }
];

export default function FooterSection() {
  return (
    <footer className="bg-card py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-primary/20">
                <Image
                  src="/images/model_bw.png"
                  alt="Sufail Ahammed N"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold">Sufail Ahammed N</h3>
            </div>
            <p className="text-muted-foreground">
              Full Stack Developer specializing in creating beautiful and functional web applications.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#skills" className="text-muted-foreground hover:text-primary transition-colors">
                  Skills
                </a>
              </li>
              <li>
                <a href="#projects" className="text-muted-foreground hover:text-primary transition-colors">
                  Projects
                </a>
              </li>
              <li>
                <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Connect</h3>
            <div className="flex gap-4">
              <a
                href="https://github.com/sufailn"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Github className="h-6 w-6" />
              </a>
              <a
                href="https://linkedin.com/in/sufail-ahammed-n"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Linkedin className="h-6 w-6" />
              </a>
              <a
                href="mailto:sufailahammed316@gmail.com"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-border text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Sufail Ahammed N. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
} 