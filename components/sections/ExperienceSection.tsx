"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { SectionHeading } from "../ui/SectionHeading";

const cardVariants = {
    hidden: (isLeft: boolean) => ({
        opacity: 0,
        x: isLeft ? -60 : 60,
    }),
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            type: "spring" as const,
            stiffness: 80,
            damping: 20,
        },
    },
};

export function ExperienceSection() {
    const { experiences } = portfolioData;
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 80%", "end 20%"],
    });

    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    const lineGlow = useTransform(scrollYProgress, [0, 1], [
        "0 0 8px rgba(96, 165, 250, 0.3)",
        "0 0 20px rgba(96, 165, 250, 0.9), 0 0 40px rgba(96, 165, 250, 0.4)",
    ]);

    return (
        <section id="experience" className="py-20 bg-card/30 overflow-hidden">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <SectionHeading
                    title="Professional Experience"
                    subtitle="A journey through my internships and professional growth."
                />

                <div ref={containerRef} className="relative mx-auto mt-16 max-w-5xl">
                    {/* Animated vertical glow line */}
                    <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-border/40 hidden md:block" />
                    <motion.div
                        className="absolute left-1/2 top-0 w-0.5 -translate-x-1/2 origin-top bg-primary hidden md:block rounded-full"
                        style={{ scaleY, boxShadow: lineGlow as any, height: "100%" }}
                    />

                    {/* Mobile vertical line */}
                    <div className="absolute left-4 top-0 h-full w-0.5 bg-border/40 md:hidden" />

                    <div className="space-y-16">
                        {experiences.map((exp, index) => {
                            const isLeft = index % 2 === 0;

                            return (
                                <motion.div
                                    key={exp.id}
                                    custom={isLeft}
                                    variants={cardVariants}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, margin: "-80px" }}
                                    className={`relative flex items-center flex-col md:flex-row ${isLeft ? "md:flex-row" : "md:flex-row-reverse"
                                        }`}
                                >
                                    {/* Timeline dot — centered on the line */}
                                    <div className="absolute left-4 md:left-1/2 top-8 z-20 -translate-x-1/2">
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            whileInView={{ scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                                            className="h-5 w-5 rounded-full border-4 border-primary bg-background shadow-[0_0_10px_rgba(96,165,250,0.7)]"
                                        />
                                    </div>

                                    {/* Spacer column */}
                                    <div className="hidden md:block md:w-1/2" />

                                    {/* Card */}
                                    <div
                                        className={`ml-12 md:ml-0 md:w-1/2 ${isLeft ? "md:pr-12" : "md:pl-12"
                                            }`}
                                    >
                                        <motion.div
                                            whileHover={{ scale: 1.02 }}
                                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                            className="group relative rounded-2xl border border-border bg-card p-6 shadow-md hover:shadow-primary/20 hover:border-primary/50 transition-all duration-300"
                                        >
                                            {/* Glow on hover */}
                                            <div className="absolute inset-0 rounded-2xl bg-primary/0 group-hover:bg-primary/5 transition-colors duration-300" />

                                            {/* Header */}
                                            <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                                                <div>
                                                    <h3 className="text-lg font-bold text-foreground leading-tight">
                                                        {exp.role}
                                                    </h3>
                                                    <p className="text-sm font-semibold text-primary mt-0.5">
                                                        {exp.company}
                                                    </p>
                                                </div>
                                                <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary whitespace-nowrap">
                                                    {exp.duration}
                                                </span>
                                            </div>

                                            {/* Responsibilities */}
                                            <ul className="space-y-2 mb-5">
                                                {exp.responsibilities.map((resp, i) => (
                                                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                                                        <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                                                        {resp}
                                                    </li>
                                                ))}
                                            </ul>

                                            {/* Tech badges */}
                                            <div className="flex flex-wrap gap-2">
                                                {exp.technologies.map((tech) => (
                                                    <motion.span
                                                        key={tech}
                                                        whileHover={{ scale: 1.1 }}
                                                        className="cursor-default rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground border border-border hover:border-primary/50 hover:text-primary transition-colors"
                                                    >
                                                        {tech}
                                                    </motion.span>
                                                ))}
                                            </div>
                                        </motion.div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
