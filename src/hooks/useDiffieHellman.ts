import { useState } from "react";
import type { DHSimulatorState, DHStep } from "../types";
import { DEFAULT_P, DEFAULT_G, PARTICIPANT_A, PARTICIPANT_B } from "../constants/dh-defaults";

const INITIAL_STATE: DHSimulatorState = {
  p: DEFAULT_P.toString(),
  g: DEFAULT_G.toString(),
  currentStep: "INTRODUCTION",
  alice: {
    name: PARTICIPANT_A,
    privateKey: "6", // default example
    publicKey: null,
    sharedSecret: null,
    themeColor: "#ec4899", // pink-500
  },
  bob: {
    name: PARTICIPANT_B,
    privateKey: "15", // default example
    publicKey: null,
    sharedSecret: null,
    themeColor: "#3b82f6", // blue-500
  }
};

export function useDiffieHellman() {
  const [state, setState] = useState<DHSimulatorState>(INITIAL_STATE);

  const setStep = (step: DHStep) => setState(s => ({ ...s, currentStep: step }));
  
  const updateP = (val: string) => setState(s => ({ ...s, p: val }));
  const updateG = (val: string) => setState(s => ({ ...s, g: val }));

  const updateAlicePrivate = (val: string) => setState(s => ({ ...s, alice: { ...s.alice, privateKey: val }}));
  const updateBobPrivate = (val: string) => setState(s => ({ ...s, bob: { ...s.bob, privateKey: val }}));

  const setPublicKeys = (alicePub: string, bobPub: string) => setState(s => ({
    ...s,
    alice: { ...s.alice, publicKey: alicePub },
    bob: { ...s.bob, publicKey: bobPub }
  }));

  const setSharedSecrets = (aliceSecret: string, bobSecret: string) => setState(s => ({
    ...s,
    alice: { ...s.alice, sharedSecret: aliceSecret },
    bob: { ...s.bob, sharedSecret: bobSecret }
  }));

  const resetAll = () => setState(INITIAL_STATE);

  return {
    state,
    setStep,
    updateP,
    updateG,
    updateAlicePrivate,
    updateBobPrivate,
    setPublicKeys,
    setSharedSecrets,
    resetAll
  };
}
