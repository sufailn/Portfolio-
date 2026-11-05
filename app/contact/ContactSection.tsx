"use client"
import { motion } from 'framer-motion';
import { Mail, MapPin, Calendar, Github, Linkedin, MessageSquare } from 'lucide-react';
import { ContactForm } from '@/components/contact/contact-form';
import CVDownload from '@/components/ui/cv-download';
import type { SiteContent } from '@/lib/cms/content';

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

export default function ContactSection({ content }: { content: SiteContent['contact'] }) {
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
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-space-grotesk bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">{content.heading}</h2>
            <p className="text-white/80 text-lg mb-8 max-w-md">
              {content.description}
            </p>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-1 font-space-grotesk">Email Me</h3>
                  <a href={`mailto:${content.email}`} className="text-white/70 hover:text-white transition-colors">
                  {content.email}
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
                    {content.location}
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
                    {content.availability}
                  </p>
                </div>
              </div>

              <div className="flex space-x-4 mt-8">
                {content.socialLinks.map((social) => {
                  const icons = { GitHub: Github, LinkedIn: Linkedin, WhatsApp: MessageSquare };
                  const SocialIcon = icons[social.label as keyof typeof icons] || MessageSquare;
                  return (
                    <a key={social.url} href={social.url} target="_blank" rel="noopener noreferrer" aria-label={social.label} className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors">
                      <SocialIcon className="w-6 h-6" />
                    </a>
                  );
                })}
              </div>

              {/* CV Download Card */}
              <motion.div
                className="mt-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <CVDownload variant="card" />
              </motion.div>
            </div>
          </div>
          <div className="bg-black/50 backdrop-blur-md p-6 md:p-8 rounded-2xl border border-white/10 shadow-xl">
            <h3 className="text-2xl font-bold mb-6 font-space-grotesk">{content.formHeading}</h3>
            <ContactForm content={content.form} />
          </div>
        </div>
      </motion.div>
    </section>
  );
} 