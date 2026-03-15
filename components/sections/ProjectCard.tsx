"use client";

import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaCode, FaRocket } from "react-icons/fa";
import { Project } from "@/types";
import { useState, MouseEvent } from "react";

interface ProjectCardProps {
    project: Project;
    index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
    const [isHovered, setIsHovered] = useState(false);

    // Mouse position for tilt effect
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Smooth spring configuration
    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    // Transform mouse position to rotation
    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

    function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
        const rect = event.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        // Calculate position as ratio from -0.5 to 0.5
        const xPos = mouseX / width - 0.5;
        const yPos = mouseY / height - 0.5;

        x.set(xPos);
        y.set(yPos);
    }

    function handleMouseLeave() {
        setIsHovered(false);
        x.set(0);
        y.set(0);
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            style={{ perspective: 1000 }}
            className="h-full"
        >
            <motion.div
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={handleMouseLeave}
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                }}
                className="group relative h-full flex flex-col rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-6 shadow-xl transition-all duration-300 hover:border-primary/50 hover:shadow-primary/10 overflow-hidden"
            >
                {/* Spotlight effect */}
                <motion.div
                    className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100"
                    style={{
                        background: useTransform(
                            [mouseXSpring, mouseYSpring],
                            ([latestX, latestY]: any[]) => `radial-gradient(600px circle at ${(latestX + 0.5) * 100}% ${(latestY + 0.5) * 100}%, rgba(96, 165, 250, 0.15), transparent 40%)`
                        ) as any
                    }}
                />

                <div className="relative z-10 flex flex-col h-full" style={{ transform: "translateZ(50px)" }}>
                    {/* Header */}
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-2">
                            <div className="p-2 rounded-lg bg-primary/10 text-primary">
                                <FaCode size={18} />
                            </div>
                            <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                                {project.name}
                            </h3>
                        </div>
                        <span className="text-xs font-semibold px-2 py-1 rounded-md bg-secondary text-secondary-foreground">
                            {project.duration}
                        </span>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 flex-grow leading-relaxed">
                        {project.description}
                    </p>

                    {/* Features */}
                    <div className="mb-6">
                        <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">
                            <FaRocket size={10} className="text-primary" />
                            Impact & Features
                        </h4>
                        <ul className="space-y-2.5">
                            {project.features.map((feature, i) => (
                                <li key={i} className="text-sm flex items-start gap-2.5">
                                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary/60 group-hover:bg-primary transition-colors" />
                                    <span className="text-gray-700 dark:text-gray-300">
                                        {feature.description}
                                        {feature.metric && (
                                            <span className="ml-2 px-1.5 py-0.5 rounded bg-primary/10 font-bold text-primary text-[10px]">
                                                {feature.metric}
                                            </span>
                                        )}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-1.5 mb-8">
                        {project.techStack.map((tech) => (
                            <span
                                key={tech}
                                className="rounded-md border border-border bg-background/50 px-2 py-0.5 text-[10px] font-medium text-foreground/80 lowercase transition-colors group-hover:border-primary/30 group-hover:text-primary"
                            >
                                #{tech.replace(/\s+/g, '')}
                            </span>
                        ))}
                    </div>

                    {/* Links */}
                    <div className="flex gap-5 mt-auto pt-4 border-t border-border/50">
                        {project.githubUrl && (
                            <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-primary transition-all hover:translate-x-1"
                            >
                                <FaGithub size={16} /> source
                            </a>
                        )}
                        {project.liveUrl && (
                            <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-primary transition-all hover:translate-x-1"
                            >
                                <FaExternalLinkAlt size={14} /> demo
                            </a>
                        )}
                        {!project.githubUrl && !project.liveUrl && (
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter cursor-default">
                                Enterprise / internal project
                            </span>
                        )}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}
