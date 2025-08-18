import { getProjectData } from '@/sanity/lib/queries';
import Projects from '@/components/project/projects';
import React from 'react'; 
import { type SanityDocument } from "next-sanity";

const fallbackProjects = [
  
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
      title: "Glideway Tourism ",
      description: "Dynamic travel platform for seamless tour planning and booking with optimized performance and user engagement .",
      image: "/images/image 24.png",
      tech: ["React", "Node.js", "MongoDB"],
      link: "https://www.glidewaytourism.com/"
    },
    {
      title: "Plante",
      description: "A versatile online platform for plant enthusiasts, focusing on a seamless shopping experience and reliable performance.",
      image: "/images/plante.png",
      tech: ["React", "Node.js", "MongoDB"],
      link: "https://planteuae.com/"
    },
    {
      title: "Medconnect",
      description: "A comprehensive MEAN stack application for hospital appointment booking with dedicated sections for Appointments, Doctors, and Patients.",
      image: "/images/medconnect.jpg",
      tech: ["Next.js", "Tailwind CSS", "React"],
      link: "https://medconnect-billing.vercel.app/ "
    },
    {
      title: "legend foods",
      description: " A responsive web application for Visa Services business using modern web technologies and optimized user experience.",
      image: "/images/legend.jpg",
      tech: ["Next.js", "Tailwind CSS", "React"],
      link: "https://www.legendfoods.ae/ "
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
      image: "/images/law-firm-2.jpg",
      tech: ["Next.js", "Tailwind CSS", "React"],
      link: "https://thelawyersworld.vercel.app/"
    },
  

  // Add more fallback projects as needed
];


// This component fetches project data from Sanity and displays it using the Projects component
// If no projects are found, it uses a fallback list of projects
export default async function ProjectsSection() {
  const projects = await getProjectData();
  console.log("Sanity projects:", projects); // Debug log
  const displayProjects = projects && projects.length > 0 ? projects : fallbackProjects;
  return <Projects projects={displayProjects} />;
} 