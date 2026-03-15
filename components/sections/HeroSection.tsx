"use client";

import { motion } from "framer-motion";
import { Button } from "../ui/Button";
import { FaLinkedin, FaGithub, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { portfolioData } from "@/data/portfolio";

export function HeroSection() {
    const { personal } = portfolioData;

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    const scrollToSection = (id: string) => {
        const elem = document.getElementById(id);
        if (elem) {
            const offset = 80;
            const bodyRect = document.body.getBoundingClientRect().top;
            const elemRect = elem.getBoundingClientRect().top;
            const elemPosition = elemRect - bodyRect;
            const offsetPosition = elemPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth",
            });
        }
    };

    return (
        <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background pt-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="text-center"
                >
                    <motion.h1
                        variants={itemVariants}
                        className="text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl lg:text-7xl"
                    >
                        Hi, I&apos;m <span className="text-primary">{personal.name}</span>
                    </motion.h1>

                    <motion.p
                        variants={itemVariants}
                        className="mx-auto mt-6 max-w-2xl text-xl text-gray-600 dark:text-gray-400 sm:text-2xl"
                    >
                        {personal.title}
                    </motion.p>

                    <motion.div
                        variants={itemVariants}
                        className="mt-8 flex flex-wrap justify-center gap-6 text-sm font-medium text-gray-500 dark:text-gray-400"
                    >
                        <div className="flex items-center gap-2">
                            <FaEnvelope className="text-primary" />
                            <span>{personal.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <FaPhoneAlt className="text-primary" />
                            <span>{personal.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <FaMapMarkerAlt className="text-primary" />
                            <span>{personal.location}</span>
                        </div>
                    </motion.div>

                    <motion.div
                        variants={itemVariants}
                        className="mt-10 flex flex-wrap justify-center gap-4"
                    >
                        <Button size="lg" onClick={() => scrollToSection("projects")}>
                            View Projects
                        </Button>
                        <Button size="lg" variant="outline" onClick={() => scrollToSection("contact")}>
                            Contact Me
                        </Button>
                    </motion.div>

                    <motion.div
                        variants={itemVariants}
                        className="mt-12 flex justify-center space-x-8"
                    >
                        {personal.socialLinks.map((link) => {
                            const Icon =
                                link.platform === "LinkedIn" ? FaLinkedin :
                                    link.platform === "GitHub" ? FaGithub :
                                        link.platform === "LeetCode" ? SiLeetcode :
                                            null;

                            if (!Icon) return null;

                            return (
                                <a
                                    key={link.platform}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 hover:text-primary transition-colors"
                                    aria-label={link.platform}
                                >
                                    <Icon size={28} />
                                </a>
                            );
                        })}
                    </motion.div>
                </motion.div>
            </div>

            {/* Background Decor */}
            <div className="absolute top-1/2 left-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[120px]" />
        </section>
    );
}
