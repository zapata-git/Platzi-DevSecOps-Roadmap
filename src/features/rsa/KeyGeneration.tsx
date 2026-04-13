import { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { motion } from 'framer-motion';
import { isPrime, generatePrime, modInverse, gcd } from '../../utils/mathUtils';
import { Tooltip } from '../../components/ui/Tooltip';

interface Props {
  p: string;
  q: string;
  e: string;
  n: bigint | null;
  phi: bigint | null;
  d: string | null;
  updateField: (field: keyof import('../../hooks/useRsa').RsaState, val: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export function KeyGeneration({ p, q, e, n, phi, d, updateField, onNext, onBack }: Props) {
  const [errorP, setErrorP] = useState('');
  const [errorQ, setErrorQ] = useState('');
  const [errorE, setErrorE] = useState('');

  const generateRandomPrimeP = () => {
    updateField('p', generatePrime(100n, 999n).toString());
    setErrorP('');
  };

  const generateRandomPrimeQ = () => {
    updateField('q', generatePrime(100n, 999n).toString());
    setErrorQ('');
  };

  const loadAdhikariExample = () => {
    updateField('p', '61');
    updateField('q', '53');
    updateField('e', '17');
    updateField('d', ''); // Limpiar 'd' para forzar cálculo
    setErrorP('');
    setErrorQ('');
    setErrorE('');
  };

  const computeKeys = () => {
    if (!p || !q) {
      setErrorP("Ingresa p");
      setErrorQ("Ingresa q");
      return;
    }

    try {
      const pBig = BigInt(p);
      const qBig = BigInt(q);
      
      if (!isPrime(pBig)) {
        setErrorP("p no es primo");
        return;
      }
      if (!isPrime(qBig)) {
        setErrorQ("q no es primo");
        return;
      }
      if (pBig === qBig) {
        setErrorQ("p y q deben ser diferentes");
        return;
      }

      setErrorP('');
      setErrorQ('');

      const eBig = BigInt(e);
      const computedPhi = (pBig - 1n) * (qBig - 1n);

      if (eBig <= 1n || eBig >= computedPhi) {
        setErrorE("e debe estar entre 1 y phi");
        return;
      }
      if (gcd(eBig, computedPhi) !== 1n) {
        setErrorE("e no es coprimo con phi");
        return;
      }
      
      setErrorE('');

      const dBig = modInverse(eBig, computedPhi);
      if (dBig) {
        updateField('d', dBig.toString());
      } else {
        setErrorE("No se pudo calcular la llave privada d");
      }
    } catch {
      setErrorP("Error de formato");
    }
  };

  const isReady = p && q && n && phi && d;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
    >
      <Card>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
          <h2 style={{ color: 'var(--secondary)', margin: 0 }}>
            Paso 1: Parámetros Base
          </h2>
          <Button onClick={loadAdhikariExample} variant="secondary" style={{ borderColor: 'var(--secondary)', color: 'var(--text-primary)' }}>
            <span style={{ fontSize: '1.2rem', marginRight: '0.3rem' }}>🧙‍♂️</span> Cargar Ejemplo (Vishwas)
          </Button>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Primo P</label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <Input 
                value={p} 
                onChange={(e) => { updateField('p', e.target.value); setErrorP(''); updateField('d', ''); }} 
                type="number" 
                placeholder="Ej. 61" 
              />
              <Button onClick={generateRandomPrimeP} variant="secondary">Aleatorio</Button>
            </div>
            {errorP && <span style={{ color: 'var(--danger)', fontSize: '0.85rem' }}>{errorP}</span>}
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Primo Q</label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <Input 
                value={q} 
                onChange={(e) => { updateField('q', e.target.value); setErrorQ(''); updateField('d', ''); }} 
                type="number" 
                placeholder="Ej. 53" 
              />
              <Button onClick={generateRandomPrimeQ} variant="secondary">Aleatorio</Button>
            </div>
            {errorQ && <span style={{ color: 'var(--danger)', fontSize: '0.85rem' }}>{errorQ}</span>}
          </div>
        </div>
      </Card>

      <Card>
         <h2 style={{ color: 'var(--secondary)', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
          Paso 2: Generación
        </h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem', opacity: (p && q) ? 1 : 0.5 }}>
          <div style={{ padding: '1rem', backgroundColor: 'var(--surface)', borderRadius: 'var(--radius-md)' }}>
            <strong><Tooltip text="Módulo o 'campo de juego' para las matemáticas. (P × Q)">Módulo (n)</Tooltip> = P × Q</strong>
            <div style={{ fontFamily: 'monospace', fontSize: '1.2rem', marginTop: '0.5rem', wordBreak: 'break-all' }}>
              {n ? n.toString() : '?'}
            </div>
          </div>
          <div style={{ padding: '1rem', backgroundColor: 'var(--surface)', borderRadius: 'var(--radius-md)' }}>
            <strong><Tooltip text="Cantidad de enteros coprimos hasta Módulo(N). Φ(n) = (P-1)(Q-1)">Totiente (φ)</Tooltip> = (P-1) × (Q-1)</strong>
            <div style={{ fontFamily: 'monospace', fontSize: '1.2rem', marginTop: '0.5rem', wordBreak: 'break-all' }}>
              {phi ? phi.toString() : '?'}
            </div>
          </div>
        </div>

        <div style={{ marginBottom: '1rem', opacity: (p && q) ? 1 : 0.5 }}>
           <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Exponente Público (E)</label>
           <Input 
              value={e} 
              onChange={(e) => { updateField('e', e.target.value); setErrorE(''); updateField('d', ''); }} 
              type="number" 
              placeholder="Ej. 65537" 
            />
            {errorE && <span style={{ color: 'var(--danger)', fontSize: '0.85rem' }}>{errorE}</span>}
            <small style={{ display: 'block', marginTop: '0.5rem', color: 'var(--text-secondary)' }}>Comúnmente se usa 65537.</small>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button onClick={computeKeys} variant="primary" style={{ backgroundColor: 'var(--secondary)' }}>
            Calcular Llave Privada (D)
          </Button>
        </div>

        {d && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            style={{ marginTop: '1.5rem', padding: '1.5rem', backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid var(--danger)', borderRadius: 'var(--radius-md)' }}
          >
            <h3 style={{ color: 'var(--danger)', margin: '0 0 0.5rem 0' }}>Llave Privada Generada</h3>
            <div style={{ display: 'flex', gap: '2rem' }}>
              <div>
                <span style={{ color: 'var(--text-secondary)' }}>D = </span>
                <strong style={{ fontFamily: 'monospace', fontSize: '1.2rem' }}>{d}</strong>
              </div>
            </div>
          </motion.div>
        )}
      </Card>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
        <Button onClick={onBack} variant="secondary">
          &larr; Volver
        </Button>
        <Button onClick={onNext} variant="primary" disabled={!isReady} style={{ backgroundColor: 'var(--secondary)' }}>
          Probar Cifrado &rarr;
        </Button>
      </div>
    </motion.div>
  );
}
