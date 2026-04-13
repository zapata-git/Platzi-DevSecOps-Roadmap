import React from 'react';

export interface StepItem {
  id: string;
  label: string;
}

interface Props {
  currentStep: string;
  steps: StepItem[];
}

export function StepIndicator({ currentStep, steps }: Props) {
  const currentIndex = steps.findIndex(s => s.id === currentStep);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
      {steps.map((step, idx) => {
        const isActive = idx === currentIndex || (currentStep === 'PLAYGROUND' && idx === steps.length - 1);
        const isPast = idx < currentIndex || (currentStep === 'PLAYGROUND');
        return (
          <React.Fragment key={step.id}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{
                width: '30px', height: '30px', borderRadius: '50%',
                backgroundColor: isActive ? 'var(--primary)' : isPast ? 'var(--shared-color)' : 'var(--panel-bg-hover)',
                color: isActive || isPast ? 'white' : 'var(--text-secondary)',
                display: 'flex', justifyContent: 'center', alignItems: 'center',
                fontWeight: 'bold', fontSize: '0.9rem',
                border: isActive ? '2px solid white' : 'none'
              }}>
                {idx + 1}
              </div>
              <span style={{ 
                color: isActive ? 'white' : 'var(--text-secondary)',
                fontWeight: isActive ? 600 : 400,
                fontSize: '0.9rem'
              }}>
                {step.label}
              </span>
            </div>
            {idx < steps.length - 1 && (
              <div style={{ 
                width: '30px', height: '2px', 
                backgroundColor: isPast ? 'var(--shared-color)' : 'var(--border-color)',
                alignSelf: 'center', margin: '0 0.5rem'
              }} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
