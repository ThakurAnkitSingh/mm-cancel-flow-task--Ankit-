'use client';

import React from 'react';
import { CancellationProvider, useCancellationContext } from '@/contexts/CancellationContext';
import { CancellationFlowProps } from '@/types/cancellation';
import ModalLayout from './shared/ModalLayout';
import StepHeader from './shared/StepHeader';
import Image from 'next/image';

// Import all steps
import {
  InitialStep,
  CongratsStep,
  FeedbackStep,
  VisaStep,
  DownsellStep,
  SurveyStep,
  ReasonSelectionStep,
  CompletedStep,
  DownsellCompletedStep,
  JobRecommendationsStep
} from './steps';

const CancellationFlowContent: React.FC<CancellationFlowProps> = ({ isOpen, onClose }) => {
  const { currentStep, goBack } = useCancellationContext();
  
  const getStepInfo = () => {
    switch (currentStep) {
      case 'initial':
        return { step: 0, total: 3 };
      case 'congrats':
        return { step: 1, total: 3 };
      case 'feedback':
        return { step: 2, total: 3 };
      case 'visa':
        return { step: 3, total: 3 };
      case 'downsell':
        return { step: 1, total: 3 };
      case 'survey':
        return { step: 2, total: 3 };
      case 'reason_selection':
        return { step: 3, total: 3 };
      case 'completed':
        return { step: 0, total: 3 };
      case 'downsell_completed':
        return { step: 0, total: 0 };
      case 'job_recommendations':
        return { step: 0, total: 0 };
      default:
        return { step: 0, total: 3 };
    }
  };
  
  const stepInfo = getStepInfo();
  
  // For steps that need custom layouts
  if (currentStep === 'initial') {
    return (
      <ModalLayout isOpen={isOpen} showImage={false}>
        <InitialStep onClose={onClose} />
      </ModalLayout>
    );
  }
  
  if (currentStep === 'completed') {
    return (
      <ModalLayout isOpen={isOpen} showImage={false}>
        <CompletedStep onClose={onClose} />
      </ModalLayout>
    );
  }
  
  if (currentStep === 'downsell_completed') {
    return (
      <ModalLayout isOpen={isOpen} showImage={false}>
        <DownsellCompletedStep onClose={onClose} />
      </ModalLayout>
    );
  }
  
  if (currentStep === 'job_recommendations') {
    return (
      <ModalLayout isOpen={isOpen} showImage={false}>
        <JobRecommendationsStep onClose={onClose} />
      </ModalLayout>
    );
  }
  
  if (currentStep === 'survey') {
    return (
      <ModalLayout
        isOpen={isOpen}
        header={
          <StepHeader
            title="Subscription Cancellation"
            onBack={goBack}
            onClose={onClose}
            currentStep={stepInfo.step}
            totalSteps={stepInfo.total}
            showStepIndicator={true}
            centerTitle={true}
          />
        }
      >
        <SurveyStep />
      </ModalLayout>
    );
  }
  
  if (currentStep === 'reason_selection') {
    return (
      <ModalLayout
        isOpen={isOpen}
        header={
          <StepHeader
            title="Subscription Cancellation"
            onBack={goBack}
            onClose={onClose}
            currentStep={stepInfo.step}
            totalSteps={stepInfo.total}
            showStepIndicator={true}
            centerTitle={true}
          />
        }
      >
        <ReasonSelectionStep />
      </ModalLayout>
    );
  }
  
  // For "Yes" flow steps with shared layout
  const showSharedLayout = ['congrats', 'feedback', 'visa', 'downsell'].includes(currentStep);
  
  if (!showSharedLayout) {
    return null;
  }
  
  return (
    <div className="fixed inset-0 bg-[#BAB8B4] bg-opacity-50 flex items-end justify-center z-50 lg:items-center lg:p-0.5">
      <div className="bg-white rounded-t-2xl lg:rounded-2xl shadow-xl w-full max-w-7xl lg:w-[1300px] mt-6 lg:mt-0 flex flex-col" style={{ height: 'auto' }}>
        <StepHeader
          title="Subscription Cancellation"
          onBack={goBack}
          onClose={onClose}
          currentStep={stepInfo.step}
          totalSteps={stepInfo.total}
          showStepIndicator={true}
        />
        
        {/* Content for other screens */}
        <div className="flex flex-col lg:flex-row">
          {/* Left Content */}
          <div className="flex-1 p-8">
            {currentStep === 'congrats' && <CongratsStep />}
            {currentStep === 'feedback' && <FeedbackStep />}
            {currentStep === 'visa' && <VisaStep />}
            {currentStep === 'downsell' && <DownsellStep />}
          </div>
          
          {/* Right Image for desktop */}
          <div className="hidden lg:block lg:w-[400px] h-auto relative m-5 overflow-hidden rounded-2xl">
            <Image
              src="/empire-state-compressed.jpg"
              alt="New York City skyline with Empire State Building"
              width={400}
              height={600}
              className="object-cover h-full"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Main component with Context Provider
const CancellationFlow: React.FC<CancellationFlowProps> = (props) => {
  if (!props.isOpen) return null;
  
  return (
    <CancellationProvider>
      <CancellationFlowContent {...props} />
    </CancellationProvider>
  );
};

export default CancellationFlow;
