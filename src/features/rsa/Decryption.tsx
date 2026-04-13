import { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { motion } from 'framer-motion';
import { powerMod, bigIntToText } from '../../utils/mathUtils';
import { Tooltip } from '../../components/ui/Tooltip';

interface Props {
  d: string | null;
  n: bigint | null;
  ciphertext: string;
  decryptedtext: string;
  updateField: (field: any, val: string) => void;
  onReset: () => void;
  onBack: () => void;
}

export function Decryption({ d, n, ciphertext, decryptedtext, updateField, onReset, onBack }: Props) {
  const [error, setError] = useState('');

  const handleDecrypt = () => {
    if (!ciphertext || !d || !n) return;

    try {
      const cBig = BigInt(ciphertext);
      const dBig = BigInt(d);
      
      // Decrypt: M = C^d mod n
      const decryptedNumber = powerMod(cBig, dBig, n);
      
      // Convert number back to text
      const text = bigIntToText(decryptedNumber);
      
      updateField('decryptedtext', text);
      setError('');
    } catch {
      setError('Error al descifrar');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
    >
      <Card>
        <h2 style={{ color: 'var(--danger)', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
          Descifrado con Llave Privada
        </h2>
        
        <p style={{ color: 'var(--text-secondary)' }}>
          Para recuperar el mensaje, utilizamos nuestra llave privada: <strong>(D: {d}, N: {n?.toString()})</strong>.
        </p>

        <div style={{ marginTop: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Texto Cifrado Recibido (C)</label>
          <div style={{ padding: '1rem', backgroundColor: 'var(--surface)', borderRadius: 'var(--radius-md)', fontFamily: 'monospace', wordBreak: 'break-all' }}>
            {ciphertext || 'Ninguno'}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1.5rem', flexDirection: 'column', alignItems: 'center' }}>
          <Button onClick={handleDecrypt} variant="primary" style={{ backgroundColor: 'var(--danger)' }}>
            Descifrar Mensaje: M = Cᴰ mod N
          </Button>
          {ciphertext && d && n && (
            <div style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Matemáticamente: <Tooltip text={`Calculando un número gigantesco pero de manera eficiente usando exponenciación modular y la Llave Privada ${d}`}>
                {ciphertext.substring(0, 10)}{ciphertext.length > 10 ? '...' : ''}<sup>{d.substring(0, 5)}{d.length > 5 ? '...' : ''}</sup> mod {n.toString()}
              </Tooltip>
            </div>
          )}
        </div>

        {error && <span style={{ color: 'var(--danger)', fontSize: '0.85rem', display: 'block', textAlign: 'center', marginTop: '1rem' }}>{error}</span>}

        {decryptedtext && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            style={{ marginTop: '1.5rem', padding: '1.5rem', backgroundColor: 'rgba(52, 211, 153, 0.1)', border: '1px solid #10b981', borderRadius: 'var(--radius-md)' }}
          >
            <h3 style={{ margin: '0 0 0.5rem 0', color: '#10b981' }}>¡Mensaje Descifrado con Éxito!</h3>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
              {decryptedtext}
            </div>
          </motion.div>
        )}
      </Card>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
        <Button onClick={onBack} variant="secondary">
          &larr; Volver
        </Button>
        <Button onClick={onReset} variant="secondary" style={{ borderColor: 'var(--secondary)', color: 'var(--secondary)' }}>
          Probar Otra Vez
        </Button>
      </div>
    </motion.div>
  );
}
