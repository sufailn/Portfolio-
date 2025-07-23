"use client"

import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { useInView } from 'react-intersection-observer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Navbar } from '@/components/navbar';
import { ContactForm } from '@/components/contact/contact-form';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Phone,
  Code2,
  Database,
  Globe,
  Server,
  ExternalLink,
  Workflow,
  Palette,
  Code,
  Monitor,
  Send,
  MapPin,
  Calendar
} from 'lucide-react';

export default function Home() {
  const [heroRef, heroInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

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

  const projects = [
    {
      title: "GlideAway Migration Service",
      description: "A responsive web application for Visa Services business using modern web technologies and optimized user experience.",
      image: "/images/glidewaymigration.png",
      tech: ["Next.js", "Tailwind CSS", "React"],
      link: "https://www.glidewaymigration.com/"
    },
    {
      title: "Smart Licence System",
      description: "Vehicle safety system using Python Flask and Flutter with RFID authentication and alcohol detection integration.",
      image: "/images/digilicencce.jpg",
      tech: ["Python", "Flask", "Flutter", "Arduino"],
      link: "https://github.com/sufailn/SmartLicence"
    },
    {
      title: "Glideway Tourism",
      description: "Dynamic travel platform for seamless tour planning and booking with optimized performance and user engagement.",
      image: "images/image 24.png",
      tech: ["React", "Node.js", "MongoDB"],
      link: "https://www.glidewaytourism.com/"
    },
    {
      title: "Plante",
      description: "A versatile online platform for plant enthusiasts, focusing on a seamless shopping experience and reliable performance.",
      image: "images/plante.png",
      tech: ["React", "Node.js", "MongoDB"],
      link: "https://planteuae.com/"
    },
    {
      title: "Medconnect",
      description: "A comprehensive MEAN stack application for hospital appointment booking with dedicated sections for Appointments, Doctors, and Patients.",
      image: "images/medconnect.jpg",
      tech: ["Next.js", "Tailwind CSS", "React"],
      link: "https://medconnect-billing.vercel.app/ "
    },
    {
      title: "legend foods",
      description: " A responsive web application for Visa Services business using modern web technologies and optimized user experience.",
      image: "images/legend.jpg",
      tech: ["Next.js", "Tailwind CSS", "React"],
      link: "	https://www.legendfoods.ae/ "
    },
    {
      title: "Doctor Appointment Management System",
      description: "A comprehensive MEAN stack application for streamlining hospital appointment booking with dedicated sections for Appointments, Doctors, and Patients.",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80",
      tech: ["Angular", "Node.js", "MongoDB", "Express"],
      link: "#"
    },
    {
      title: "Lawyers World",
      description: "lawyers world is a responsive web application for Visa Services business using modern web technologies and optimized user experience.",
      image: "images/law-firm-2.jpg",
      tech: ["Next.js", "Tailwind CSS", "React"],
      link: "https://thelawyersworld.vercel.app/"
    },
  ];

  const workflowSteps = [
    {
      number: "01",
      title: "UX / Wireframing",
      description: "Creating intuitive user flows and wireframes to establish the foundation of your digital presence.",
      icon: <Workflow className="h-6 w-6" />
    },
    {
      number: "02",
      title: "Web Design",
      description: "Crafting visually stunning and responsive designs that align with your brand identity.",
      icon: <Palette className="h-6 w-6" />
    },
    {
      number: "03",
      title: "Web Development",
      description: "Building robust and scalable applications using cutting-edge technologies.",
      icon: <Code className="h-6 w-6" />
    },
    {
      number: "04",
      title: "Testing & Deployment",
      description: "Rigorous testing and seamless deployment to ensure optimal performance.",
      icon: <Monitor className="h-6 w-6" />
    }
  ];

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden pt-16"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center z-10 px-4"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <TypeAnimation
              sequence={[
                'Hi, I\'m Sufail Ahammed N',
                1000,
                'Full Stack Developer',
                1000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            MCA graduate specializing in MEAN stack, React, Next.js, and Tailwind CSS. 
            Building scalable web applications with a focus on performance and user experience.
          </p>
          <div className="flex gap-4 justify-center mb-8">
            <Button variant="default" size="lg" asChild>
              <a href="#contact">Get in Touch</a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="#projects">View Projects</a>
            </Button>
          </div>
          <div className="flex gap-4 justify-center">
            <a href="https://github.com/sufailn" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="icon">
                <Github className="h-5 w-5" />
              </Button>
            </a>
            <a href="https://linkedin.com/in/sufail-ahammed-n" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="icon">
                <Linkedin className="h-5 w-5" />
              </Button>
            </a>
            <a href="mailto:sufailahammed316@gmail.com">
              <Button variant="ghost" size="icon">
                <Mail className="h-5 w-5" />
              </Button>
            </a>
            <a href="tel:+919562026070">
              <Button variant="ghost" size="icon">
                <Phone className="h-5 w-5" />
              </Button>
            </a>
          </div>
        </motion.div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4 bg-secondary/30">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-3xl font-bold text-center mb-12">Technical Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <SkillCard
              icon={<Globe className="h-8 w-8" />}
              title="Frontend"
              skills={[
                { name: "React/Next.js", level: 90 },
                { name: "Angular", level: 85 },
                { name: "TypeScript", level: 80 },
                { name: "Tailwind CSS", level: 95 },
              ]}
            />
            <SkillCard
              icon={<Server className="h-8 w-8" />}
              title="Backend"
              skills={[
                { name: "Node.js", level: 85 },
                { name: "Express.js", level: 80 },
                { name: "Python/Flask", level: 75 },
                { name: "RESTful APIs", level: 90 },
              ]}
            />
            <SkillCard
              icon={<Database className="h-8 w-8" />}
              title="Database"
              skills={[
                { name: "MongoDB", level: 85 },
                { name: "SQLite", level: 80 },
                { name: "PostgreSQL", level: 75 },
              
              ]}
            />
            <SkillCard
              icon={<Code2 className="h-8 w-8" />}
              title="Tools & Others"
              skills={[
                { name: "Git", level: 90 },
              ]}
            />
          </div>
        </motion.div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-3xl font-bold text-center mb-12">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                variants={containerVariants}
                className="group relative overflow-hidden rounded-lg"
              >
                <div className="relative h-64 overflow-hidden rounded-lg">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-6">
                      <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                      <p className="text-sm text-center mb-4">{project.description}</p>
                      <div className="flex gap-2 mb-4">
                        {project.tech.map((tech, i) => (
                          <span key={i} className="px-2 py-1 bg-white/20 rounded-full text-xs">
                            {tech}
                          </span>
                        ))}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-white border-white hover:bg-white/20"
                        asChild
                      >
                        <a href={project.link} target="_blank" rel="noopener noreferrer">
                          View Project <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Workflow Section */}
      <section className="py-20 px-4 bg-secondary/30">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-3xl font-bold text-center mb-4">My Way of Getting Things Done</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Fast and transparent, the path to owning a website that will represent your brand in the best of light is only 4 weeks away.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {workflowSteps.map((step, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { delay: index * 0.2 } }
                }}
                className="relative"
              >
                <Card className="p-6 bg-card/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-4xl font-bold text-primary/20">{step.number}</span>
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Contact Section */}
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
                I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
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

      {/* Footer */}
      <footer className="bg-card py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Sufail Ahammed N</h3>
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
    </main>
  );
}

function SkillCard({ icon, title, skills }: { icon: React.ReactNode; title: string; skills: { name: string; level: number; }[] }) {
  return (
    <Card className="p-6 hover:shadow-lg transition-shadow bg-card/50 backdrop-blur-sm">
      <div className="flex items-center gap-3 mb-6">
        {icon}
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      <div className="space-y-4">
        {skills.map((skill, index) => (
          <div key={index}>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">{skill.name}</span>
              <span className="text-sm text-muted-foreground">{skill.level}%</span>
            </div>
            <Progress value={skill.level} className="h-2" />
          </div>
        ))}
      </div>
    </Card>
  );
}