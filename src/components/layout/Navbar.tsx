import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Search, X, Lock, ExternalLink } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === 'dark';

  return (
    <motion.button
      onClick={toggle}
      title={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      whileTap={{ scale: 0.9 }}
      style={{
        position: 'relative',
        width: '52px',
        height: '28px',
        borderRadius: '999px',
        border: '1px solid var(--border-color)',
        backgroundColor: isDark ? 'rgba(152,202,63,0.15)' : 'rgba(251,191,36,0.15)',
        cursor: 'pointer',
        padding: 0,
        flexShrink: 0,
        overflow: 'hidden',
      }}
    >
      {/* Track icons */}
      <span style={{ position: 'absolute', left: '6px', top: '50%', transform: 'translateY(-50%)', fontSize: '11px', opacity: isDark ? 0.4 : 1, transition: 'opacity 0.25s' }}>
        ☀️
      </span>
      <span style={{ position: 'absolute', right: '6px', top: '50%', transform: 'translateY(-50%)', fontSize: '11px', opacity: isDark ? 1 : 0.4, transition: 'opacity 0.25s' }}>
        🌙
      </span>

      {/* Thumb */}
      <motion.div
        layout
        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
        style={{
          position: 'absolute',
          top: '3px',
          left: isDark ? '27px' : '3px',
          width: '20px',
          height: '20px',
          borderRadius: '50%',
          backgroundColor: isDark ? 'var(--primary)' : '#fbbf24',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={theme}
            initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.2 }}
          >
            {isDark
              ? <Moon size={10} color="#0b0f19" strokeWidth={2.5} />
              : <Sun size={10} color="#78350f" strokeWidth={2.5} />
            }
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </motion.button>
  );
}

function SearchBar() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Cmd+K / Ctrl+K shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen(prev => !prev);
      }
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
  }, [open]);

  return (
    <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            key="open"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 220, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            style={{ overflow: 'hidden', display: 'flex', alignItems: 'center' }}
          >
            <div style={{
              display: 'flex', alignItems: 'center', gap: '0.4rem',
              backgroundColor: 'var(--panel-bg)',
              border: '1px solid var(--primary)',
              borderRadius: 'var(--radius-md)',
              padding: '0.3rem 0.6rem',
              width: '100%',
            }}>
              <Search size={14} color="var(--text-secondary)" style={{ flexShrink: 0 }} />
              <input
                ref={inputRef}
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Buscar tema..."
                style={{
                  background: 'none', border: 'none', outline: 'none',
                  color: 'var(--text-primary)', fontSize: '0.85rem',
                  width: '100%', fontFamily: 'inherit',
                }}
              />
              <button
                onClick={() => { setOpen(false); setQuery(''); }}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: 'var(--text-secondary)', display: 'flex' }}
              >
                <X size={14} />
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.button
            key="closed"
            onClick={() => setOpen(true)}
            title="Buscar (Ctrl+K)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.4rem',
              background: 'var(--panel-bg)', border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)', padding: '0.35rem 0.7rem',
              cursor: 'pointer', color: 'var(--text-secondary)', fontSize: '0.8rem',
            }}
          >
            <Search size={14} />
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <kbd style={{
                padding: '0.05rem 0.3rem', borderRadius: '4px',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--panel-bg-hover)',
                fontSize: '0.7rem', fontFamily: 'inherit',
                color: 'var(--text-secondary)',
              }}>
                {navigator.platform.includes('Mac') ? '⌘' : 'Ctrl'}
              </kbd>
              <kbd style={{
                padding: '0.05rem 0.3rem', borderRadius: '4px',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--panel-bg-hover)',
                fontSize: '0.7rem', fontFamily: 'inherit',
                color: 'var(--text-secondary)',
              }}>K</kbd>
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Navbar() {
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  // Smart hide/show on scroll
  const handleScroll = useCallback(() => {
    const main = document.querySelector('main');
    const scrollY = main?.scrollTop ?? window.scrollY;
    if (scrollY < 40) { setVisible(true); return; }
    setVisible(scrollY < lastScrollY.current);
    lastScrollY.current = scrollY;
  }, []);

  useEffect(() => {
    const main = document.querySelector('main');
    const target = main ?? window;
    target.addEventListener('scroll', handleScroll, { passive: true });
    return () => target.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <motion.header
      animate={{ y: visible ? 0 : -80, opacity: visible ? 1 : 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 1.5rem',
        height: '60px',
        flexShrink: 0,
        backgroundColor: 'var(--navbar-bg)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border-color)',
      }}
    >
      {/* Logo */}
      <motion.div
        whileHover={{ scale: 1.03 }}
        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'default', userSelect: 'none' }}
      >
        <div style={{
          width: '30px', height: '30px', borderRadius: 'var(--radius-md)',
          backgroundColor: 'var(--primary)', display: 'flex', alignItems: 'center',
          justifyContent: 'center', flexShrink: 0,
        }}>
          <Lock size={16} color="#0b0f19" strokeWidth={2.5} />
        </div>
        <span style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
          Crypto<span style={{ color: 'var(--primary)' }}>Lab</span>
        </span>
      </motion.div>

      {/* Right actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <SearchBar />
        <ThemeToggle />

        {/* Divider */}
        <div style={{ width: '1px', height: '20px', backgroundColor: 'var(--border-color)' }} />

        {/* CTA */}
        <motion.a
          href="https://platzi.com"
          target="_blank"
          rel="noreferrer"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          style={{
            display: 'flex', alignItems: 'center', gap: '0.35rem',
            textDecoration: 'none',
            padding: '0.35rem 0.85rem',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--primary)',
            color: '#0b0f19',
            fontWeight: 700,
            fontSize: '0.82rem',
            whiteSpace: 'nowrap',
          }}
        >
          Comunidad Platzi
          <ExternalLink size={12} strokeWidth={2.5} />
        </motion.a>
      </div>
    </motion.header>
  );
}
