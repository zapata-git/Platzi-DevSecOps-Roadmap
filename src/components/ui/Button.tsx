import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: 'primary' | 'secondary' | 'danger';
}

export function Button({ variant = 'primary', className = '', children, ...props }: ButtonProps) {
  let bg = 'var(--primary)';
  
  if (variant === 'secondary') {
    bg = 'transparent';
  } else if (variant === 'danger') {
    bg = 'var(--danger)';
  }

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      style={{
        backgroundColor: bg,
        color: variant === 'secondary' ? 'var(--text-primary)' : 'white',
        border: variant === 'secondary' ? '1px solid var(--border-color)' : 'none',
        padding: '0.5rem 1rem',
        borderRadius: 'var(--radius-md)',
        cursor: 'pointer',
        fontWeight: 600,
        ...props.style
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.button>
  );
}
