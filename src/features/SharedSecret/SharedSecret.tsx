import React, { useMemo, useState, useEffect } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { motion } from 'framer-motion';
import type { ParticipantState } from '../../types';
import { generateSharedSecret } from '../../utils/diffieHellman';

interface Props {
  alice: ParticipantState;
  bob: ParticipantState;
  p: string;
  onNext: () => void;
  onBack: () => void;
  onReset: () => void;
}

export function SharedSecret({ alice, bob, p, onNext, onBack, onReset }: Props) {
  const [calculated, setCalculated] = useState(false);
  const pBig = BigInt(p);
  
  const alicePrivBig = useMemo(() => { try { return BigInt(alice.privateKey); } catch { return 0n; } }, [alice.privateKey]);
  const bobPrivBig = useMemo(() => { try { return BigInt(bob.privateKey); } catch { return 0n; } }, [bob.privateKey]);
  
  const alicePubBig = useMemo(() => { try { return BigInt(alice.publicKey || "0"); } catch { return 0n; } }, [alice.publicKey]);
  const bobPubBig = useMemo(() => { try { return BigInt(bob.publicKey || "0"); } catch { return 0n; } }, [bob.publicKey]);

  const aliceSecret = useMemo(() => generateSharedSecret(bobPubBig, alicePrivBig, pBig).toString(), [bobPubBig, alicePrivBig, pBig]);
  const bobSecret = useMemo(() => generateSharedSecret(alicePubBig, bobPrivBig, pBig).toString(), [alicePubBig, bobPrivBig, pBig]);

  const match = aliceSecret === bobSecret;

  useEffect(() => {
    const t = setTimeout(() => setCalculated(true), 800);
    return () => clearTimeout(t);
  }, []);

  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }}>
      <Card title="Paso 4: El Secreto Compartido">
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
          Finalmente, cada uno toma la Clave Pública que recibió y la eleva a su propia clave secreta. 
          Matemáticamente, ambos caminos llevan al mismo resultado: <br/>
          <code style={{color:'white'}}>(g<sup>b</sup>)<sup>a</sup> mod p = (g<sup>a</sup>)<sup>b</sup> mod p</code>
        </p>

        <div className="grid-cols-2">
          {/* Alice's perspective */}
          <div style={{ backgroundColor: 'var(--panel-bg-hover)', padding: '1.5rem', borderRadius: 'var(--radius-md)' }}>
            <h4 style={{ color: alice.themeColor, marginTop: 0 }}>Cálculo de {alice.name}</h4>
            <div style={{ fontFamily: 'monospace', fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--text-secondary)' }}>
              Secreto = {bob.publicKey}<sup>{alice.privateKey}</sup> mod {p}
            </div>
            
            {calculated && (
              <motion.div 
                initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                style={{ 
                  backgroundColor: match ? 'var(--shared-color)' : 'var(--danger)', 
                  color: 'white', padding: '1rem', borderRadius: 'var(--radius-md)',
                  textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold'
                }}
              >
                {aliceSecret}
              </motion.div>
            )}
          </div>

          {/* Bob's perspective */}
          <div style={{ backgroundColor: 'var(--panel-bg-hover)', padding: '1.5rem', borderRadius: 'var(--radius-md)' }}>
            <h4 style={{ color: bob.themeColor, marginTop: 0 }}>Cálculo de {bob.name}</h4>
            <div style={{ fontFamily: 'monospace', fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--text-secondary)' }}>
              Secreto = {alice.publicKey}<sup>{bob.privateKey}</sup> mod {p}
            </div>
            
            {calculated && (
              <motion.div 
                initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                style={{ 
                  backgroundColor: match ? 'var(--shared-color)' : 'var(--danger)', 
                  color: 'white', padding: '1rem', borderRadius: 'var(--radius-md)',
                  textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold'
                }}
              >
                {bobSecret}
              </motion.div>
            )}
          </div>
        </div>

        {calculated && match && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ marginTop: '2rem', textAlign: 'center' }}>
            <h3 style={{ color: 'var(--shared-color)' }}>¡Éxito! Tienen el mismo secreto.</h3>
            <p style={{ color: 'var(--text-secondary)' }}>
              Ahora pueden usar encriptación simétrica como AES con la clave "{aliceSecret}" para enviar mensajes privados.
            </p>
          </motion.div>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
          <Button variant="secondary" onClick={onBack}>&larr; Volver</Button>
          <div>
            <Button variant="secondary" onClick={onReset} style={{ marginRight: '1rem' }}>Reinciar</Button>
            <Button onClick={onNext}>
              Laboratorio / Playground &rarr;
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
