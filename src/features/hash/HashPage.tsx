import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { hashData } from '../../utils/webCrypto';

type Algorithm = 'SHA-1' | 'SHA-256' | 'SHA-384' | 'SHA-512';

const ALGORITHMS: Algorithm[] = ['SHA-1', 'SHA-256', 'SHA-384', 'SHA-512'];

const HASH_BITS: Record<Algorithm, number> = {
  'SHA-1': 160,
  'SHA-256': 256,
  'SHA-384': 384,
  'SHA-512': 512,
};

export function HashPage() {
  const [text, setText] = useState('Hola, Platzi!');
  const [algorithm, setAlgorithm] = useState<Algorithm>('SHA-256');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const compute = async () => {
    if (!text) return;
    setLoading(true);
    const hash = await hashData(algorithm, text);
    setResult(hash);
    setLoading(false);
  };

  const copy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
    >
      <Card>
        <h2 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>Funciones Hash</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>
          Una función hash convierte cualquier dato en una cadena de longitud fija. Es{' '}
          <strong>determinista</strong> (mismo input → mismo output), <strong>unidireccional</strong>{' '}
          (no se puede revertir) y produce un <strong>avalanche effect</strong>: un solo carácter
          diferente cambia completamente el resultado.
        </p>
      </Card>

      <Card>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Algorithm selector */}
          <div>
            <label style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.5rem' }}>
              Algoritmo
            </label>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {ALGORITHMS.map(alg => (
                <button
                  key={alg}
                  onClick={() => { setAlgorithm(alg); setResult(''); }}
                  style={{
                    padding: '0.35rem 0.9rem',
                    borderRadius: 'var(--radius-md)',
                    border: `1px solid ${algorithm === alg ? 'var(--primary)' : 'var(--border-color)'}`,
                    backgroundColor: algorithm === alg ? 'rgba(152,202,63,0.15)' : 'transparent',
                    color: algorithm === alg ? 'var(--primary)' : 'var(--text-secondary)',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    fontWeight: algorithm === alg ? 600 : 400,
                    transition: 'all 0.15s',
                  }}
                >
                  {alg}
                  <span style={{ marginLeft: '0.4rem', opacity: 0.6, fontSize: '0.75rem' }}>
                    {HASH_BITS[alg]}b
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div>
            <label style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.5rem' }}>
              Mensaje
            </label>
            <textarea
              value={text}
              onChange={e => { setText(e.target.value); setResult(''); }}
              rows={3}
              style={{
                width: '100%',
                padding: '0.6rem 0.75rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-color)',
                color: 'var(--text-primary)',
                resize: 'vertical',
                fontFamily: 'inherit',
                fontSize: '0.9rem',
                boxSizing: 'border-box',
                outline: 'none',
              }}
            />
          </div>

          <Button onClick={compute} disabled={!text || loading} style={{ alignSelf: 'flex-start' }}>
            {loading ? 'Calculando...' : `Generar ${algorithm}`}
          </Button>
        </div>
      </Card>

      {result && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          <Card style={{ borderColor: 'var(--primary)', borderWidth: '1px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <h3 style={{ margin: 0, color: 'var(--primary)', fontSize: '1rem' }}>
                {algorithm} — {HASH_BITS[algorithm]} bits / {result.length / 2} bytes
              </h3>
              <button
                onClick={copy}
                style={{
                  padding: '0.25rem 0.7rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'transparent',
                  color: 'var(--text-secondary)',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                }}
              >
                {copied ? '✓ Copiado' : 'Copiar'}
              </button>
            </div>
            <pre
              style={{
                margin: 0,
                padding: '0.75rem',
                backgroundColor: 'var(--bg-color)',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.8rem',
                color: '#3b82f6',
                wordBreak: 'break-all',
                whiteSpace: 'pre-wrap',
                fontFamily: "'Fira Code', 'Consolas', monospace",
              }}
            >
              {result}
            </pre>

            {/* Avalanche hint */}
            <p style={{ margin: '0.75rem 0 0 0', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              Modifica una sola letra del mensaje y observa cómo el hash cambia completamente — eso es el <strong>efecto avalancha</strong>.
            </p>
          </Card>
        </motion.div>
      )}

      <Card>
        <h3 style={{ color: 'var(--text-secondary)', marginBottom: '0.75rem', fontSize: '0.95rem' }}>
          Usos comunes
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.6rem' }}>
          {[
            { label: 'Verificación de contraseñas', desc: 'bcrypt/Argon2 internamente usan hashing' },
            { label: 'Integridad de archivos', desc: 'Comparar SHA-256 antes y después de descargar' },
            { label: 'Git commits', desc: 'Cada commit es un SHA-1 del contenido' },
            { label: 'Blockchain', desc: 'Cada bloque referencia el hash del anterior' },
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
              <div style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
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
