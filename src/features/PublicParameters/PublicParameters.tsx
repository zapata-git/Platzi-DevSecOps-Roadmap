import React, { useMemo } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { motion } from 'framer-motion';
import { isPrime, findPrimitiveRoots } from '../../utils/mathUtils';
import { DEFAULT_P, DEFAULT_G } from '../../constants/dh-defaults';

interface Props {
  p: string;
  g: string;
  updateP: (val: string) => void;
  updateG: (val: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export function PublicParameters({ p, g, updateP, updateG, onNext, onBack }: Props) {
  
  const pBig = useMemo(() => {
    try { return BigInt(p); } catch { return 0n; }
  }, [p]);

  const gBig = useMemo(() => {
    try { return BigInt(g); } catch { return 0n; }
  }, [g]);

  const isValidPrime = useMemo(() => isPrime(pBig), [pBig]);
  const primeRoots = useMemo(() => {
    if (isValidPrime && pBig < 10000n) {
      return findPrimitiveRoots(pBig, 15);
    }
    return [];
  }, [isValidPrime, pBig]);

  const isValidGenerator = useMemo(() => {
    if (!isValidPrime) return false;
    return primeRoots.includes(gBig) || (isValidPrime && gBig > 1n && gBig < pBig); 
    // In strict cryptography, g should be primitive root, but we can be forgiving or highlight it.
  }, [isValidPrime, primeRoots, gBig, pBig]);

  const isStrictPrimitive = primeRoots.includes(gBig);

  return (
    <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}>
      <Card title="Paso 1: Parámetros Públicos (El Entorno)">
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
          Toda la red acuerda utilizar dos números públicos que no son secretos. Cualquiera en internet puede conocerlos, incluyendo atacantes.
        </p>

        <div className="grid-cols-2">
          {/* Parámetro p */}
          <div style={{ backgroundColor: 'var(--panel-bg-hover)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
            <h4 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>Módulo Primo (p)</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Debe ser un número primo. Define el tamaño máximo de los números que calcularemos (el tamaño del "reloj" en aritmética modular).
            </p>
            <Input 
              type="number" 
              value={p} 
              onChange={(e) => updateP(e.target.value)}
              error={!isValidPrime && p !== '' ? 'Debe ser un número primo.' : undefined}
            />
            {isValidPrime && p !== '' && <span style={{ color: 'var(--shared-color)', fontSize: '0.8rem' }}>✓ Primo válido</span>}
          </div>

          {/* Parámetro g */}
          <div style={{ backgroundColor: 'var(--panel-bg-hover)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
            <h4 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>Generador o Base (g)</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Es la base que será elevada a un exponente. Idealmente debe ser una "raíz primitiva" de p.
            </p>
            <Input 
              type="number" 
              value={g} 
              onChange={(e) => updateG(e.target.value)}
              error={g === '' || gBig <= 1n || gBig >= pBig ? 'Debe ser mayor que 1 y menor que p.' : undefined}
            />
            {!isStrictPrimitive && isValidGenerator && <span style={{ color: 'var(--warning)', fontSize: '0.8rem' }}>⚠️ No es raíz primitiva de {p}, el algoritmo funcionará pero con menor seguridad teórica.</span>}
            {isStrictPrimitive && <span style={{ color: 'var(--shared-color)', fontSize: '0.8rem' }}>✓ Es raíz primitiva válida</span>}
            
            {isValidPrime && primeRoots.length > 0 && (
              <div style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                Sugerencias para g: {primeRoots.slice(0, 5).join(', ')}...
              </div>
            )}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
          <Button variant="secondary" onClick={onBack}>&larr; Volver</Button>
          <Button onClick={onNext} disabled={!isValidPrime || !isValidGenerator}>
            Generar Claves Privadas &rarr;
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}
