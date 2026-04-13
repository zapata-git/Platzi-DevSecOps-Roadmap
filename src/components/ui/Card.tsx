import React from 'react';

interface CardProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
  style?: React.CSSProperties;
}

export function Card({ children, title, className = '', style }: CardProps) {
  return (
    <div className={`glass-panel ${className}`} style={{ padding: '1.5rem', ...style }}>
      {title && <h3 style={{ marginTop: 0, marginBottom: '1rem' }}>{title}</h3>}
      {children}
    </div>
  );
}
