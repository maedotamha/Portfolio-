import { SocialLink } from '@/types';

interface FooterProps {
  socialLinks: SocialLink[];
  email: string;
}

export function Footer({ socialLinks, email }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-foreground/70 text-sm">
            © {currentYear} Maedot Alemu. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/70 hover:text-primary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary rounded p-1"
                  aria-label={link.platform}
                >
                  <Icon className="w-5 h-5" />
                </a>
              );
            })}
          </div>

          <a
            href={`mailto:${email}`}
            className="text-foreground/70 hover:text-primary transition-colors duration-200 text-sm"
          >
            {email}
          </a>
        </div>
      </div>
    </footer>
  );
}
