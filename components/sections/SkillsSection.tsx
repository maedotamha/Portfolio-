"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { AnimatedSection } from "../ui/AnimatedSection";
import { SectionHeading } from "../ui/SectionHeading";
import * as FaIcons from "react-icons/fa";
import * as SiIcons from "react-icons/si";
import { IconType } from "react-icons";

export function SkillsSection() {
    const { skillCategories } = portfolioData;

    const getIcon = (iconName: string): IconType | null => {
        // Basic mapping for common icons used in the data
        const Fa: any = FaIcons;
        const Si: any = SiIcons;
        return Fa[iconName] || Si[iconName] || null;
    };

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
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1 },
    };

    return (
        <AnimatedSection id="skills" className="py-20 bg-card/30">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <SectionHeading
                    title="Technical Skills"
                    subtitle="My toolbox of languages, frameworks, and technologies."
                />

                <div className="mt-16 space-y-12">
                    {skillCategories.map((category) => (
                        <div key={category.category}>
                            <h3 className="text-xl font-bold text-foreground mb-6 text-center md:text-left">
                                {category.category}
                            </h3>
                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
                            >
                                {category.skills.map((skill) => {
                                    const Icon = getIcon(skill.iconName);
                                    return (
                                        <motion.div
                                            key={skill.name}
                                            variants={itemVariants}
                                            whileHover={{ y: -5, transition: { duration: 0.2 } }}
                                            className="group flex flex-col items-center justify-center rounded-xl border border-border bg-card p-4 shadow-sm hover:border-primary/50 transition-colors"
                                        >
                                            {Icon ? (
                                                <Icon size={32} className="text-gray-600 dark:text-gray-400 group-hover:text-primary transition-colors" />
                                            ) : (
                                                <div className="h-8 w-8 rounded bg-gray-200 dark:bg-gray-800" />
                                            )}
                                            <span className="mt-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                                                {skill.name}
                                            </span>
                                        </motion.div>
                                    );
                                })}
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>
        </AnimatedSection>
    );
}
