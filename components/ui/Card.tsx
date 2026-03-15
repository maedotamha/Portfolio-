"use client";

import { motion } from "framer-motion";
import React from "react";

interface CardProps {
    children: React.ReactNode;
    className?: string;
    hoverable?: boolean;
}

export function Card({ children, className = "", hoverable = false }: CardProps) {
    return (
        <motion.div
            whileHover={hoverable ? { y: -5, scale: 1.01 } : {}}
            className={`rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow ${hoverable ? "hover:shadow-md" : ""
                } ${className}`}
        >
            {children}
        </motion.div>
    );
}
