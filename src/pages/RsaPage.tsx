import { useRsa } from '../hooks/useRsa';
import { StepIndicator } from '../components/ui/StepIndicator';
import { Introduction } from '../features/rsa/Introduction';
import { KeyGeneration } from '../features/rsa/KeyGeneration';
import { Encryption } from '../features/rsa/Encryption';
import { Decryption } from '../features/rsa/Decryption';
import { RsaVisualDiagram } from '../features/rsa/RsaVisualDiagram';
import { CodeExamples } from '../features/rsa/CodeExamples';
import { AnimatePresence } from 'framer-motion';

const RSA_STEPS = [
  { id: 'INTRODUCTION', label: 'Introducción' },
  { id: 'KEY_GENERATION', label: 'Generación de Llaves' },
  { id: 'ENCRYPTION', label: 'Cifrado' },
  { id: 'DECRYPTION', label: 'Descifrado' }
];

export function RsaPage() {
  const rsa = useRsa();

  return (
    <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
      <header style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: 'var(--secondary)' }}>Algoritmo RSA</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', margin: 0 }}>
          Generación y Cifrado de Llave Pública
        </p>
      </header>

      <StepIndicator currentStep={rsa.state.currentStep} steps={RSA_STEPS} />
      
      <RsaVisualDiagram currentStep={rsa.state.currentStep} />

      <main style={{ position: 'relative', flexGrow: 1 }}>
        <AnimatePresence mode="wait">
          {rsa.state.currentStep === 'INTRODUCTION' && (
            <Introduction 
              key="intro" 
              onNext={() => rsa.setStep("KEY_GENERATION")} 
            />
          )}

          {rsa.state.currentStep === 'KEY_GENERATION' && (
            <KeyGeneration 
              key="gen"
              p={rsa.state.p} q={rsa.state.q} e={rsa.state.e} d={rsa.state.d}
              n={rsa.derived.n} phi={rsa.derived.phi}
              updateField={rsa.updateField}
              onNext={() => rsa.setStep("ENCRYPTION")}
              onBack={() => rsa.setStep("INTRODUCTION")}
            />
          )}

          {rsa.state.currentStep === 'ENCRYPTION' && (
            <Encryption 
              key="enc"
              e={rsa.state.e} n={rsa.derived.n}
              plaintext={rsa.state.plaintext} ciphertext={rsa.state.ciphertext}
              updateField={rsa.updateField}
              onNext={() => rsa.setStep("DECRYPTION")}
              onBack={() => rsa.setStep("KEY_GENERATION")}
            />
          )}

          {rsa.state.currentStep === 'DECRYPTION' && (
            <Decryption 
              key="dec"
              d={rsa.state.d} n={rsa.derived.n}
              ciphertext={rsa.state.ciphertext} decryptedtext={rsa.state.decryptedtext}
              updateField={rsa.updateField}
              onReset={() => { rsa.resetAll(); rsa.setStep("INTRODUCTION") }}
              onBack={() => rsa.setStep("ENCRYPTION")}
            />
          )}
        </AnimatePresence>
      </main>
      
      <CodeExamples />
    </div>
  );
}
