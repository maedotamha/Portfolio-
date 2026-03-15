"use client";

import { motion, useReducedMotion } from "framer-motion";
import React from "react";

interface AnimatedSectionProps {
    children: React.ReactNode;
    animation?: "fadeIn" | "slideUp" | "slideIn";
    delay?: number;
    className?: string;
    id?: string;
}

export function AnimatedSection({
    children,
    animation = "slideUp",
    delay = 0,
    className = "",
    id,
}: AnimatedSectionProps) {
    const shouldReduceMotion = useReducedMotion();

    const variants = {
        fadeIn: {
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
        },
        slideUp: {
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 },
        },
        slideIn: {
            hidden: { opacity: 0, x: -30 },
            visible: { opacity: 1, x: 0 },
        },
    };

    const selectedVariant = variants[animation];

    return (
        <motion.section
            id={id}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={selectedVariant}
            transition={{
                duration: shouldReduceMotion ? 0 : 0.6,
                delay: delay,
                ease: "easeOut",
            }}
            className={className}
        >
            {children}
        </motion.section>
    );
}
