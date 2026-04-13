import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { aesEncrypt, aesDecrypt } from '../../utils/webCrypto';

type KeySize = 128 | 192 | 256;

export function AesPage() {
  // Encrypt panel
  const [encPassword, setEncPassword] = useState('mi-contraseña-segura');
  const [encSalt, setEncSalt] = useState('sal-aleatoria-unica');
  const [encBits, setEncBits] = useState<KeySize>(256);
  const [plaintext, setPlaintext] = useState('Mensaje ultra secreto 🔐');
  const [encResult, setEncResult] = useState<{ iv: string; ciphertext: string } | null>(null);
  const [encLoading, setEncLoading] = useState(false);
  const [encError, setEncError] = useState('');

  // Decrypt panel
  const [decPassword, setDecPassword] = useState('');
  const [decSalt, setDecSalt] = useState('');
  const [decBits, setDecBits] = useState<KeySize>(256);
  const [decIv, setDecIv] = useState('');
  const [decCiphertext, setDecCiphertext] = useState('');
  const [decResult, setDecResult] = useState('');
  const [decLoading, setDecLoading] = useState(false);
  const [decError, setDecError] = useState('');

  const handleEncrypt = async () => {
    if (!plaintext || !encPassword || !encSalt) return;
    setEncLoading(true);
    setEncError('');
    setEncResult(null);
    try {
      const result = await aesEncrypt(encPassword, encSalt, plaintext, encBits);
      setEncResult(result);
      // Pre-fill decrypt panel
      setDecPassword(encPassword);
      setDecSalt(encSalt);
      setDecBits(encBits);
      setDecIv(result.iv);
      setDecCiphertext(result.ciphertext);
      setDecResult('');
    } catch {
      setEncError('Error al cifrar.');
    }
    setEncLoading(false);
  };

  const handleDecrypt = async () => {
    if (!decPassword || !decSalt || !decIv || !decCiphertext) return;
    setDecLoading(true);
    setDecError('');
    setDecResult('');
    try {
      const result = await aesDecrypt(decPassword, decSalt, decIv, decCiphertext, decBits);
      setDecResult(result);
    } catch {
      setDecError('Error al descifrar. Verifica contraseña, salt, IV o clave corrupta.');
    }
    setDecLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
    >
      <Card>
        <h2 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>AES — Cifrado Simétrico</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>
          AES (Advanced Encryption Standard) es el estándar de cifrado simétrico más usado en el mundo.
          Usa la <strong>misma clave</strong> para cifrar y descifrar. Aquí usamos{' '}
          <strong>AES-GCM</strong> (con autenticación integrada) derivando la clave desde una contraseña
          con <strong>PBKDF2</strong> — equivalente al <code>scryptSync</code> del curso.
        </p>
      </Card>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {/* ENCRYPT */}
        <Card style={{ borderTop: '3px solid var(--primary)' }}>
          <h3 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>🔒 Cifrar</h3>

          {/* Key size */}
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.5rem' }}>
              Tamaño de clave AES
            </label>
            <div style={{ display: 'flex', gap: '0.4rem' }}>
              {([128, 192, 256] as KeySize[]).map(s => (
                <button
                  key={s}
                  onClick={() => setEncBits(s)}
                  style={{
                    padding: '0.25rem 0.7rem',
                    borderRadius: 'var(--radius-md)',
                    border: `1px solid ${encBits === s ? 'var(--primary)' : 'var(--border-color)'}`,
                    backgroundColor: encBits === s ? 'rgba(152,202,63,0.15)' : 'transparent',
                    color: encBits === s ? 'var(--primary)' : 'var(--text-secondary)',
                    cursor: 'pointer',
                    fontSize: '0.82rem',
                    fontWeight: encBits === s ? 600 : 400,
                  }}
                >
                  {s}-bit
                </button>
              ))}
            </div>
          </div>

          <Input
            label="Contraseña"
            type="password"
            value={encPassword}
            onChange={e => setEncPassword(e.target.value)}
            placeholder="Contraseña para derivar la clave"
          />
          <Input
            label="Salt"
            value={encSalt}
            onChange={e => setEncSalt(e.target.value)}
            placeholder="Sal única (evita ataques de diccionario)"
          />

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.5rem' }}>
              Texto a cifrar
            </label>
            <textarea
              value={plaintext}
              onChange={e => setPlaintext(e.target.value)}
              rows={3}
              style={{
                width: '100%', padding: '0.6rem 0.75rem', borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-color)',
                color: 'var(--text-primary)', resize: 'vertical', fontFamily: 'inherit',
                fontSize: '0.9rem', boxSizing: 'border-box', outline: 'none',
              }}
            />
          </div>

          <Button onClick={handleEncrypt} disabled={encLoading || !plaintext || !encPassword || !encSalt}>
            {encLoading ? 'Cifrando...' : 'Cifrar'}
          </Button>

          {encError && <p style={{ color: 'var(--danger)', marginTop: '0.5rem', fontSize: '0.85rem' }}>{encError}</p>}

          {encResult && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ marginTop: '1rem' }}>
              <div style={{ marginBottom: '0.5rem' }}>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  IV (Vector de Inicialización)
                </label>
                <pre style={{
                  margin: '0.25rem 0 0 0', padding: '0.5rem', backgroundColor: 'var(--bg-color)',
                  borderRadius: 'var(--radius-md)', fontSize: '0.72rem', color: '#eab308',
                  wordBreak: 'break-all', whiteSpace: 'pre-wrap',
                  fontFamily: "'Fira Code', 'Consolas', monospace", border: '1px solid #eab30844',
                }}>
                  {encResult.iv}
                </pre>
              </div>
              <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Texto cifrado
                </label>
                <pre style={{
                  margin: '0.25rem 0 0 0', padding: '0.5rem', backgroundColor: 'var(--bg-color)',
                  borderRadius: 'var(--radius-md)', fontSize: '0.72rem', color: 'var(--primary)',
                  wordBreak: 'break-all', whiteSpace: 'pre-wrap',
                  fontFamily: "'Fira Code', 'Consolas', monospace", border: '1px solid rgba(152,202,63,0.3)',
                }}>
                  {encResult.ciphertext}
                </pre>
              </div>
            </motion.div>
          )}
        </Card>

        {/* DECRYPT */}
        <Card style={{ borderTop: '3px solid #2563eb' }}>
          <h3 style={{ color: '#2563eb', marginBottom: '1rem' }}>🔓 Descifrar</h3>

          {/* Key size */}
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.5rem' }}>
              Tamaño de clave AES
            </label>
            <div style={{ display: 'flex', gap: '0.4rem' }}>
              {([128, 192, 256] as KeySize[]).map(s => (
                <button
                  key={s}
                  onClick={() => setDecBits(s)}
                  style={{
                    padding: '0.25rem 0.7rem',
                    borderRadius: 'var(--radius-md)',
                    border: `1px solid ${decBits === s ? '#2563eb' : 'var(--border-color)'}`,
                    backgroundColor: decBits === s ? 'rgba(37,99,235,0.15)' : 'transparent',
                    color: decBits === s ? '#2563eb' : 'var(--text-secondary)',
                    cursor: 'pointer',
                    fontSize: '0.82rem',
                    fontWeight: decBits === s ? 600 : 400,
                  }}
                >
                  {s}-bit
                </button>
              ))}
            </div>
          </div>

          <Input
            label="Contraseña"
            type="password"
            value={decPassword}
            onChange={e => setDecPassword(e.target.value)}
            placeholder="La misma contraseña usada al cifrar"
          />
          <Input
            label="Salt"
            value={decSalt}
            onChange={e => setDecSalt(e.target.value)}
            placeholder="La misma salt usada al cifrar"
          />
          <Input
            label="IV (Vector de Inicialización)"
            value={decIv}
            onChange={e => setDecIv(e.target.value)}
            placeholder="El IV generado al cifrar"
          />

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.5rem' }}>
              Texto cifrado (hex)
            </label>
            <textarea
              value={decCiphertext}
              onChange={e => setDecCiphertext(e.target.value)}
              rows={3}
              style={{
                width: '100%', padding: '0.6rem 0.75rem', borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-color)',
                color: 'var(--text-primary)', resize: 'vertical', fontFamily: 'monospace',
                fontSize: '0.8rem', boxSizing: 'border-box', outline: 'none',
              }}
            />
          </div>

          <Button
            onClick={handleDecrypt}
            disabled={decLoading || !decPassword || !decSalt || !decIv || !decCiphertext}
            style={{ backgroundColor: '#2563eb' }}
          >
            {decLoading ? 'Descifrando...' : 'Descifrar'}
          </Button>

          {decError && <p style={{ color: 'var(--danger)', marginTop: '0.5rem', fontSize: '0.85rem' }}>{decError}</p>}

          {decResult && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ marginTop: '1rem' }}>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Texto descifrado
              </label>
              <div style={{
                marginTop: '0.25rem', padding: '0.75rem', backgroundColor: 'rgba(16,185,129,0.1)',
                borderRadius: 'var(--radius-md)', border: '1px solid #10b98155',
                color: '#10b981', fontSize: '0.95rem', fontWeight: 500,
              }}>
                {decResult}
              </div>
            </motion.div>
          )}
        </Card>
      </div>

      <Card>
        <h3 style={{ color: 'var(--text-secondary)', marginBottom: '0.75rem', fontSize: '0.95rem' }}>
          ¿Cómo funciona la derivación de clave?
        </h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          {['Contraseña', '+', 'Salt', '→', 'PBKDF2 (100k iteraciones)', '→', `Clave AES-${encBits}`, '→', 'AES-GCM', '→', 'Ciphertext'].map((item, i) => (
            <span
              key={i}
              style={{
                padding: item === '+' || item === '→' ? '0' : '0.2rem 0.5rem',
                backgroundColor: item === '+' || item === '→' ? 'transparent' : 'var(--panel-bg)',
                borderRadius: 'var(--radius-md)',
                color: item === '→' ? 'var(--primary)' : item === '+' ? 'var(--text-secondary)' : 'var(--text-primary)',
                fontWeight: item === '→' || item === '+' ? 700 : 400,
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
