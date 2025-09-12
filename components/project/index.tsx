import Projects from './projects';

export default function Project() {
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

  {
    title: "NotSuitable",
    description: "NotSuitable is an edgy fashion brand with a distinct personality. We helped define its digital identity through a visually minimal yet bold e-commerce interface.",
    image: "/images/notsuitable.jpg",
    tech: ["Next.js", "Tailwind CSS", "React"],
    link: "https://www.notsuitable.in/"
  },
  {
    title: "Zica Bella",
    description: "Zica Bella is a modern fashion brand targeting a global audience. We built a full-fledged e-commerce platform with Next.js, Supabase, PostgreSQL, Sanity, Tailwind, and TypeScript. The platform includes secure payment gateway integration, dynamic product management, user accounts, and order tracking features.",
    image: "/images/zicabella.jpg",
    tech: ["Next.js", "Supabase", "PostgreSQL", "Sanity", "Tailwind CSS", "TypeScript"],
    link: "https://www.zicabella.com/"
  },
  {
    title: "Comdigitalmarketing",
    description: "A modern digital marketing platform built with Next.js, Tailwind, and TypeScript, focusing on campaign management, analytics, and lead generation.",
    image: "/images/comdigitalmarketing.jpg",
    tech: ["Next.js", "Tailwind CSS", "TypeScript"],
    link: "https://www.comdigitalmarketing.com/"
  },
];

  return (
    <Projects projects={projects} />
  );
}

