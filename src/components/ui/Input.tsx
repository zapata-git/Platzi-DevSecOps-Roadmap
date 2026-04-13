import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ label, error, className = '', id, ...props }: InputProps) {
  const inputId = id || Math.random().toString(36).substring(7);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', marginBottom: '1rem' }} className={className}>
      {label && <label htmlFor={inputId} style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{label}</label>}
      <input
        id={inputId}
        style={{
          padding: '0.5rem 0.75rem',
          borderRadius: 'var(--radius-md)',
          border: `1px solid ${error ? 'var(--danger)' : 'var(--border-color)'}`,
          backgroundColor: 'var(--bg-color)',
          color: 'var(--text-primary)',
          outline: 'none',
          boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.1)'
        }}
        {...props}
      />
      {error && <span style={{ color: 'var(--danger)', fontSize: '0.75rem' }}>{error}</span>}
    </div>
  );
}
