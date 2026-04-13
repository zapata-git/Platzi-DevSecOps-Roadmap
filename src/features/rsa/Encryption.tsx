import { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { motion } from 'framer-motion';
import { powerMod, textToBigInt } from '../../utils/mathUtils';

interface Props {
  e: string;
  n: bigint | null;
  plaintext: string;
  ciphertext: string;
  updateField: (field: any, val: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export function Encryption({ e, n, plaintext, ciphertext, updateField, onNext, onBack }: Props) {
  const [error, setError] = useState('');

  const handleEncrypt = () => {
    if (!plaintext) {
      setError('Escribe un mensaje para cifrar');
      return;
    }
    if (!e || !n) return;

    try {
      // 1. Convert text to a number (BigInt)
      const messageBigInt = textToBigInt(plaintext);
      
      // 2. Encrypt: C = M^e mod n
      if (messageBigInt >= n) {
        setError(`El mensaje numéricamente es mayor o igual al módulo N (${n}). Necesitas primos P y Q más grandes para cifrar textos más largos.`);
        return;
      }
      
      setError('');
      const eBig = BigInt(e);
      const encrypted = powerMod(messageBigInt, eBig, n);
      updateField('ciphertext', encrypted.toString());
    } catch {
      setError('Error al cifrar el mensaje');
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
        <h2 style={{ color: 'var(--secondary)', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
          Cifrado con Llave Pública
        </h2>
        
        <p style={{ color: 'var(--text-secondary)' }}>
          La llave pública es: <strong>(E: {e}, N: {n?.toString()})</strong>.
          Cualquier persona puede usar esta llave para cifrar un mensaje.
        </p>

        <div style={{ marginTop: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Mensaje a cifrar (Texto)</label>
          <Input 
            value={plaintext} 
            onChange={(e) => { updateField('plaintext', e.target.value); setError(''); updateField('ciphertext', ''); }} 
            placeholder="Ej. A (Se numéricará como 65)" 
          />
          <small style={{ color: 'var(--text-secondary)', display: 'block', marginTop: '0.5rem' }}>
             💡 <strong>Tip Tutorial:</strong> Escribe la letra <strong>A</strong> que en ASCII (valor numérico) es <strong>65</strong> para replicar el ejemplo del artículo.
          </small>
          {error && <span style={{ color: 'var(--danger)', fontSize: '0.85rem', display: 'block', marginTop: '0.5rem' }}>{error}</span>}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1.5rem' }}>
          <Button onClick={handleEncrypt} variant="primary" style={{ backgroundColor: 'var(--secondary)' }}>
            Cifrar Mensaje: C = Mᴱ mod N
          </Button>
        </div>

        {ciphertext && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            style={{ marginTop: '1.5rem', padding: '1.5rem', backgroundColor: 'var(--surface)', borderRadius: 'var(--radius-md)' }}
          >
            <h3 style={{ margin: '0 0 0.5rem 0', color: 'var(--secondary)' }}>Texto Cifrado (C)</h3>
            <div style={{ fontFamily: 'monospace', fontSize: '1.2rem', wordBreak: 'break-all' }}>
              {ciphertext}
            </div>
          </motion.div>
        )}
      </Card>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
        <Button onClick={onBack} variant="secondary">
          &larr; Volver
        </Button>
        <Button onClick={onNext} variant="primary" disabled={!ciphertext} style={{ backgroundColor: 'var(--secondary)' }}>
          Probar Descifrado &rarr;
        </Button>
      </div>
    </motion.div>
  );
}
