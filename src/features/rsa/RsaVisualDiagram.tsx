import { motion } from 'framer-motion';
import { KeyRound, Lock, Unlock, FileText, ArrowRight, ShieldCheck } from 'lucide-react';
import { type RsaStep } from '../../hooks/useRsa';

interface Props {
  currentStep: RsaStep;
}

export function RsaVisualDiagram({ currentStep }: Props) {
  // Configuración de animaciones y opacidades basadas en el paso actual
  const isActive = (step: RsaStep) => currentStep === step || currentStep === 'INTRODUCTION';
  const isPast = (target: RsaStep, current: RsaStep) => {
    if (current === 'INTRODUCTION') return false;
    const order = { KEY_GENERATION: 1, ENCRYPTION: 2, DECRYPTION: 3 };
    // @ts-ignore
    return order[current] > order[target];
  };

  const getOpacity = (step: RsaStep) => isActive(step) || isPast(step, currentStep) ? 1 : 0.3;

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '2rem',
      backgroundColor: 'var(--panel-bg)',
      borderRadius: 'var(--radius-lg)',
      border: '1px solid var(--border-color)',
      marginBottom: '2rem',
      position: 'relative'
    }}>
      {/* EMISOR (Alice) */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: getOpacity('ENCRYPTION') }}>
        <h3 style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem' }}>EMISOR</h3>
        <motion.div
           animate={{ y: currentStep === 'ENCRYPTION' ? [0, -5, 0] : 0 }}
           transition={{ repeat: Infinity, duration: 2 }}
           style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '1rem', background: 'var(--panel-bg-hover)', borderRadius: 'var(--radius-md)', border: currentStep === 'ENCRYPTION' ? '1px solid var(--primary)' : '1px solid transparent' }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <FileText size={24} color="var(--text-primary)" />
            <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Mensaje</span>
          </div>
          <ArrowRight size={16} color="var(--text-secondary)" />
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
            <Lock size={24} color="var(--primary)" />
            <span style={{ fontSize: '0.7rem', color: 'var(--primary)', marginTop: '0.5rem' }}>Cifrado con e</span>
            <motion.div
               initial={{ opacity: 0, scale: 0 }}
               animate={{ opacity: currentStep === 'ENCRYPTION' ? 1 : 0, scale: currentStep === 'ENCRYPTION' ? 1 : 0 }}
               style={{ position: 'absolute', top: -20, right: -10 }}
            >
              <KeyRound size={16} color="var(--primary)" />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* CANAL */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, padding: '0 2rem' }}>
        <h3 style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem' }}>CANAL PÚBLICO</h3>
        <div style={{ width: '100%', height: '2px', backgroundColor: 'var(--border-color)', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <motion.div 
            animate={{ 
              x: currentStep === 'ENCRYPTION' ? ['-100px', '100px'] : 0,
              opacity: currentStep === 'ENCRYPTION' ? [0, 1, 0] : 0
            }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            style={{ position: 'absolute' }}
          >
             <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', backgroundColor: 'var(--bg-color)', padding: '0.2rem 0.5rem', borderRadius: '1rem', border: '1px solid var(--border-color)' }}>
               <FileText size={14} color="var(--text-secondary)" />
               <Lock size={12} color="var(--text-secondary)" />
             </div>
          </motion.div>
          {currentStep === 'DECRYPTION' && (
            <div style={{ position: 'absolute', display: 'flex', alignItems: 'center', gap: '0.2rem', backgroundColor: 'var(--bg-color)', padding: '0.2rem 0.5rem', borderRadius: '1rem', border: '1px solid var(--border-color)' }}>
               <FileText size={14} color="var(--text-secondary)" />
               <Lock size={12} color="var(--text-secondary)" />
             </div>
          )}
        </div>
      </div>

      {/* RECEPTOR (Bob) */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: getOpacity('DECRYPTION') }}>
        <h3 style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem' }}>RECEPTOR</h3>
        <motion.div
           animate={{ y: currentStep === 'DECRYPTION' ? [0, -5, 0] : 0 }}
           transition={{ repeat: Infinity, duration: 2 }}
           style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '1rem', background: 'var(--panel-bg-hover)', borderRadius: 'var(--radius-md)', border: currentStep === 'DECRYPTION' ? '1px solid var(--danger)' : '1px solid transparent' }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
            <Unlock size={24} color="var(--danger)" />
            <span style={{ fontSize: '0.7rem', color: 'var(--danger)', marginTop: '0.5rem' }}>Descifrado con d</span>
            <motion.div
               initial={{ opacity: 0, scale: 0 }}
               animate={{ opacity: currentStep === 'DECRYPTION' ? 1 : 0, scale: currentStep === 'DECRYPTION' ? 1 : 0 }}
               style={{ position: 'absolute', top: -20, left: -10 }}
            >
              <KeyRound size={16} color="var(--danger)" />
            </motion.div>
          </div>
          <ArrowRight size={16} color="var(--text-secondary)" />
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <FileText size={24} color="var(--text-primary)" />
            <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Mensaje</span>
          </div>
        </motion.div>
      </div>

       {/* Llaves Generadas - Top */}
       <div style={{ position: 'absolute', top: '-15px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '1rem', opacity: getOpacity('KEY_GENERATION') }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'var(--panel-bg)', padding: '0.2rem 1rem', borderRadius: '1rem', border: '1px solid var(--primary)', fontSize: '0.8rem', color: 'var(--primary)' }}>
             <KeyRound size={14} /> Llave Pública (n, e)
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'var(--panel-bg)', padding: '0.2rem 1rem', borderRadius: '1rem', border: '1px solid var(--danger)', fontSize: '0.8rem', color: 'var(--danger)' }}>
             <KeyRound size={14} /> Llave Privada (d)
          </div>
       </div>
    </div>
  );
}
