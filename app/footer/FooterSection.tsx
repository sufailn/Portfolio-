"use client"

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Github, Linkedin, Mail, MessageSquare, Phone, MapPin } from 'lucide-react';
import { useSound } from '@/components/sound-provider';
import { SoundButton } from '@/components/ui/sound-button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

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
    icon: <MessageSquare className="w-5 h-5" />,
    href: "https://wa.me/919562026070",
    label: "WhatsApp"
  },
  {
    icon: <Mail className="w-5 h-5" />,
    href: "mailto:sufailahammed316@gmail.com",
    label: "Email"
  }
];

export default function FooterSection() {
  const { playClickSound } = useSound();

  // Phone call dialog component
  const PhoneDialog = ({ phoneNumber, location }: { phoneNumber: string, location: string }) => (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className="flex items-center text-muted-foreground hover:text-primary transition-colors"
          onClick={playClickSound}
        >
          <Phone className="h-5 w-5 mr-2" />
          <span>{phoneNumber}</span>
          {location && <span className="ml-2 text-xs text-muted-foreground">({location})</span>}
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <div className="flex flex-col items-center space-y-4 py-4">
          <h3 className="text-lg font-medium">Contact via {location}</h3>
          <div className="flex space-x-4">
            <SoundButton variant="default" asChild>
              <a href={`tel:${phoneNumber.replace(/\s+/g, '')}`} className="flex items-center">
                <Phone className="mr-2 h-5 w-5" />
                Call
              </a>
            </SoundButton>
            <SoundButton variant="outline" asChild>
              <a href={`https://wa.me/${phoneNumber.replace(/\s+/g, '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center">
                <MessageSquare className="mr-2 h-5 w-5" />
                WhatsApp
              </a>
            </SoundButton>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

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
            <p className="text-muted-foreground mb-4">
              Full Stack Developer specializing in creating beautiful and functional web applications.
            </p>
            <div className="space-y-1">
              <PhoneDialog phoneNumber="+971 567435303" location="Dubai" />
              <PhoneDialog phoneNumber="+91 9562026070" location="India" />
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Home
                </a>
              </li>
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
                <a href="#career" className="text-muted-foreground hover:text-primary transition-colors">
                  Career
                </a>
              </li>
              <li>
                <a href="#workflow" className="text-muted-foreground hover:text-primary transition-colors">
                  Workflow
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
                href="https://wa.me/919562026070"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <MessageSquare className="h-6 w-6" />
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