'use client';

import { SocialLink } from '@/types';
import { getIcon } from '@/lib/icons';

interface FooterProps {
  socialLinks: SocialLink[];
  email: string;
}

export function Footer({ socialLinks, email }: FooterProps) {
  return (
    <footer className="border-t border-border py-8 px-4 sm:px-6 lg:px-8 bg-muted/20">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-sm text-foreground/40 font-mono">
          © {new Date().getFullYear()} Maedot Alemu
        </p>

        <div className="flex items-center gap-3">
          {socialLinks.map((link) => {
            const Icon = getIcon(link.icon);
            return (
              <a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-border
                           text-foreground/45 hover:text-primary hover:border-primary/40 hover:bg-primary/5
                           transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label={link.platform}
              >
                <Icon className="w-3.5 h-3.5" />
              </a>
            );
          })}
        </div>

        <a
          href={`mailto:${email}`}
          className="text-sm text-foreground/40 hover:text-primary transition-colors font-mono"
        >
          {email}
        </a>
      </div>
    </footer>
  );
}
