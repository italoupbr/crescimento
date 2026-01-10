import React from 'react';
import { Step } from '../types';

interface StepIndicatorProps {
  currentStep: Step;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep }) => {
  const steps = [
    { id: Step.DATA, label: 'Dados' },
    { id: Step.COMPANY, label: 'Empresa' },
    { id: Step.SOLUTION, label: 'Solução' },
  ];

  return (
    <div className="relative flex justify-between items-center w-full max-w-xs mx-auto mb-10 px-4">
      {/* Background Line */}
      <div className="absolute top-[14px] left-0 w-full h-[2px] bg-gray-200 -z-0"></div>
      
      {/* Active Line Progress */}
      <div 
        className="absolute top-[14px] left-0 h-[2px] bg-blue-500 -z-0 transition-all duration-500 ease-in-out"
        style={{ 
            width: currentStep === 1 ? '0%' : currentStep === 2 ? '50%' : '100%' 
        }}
      ></div>

      {steps.map((step) => {
        const isActive = step.id === currentStep;
        const isCompleted = step.id < currentStep;

        return (
          <div key={step.id} className="flex flex-col items-center relative z-10 bg-[#F0F4F9] px-2">
            <div
              className={`
                w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300
                ${isActive || isCompleted 
                  ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30 scale-110' 
                  : 'bg-gray-200 text-gray-500'}
              `}
            >
              {step.id}
            </div>
            <span className={`text-[11px] mt-2 font-medium tracking-wide uppercase ${isActive ? 'text-blue-600' : 'text-gray-400'}`}>
              {step.label}
            </span>
          </div>
        );
      })}
    </div>
  );
};