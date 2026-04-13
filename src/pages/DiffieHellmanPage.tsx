import { useDiffieHellman } from '../hooks/useDiffieHellman';
import { StepIndicator } from '../components/ui/StepIndicator';
import { Introduction } from '../features/Introduction/Introduction';
import { PublicParameters } from '../features/PublicParameters/PublicParameters';
import { KeyGeneration } from '../features/KeyGeneration/KeyGeneration';
import { KeyExchange } from '../features/KeyExchange/KeyExchange';
import { SharedSecret } from '../features/SharedSecret/SharedSecret';
import { Playground } from '../features/Playground/Playground';
import { AnimatePresence } from 'framer-motion';

const DH_STEPS = [
  { id: 'INTRODUCTION', label: 'Intro' },
  { id: 'PARAMETERS', label: 'Dominio Público' },
  { id: 'GENERATION', label: 'Llaves Privadas' },
  { id: 'EXCHANGE', label: 'Intercambio' },
  { id: 'SECRET', label: 'Verificación' }
];

export function DiffieHellmanPage() {
  const dh = useDiffieHellman();

  return (
    <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
      <header style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: 'var(--primary)' }}>Diffie-Hellman</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', margin: 0 }}>
          Explorador Interactivo del Protocolo
        </p>
      </header>

      <StepIndicator currentStep={dh.state.currentStep} steps={DH_STEPS} />

      <main style={{ position: 'relative', flexGrow: 1 }}>
        <AnimatePresence mode="wait">
          {dh.state.currentStep === 'INTRODUCTION' && (
            <Introduction key="intro" onNext={() => dh.setStep("PARAMETERS")} />
          )}
          
          {dh.state.currentStep === 'PARAMETERS' && (
            <PublicParameters 
              key="params" 
              p={dh.state.p} g={dh.state.g} 
              updateP={dh.updateP} updateG={dh.updateG} 
              onNext={() => dh.setStep("GENERATION")} 
              onBack={() => dh.setStep("INTRODUCTION")} 
            />
          )}
            
          {dh.state.currentStep === 'GENERATION' && (
            <KeyGeneration 
              key="gen" 
              alice={dh.state.alice} bob={dh.state.bob} 
              p={dh.state.p} g={dh.state.g} 
              updateAlicePrivate={dh.updateAlicePrivate} updateBobPrivate={dh.updateBobPrivate} 
              setPublicKeys={dh.setPublicKeys} 
              onNext={() => dh.setStep("EXCHANGE")} 
              onBack={() => dh.setStep("PARAMETERS")} 
            />
          )}
            
          {dh.state.currentStep === 'EXCHANGE' && (
            <KeyExchange 
              key="exc" 
              alice={dh.state.alice} bob={dh.state.bob} 
              onNext={() => dh.setStep("SECRET")} 
              onBack={() => dh.setStep("GENERATION")} 
            />
          )}
            
          {dh.state.currentStep === 'SECRET' && (
            <SharedSecret 
              key="sec" 
              alice={dh.state.alice} bob={dh.state.bob} p={dh.state.p} 
              onNext={() => dh.setStep("PLAYGROUND")} 
              onBack={() => dh.setStep("EXCHANGE")} 
              onReset={() => { dh.resetAll(); dh.setStep("INTRODUCTION"); }}
            />
          )}

          {dh.state.currentStep === 'PLAYGROUND' && (
            <Playground 
              key="play" 
              p={dh.state.p} g={dh.state.g} 
              updateP={dh.updateP} updateG={dh.updateG} 
              alice={dh.state.alice} bob={dh.state.bob} 
              updateAlicePrivate={dh.updateAlicePrivate} updateBobPrivate={dh.updateBobPrivate} 
              onReset={dh.resetAll}
            />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
