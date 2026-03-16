import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hoverable?: boolean;
}

export function Card({ children, className = '', hoverable = false }: CardProps) {
  const hoverStyles = hoverable
    ? 'hover:shadow-lg hover:-translate-y-1 cursor-pointer'
    : '';

  return (
    <div
      className={`bg-card border border-border rounded-lg p-6 shadow-md transition-all duration-300 ${hoverStyles} ${className}`}
    >
      {children}
    </div>
  );
}
