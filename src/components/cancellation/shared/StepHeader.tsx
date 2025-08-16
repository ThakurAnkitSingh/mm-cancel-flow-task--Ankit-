import React from 'react';
import StepIndicator from './StepIndicator';

interface StepHeaderProps {
  title: string;
  onBack?: () => void;
  onClose: () => void;
  currentStep?: number;
  totalSteps?: number;
  showStepIndicator?: boolean;
  centerTitle?: boolean;
}

const StepHeader: React.FC<StepHeaderProps> = ({
  title,
  onBack,
  onClose,
  currentStep = 0,
  totalSteps = 3,
  showStepIndicator = false,
  centerTitle = false
}) => {
  return (
    <div className="flex items-center justify-between p-6 border-b border-gray-200">
      {/* Back Button */}
      {onBack ? (
        <button
          onClick={onBack}
          className="flex items-center text-[#41403D] hover:text-[#41403D]"
        >
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
      ) : (
        <div className="w-16" /> // Spacer for alignment
      )}
      
      {/* Title and Step Indicator */}
      <div className={`flex-1 flex ${centerTitle ? 'justify-center' : 'items-center'}`}>
        <h2 className="text-lg font-bold text-black">{title}</h2>
        {showStepIndicator && !centerTitle && (
          <div className="ml-3">
            <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />
          </div>
        )}
      </div>
      
      {/* Step Indicator (when centered title) or Close Button */}
      {showStepIndicator && centerTitle ? (
        <div className="flex items-center space-x-4">
          <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 ml-4">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      ) : (
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default StepHeader;
