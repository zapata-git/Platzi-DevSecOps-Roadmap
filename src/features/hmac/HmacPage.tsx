import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { hmacData } from '../../utils/webCrypto';

type Algorithm = 'SHA-256' | 'SHA-384' | 'SHA-512';

export function HmacPage() {
  const [message, setMessage] = useState('Transferencia: $500 → cuenta #4521');
  const [key, setKey] = useState('clave-secreta-compartida');
  const [algorithm, setAlgorithm] = useState<Algorithm>('SHA-256');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  // Tampered message demo
  const [tampered, setTampered] = useState('Transferencia: $9999 → cuenta #4521');
  const [tamperedResult, setTamperedResult] = useState('');

  const compute = async () => {
    if (!message || !key) return;
    setLoading(true);
    const mac = await hmacData(algorithm, key, message);
    const mac2 = await hmacData(algorithm, key, tampered);
    setResult(mac);
    setTamperedResult(mac2);
    setLoading(false);
  };

  const match = result && tamperedResult && result === tamperedResult;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
    >
      <Card>
        <h2 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>HMAC — Autenticación de Mensajes</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>
          HMAC (Hash-based Message Authentication Code) combina un <strong>mensaje</strong> con una{' '}
          <strong>clave secreta compartida</strong> para producir un código de autenticación. Garantiza que
          el mensaje no fue modificado en tránsito y que proviene de alguien que conoce la clave.
          A diferencia del hash simple, <strong>no se puede falsificar sin la clave</strong>.
        </p>
      </Card>

      <Card>
        {/* Algorithm */}
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.5rem' }}>
            Algoritmo
          </label>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {(['SHA-256', 'SHA-384', 'SHA-512'] as Algorithm[]).map(alg => (
              <button
                key={alg}
                onClick={() => { setAlgorithm(alg); setResult(''); setTamperedResult(''); }}
                style={{
                  padding: '0.3rem 0.8rem',
                  borderRadius: 'var(--radius-md)',
                  border: `1px solid ${algorithm === alg ? 'var(--primary)' : 'var(--border-color)'}`,
                  backgroundColor: algorithm === alg ? 'rgba(152,202,63,0.15)' : 'transparent',
                  color: algorithm === alg ? 'var(--primary)' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  fontSize: '0.85rem',
                  fontWeight: algorithm === alg ? 600 : 400,
                }}
              >
                HMAC-{alg}
              </button>
            ))}
          </div>
        </div>

        <Input
          label="Clave secreta compartida"
          value={key}
          onChange={e => { setKey(e.target.value); setResult(''); setTamperedResult(''); }}
          placeholder="Clave compartida entre emisor y receptor"
        />

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.5rem' }}>
            Mensaje original
          </label>
          <textarea
            value={message}
            onChange={e => { setMessage(e.target.value); setResult(''); setTamperedResult(''); }}
            rows={2}
            style={{
              width: '100%', padding: '0.6rem 0.75rem', borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-color)',
              color: 'var(--text-primary)', resize: 'none', fontFamily: 'inherit',
              fontSize: '0.9rem', boxSizing: 'border-box', outline: 'none',
            }}
          />
        </div>

        <Button onClick={compute} disabled={!message || !key || loading} style={{ alignSelf: 'flex-start' }}>
          {loading ? 'Calculando...' : 'Generar HMAC'}
        </Button>
      </Card>

      {result && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

          {/* Original */}
          <Card style={{ borderColor: '#10b981', borderWidth: '1px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <span style={{ color: '#10b981', fontWeight: 700, fontSize: '0.85rem' }}>✓ MENSAJE ORIGINAL</span>
            </div>
            <p style={{ margin: '0 0 0.5rem 0', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              <em>"{message}"</em>
            </p>
            <pre style={{
              margin: 0, padding: '0.6rem 0.75rem', backgroundColor: 'var(--bg-color)',
              borderRadius: 'var(--radius-md)', fontSize: '0.75rem', color: '#10b981',
              wordBreak: 'break-all', whiteSpace: 'pre-wrap',
              fontFamily: "'Fira Code', 'Consolas', monospace",
            }}>
              {result}
            </pre>
          </Card>

          {/* Tampered demo */}
          <Card style={{ borderLeft: '4px solid #ef4444' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <span style={{ color: '#ef4444', fontWeight: 700, fontSize: '0.85rem' }}>✗ MENSAJE MANIPULADO</span>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>— lo que intentaría enviar un atacante</span>
            </div>
            <div style={{ marginBottom: '0.5rem' }}>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.25rem' }}>
                Mensaje alterado
              </label>
              <textarea
                value={tampered}
                onChange={async e => {
                  setTampered(e.target.value);
                  const mac2 = await hmacData(algorithm, key, e.target.value);
                  setTamperedResult(mac2);
                }}
                rows={2}
                style={{
                  width: '100%', padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-md)',
                  border: '1px solid #ef444455', backgroundColor: 'var(--bg-color)',
                  color: '#ef4444', resize: 'none', fontFamily: 'inherit',
                  fontSize: '0.9rem', boxSizing: 'border-box', outline: 'none',
                }}
              />
            </div>
            <pre style={{
              margin: 0, padding: '0.6rem 0.75rem', backgroundColor: 'var(--bg-color)',
              borderRadius: 'var(--radius-md)', fontSize: '0.75rem', color: '#ef4444',
              wordBreak: 'break-all', whiteSpace: 'pre-wrap',
              fontFamily: "'Fira Code', 'Consolas', monospace",
            }}>
              {tamperedResult}
            </pre>
          </Card>

          <div style={{
            padding: '0.8rem 1rem',
            borderRadius: 'var(--radius-md)',
            backgroundColor: match ? 'rgba(239,68,68,0.1)' : 'rgba(16,185,129,0.1)',
            border: `1px solid ${match ? '#ef4444' : '#10b981'}`,
            color: match ? '#ef4444' : '#10b981',
            fontWeight: 600,
            fontSize: '0.9rem',
          }}>
            {match
              ? '⚠️ Los HMACs coinciden — el mensaje manipulado no se puede distinguir (¡clave comprometida!)'
              : '✓ Los HMACs son diferentes — el receptor detectaría la manipulación y rechazaría el mensaje'}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
