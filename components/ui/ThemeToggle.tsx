"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Avoid hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="w-10 h-10 rounded-full bg-secondary animate-pulse" />
        );
    }

    return (
        <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-full transition-colors hover:bg-gray-200 dark:hover:bg-gray-800"
            aria-label="Toggle theme"
        >
            {theme === "dark" ? (
                <FaSun className="w-5 h-5 text-yellow-400" />
            ) : (
                <FaMoon className="w-5 h-5 text-indigo-400" />
            )}
        </button>
    );
}
