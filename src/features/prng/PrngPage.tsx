import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { randomBytes, randomInt, randomUUID } from '../../utils/webCrypto';

type Mode = 'bytes' | 'int' | 'uuid';

export function PrngPage() {
  const [mode, setMode] = useState<Mode>('bytes');
  const [size, setSize] = useState(16);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(100);
  const [results, setResults] = useState<string[]>([]);

  const generate = () => {
    let value: string;
    switch (mode) {
      case 'bytes':
        value = randomBytes(size);
        break;
      case 'int':
        value = String(randomInt(min, max));
        break;
      case 'uuid':
        value = randomUUID();
        break;
    }
    setResults(prev => [value, ...prev.slice(0, 9)]);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
    >
      <Card>
        <h2 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>PRNG — Generación de Números Aleatorios</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>
          Un <strong>PRNG criptográfico</strong> (Cryptographically Secure PRNG) genera valores
          impredecibles usando entropía del sistema operativo. Es la base de IVs, salts, tokens de
          sesión y UUIDs. <code>window.crypto.getRandomValues()</code> es el equivalente en browser
          al <code>crypto.randomBytes()</code> de Node.js.
        </p>
      </Card>

      <Card>
        {/* Mode selector */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.5rem' }}>
            Tipo de aleatoriedad
          </label>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {([
              { id: 'bytes', label: 'Random Bytes', desc: 'Buffer de bytes en hex' },
              { id: 'int', label: 'Random Int', desc: 'Entero en un rango' },
              { id: 'uuid', label: 'UUID v4', desc: 'Identificador único universal' },
            ] as { id: Mode; label: string; desc: string }[]).map(opt => (
              <button
                key={opt.id}
                onClick={() => { setMode(opt.id); setResults([]); }}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  border: `1px solid ${mode === opt.id ? 'var(--primary)' : 'var(--border-color)'}`,
                  backgroundColor: mode === opt.id ? 'rgba(152,202,63,0.15)' : 'var(--panel-bg)',
                  color: mode === opt.id ? 'var(--primary)' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.15s',
                }}
              >
                <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{opt.label}</div>
                <div style={{ fontSize: '0.75rem', opacity: 0.7 }}>{opt.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Mode-specific options */}
        {mode === 'bytes' && (
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.5rem' }}>
              Tamaño (bytes): <strong style={{ color: 'var(--text-primary)' }}>{size}</strong>
              <span style={{ marginLeft: '0.5rem', opacity: 0.6, fontSize: '0.8rem' }}>→ {size * 2} caracteres hex</span>
            </label>
            <input
              type="range" min={4} max={64} value={size}
              onChange={e => { setSize(Number(e.target.value)); setResults([]); }}
              style={{ width: '100%', accentColor: 'var(--primary)' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              <span>4 bytes (salt mínimo)</span>
              <span>32 bytes (clave AES-256)</span>
              <span>64 bytes</span>
            </div>
          </div>
        )}

        {mode === 'int' && (
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '120px' }}>
              <label style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.25rem' }}>
                Mínimo
              </label>
              <input
                type="number" value={min}
                onChange={e => { setMin(Number(e.target.value)); setResults([]); }}
                style={{
                  width: '100%', padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-color)',
                  color: 'var(--text-primary)', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box',
                }}
              />
            </div>
            <div style={{ flex: 1, minWidth: '120px' }}>
              <label style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.25rem' }}>
                Máximo
              </label>
              <input
                type="number" value={max}
                onChange={e => { setMax(Number(e.target.value)); setResults([]); }}
                style={{
                  width: '100%', padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-color)',
                  color: 'var(--text-primary)', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box',
                }}
              />
            </div>
          </div>
        )}

        <Button onClick={generate}>
          Generar {mode === 'bytes' ? `${size} bytes` : mode === 'int' ? `int [${min}, ${max})` : 'UUID'}
        </Button>
      </Card>

      {results.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          <Card style={{ borderColor: 'var(--primary)', borderWidth: '1px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <h3 style={{ margin: 0, color: 'var(--primary)', fontSize: '1rem' }}>Resultados generados</h3>
              <button
                onClick={() => setResults([])}
                style={{
                  padding: '0.2rem 0.6rem', borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-color)', backgroundColor: 'transparent',
                  color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.78rem',
                }}
              >
                Limpiar
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {results.map((r, i) => (
                <motion.div
                  key={r + i}
                  initial={i === 0 ? { opacity: 0, x: -10 } : false}
                  animate={{ opacity: 1, x: 0 }}
                  style={{
                    padding: '0.5rem 0.75rem',
                    backgroundColor: i === 0 ? 'rgba(152,202,63,0.12)' : 'var(--bg-color)',
                    borderRadius: 'var(--radius-md)',
                    border: `1px solid ${i === 0 ? 'rgba(152,202,63,0.4)' : 'var(--border-color)'}`,
                    fontFamily: "'Fira Code', 'Consolas', monospace",
                    fontSize: '0.82rem',
                    color: i === 0 ? 'var(--primary)' : 'var(--text-secondary)',
                    wordBreak: 'break-all',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                  }}
                >
                  <span style={{ opacity: 0.4, minWidth: '1.5rem', fontSize: '0.7rem' }}>#{results.length - i}</span>
                  {r}
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
      )}

      <Card>
        <h3 style={{ color: 'var(--text-secondary)', marginBottom: '0.75rem', fontSize: '0.95rem' }}>
          ¿Para qué se usa el PRNG criptográfico?
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '0.6rem' }}>
          {[
            { icon: '🔑', label: 'IVs y Salts', desc: 'Generados frescos en cada operación de cifrado' },
            { icon: '🎫', label: 'Tokens de sesión', desc: 'session_id, refresh_token, CSRF token' },
            { icon: '🪪', label: 'UUIDs', desc: 'Identificadores únicos sin coordinación central' },
            { icon: '🔐', label: 'Claves OTP', desc: 'Códigos de un solo uso (TOTP/HOTP)' },
          ].map(item => (
            <div
              key={item.label}
              style={{
                padding: '0.75rem',
                backgroundColor: 'var(--panel-bg)',
                borderRadius: 'var(--radius-md)',
                borderLeft: '3px solid var(--primary)',
              }}
            >
              <div style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>{item.icon}</div>
              <div style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--text-primary)', marginBottom: '0.2rem' }}>
                {item.label}
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
