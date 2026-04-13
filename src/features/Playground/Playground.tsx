import { useMemo } from 'react';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { motion } from 'framer-motion';
import type { ParticipantState } from '../../types';
import { isPrime } from '../../utils/mathUtils';
import { generatePublicKey, generateSharedSecret } from '../../utils/diffieHellman';

interface Props {
  p: string;
  g: string;
  updateP: (val: string) => void;
  updateG: (val: string) => void;
  alice: ParticipantState;
  bob: ParticipantState;
  updateAlicePrivate: (val: string) => void;
  updateBobPrivate: (val: string) => void;
  onReset: () => void;
}

export function Playground({ p, g, updateP, updateG, alice, bob, updateAlicePrivate, updateBobPrivate, onReset }: Props) {
  
  const pBig = useMemo(() => { try { return BigInt(p); } catch { return 0n; } }, [p]);
  const gBig = useMemo(() => { try { return BigInt(g); } catch { return 0n; } }, [g]);
  const aPrivBig = useMemo(() => { try { return BigInt(alice.privateKey); } catch { return 0n; } }, [alice.privateKey]);
  const bPrivBig = useMemo(() => { try { return BigInt(bob.privateKey); } catch { return 0n; } }, [bob.privateKey]);

  const pError = pBig <= 1n || !isPrime(pBig) ? 'p debe ser un número primo > 1' : undefined;
  
  const aPub = useMemo(() => {
    if (pError || gBig <= 0n || aPrivBig <= 0n) return '-';
    return generatePublicKey(aPrivBig, gBig, pBig).toString();
  }, [pError, gBig, aPrivBig, pBig]);

  const bPub = useMemo(() => {
    if (pError || gBig <= 0n || bPrivBig <= 0n) return '-';
    return generatePublicKey(bPrivBig, gBig, pBig).toString();
  }, [pError, gBig, bPrivBig, pBig]);

  const aSecret = useMemo(() => {
    if (bPub === '-' || aPrivBig <= 0n) return '-';
    try { return generateSharedSecret(BigInt(bPub), aPrivBig, pBig).toString(); } catch { return '-'; }
  }, [bPub, aPrivBig, pBig]);

  const bSecret = useMemo(() => {
    if (aPub === '-' || bPrivBig <= 0n) return '-';
    try { return generateSharedSecret(BigInt(aPub), bPrivBig, pBig).toString(); } catch { return '-'; }
  }, [aPub, bPrivBig, pBig]);

  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
      <Card title="Laboratorio Libre">
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
          Experimenta libremente. Cambia los números en tiempo real y observa cómo reacciona el algoritmo.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
          <div style={{ backgroundColor: 'var(--panel-bg-hover)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
            <h4 style={{ margin: '0 0 1rem 0' }}>Parámetros Públicos</h4>
            <Input label="Módulo Primo (p)" type="number" value={p} onChange={(e) => updateP(e.target.value)} error={pError} />
            <Input label="Generador (g)" type="number" value={g} onChange={(e) => updateG(e.target.value)} />
          </div>

          <div style={{ backgroundColor: 'var(--panel-bg-hover)', padding: '1rem', borderRadius: 'var(--radius-md)', borderTop: `4px solid ${alice.themeColor}` }}>
            <h4 style={{ margin: '0 0 1rem 0', color: alice.themeColor }}>{alice.name}</h4>
            <Input label="Clave Privada (a)" type="number" value={alice.privateKey} onChange={(e) => updateAlicePrivate(e.target.value)} />
            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Clave Pública A: <strong style={{color:'white'}}>{aPub}</strong></div>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Secreto Calculado: <strong style={{color:'white'}}>{aSecret}</strong></div>
          </div>

          <div style={{ backgroundColor: 'var(--panel-bg-hover)', padding: '1rem', borderRadius: 'var(--radius-md)', borderTop: `4px solid ${bob.themeColor}` }}>
            <h4 style={{ margin: '0 0 1rem 0', color: bob.themeColor }}>{bob.name}</h4>
            <Input label="Clave Privada (b)" type="number" value={bob.privateKey} onChange={(e) => updateBobPrivate(e.target.value)} />
            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Clave Pública B: <strong style={{color:'white'}}>{bPub}</strong></div>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Secreto Calculado: <strong style={{color:'white'}}>{bSecret}</strong></div>
          </div>
        </div>

        <div style={{ textAlign: 'center', backgroundColor: '#10b98122', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px dashed var(--shared-color)' }}>
          <h3 style={{ margin: 0, color: 'var(--shared-color)' }}>
             Estado del Secreto: {aSecret !== '-' && aSecret === bSecret ? '¡CRUZADO EXITOSAMENTE!' : 'DESINCRONIZADO / ERROR'}
          </h3>
        </div>

        <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center' }}>
          <Button variant="secondary" onClick={onReset}>Restaurar Predeterminados</Button>
        </div>
      </Card>
    </motion.div>
  );
}
