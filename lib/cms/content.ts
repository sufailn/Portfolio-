import { z } from 'zod';

const contentUrlSchema = z.string().refine(
  (value) => !value || value.startsWith('/') || value.startsWith('#') || /^(https?:|mailto:|tel:)/i.test(value),
  'Use a relative, HTTP(S), mailto, or tel URL.'
);

const linkSchema = z.object({
  label: z.string(),
  url: contentUrlSchema,
});

export const siteContentSchema = z.object({
  header: z.object({
    enabled: z.boolean(),
    brand: z.string(),
    navLinks: z.array(linkSchema),
    socialLinks: z.array(linkSchema),
    cvUrl: contentUrlSchema,
  }),
  hero: z.object({
    enabled: z.boolean(),
    greeting: z.string(),
    headlinePrefix: z.string(),
    rotatingWords: z.array(z.string()).min(1),
    headlineSuffix: z.string(),
    credential: z.string(),
    contactLabel: z.string(),
    cvLabel: z.string(),
    cvUrl: contentUrlSchema,
    socialLinks: z.array(linkSchema),
  }),
  career: z.object({
    enabled: z.boolean(),
    heading: z.string(),
    description: z.string(),
    timeline: z.array(z.object({
      period: z.string(),
      title: z.string(),
      organization: z.string(),
      location: z.string(),
      description: z.string(),
      type: z.enum(['work', 'education']),
    })),
  }),
  skills: z.object({
    enabled: z.boolean(),
    heading: z.string(),
    description: z.string(),
    additionalHeading: z.string(),
    groups: z.array(z.object({
      title: z.string(),
      icon: z.string(),
      skills: z.array(z.object({
        name: z.string(),
        level: z.number().min(0).max(100),
      })),
    })),
  }),
  projects: z.object({
    enabled: z.boolean(),
    heading: z.string(),
    description: z.string(),
    items: z.array(z.object({
      title: z.string(),
      description: z.string(),
      image: contentUrlSchema,
      tech: z.array(z.string()),
      link: z.string(),
    })),
  }),
  workflow: z.object({
    enabled: z.boolean(),
    heading: z.string(),
    description: z.string(),
    steps: z.array(z.object({
      number: z.string(),
      title: z.string(),
      description: z.string(),
      icon: z.string(),
    })),
  }),
  contact: z.object({
    enabled: z.boolean(),
    heading: z.string(),
    description: z.string(),
    email: z.string(),
    location: z.string(),
    availability: z.string(),
    formHeading: z.string(),
    form: z.object({
      nameLabel: z.string(),
      namePlaceholder: z.string(),
      emailLabel: z.string(),
      emailPlaceholder: z.string(),
      messageLabel: z.string(),
      messagePlaceholder: z.string(),
      submitLabel: z.string(),
    }),
    socialLinks: z.array(linkSchema),
  }),
  footer: z.object({
    enabled: z.boolean(),
    name: z.string(),
    profileImage: contentUrlSchema,
    description: z.string(),
    phones: z.array(z.object({
      phoneNumber: z.string(),
      location: z.string(),
    })),
    quickLinks: z.array(linkSchema),
    socialLinks: z.array(linkSchema),
  }),
});

export type SiteContent = z.infer<typeof siteContentSchema>;

export const defaultSiteContent: SiteContent = {
  header: {
    enabled: true,
    brand: 'SUFAIL NALAKATH.',
    navLinks: [
      { label: 'HOME', url: '#' },
      { label: 'WORK', url: '#projects' },
      { label: 'SKILLS', url: '#skills' },
      { label: 'CAREER', url: '#career' },
      { label: 'CONTACT', url: '#contact' },
    ],
    socialLinks: [
      { label: 'GitHub', url: 'https://github.com/sufailn' },
      { label: 'LinkedIn', url: 'https://www.linkedin.com/in/sufailahammed' },
      { label: 'Email', url: 'mailto:sufailahammed316@gmail.com' },
    ],
    cvUrl: '/documents/Sufail_Ahammed_N_CV.pdf',
  },
  hero: {
    enabled: true,
    greeting: "Hi, I'm Sufail Ahammed N",
    headlinePrefix: 'CREATIVE',
    rotatingWords: ['WEBFLOW', 'NEXTJS', 'REACT', 'CUSTOM CMS', 'WORDPRESS', 'MERN STACK'],
    headlineSuffix: 'DEVELOPER',
    credential: 'MERN STACK CERTIFIED DEVELOPER',
    contactLabel: 'Get In Touch',
    cvLabel: 'Download CV',
    cvUrl: '/documents/Sufail_Ahammed_N_CV.pdf',
    socialLinks: [
      { label: 'GitHub', url: 'https://github.com/sufailn' },
      { label: 'LinkedIn', url: 'https://www.linkedin.com/in/sufail-n/' },
      { label: 'Email', url: 'mailto:sufailahammed316@gmail.com' },
      { label: 'Phone', url: 'tel:+919562026070' },
    ],
  },
  career: {
    enabled: true,
    heading: 'Career Journey',
    description: 'My professional timeline showcasing my experience and growth in the tech industry',
    timeline: [
      {
        period: 'Mar 2024 - Jun 2025',
        title: 'Full Stack Developer',
        organization: 'Com Digital Marketing',
        location: 'Wayanad, India',
        description: 'Managed development of scalable web applications focusing on clean, maintainable code. Enhanced backend system performance by 30% and improved frontend responsiveness, resulting in 20% increased user satisfaction.',
        type: 'work',
      },
      {
        period: 'Jan 2022 - Feb 2024',
        title: 'Freelance Frontend Developer',
        organization: 'Self-employed',
        location: 'Calicut, India',
        description: 'Developed responsive landing pages and SPAs using modern frontend technologies. Built reusable components, optimized performance, and implemented SEO and accessibility best practices.',
        type: 'work',
      },
      {
        period: 'Jun 2024 - Sep 2024',
        title: 'Web Development Intern',
        organization: 'Inmakes Infotech Pvt. Ltd',
        location: 'Kochi, India',
        description: 'Increased user engagement 25% by developing MEAN stack apps with responsive UI and optimized backend.',
        type: 'work',
      },
      {
        period: '2022 - 2024',
        title: 'Master of Computer Applications',
        organization: 'APJ Abdul Kalam Technological University',
        location: 'Kozhikode, India',
        description: 'Advanced studies in software development, data structures, algorithms, and modern web technologies.',
        type: 'education',
      },
      {
        period: '2019 - 2022',
        title: 'Bachelor of Computer Applications',
        organization: 'University of Calicut',
        location: 'Malappuram, India',
        description: 'Foundation in computer science, programming fundamentals, and software development principles.',
        type: 'education',
      },
    ],
  },
  skills: {
    enabled: true,
    heading: 'TECHNOLOGY STACK',
    description: 'Frontend Developer with 3+ years of experience building high-performance, production-ready web applications, specializing in modern frameworks and responsive design',
    additionalHeading: 'Additional Skills',
    groups: [
      { title: 'Frontend', icon: 'Globe', skills: [
        { name: 'React/Next.js', level: 95 }, { name: 'TypeScript', level: 90 },
        { name: 'Angular', level: 85 }, { name: 'HTML5/CSS3', level: 95 },
        { name: 'Tailwind CSS', level: 95 },
      ] },
      { title: 'Backend', icon: 'Server', skills: [
        { name: 'Node.js', level: 85 }, { name: 'Express.js', level: 80 },
        { name: 'Python', level: 75 }, { name: 'Flask/Django', level: 70 },
        { name: 'PHP', level: 65 },
      ] },
      { title: 'Database', icon: 'Database', skills: [
        { name: 'MongoDB', level: 85 }, { name: 'PostgreSQL', level: 80 },
        { name: 'MySQL', level: 80 }, { name: 'Supabase', level: 85 },
        { name: 'Neon', level: 75 },
      ] },
      { title: 'DevOps & Tools', icon: 'Code2', skills: [
        { name: 'Git/GitHub', level: 90 }, { name: 'AWS', level: 75 },
        { name: 'CI/CD', level: 80 }, { name: 'CMS (Custom)', level: 85 },
        { name: 'REST APIs', level: 95 },
      ] },
      { title: 'Professional Skills', icon: 'Briefcase', skills: [
        { name: 'Problem Solving', level: 95 }, { name: 'Project Management', level: 85 },
        { name: 'Communication', level: 90 }, { name: 'Critical Thinking', level: 90 },
        { name: 'Continuous Learning', level: 95 },
      ] },
      { title: 'Methodologies', icon: 'Layers', skills: [
        { name: 'Agile/SCRUM', level: 90 }, { name: 'Responsive Design', level: 95 },
        { name: 'SEO Optimization', level: 85 }, { name: 'Accessibility (WCAG)', level: 80 },
        { name: 'Performance Tuning', level: 90 },
      ] },
      { title: 'Languages & Education', icon: 'GraduationCap', skills: [
        { name: 'English', level: 95 }, { name: 'Malayalam', level: 100 },
        { name: 'Hindi', level: 85 }, { name: 'MCA Degree', level: 100 },
        { name: 'BCA Degree', level: 100 },
      ] },
    ],
  },
  projects: {
    enabled: true,
    heading: 'RELEVANT PROJECTS',
    description: 'A collection of my most recent work',
    items: [
      { title: 'GlideAway Migration Service', description: 'A responsive web application for Visa Services business using modern web technologies and optimized user experience.', image: '/images/glidewaymigration.png', tech: ['Next.js', 'Tailwind CSS', 'React'], link: 'https://www.glidewaymigration.com/' },
      { title: 'Smart Licence System', description: 'Vehicle safety system using Python Flask and Flutter with RFID authentication and alcohol detection integration.', image: '/images/digilicencce.jpg', tech: ['Python', 'Flask', 'Flutter', 'Arduino'], link: 'https://github.com/sufailn/SmartLicence' },
      { title: 'Glideway Tourism', description: 'Dynamic travel platform for seamless tour planning and booking with optimized performance and user engagement.', image: '/images/image 24.png', tech: ['React', 'Node.js', 'MongoDB'], link: 'https://www.glidewaytourism.com/' },
      { title: 'Plante', description: 'A versatile online platform for plant enthusiasts, focusing on a seamless shopping experience and reliable performance.', image: '/images/plante.png', tech: ['React', 'Node.js', 'MongoDB'], link: 'https://planteuae.com/' },
      { title: 'Medconnect', description: 'A comprehensive MEAN stack application for hospital appointment booking with dedicated sections for Appointments, Doctors, and Patients.', image: '/images/medconnect.jpg', tech: ['Next.js', 'Tailwind CSS', 'React'], link: 'https://medconnect-billing.vercel.app/' },
      { title: 'Legend Foods', description: 'A responsive web application for a food brand using modern web technologies and optimized user experience.', image: '/images/legend.jpg', tech: ['Next.js', 'Tailwind CSS', 'React'], link: 'https://www.legendfoods.ae/' },
      { title: 'Doctor Appointment Management System', description: 'A comprehensive MEAN stack application for streamlining hospital appointment booking with dedicated sections for Appointments, Doctors, and Patients.', image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80', tech: ['Angular', 'Node.js', 'MongoDB', 'Express'], link: '#' },
      { title: 'Lawyers World', description: 'A responsive web application for visa services using modern web technologies and optimized user experience.', image: '/images/law-firm-2.jpg', tech: ['Next.js', 'Tailwind CSS', 'React'], link: 'https://thelawyersworld.vercel.app/' },
      { title: 'NotSuitable', description: 'An edgy fashion brand with a distinct personality and a visually minimal yet bold e-commerce interface.', image: '/images/notsuitable.jpg', tech: ['Next.js', 'Tailwind CSS', 'React'], link: 'https://www.notsuitable.in/' },
      { title: 'Zica Bella', description: 'A modern fashion e-commerce platform with secure payments, dynamic product management, user accounts, and order tracking.', image: '/images/zicabella.jpg', tech: ['Next.js', 'Supabase', 'PostgreSQL', 'Tailwind CSS', 'TypeScript'], link: 'https://www.zicabella.com/' },
      { title: 'Comdigitalmarketing', description: 'A modern digital marketing platform built with Next.js, Tailwind, and TypeScript, focusing on campaign management, analytics, and lead generation.', image: '/images/comdigitalmarketing.jpg', tech: ['Next.js', 'Tailwind CSS', 'TypeScript'], link: 'https://www.comdigitalmarketing.com/' },
    ],
  },
  workflow: {
    enabled: true,
    heading: 'My Development Process',
    description: 'A streamlined approach to bringing your digital vision to life in four carefully crafted stages',
    steps: [
      { number: '01', title: 'UX / Wireframing', description: 'Creating intuitive user flows and wireframes to establish the foundation of your digital presence.', icon: 'Workflow' },
      { number: '02', title: 'Web Design', description: 'Crafting visually stunning and responsive designs that align with your brand identity.', icon: 'Palette' },
      { number: '03', title: 'Web Development', description: 'Building robust and scalable applications using cutting-edge technologies.', icon: 'Code' },
      { number: '04', title: 'Testing & Deployment', description: 'Rigorous testing and seamless deployment to ensure optimal performance.', icon: 'Monitor' },
    ],
  },
  contact: {
    enabled: true,
    heading: 'Drop Me a Line',
    description: "I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision.",
    email: 'sufailahammed316@gmail.com',
    location: 'Calicut, Kerala, India and Dubai, UAE',
    availability: 'Available for freelance projects',
    formHeading: 'Send a Message',
    form: {
      nameLabel: 'Name',
      namePlaceholder: 'Your Name',
      emailLabel: 'Email',
      emailPlaceholder: 'your.email@example.com',
      messageLabel: 'Message',
      messagePlaceholder: 'Tell us a little bit about yourself',
      submitLabel: 'Submit',
    },
    socialLinks: [
      { label: 'GitHub', url: 'https://github.com/sufailn' },
      { label: 'LinkedIn', url: 'https://www.linkedin.com/in/sufailahammed' },
      { label: 'WhatsApp', url: 'https://wa.me/919562026070' },
    ],
  },
  footer: {
    enabled: true,
    name: 'Sufail Ahammed N',
    profileImage: '/images/model_bw.png',
    description: 'Full Stack Developer specializing in creating beautiful and functional web applications.',
    phones: [
      { phoneNumber: '+971 567435303', location: 'Dubai' },
      { phoneNumber: '+91 9562026070', location: 'India' },
    ],
    quickLinks: [
      { label: 'Home', url: '#' },
      { label: 'Skills', url: '#skills' },
      { label: 'Projects', url: '#projects' },
      { label: 'Career', url: '#career' },
      { label: 'Workflow', url: '#workflow' },
      { label: 'Contact', url: '#contact' },
    ],
    socialLinks: [
      { label: 'GitHub', url: 'https://github.com/sufailn' },
      { label: 'LinkedIn', url: 'https://linkedin.com/in/sufail-ahammed-n' },
      { label: 'WhatsApp', url: 'https://wa.me/919562026070' },
      { label: 'Email', url: 'mailto:sufailahammed316@gmail.com' },
    ],
  },
};

export const siteContentSectionNames = [
  'header',
  'hero',
  'career',
  'skills',
  'projects',
  'workflow',
  'contact',
  'footer',
] as const;
