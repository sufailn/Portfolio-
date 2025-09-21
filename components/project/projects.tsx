"use client";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { SoundButton } from '@/components/ui/sound-button';
import Image from 'next/image';
import { useSound } from '@/components/sound-provider';

const Projects = ({ projects }: any) => {
  const { playClickSound } = useSound();

  const containerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0
    },
    hover: {
      scale: 1.03,
      transition: { duration: 0.3 }
    }
  };

  const itemTransition = {
    duration: 0.5
  };

  const textVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  const imageVariants = {
    hover: {
      scale: 1.1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section id="projects" className="py-20 px-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-6xl mx-auto"
      >
        <motion.h2
          variants={textVariants}
          className="text-3xl font-bold text-center mb-12"
        >
          Featured Projects
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects?.map((project: any, index: number) => (
            <motion.div
              key={index}
              variants={itemVariants}
              transition={itemTransition}
              whileHover="hover"
              className="group relative overflow-hidden rounded-lg shadow-lg cursor-pointer"
              onHoverStart={() => playClickSound()}
              onClick={() => playClickSound()}
            >
              <div className="relative h-64 overflow-hidden rounded-lg">
                <motion.div
                  variants={imageVariants}
                  className="h-full w-full"
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30 backdrop-blur-[2px] transition-all duration-300 group-hover:backdrop-blur-[4px]">
                  <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-6">
                    <motion.h3
                      variants={textVariants}
                      className="text-xl font-bold mb-2 text-center"
                    >
                      {project.title}
                    </motion.h3>
                    <motion.p
                      variants={textVariants}
                      className="text-sm text-center mb-4 text-white/80"
                    >
                      {project.description}
                    </motion.p>
                    <motion.div
                      variants={textVariants}
                      className="flex flex-wrap justify-center gap-2 mb-4"
                    >
                      {project?.tech?.map((tech: any, i: any) => (
                        <motion.span
                          key={i}
                          className="px-2 py-1 bg-white/20 rounded-full text-xs backdrop-blur-sm hover:bg-white/30 transition-colors"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            playClickSound();
                          }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </motion.div>
                    <motion.div variants={textVariants}>
                      <SoundButton
                        variant="outline"
                        size="sm"
                        className="text-white border-white hover:bg-white/20 transition-all duration-300 transform group-hover:translate-y-0 opacity-100"
                        asChild
                      >
                        <a href={project.link} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                          View Project <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                      </SoundButton>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

export default Projects;