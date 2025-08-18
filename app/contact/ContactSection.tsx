"use client"
import { motion } from 'framer-motion';
import { Mail, MapPin, Calendar } from 'lucide-react';
import { ContactForm } from '@/components/contact/contact-form';

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.2
    }
  }
};

export default function ContactSection() {
  return (
    <section id="contact" className="py-20 px-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-6xl mx-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold mb-6">Drop Me a Line</h2>
            <p className="text-muted-foreground mb-8">
              I&apos;m always open to discussing new projects, creative ideas or opportunities to be part of your visions.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary" />
                <a href="mailto:sufailahammed316@gmail.com" className="hover:text-primary transition-colors">
                  sufailahammed316@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-primary" />
                <span>Calicut, India</span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-primary" />
                <span>Available for freelance projects</span>
              </div>
            </div>
          </div>
          <div>
            <ContactForm />
          </div>
        </div>
      </motion.div>
    </section>
  );
} 