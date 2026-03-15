"use client";

import { portfolioData } from "@/data/portfolio";
import { AnimatedSection } from "../ui/AnimatedSection";
import { SectionHeading } from "../ui/SectionHeading";
import { Card } from "../ui/Card";
import { FaGraduationCap, FaAward, FaCalendarAlt, FaBook } from "react-icons/fa";

export function EducationSection() {
    const { education, certifications } = portfolioData;

    return (
        <AnimatedSection id="education" className="py-20 bg-background">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <SectionHeading
                    title="Education & Certifications"
                    subtitle="My academic background and specialized training."
                />

                <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-2">
                    {/* Education Column */}
                    <div className="space-y-8">
                        <div className="flex items-center gap-3 text-primary">
                            <FaGraduationCap size={24} />
                            <h3 className="text-2xl font-bold text-foreground">Education</h3>
                        </div>
                        <div className="space-y-6">
                            {education.map((edu, index) => (
                                <Card key={index} className="hover:border-primary/50 transition-all duration-300">
                                    <div className="flex flex-wrap items-center justify-between gap-4">
                                        <h4 className="text-xl font-bold text-foreground">
                                            {edu.institution}
                                        </h4>
                                        <div className="flex items-center gap-2 text-sm font-medium text-primary">
                                            <FaCalendarAlt size={14} />
                                            <span>{edu.startDate} - {edu.endDate}</span>
                                        </div>
                                    </div>
                                    <p className="mt-2 text-lg font-semibold text-gray-700 dark:text-gray-300">
                                        {edu.degree} {edu.field && `in ${edu.field}`}
                                    </p>

                                    {edu.coursework && edu.coursework.length > 0 && (
                                        <div className="mt-6">
                                            <div className="flex items-center gap-2 mb-3 text-sm font-bold uppercase tracking-wider text-gray-500">
                                                <FaBook size={12} />
                                                <span>Relevant Coursework</span>
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                {edu.coursework.map((course, i) => (
                                                    <span
                                                        key={i}
                                                        className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground border border-border"
                                                    >
                                                        {course}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </Card>
                            ))}
                        </div>
                    </div>

                    {/* Certifications Column */}
                    <div className="space-y-8">
                        <div className="flex items-center gap-3 text-primary">
                            <FaAward size={24} />
                            <h3 className="text-2xl font-bold text-foreground">Certifications</h3>
                        </div>
                        <div className="space-y-4">
                            {certifications.map((cert) => (
                                <Card key={cert.id} className="hover:border-primary/50 transition-all duration-300">
                                    <div className="flex items-center justify-between gap-4">
                                        <div>
                                            <h4 className="text-lg font-bold text-foreground">
                                                {cert.name}
                                            </h4>
                                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                                {cert.issuer}
                                            </p>
                                        </div>
                                        {cert.date && (
                                            <span className="text-sm font-medium text-primary">
                                                {cert.date}
                                            </span>
                                        )}
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AnimatedSection>
    );
}
