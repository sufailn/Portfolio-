"use client"

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Github, Linkedin, Mail, MessageSquare, Phone, MapPin } from 'lucide-react';
import { useSound } from '@/components/sound-provider';
import { SoundButton } from '@/components/ui/sound-button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import type { SiteContent } from '@/lib/cms/content';

export default function FooterSection({ content }: { content: SiteContent['footer'] }) {
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
          <h3 className="text-lg font-mono uppercase tracking-tight">Contact via {location}</h3>
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
                  src={content.profileImage}
                  alt={content.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-mono uppercase tracking-tight">{content.name}</h3>
            </div>
            <p className="text-muted-foreground mb-4">
              {content.description}
            </p>
            <div className="space-y-1">
              {content.phones.map((phone) => (
                <PhoneDialog key={`${phone.phoneNumber}-${phone.location}`} phoneNumber={phone.phoneNumber} location={phone.location} />
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-xl font-mono uppercase tracking-tight mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {content.quickLinks.map((link) => (
                <li key={`${link.label}-${link.url}`}>
                  <a href={link.url} className="text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-mono uppercase tracking-tight mb-4">Connect</h3>
            <div className="flex gap-4">
              {content.socialLinks.map((social) => {
                const icons = { GitHub: Github, LinkedIn: Linkedin, WhatsApp: MessageSquare, Email: Mail };
                const SocialIcon = icons[social.label as keyof typeof icons] || Mail;
                return (
                  <a
                    key={social.url}
                    href={social.url}
                    target={social.url.startsWith('http') ? '_blank' : undefined}
                    rel={social.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                    aria-label={social.label}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    <SocialIcon className="h-6 w-6" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-border text-center text-muted-foreground">
          <p className="font-mono text-xs">&copy; {new Date().getFullYear()} {content.name.toUpperCase()}. ALL RIGHTS RESERVED.</p>
        </div>
      </div>
    </footer>
  );
} 