interface SectionHeadingProps {
    title: string;
    subtitle?: string;
    className?: string;
}

export function SectionHeading({ title, subtitle, className = "" }: SectionHeadingProps) {
    return (
        <div className={`mb-12 text-center ${className}`}>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                {title}
            </h2>
            {subtitle && (
                <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                    {subtitle}
                </p>
            )}
            <div className="mx-auto mt-4 h-1.5 w-20 rounded-full bg-primary" />
        </div>
    );
}
