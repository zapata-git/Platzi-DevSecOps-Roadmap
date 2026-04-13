export interface ParticipantState {
  name: string;
  privateKey: string;
  publicKey: string | null;
  sharedSecret: string | null;
  themeColor: string;
}

export type DHStep = "INTRODUCTION" | "PARAMETERS" | "GENERATION" | "EXCHANGE" | "SECRET" | "PLAYGROUND";

export interface DHSimulatorState {
  p: string; // Prime modulus
  g: string; // Generator
  alice: ParticipantState;
  bob: ParticipantState;
  currentStep: DHStep;
}
