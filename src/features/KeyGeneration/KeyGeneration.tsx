import React, { useMemo } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { motion } from 'framer-motion';
import type { ParticipantState } from '../../types';
import { generatePublicKey } from '../../utils/diffieHellman';

interface Props {
  alice: ParticipantState;
  bob: ParticipantState;
  p: string;
  g: string;
  updateAlicePrivate: (val: string) => void;
  updateBobPrivate: (val: string) => void;
  setPublicKeys: (aPub: string, bPub: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export function KeyGeneration({ alice, bob, p, g, updateAlicePrivate, updateBobPrivate, setPublicKeys, onNext, onBack }: Props) {
  const pBig = BigInt(p);
  const gBig = BigInt(g);

  const alicePrivBig = useMemo(() => { try { return BigInt(alice.privateKey); } catch { return 0n; } }, [alice.privateKey]);
  const bobPrivBig = useMemo(() => { try { return BigInt(bob.privateKey); } catch { return 0n; } }, [bob.privateKey]);

  const alicePubValid = alice.privateKey !== '' && alicePrivBig >= 1n;
  const bobPubValid = bob.privateKey !== '' && bobPrivBig >= 1n;

  const handleNext = () => {
    const aPub = generatePublicKey(alicePrivBig, gBig, pBig).toString();
    const bPub = generatePublicKey(bobPrivBig, gBig, pBig).toString();
    setPublicKeys(aPub, bPub);
    onNext();
  };

  return (
    <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}>
      <Card title="Paso 2: Generación de Claves">
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
          Tanto Alice como Bob eligen un número <strong>secreto</strong> que nunca revelarán. 
          Luego, usando la fórmula matemática <code style={{color:'white'}}>A = (g ^ secreto) mod p</code>, generan su Clave Pública, 
          que es como una "mezcla" de la pintura pública con su color secreto.
        </p>

        <div className="grid-cols-2">
          {/* Alice */}
          <div style={{ backgroundColor: 'var(--panel-bg-hover)', padding: '1.5rem', borderRadius: 'var(--radius-md)', borderTop: `4px solid ${alice.themeColor}` }}>
            <h3 style={{ color: alice.themeColor, marginTop: 0 }}>{alice.name}</h3>
            
            <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.5rem' }}>
              Número Secreto de {alice.name} (a)
            </label>
            <Input 
              type="number" 
              value={alice.privateKey} 
              onChange={(e) => updateAlicePrivate(e.target.value)}
            />
            
            <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: 'var(--bg-color)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Formula Pública (A):</div>
              <div style={{ fontFamily: 'monospace', fontSize: '1.1rem', wordBreak: 'break-all' }}>
                A = {g}<sup>{alice.privateKey || 'a'}</sup> mod {p}
              </div>
            </div>
          </div>

          {/* Bob */}
          <div style={{ backgroundColor: 'var(--panel-bg-hover)', padding: '1.5rem', borderRadius: 'var(--radius-md)', borderTop: `4px solid ${bob.themeColor}` }}>
            <h3 style={{ color: bob.themeColor, marginTop: 0 }}>{bob.name}</h3>
            
            <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.5rem' }}>
              Número Secreto de {bob.name} (b)
            </label>
            <Input 
              type="number" 
              value={bob.privateKey} 
              onChange={(e) => updateBobPrivate(e.target.value)}
            />

            <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: 'var(--bg-color)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Formula Pública (B):</div>
              <div style={{ fontFamily: 'monospace', fontSize: '1.1rem', wordBreak: 'break-all' }}>
                B = {g}<sup>{bob.privateKey || 'b'}</sup> mod {p}
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
          <Button variant="secondary" onClick={onBack}>&larr; Volver</Button>
          <Button onClick={handleNext} disabled={!alicePubValid || !bobPubValid}>
            Calcular e Intercambiar &rarr;
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}
