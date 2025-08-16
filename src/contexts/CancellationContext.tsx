import React, { createContext, useContext, useState, useCallback } from 'react';
import { 
  FlowStep, 
  DownsellVariant, 
  CancellationFlowState 
} from '@/types/cancellation';
import { calculateVariantFromUserId } from '@/utils/cancellation';
import { MOCK_USER } from '@/constants/cancellation';

interface CancellationContextType extends CancellationFlowState {
  // Navigation
  setCurrentStep: (step: FlowStep) => void;
  goBack: () => void;
  
  // State setters
  setFoundJobWithMigrateMate: (value: boolean | null) => void;
  setRolesApplied: (value: number | null) => void;
  setCompaniesEmailed: (value: number | null) => void;
  setCompaniesInterviewed: (value: number | null) => void;
  setFeedback: (value: string) => void;
  setHasImmigrationLawyer: (value: boolean | null) => void;
  setVisaType: (value: string) => void;
  setRolesAppliedSurvey: (value: string | null) => void;
  setCompaniesEmailedSurvey: (value: string | null) => void;
  setCompaniesInterviewedSurvey: (value: string | null) => void;
  setAcceptedDownsell: (value: boolean | null) => void;
  setCancellationReason: (value: string | null) => void;
  setReasonFollowUpText: (value: string) => void;
  
  // Computed values
  getDownsellVariant: () => DownsellVariant;
  resetState: () => void;
}

const CancellationContext = createContext<CancellationContextType | undefined>(undefined);

export const useCancellationContext = () => {
  const context = useContext(CancellationContext);
  if (!context) {
    throw new Error('useCancellationContext must be used within CancellationProvider');
  }
  return context;
};

interface CancellationProviderProps {
  children: React.ReactNode;
}

export const CancellationProvider: React.FC<CancellationProviderProps> = ({ children }) => {
  // Initial state
  const [currentStep, setCurrentStep] = useState<FlowStep>('initial');
  const [foundJobWithMigrateMate, setFoundJobWithMigrateMate] = useState<boolean | null>(null);
  const [rolesApplied, setRolesApplied] = useState<number | null>(null);
  const [companiesEmailed, setCompaniesEmailed] = useState<number | null>(null);
  const [companiesInterviewed, setCompaniesInterviewed] = useState<number | null>(null);
  const [feedback, setFeedback] = useState('');
  const [hasImmigrationLawyer, setHasImmigrationLawyer] = useState<boolean | null>(null);
  const [visaType, setVisaType] = useState('');
  const [rolesAppliedSurvey, setRolesAppliedSurvey] = useState<string | null>(null);
  const [companiesEmailedSurvey, setCompaniesEmailedSurvey] = useState<string | null>(null);
  const [companiesInterviewedSurvey, setCompaniesInterviewedSurvey] = useState<string | null>(null);
  const [downsellVariant, setDownsellVariant] = useState<DownsellVariant | null>(null);
  const [acceptedDownsell, setAcceptedDownsell] = useState<boolean | null>(null);
  const [cancellationReason, setCancellationReason] = useState<string | null>(null);
  const [reasonFollowUpText, setReasonFollowUpText] = useState('');
  
  const getDownsellVariant = useCallback((): DownsellVariant => {
    if (downsellVariant) return downsellVariant;
    
    // TEMPORARY: Force Variant B for testing
    const variant = 'B' as DownsellVariant;
    setDownsellVariant(variant);
    return variant;
    
    // Production code:
    // const variant = calculateVariantFromUserId(MOCK_USER.id);
    // setDownsellVariant(variant);
    // return variant;
  }, [downsellVariant]);
  
  const goBack = useCallback(() => {
    switch (currentStep) {
      case 'congrats':
        setCurrentStep('initial');
        break;
      case 'downsell':
        setCurrentStep('initial');
        break;
      case 'feedback':
        if (downsellVariant === 'B' && foundJobWithMigrateMate === false) {
          setCurrentStep('downsell');
        } else if (foundJobWithMigrateMate === true) {
          setCurrentStep('congrats');
        } else {
          setCurrentStep('initial');
        }
        break;
      case 'visa':
        setCurrentStep('feedback');
        break;
      case 'survey':
        setCurrentStep('downsell');
        break;
      case 'reason_selection':
        setCurrentStep('survey');
        break;
      case 'completed':
        setCurrentStep('reason_selection');
        break;
    }
  }, [currentStep, downsellVariant, foundJobWithMigrateMate]);
  
  const resetState = useCallback(() => {
    setCurrentStep('initial');
    setFoundJobWithMigrateMate(null);
    setRolesApplied(null);
    setCompaniesEmailed(null);
    setCompaniesInterviewed(null);
    setFeedback('');
    setHasImmigrationLawyer(null);
    setVisaType('');
    setRolesAppliedSurvey(null);
    setCompaniesEmailedSurvey(null);
    setCompaniesInterviewedSurvey(null);
    setDownsellVariant(null);
    setAcceptedDownsell(null);
    setCancellationReason(null);
    setReasonFollowUpText('');
  }, []);
  
  const handleSetCancellationReason = useCallback((value: string | null) => {
    setCancellationReason(value);
    if (value !== cancellationReason) {
      setReasonFollowUpText(''); // Reset follow-up text when reason changes
    }
  }, [cancellationReason]);
  
  const value: CancellationContextType = {
    // State
    currentStep,
    foundJobWithMigrateMate,
    rolesApplied,
    companiesEmailed,
    companiesInterviewed,
    feedback,
    hasImmigrationLawyer,
    visaType,
    rolesAppliedSurvey,
    companiesEmailedSurvey,
    companiesInterviewedSurvey,
    downsellVariant,
    acceptedDownsell,
    cancellationReason,
    reasonFollowUpText,
    
    // Actions
    setCurrentStep,
    goBack,
    setFoundJobWithMigrateMate,
    setRolesApplied,
    setCompaniesEmailed,
    setCompaniesInterviewed,
    setFeedback,
    setHasImmigrationLawyer,
    setVisaType,
    setRolesAppliedSurvey,
    setCompaniesEmailedSurvey,
    setCompaniesInterviewedSurvey,
    setAcceptedDownsell,
    setCancellationReason: handleSetCancellationReason,
    setReasonFollowUpText,
    getDownsellVariant,
    resetState
  };
  
  return (
    <CancellationContext.Provider value={value}>
      {children}
    </CancellationContext.Provider>
  );
};
