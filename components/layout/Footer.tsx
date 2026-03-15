import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-border bg-card py-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
                    <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            © {currentYear} Maedot Alemu. All rights reserved.
                        </p>
                    </div>

                    <div className="flex space-x-6">
                        <a
                            href="https://linkedin.com/in/maedotalemu"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-primary transition-colors"
                            aria-label="LinkedIn"
                        >
                            <FaLinkedin size={20} />
                        </a>
                        <a
                            href="https://github.com/maedotalemu"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-primary transition-colors"
                            aria-label="GitHub"
                        >
                            <FaGithub size={20} />
                        </a>
                        <a
                            href="https://leetcode.com/maedotalemu"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-primary transition-colors"
                            aria-label="LeetCode"
                        >
                            <SiLeetcode size={20} />
                        </a>
                        <a
                            href="mailto:alemu.maedot@gmail.com"
                            className="text-gray-400 hover:text-primary transition-colors"
                            aria-label="Email"
                        >
                            <FaEnvelope size={20} />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
