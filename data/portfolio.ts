import { PortfolioData } from "../types";

export const portfolioData: PortfolioData = {
    personal: {
        name: "Maedot Alemu",
        title: "Full-Stack Developer",
        description: "I am a dedicated Full-Stack Developer with a passion for building scalable, responsive, and user-centric applications. Experienced in modern web technologies, distributed systems, and competitive programming.",
        email: "maedotamha@gmail.com",
        phone: "+251966017715",
        location: "Addis Ababa, Ethiopia",
        socialLinks: [
            { platform: "LinkedIn", url: "https://linkedin.com/in/maedotamha", iconName: "FaLinkedin" },
            { platform: "GitHub", url: "https://github.com/maedotamha", iconName: "FaGithub" },
            { platform: "LeetCode", url: "https://leetcode.com/maedotamha", iconName: "SiLeetcode" },
        ],
    },
    experiences: [
        {
            id: "cheche",
            company: "Cheche",
            role: "Full Stack Developer",
            duration: "05/2025 – Present",
            location: "Addis Ababa, Ethiopia",
            startDate: "2025-05-01",
            endDate: "Present",
            responsibilities: [
                "Developed Tickflows, an essential internal workflow and progress tracking tool, by building an application acceptance platform with API-driven data access and custom review workflows.",
                "Refactored key components of Tickflows using modern architecture, contributing to a 60% boost in platform performance.",
                "Maintained a consistent 95% on-time delivery rate."
            ],
            technologies: ["React", "Node.js", "API Design", "Performance Optimization"],
        },
        {
            id: "eskalate",
            company: "Eskalate",
            role: "Full Stack Developer | Product Manager",
            duration: "05/2024 – 09/2025",
            location: "Addis Ababa, Ethiopia",
            startDate: "2024-05-01",
            endDate: "2025-09-30",
            responsibilities: [
                "Built an application acceptance platform with automated review workflows, streamlined submissions, and API-based data access.",
                "Developed key application features using modern architecture practices, improving platform reliability, test coverage, and performance by 60%.",
                "Directed a 15-member team as Scrum Master, consistently achieving a 95% sprint on-time delivery rate for product features."
            ],
            technologies: ["Full Stack", "Agile", "Scrum", "Architecture Design"],
        },
        {
            id: "etm-software",
            company: "ETM Software plc",
            role: "Frontend Developer",
            duration: "06/2024 – 11/2024",
            location: "Addis Ababa, Ethiopia",
            startDate: "2024-06-01",
            endDate: "2024-11-30",
            responsibilities: [
                "Collaborated with 10+ developers on Keyu Gasha, an insurance management system serving 500+ clients.",
                "Integrated Redux Toolkit and NextAuth, streamlining data flow across 10+ components.",
                "Optimised UI for cross-device accessibility and responsiveness, increasing customer usability."
            ],
            technologies: ["Next.js", "Redux Toolkit", "NextAuth", "Tailwind CSS"],
        }
    ],
    projects: [
        {
            id: "navAR",
            name: "NavAR",
            description: "A real-time, cross-platform AR wayfinding system with hybrid QR/Wi-Fi positioning, engineered for high accuracy and accessibility.",
            duration: "06/2025 – Present",
            techStack: ["Unity", "AR Foundation", "Node.js", "Express", "PostgreSQL"],
            features: [
                { description: "Architected hybrid QR/Wi-Fi positioning system", metric: "~3m accuracy" },
                { description: "Engineered multilingual audio and high-contrast mode for accessibility" },
                { description: "Built analytics dashboard with movement heatmaps", metric: "40% faster navigation" },
            ],
        },
        {
            id: "dineQ",
            name: "DineQ",
            description: "End-to-end system design for restaurant PWA and mobile clients with OCR-based digitization to eliminate menu language barriers.",
            duration: "05/2025 – 10/2025",
            techStack: ["Go", "Gin", "MongoDB", "Clean Architecture", "JWT", "Next.js", "NextAuth", "OCR"],
            features: [
                { description: "Supporting scalable solutions for numerous restaurants", metric: "6,000+" },
                { description: "Developed Amharic/English OCR-based digitization pipeline" },
                { description: "Coordinated 13-member cross-functional team" },
            ],
            githubUrl: "https://github.com/RealEskalate/G6-MenuMate",
        },
        {
            id: "smart-farming",
            name: "Smart Farming System",
            description: "Distributed IoT platform automating greenhouse operations with 12+ sensors and predictive weather integration.",
            duration: "06/2024 – 05/2025",
            techStack: ["IoT", "Node.js", "PostgreSQL", "Clean Architecture", "Weather API"],
            features: [
                { description: "Automated irrigation and shading logic", metric: "95% consistency" },
                { description: "Integrated weather forecast for predictive planning" },
                { description: "Architected modular API layer for scalable deployment" },
            ],
            githubUrl: "https://github.com/maedotamha/Modern-Farming-Mechanism",
        },
        {
            id: "cam-link",
            name: "Cam-Link",
            description: "LAN-based streaming platform for real-time multi-camera feeds in classrooms, addressing infrastructure gaps.",
            duration: "06/2024 – 12/2024",
            techStack: ["Django", "React", "MongoDB", "Clean Architecture", "JWT", "Concurrency"],
            features: [
                { description: "Collaborative system supporting multiple camera inputs", metric: "10+" },
                { description: "First place winner for addressing classroom infrastructure gaps" },
                { description: "High-performance React components for scalable streaming" },
            ],
            githubUrl: "https://github.com/Abu388/CamLink",
        },
        {
            id: "tickflow",
            name: "TickFlow",
            description: "Essential internal workflow and progress tracking tool with API-driven data access and custom review workflows.",
            duration: "2024",
            techStack: ["React", "Next.js", "TypeScript", "PostgreSQL", "Node.js"],
            features: [
                { description: "Application acceptance platform with automated workflows" },
                { description: "Streamlined submissions and API-based data access" },
                { description: "60% boost in platform performance through refactoring" },
            ],
            liveUrl: "https://tickflow-test.cheche.et/",
        },
        {
            id: "buildcred",
            name: "BuildCred",
            description: "A comprehensive credential building and validation platform focused on test coverage, accessibility, and high performance.",
            duration: "03/2024 – 04/2024",
            techStack: ["Next.js", "TypeScript", "Tailwind CSS", "NextAuth.js", "Axios", "MSW", "Jest"],
            features: [
                { description: "Implemented React Context API and error boundaries, decreasing crashes and enabling faster debugging" },
                { description: "Enhanced application performance using Next.js SSR and SSG, cutting load times to under 2s", metric: "<2s" },
            ],
            githubUrl: "https://github.com/BuildCred/buildcred-backend",
        },
        {
            id: "parcel-delivery",
            name: "Parcel Delivery System",
            description: "A distributed microservices architecture for managing logistics and parcel tracking with real-time updates and an event-driven design.",
            duration: "2024",
            techStack: ["Node.js", "RabbitMQ", "Microservices", "Docker"],
            features: [
                { description: "Distributed message handling via RabbitMQ for reliable subsystem communication" },
                { description: "Independent User, Order, Payment, and Notification services" },
                { description: "Event-driven architecture for scalable distributed workloads" },
            ],
            githubUrl: "https://github.com/meklithab/distributed-parcel-delivery-system",
        },
    ],
    skillCategories: [
        {
            category: "Languages",
            skills: [
                { name: "TypeScript", iconName: "SiTypescript" },
                { name: "JavaScript", iconName: "SiJavascript" },
                { name: "Python", iconName: "SiPython" },
                { name: "Go", iconName: "SiGo" },
                { name: "C++", iconName: "SiCplusplus" },
            ],
        },
        {
            category: "Frontend",
            skills: [
                { name: "React", iconName: "FaReact" },
                { name: "Next.js", iconName: "SiNextdotjs" },
                { name: "Tailwind CSS", iconName: "SiTailwindcss" },
                { name: "Redux", iconName: "SiRedux" },
            ],
        },
        {
            category: "Backend",
            skills: [
                { name: "Node.js", iconName: "FaNodeJs" },
                { name: "Django", iconName: "SiDjango" },
                { name: "Gin", iconName: "SiGo" },
                { name: "RabbitMQ", iconName: "SiRabbitmq" },
            ],
        },
        {
            category: "Databases",
            skills: [
                { name: "PostgreSQL", iconName: "SiPostgresql" },
                { name: "MongoDB", iconName: "SiMongodb" },
                { name: "MySQL", iconName: "SiMysql" },
            ],
        },
        {
            category: "Tools",
            skills: [
                { name: "Docker", iconName: "FaDocker" },
                { name: "Git", iconName: "FaGitAlt" },
                { name: "AWS", iconName: "FaAws" },
                { name: "Scrum", iconName: "SiAsana" },
            ],
        },
    ],
    education: [
        {
            institution: "Addis Ababa Science and Technology University",
            degree: "B.Sc. in Software Engineering",
            field: "Software Engineering",
            startDate: "05/2022",
            endDate: "07/2026",
            location: "Addis Ababa, Ethiopia",
            coursework: [
                "Internet Programming",
                "Database Systems",
                "OOP(Java)",
                "Operating Systems",
                "Mobile Computing",
                "Computer Graphics",
                "Embedded Systems",
                "Distributed Systems",
                "AI and ML"
            ],
        },
        {
            institution: "Africa to Silicon Valley (A2SV)",
            degree: "Competitive Programming and Coding Academy",
            field: "Computer Science",
            startDate: "2023",
            endDate: "2025",
            coursework: [
                "Advanced Data Structures and Algorithms",
                "Graph and Tree Algorithms",
                "Dynamic Programming",
                "Advanced String Algorithms"
            ],
        }
    ],
    certifications: [
        {
            id: "aws-cp",
            name: "AWS Certified Cloud Practitioner",
            issuer: "AWS",
            date: "2024",
        },
    ]
};
