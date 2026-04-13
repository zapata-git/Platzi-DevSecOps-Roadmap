import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import {
  generateRsaKeyPair,
  exportPublicKeyPem,
  rsaSign,
  rsaVerify,
} from '../../utils/webCrypto';

type Step = 'idle' | 'keygen' | 'sign' | 'verify';

export function SignPage() {
  const [step, setStep] = useState<Step>('idle');
  const [modulusLength, setModulusLength] = useState<2048 | 3072 | 4096>(2048);

  const [keyPair, setKeyPair] = useState<{ publicKey: CryptoKey; privateKey: CryptoKey } | null>(null);
  const [publicKeyPem, setPublicKeyPem] = useState('');
  const [keyLoading, setKeyLoading] = useState(false);

  const [message, setMessage] = useState('Este documento ha sido firmado por Platzi Academy.');
  const [signature, setSignature] = useState('');
  const [signLoading, setSignLoading] = useState(false);

  const [verifyMessage, setVerifyMessage] = useState('');
  const [verifySignature, setVerifySignature] = useState('');
  const [verifyResult, setVerifyResult] = useState<boolean | null>(null);
  const [verifyLoading, setVerifyLoading] = useState(false);

  const handleGenerate = async () => {
    setKeyLoading(true);
    setSignature('');
    setVerifyResult(null);
    const pair = await generateRsaKeyPair(modulusLength);
    const pem = await exportPublicKeyPem(pair.publicKey);
    setKeyPair(pair);
    setPublicKeyPem(pem);
    setStep('sign');
    setKeyLoading(false);
  };

  const handleSign = async () => {
    if (!keyPair || !message) return;
    setSignLoading(true);
    const sig = await rsaSign(keyPair.privateKey, message);
    setSignature(sig);
    setVerifyMessage(message);
    setVerifySignature(sig);
    setVerifyResult(null);
    setStep('verify');
    setSignLoading(false);
  };

  const handleVerify = async () => {
    if (!keyPair || !verifyMessage || !verifySignature) return;
    setVerifyLoading(true);
    try {
      const valid = await rsaVerify(keyPair.publicKey, verifyMessage, verifySignature);
      setVerifyResult(valid);
    } catch {
      setVerifyResult(false);
    }
    setVerifyLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
    >
      <Card>
        <h2 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>Firmas Digitales — RSA-SHA256</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>
          Una firma digital garantiza <strong>autenticidad</strong> (el mensaje vino de quien dice) e{' '}
          <strong>integridad</strong> (no fue modificado). Se firma con la{' '}
          <strong>clave privada</strong> y se verifica con la <strong>clave pública</strong> — lo
          contrario al cifrado asimétrico. Equivalente al <code>sign</code> y <code>verify</code> del
          curso usando RSASSA-PKCS1-v1_5 con SHA-256.
        </p>
      </Card>

      {/* Step 1: Key generation */}
      <Card style={{ borderLeft: `4px solid ${step !== 'idle' ? 'var(--primary)' : 'var(--border-color)'}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
          <span style={{
            width: '1.8rem', height: '1.8rem', borderRadius: '50%',
            backgroundColor: step !== 'idle' ? 'var(--primary)' : 'var(--border-color)',
            color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 700, fontSize: '0.9rem', flexShrink: 0,
          }}>1</span>
          <h3 style={{ margin: 0, color: 'var(--text-primary)' }}>Generar par de claves RSA</h3>
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.5rem' }}>
            Longitud del módulo
          </label>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {([2048, 3072, 4096] as const).map(len => (
              <button
                key={len}
                onClick={() => setModulusLength(len)}
                style={{
                  padding: '0.3rem 0.8rem',
                  borderRadius: 'var(--radius-md)',
                  border: `1px solid ${modulusLength === len ? 'var(--primary)' : 'var(--border-color)'}`,
                  backgroundColor: modulusLength === len ? 'rgba(152,202,63,0.15)' : 'transparent',
                  color: modulusLength === len ? 'var(--primary)' : 'var(--text-secondary)',
                  cursor: 'pointer', fontSize: '0.85rem',
                  fontWeight: modulusLength === len ? 600 : 400,
                }}
              >
                {len} bits
              </button>
            ))}
          </div>
        </div>

        <Button onClick={handleGenerate} disabled={keyLoading}>
          {keyLoading ? 'Generando...' : step !== 'idle' ? 'Regenerar claves' : 'Generar claves RSA'}
        </Button>

        {publicKeyPem && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ marginTop: '1rem' }}>
            <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Clave pública (compartir libremente)
            </label>
            <pre style={{
              margin: '0.25rem 0 0 0', padding: '0.75rem', backgroundColor: 'var(--bg-color)',
              borderRadius: 'var(--radius-md)', fontSize: '0.72rem', color: 'var(--primary)',
              fontFamily: "'Fira Code', 'Consolas', monospace",
              border: '1px solid rgba(152,202,63,0.3)', overflowX: 'auto',
            }}>
              {publicKeyPem}
            </pre>
            <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
              La clave privada permanece en memoria — nunca sale del navegador.
            </p>
          </motion.div>
        )}
      </Card>

      {/* Step 2: Sign */}
      {step !== 'idle' && (
        <Card style={{ borderLeft: `4px solid ${step === 'verify' ? 'var(--primary)' : 'var(--border-color)'}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <span style={{
              width: '1.8rem', height: '1.8rem', borderRadius: '50%',
              backgroundColor: step === 'verify' ? 'var(--primary)' : 'var(--border-color)',
              color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 700, fontSize: '0.9rem', flexShrink: 0,
            }}>2</span>
            <h3 style={{ margin: 0, color: 'var(--text-primary)' }}>Firmar mensaje (clave privada)</h3>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.5rem' }}>
              Mensaje a firmar
            </label>
            <textarea
              value={message}
              onChange={e => { setMessage(e.target.value); setSignature(''); setVerifyResult(null); }}
              rows={3}
              style={{
                width: '100%', padding: '0.6rem 0.75rem', borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-color)',
                color: 'var(--text-primary)', resize: 'vertical', fontFamily: 'inherit',
                fontSize: '0.9rem', boxSizing: 'border-box', outline: 'none',
              }}
            />
          </div>

          <Button onClick={handleSign} disabled={signLoading || !message}>
            {signLoading ? 'Firmando...' : 'Firmar con clave privada'}
          </Button>

          {signature && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ marginTop: '1rem' }}>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Firma digital ({modulusLength / 8} bytes = {modulusLength} bits)
              </label>
              <pre style={{
                margin: '0.25rem 0 0 0', padding: '0.6rem 0.75rem', backgroundColor: 'var(--bg-color)',
                borderRadius: 'var(--radius-md)', fontSize: '0.72rem', color: '#2563eb',
                wordBreak: 'break-all', whiteSpace: 'pre-wrap',
                fontFamily: "'Fira Code', 'Consolas', monospace",
                border: '1px solid rgba(37,99,235,0.3)',
              }}>
                {signature}
              </pre>
            </motion.div>
          )}
        </Card>
      )}

      {/* Step 3: Verify */}
      {step === 'verify' && signature && (
        <Card>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <span style={{
              width: '1.8rem', height: '1.8rem', borderRadius: '50%',
              backgroundColor: verifyResult === true ? '#10b981' : verifyResult === false ? '#ef4444' : 'var(--border-color)',
              color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 700, fontSize: '0.9rem', flexShrink: 0,
            }}>3</span>
            <h3 style={{ margin: 0, color: 'var(--text-primary)' }}>Verificar firma (clave pública)</h3>
          </div>

          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1rem' }}>
            Modifica el mensaje o la firma para ver cómo la verificación falla — esto es lo que detectaría cualquier receptor.
          </p>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.5rem' }}>
              Mensaje a verificar
            </label>
            <textarea
              value={verifyMessage}
              onChange={e => { setVerifyMessage(e.target.value); setVerifyResult(null); }}
              rows={3}
              style={{
                width: '100%', padding: '0.6rem 0.75rem', borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-color)',
                color: 'var(--text-primary)', resize: 'vertical', fontFamily: 'inherit',
                fontSize: '0.9rem', boxSizing: 'border-box', outline: 'none',
              }}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.5rem' }}>
              Firma (hex)
            </label>
            <textarea
              value={verifySignature}
              onChange={e => { setVerifySignature(e.target.value); setVerifyResult(null); }}
              rows={3}
              style={{
                width: '100%', padding: '0.6rem 0.75rem', borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-color)',
                color: 'var(--text-primary)', resize: 'vertical', fontFamily: 'monospace',
                fontSize: '0.78rem', boxSizing: 'border-box', outline: 'none',
              }}
            />
          </div>

          <Button
            onClick={handleVerify}
            disabled={verifyLoading || !verifyMessage || !verifySignature}
            variant="secondary"
          >
            {verifyLoading ? 'Verificando...' : 'Verificar firma'}
          </Button>

          {verifyResult !== null && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{
                marginTop: '1rem',
                padding: '1rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: verifyResult ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)',
                border: `1px solid ${verifyResult ? '#10b981' : '#ef4444'}`,
                color: verifyResult ? '#10b981' : '#ef4444',
                fontWeight: 600,
                fontSize: '1rem',
                textAlign: 'center',
              }}
            >
              {verifyResult
                ? '✓ Firma VÁLIDA — el mensaje es auténtico e íntegro'
                : '✗ Firma INVÁLIDA — el mensaje fue alterado o la firma es incorrecta'}
            </motion.div>
          )}
        </Card>
      )}
    </motion.div>
  );
}
