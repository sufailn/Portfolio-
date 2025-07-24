"use client";
import { motion } from "framer-motion";
import {ExternalLink}from "lucide-react";
import { Button } from '@/components/ui/button';
const Projects=({projects}:any)=>{

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
 console.log("projects",projects)
return(

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
    {projects?.map((project:any, index:number) => (
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
                {project?.tech?.map((tech:any, i:any) => (
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

)
}
export default Projects