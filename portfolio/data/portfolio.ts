import { FaLinkedin, FaGithub, FaCode } from 'react-icons/fa';
import { 
  SiJavascript, SiTypescript, SiPython, SiJava, SiCplusplus,
  SiReact, SiNextdotjs, SiTailwindcss, SiHtml5, SiCss3,
  SiNodedotjs, SiExpress, SiDjango, SiSpringboot,
  SiPostgresql, SiMongodb, SiRedis, SiMysql,
  SiGit, SiDocker, SiAmazonaws, SiVercel, SiPostman
} from 'react-icons/si';
import { PortfolioData } from '@/types';

export const portfolioData: PortfolioData = {
  personal: {
    name: 'Maedot Alemu',
    title: 'Software Engineering Student',
    description: 'Passionate software engineering student at Addis Ababa University with hands-on experience in full-stack development, cloud technologies, and building scalable applications. Focused on creating accessible, performant, and user-friendly solutions.',
    email: 'alemu.maedot@gmail.com',
    phone: '+251911660356',
    location: 'Addis Ababa, Ethiopia',
    socialLinks: [
      {
        platform: 'LinkedIn',
        url: 'https://linkedin.com/in/maedot-alemu',
        icon: FaLinkedin,
      },
      {
        platform: 'GitHub',
        url: 'https://github.com/maedot-alemu',
        icon: FaGithub,
      },
      {
        platform: 'LeetCode',
        url: 'https://leetcode.com/maedot-alemu',
        icon: FaCode,
      },
    ],
  },

  experiences: [
    {
      id: 'exp-1',
      company: 'Eskalate',
      role: 'Software Engineering Intern',
      duration: 'Jun 2024 - Present',
      startDate: '2024-06-01',
      endDate: 'Present',
      responsibilities: [
        'Developed and maintained full-stack web applications using modern frameworks',
        'Collaborated with cross-functional teams to deliver high-quality software solutions',
        'Implemented responsive UI components and optimized application performance',
        'Participated in code reviews and contributed to best practices documentation',
      ],
      technologies: ['React', 'TypeScript', 'Node.js', 'Next.js', 'Tailwind CSS'],
    },
    {
      id: 'exp-2',
      company: 'ETM Software PLC',
      role: 'Software Engineering Intern',
      duration: 'Jan 2024 - May 2024',
      startDate: '2024-01-01',
      endDate: '2024-05-31',
      responsibilities: [
        'Built RESTful APIs and integrated third-party services',
        'Worked on database design and optimization for improved query performance',
        'Implemented authentication and authorization systems',
        'Contributed to agile development processes and sprint planning',
      ],
      technologies: ['Node.js', 'Express', 'PostgreSQL', 'Docker', 'AWS'],
    },
    {
      id: 'exp-3',
      company: 'A Plus Online Tutors',
      role: 'Software Engineering Intern',
      duration: 'Aug 2023 - Dec 2023',
      startDate: '2023-08-01',
      endDate: '2023-12-31',
      responsibilities: [
        'Developed educational platform features for online tutoring',
        'Created interactive user interfaces for student-teacher interactions',
        'Implemented real-time communication features',
        'Optimized application for mobile and desktop experiences',
      ],
      technologies: ['React', 'JavaScript', 'MongoDB', 'Socket.io'],
    },
    {
      id: 'exp-4',
      company: 'Cheche',
      role: 'Software Engineering Intern',
      duration: 'Mar 2023 - Jul 2023',
      startDate: '2023-03-01',
      endDate: '2023-07-31',
      responsibilities: [
        'Assisted in developing web applications and features',
        'Learned software development best practices and design patterns',
        'Participated in team meetings and technical discussions',
        'Contributed to bug fixes and feature enhancements',
      ],
      technologies: ['JavaScript', 'HTML', 'CSS', 'Git'],
    },
  ],

  projects: [
    {
      id: 'proj-1',
      name: 'BuildCred',
      description: 'A comprehensive platform for managing construction projects with real-time collaboration, document management, and progress tracking. Built with modern web technologies focusing on performance, accessibility, and user experience.',
      duration: '2024',
      techStack: ['Next.js', 'TypeScript', 'React Context API', 'Tailwind CSS', 'PostgreSQL'],
      features: [
        {
          description: 'Comprehensive test coverage ensuring code quality and reliability',
          metric: '80%+ test coverage',
        },
        {
          description: 'Full accessibility compliance for inclusive user experience',
          metric: 'WCAG 2.2 AA compliant',
        },
        {
          description: 'Optimized performance with server-side rendering and static generation',
          metric: '<2s load times',
        },
        {
          description: 'Scalable architecture supporting concurrent users',
          metric: '1,000+ concurrent users',
        },
        {
          description: 'State management using React Context API for efficient data flow',
        },
        {
          description: 'Server-side rendering (SSR) and static site generation (SSG) for optimal performance',
        },
      ],
      githubUrl: 'https://github.com/maedot-alemu/buildcred',
      liveUrl: 'https://buildcred.vercel.app',
    },
    {
      id: 'proj-2',
      name: 'Parcel Delivery System',
      description: 'A distributed microservices-based parcel delivery system with real-time tracking, automated notifications, and payment processing. Designed for scalability and reliability using message queues and event-driven architecture.',
      duration: '2023-2024',
      techStack: ['Node.js', 'Express', 'RabbitMQ', 'PostgreSQL', 'Docker', 'Redis'],
      features: [
        {
          description: 'Microservices architecture with independent user service',
        },
        {
          description: 'Order management service for parcel tracking and status updates',
        },
        {
          description: 'Payment service integration for secure transactions',
        },
        {
          description: 'Real-time notification service using RabbitMQ message broker',
        },
        {
          description: 'Event-driven communication between services for loose coupling',
        },
        {
          description: 'Containerized deployment using Docker for consistency across environments',
        },
      ],
      githubUrl: 'https://github.com/maedot-alemu/parcel-delivery',
    },
  ],

  skills: [
    {
      category: 'Languages',
      skills: [
        { name: 'JavaScript', icon: SiJavascript },
        { name: 'TypeScript', icon: SiTypescript },
        { name: 'Python', icon: SiPython },
        { name: 'Java', icon: SiJava },
        { name: 'C++', icon: SiCplusplus },
      ],
    },
    {
      category: 'Frontend',
      skills: [
        { name: 'React', icon: SiReact },
        { name: 'Next.js', icon: SiNextdotjs },
        { name: 'Tailwind CSS', icon: SiTailwindcss },
        { name: 'HTML5', icon: SiHtml5 },
        { name: 'CSS3', icon: SiCss3 },
      ],
    },
    {
      category: 'Backend',
      skills: [
        { name: 'Node.js', icon: SiNodedotjs },
        { name: 'Express', icon: SiExpress },
        { name: 'Django', icon: SiDjango },
        { name: 'Spring Boot', icon: SiSpringboot },
      ],
    },
    {
      category: 'Databases',
      skills: [
        { name: 'PostgreSQL', icon: SiPostgresql },
        { name: 'MongoDB', icon: SiMongodb },
        { name: 'Redis', icon: SiRedis },
        { name: 'MySQL', icon: SiMysql },
      ],
    },
    {
      category: 'Tools',
      skills: [
        { name: 'Git', icon: SiGit },
        { name: 'Docker', icon: SiDocker },
        { name: 'AWS', icon: SiAmazonaws },
        { name: 'Vercel', icon: SiVercel },
        { name: 'Postman', icon: SiPostman },
      ],
    },
  ],

  education: {
    institution: 'Addis Ababa University',
    degree: 'Bachelor of Science',
    field: 'Software Engineering',
    startDate: '2021',
    endDate: '2026',
    gpa: '3.85/4.0',
  },
};
