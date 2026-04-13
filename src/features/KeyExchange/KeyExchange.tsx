import { useState, useEffect } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { motion } from 'framer-motion';
import type { ParticipantState } from '../../types';

interface Props {
  alice: ParticipantState;
  bob: ParticipantState;
  onNext: () => void;
  onBack: () => void;
}

export function KeyExchange({ alice, bob, onNext, onBack }: Props) {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setStage(1), 1000); 
    const t2 = setTimeout(() => setStage(2), 2500); 
    const t3 = setTimeout(() => setStage(3), 4000); 
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
      <Card title="Paso 3: Intercambio por Red Insegura">
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
          Ahora Alice y Bob envían sus Claves Públicas. Si un espía ("Eve") intercepta esto,
          no podrá deducir los secretos personales (gracias al logaritmo discreto).
        </p>

        <div style={{ position: 'relative', height: '300px', backgroundColor: 'var(--bg-color)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          
          {/* Alice Base */}
          <div style={{ position: 'absolute', left: '2rem', top: '50%', transform: 'translateY(-50%)', textAlign: 'center' }}>
            <div style={{ width: '80px', height: '80px', backgroundColor: alice.themeColor, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', boxShadow: `0 0 20px ${alice.themeColor}aa` }}>
               <h3 style={{ margin: 0, color: 'white' }}>{alice.name}</h3>
            </div>
          </div>

          {/* Bob Base */}
          <div style={{ position: 'absolute', right: '2rem', top: '50%', transform: 'translateY(-50%)', textAlign: 'center' }}>
            <div style={{ width: '80px', height: '80px', backgroundColor: bob.themeColor, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', boxShadow: `0 0 20px ${bob.themeColor}aa` }}>
               <h3 style={{ margin: 0, color: 'white' }}>{bob.name}</h3>
            </div>
          </div>

          {/* Insecure Channel Indicator */}
          <div style={{ position: 'absolute', left: '100px', right: '100px', height: '2px', backgroundColor: 'var(--border-color)', top: '50%', zIndex: 0 }} />
          <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'rgba(239, 68, 68, 0.2)', padding: '0.5rem 1rem', borderRadius: '20px', color: 'var(--danger)', fontSize: '0.8rem', border: '1px solid var(--danger)', zIndex: 1 }}>
            Canal Público (Vigilado 👀)
          </div>

          {/* Alice's Payload Animation */}
          {stage >= 1 && (
            <motion.div 
              initial={{ x: '100px', y: '-20px', opacity: 1 }}
              animate={stage >= 2 ? { x: 'calc(100% - 160px)' } : {}}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              style={{
                position: 'absolute',
                top: '50%',
                backgroundColor: 'var(--panel-bg)',
                border: `2px solid ${alice.themeColor}`,
                padding: '0.5rem 1rem',
                borderRadius: 'var(--radius-md)',
                color: 'white',
                zIndex: 2,
                marginTop: '-40px'
              }}
            >
              A = {alice.publicKey}
            </motion.div>
          )}

          {/* Bob's Payload Animation */}
          {stage >= 1 && (
            <motion.div 
              initial={{ left: 'calc(100% - 160px)', y: '20px', opacity: 1 }}
              animate={stage >= 2 ? { left: '100px' } : {}}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              style={{
                position: 'absolute',
                top: '50%',
                backgroundColor: 'var(--panel-bg)',
                border: `2px solid ${bob.themeColor}`,
                padding: '0.5rem 1rem',
                borderRadius: 'var(--radius-md)',
                color: 'white',
                zIndex: 2,
                marginTop: '10px'
              }}
            >
              B = {bob.publicKey}
            </motion.div>
          )}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
          <Button variant="secondary" onClick={onBack}>&larr; Volver</Button>
          <Button onClick={onNext} disabled={stage < 3}>
             Verificar Secreto Compartido &rarr;
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}
