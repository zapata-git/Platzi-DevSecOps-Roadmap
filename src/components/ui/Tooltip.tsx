import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  text: string;
  children: React.ReactNode;
}

export function Tooltip({ text, children }: Props) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <span 
      style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span style={{ 
        borderBottom: '1px dashed var(--primary)', 
        cursor: 'help',
        color: 'var(--primary)'
      }}>
        {children}
      </span>
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.15 }}
            style={{
              position: 'absolute',
              bottom: '100%',
              left: '50%',
              transform: 'translateX(-50%)',
              marginBottom: '8px',
              padding: '0.5rem 0.75rem',
              backgroundColor: 'var(--panel-bg)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-color)',
              fontSize: '0.85rem',
              borderRadius: 'var(--radius-md)',
              width: 'max-content',
              maxWidth: '250px',
              whiteSpace: 'normal',
              textAlign: 'center',
              zIndex: 50,
              pointerEvents: 'none',
              boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.3)',
              lineHeight: 1.4
            }}
          >
            {text}
            <div style={{
              position: 'absolute',
              top: '100%',
              left: '50%',
              marginLeft: '-5px',
              borderWidth: '5px',
              borderStyle: 'solid',
              borderColor: 'var(--border-color) transparent transparent transparent'
            }} />
             <div style={{
              position: 'absolute',
              top: '100%',
              left: '50%',
              marginLeft: '-4px',
              marginTop: '-1px',
              borderWidth: '4px',
              borderStyle: 'solid',
              borderColor: 'var(--panel-bg) transparent transparent transparent'
            }} />
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
}
