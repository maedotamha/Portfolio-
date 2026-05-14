import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hoverable?: boolean;
}

export function Card({ children, className = '', hoverable = false }: CardProps) {
  const hoverStyles = hoverable
    ? 'hover:shadow-md hover:-translate-y-0.5 cursor-pointer'
    : '';

  return (
    <div className={`section-card p-6 transition-all duration-200 ${hoverStyles} ${className}`}>
      {children}
    </div>
  );
}
