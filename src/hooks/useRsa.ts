import { useState, useMemo } from 'react';

export type RsaStep = 'INTRODUCTION' | 'KEY_GENERATION' | 'ENCRYPTION' | 'DECRYPTION';

export interface RsaState {
  currentStep: RsaStep;
  p: string;
  q: string;
  e: string;
  d: string | null;
  plaintext: string;
  ciphertext: string;
  decryptedtext: string;
}

export function useRsa() {
  const [state, setState] = useState<RsaState>({
    currentStep: 'INTRODUCTION',
    p: '',
    q: '',
    e: '65537', // Common default
    d: null,
    plaintext: '',
    ciphertext: '',
    decryptedtext: '',
  });

  const setStep = (step: RsaStep) => {
    setState(s => ({ ...s, currentStep: step }));
  };

  const updateField = (field: keyof RsaState, value: string) => {
    setState(s => ({ ...s, [field]: value }));
  };

  const resetAll = () => {
    setState({
      currentStep: 'INTRODUCTION',
      p: '',
      q: '',
      e: '65537',
      d: null,
      plaintext: '',
      ciphertext: '',
      decryptedtext: '',
    });
  };

  // Derived values based on valid p and q
  const derived = useMemo(() => {
    try {
      const pBig = state.p ? BigInt(state.p) : null;
      const qBig = state.q ? BigInt(state.q) : null;
      const eBig = state.e ? BigInt(state.e) : null;

      let n = null;
      let phi = null;

      if (pBig && qBig) {
        n = pBig * qBig;
        phi = (pBig - 1n) * (qBig - 1n);
      }

      return {
        pBig,
        qBig,
        eBig,
        n,
        phi,
      };
    } catch {
      return { pBig: null, qBig: null, eBig: null, n: null, phi: null };
    }
  }, [state.p, state.q, state.e]);

  return {
    state,
    derived,
    setStep,
    updateField,
    resetAll
  };
}
