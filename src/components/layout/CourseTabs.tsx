import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface Props {
  tabs: { id: string; label: string }[];
  activeTab: string;
  onTabChange: (id: string) => void;
}

export function CourseTabs({ tabs, activeTab, onTabChange }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (activeRef.current && scrollRef.current) {
      activeRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }, [activeTab]);

  if (tabs.length === 0) return null;

  return (
    <div style={{ position: 'relative', marginBottom: '2rem' }}>
      {/* Fade hint on right edge */}
      <div
        style={{
          position: 'absolute',
          right: 0,
          top: 0,
          bottom: '1px',
          width: '3rem',
          background: 'linear-gradient(to right, transparent, var(--bg-color))',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* Scrollable tab row */}
      <div
        ref={scrollRef}
        className="course-tabs-scroll"
        style={{
          display: 'flex',
          gap: '0.25rem',
          overflowX: 'auto',
          borderBottom: '1px solid var(--border-color)',
          paddingBottom: '0',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {tabs.map(tab => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              ref={isActive ? activeRef : null}
              onClick={() => onTabChange(tab.id)}
              style={{
                flexShrink: 0,
                whiteSpace: 'nowrap',
                background: 'transparent',
                border: 'none',
                padding: '0.6rem 0.75rem',
                color: isActive ? 'var(--primary)' : 'var(--text-secondary)',
                fontWeight: isActive ? 600 : 400,
                fontSize: '0.875rem',
                cursor: 'pointer',
                position: 'relative',
                outline: 'none',
                borderRadius: 'var(--radius-md) var(--radius-md) 0 0',
                transition: 'color 0.15s',
              }}
            >
              {tab.label}
              {isActive && (
                <motion.div
                  layoutId="activeTabIndicator"
                  style={{
                    position: 'absolute',
                    bottom: -1,
                    left: 0,
                    right: 0,
                    height: '3px',
                    backgroundColor: 'var(--primary)',
                    borderRadius: '3px 3px 0 0',
                  }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
