"use client"
import { motion } from 'framer-motion';
import { Mail, MapPin, Calendar, Github, Linkedin } from 'lucide-react';
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
    <section id="contact" className="py-20 px-4 bg-gradient-to-b from-black to-black/80">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-6xl mx-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-space-grotesk bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">Drop Me a Line</h2>
            <p className="text-white/80 text-lg mb-8 max-w-md">
              I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision.
            </p>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-1 font-space-grotesk">Email Me</h3>
                  <a href="mailto:sufailahammed316@gmail.com" className="text-white/70 hover:text-white transition-colors">
                    sufailahammed316@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-1 font-space-grotesk">Location</h3>
                  <p className="text-white/70">
                    Calicut, Kerala, India
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-1 font-space-grotesk">Availability</h3>
                  <p className="text-white/70">
                    Available for freelance projects
                  </p>
                </div>
              </div>

              <div className="flex space-x-4 mt-8">
                <a href="https://github.com/sufailn" target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors">
                  <Github className="w-6 h-6" />
                </a>
                <a href="https://www.linkedin.com/in/sufailahammed" target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors">
                  <Linkedin className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
          <div className="bg-black/50 backdrop-blur-md p-6 md:p-8 rounded-2xl border border-white/10 shadow-xl">
            <h3 className="text-2xl font-bold mb-6 font-space-grotesk">Send a Message</h3>
            <ContactForm />
          </div>
        </div>
      </motion.div>
    </section>
  );
} 