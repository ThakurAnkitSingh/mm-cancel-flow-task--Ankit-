import React from 'react';
import { useCancellationContext } from '@/contexts/CancellationContext';
import Button from '../shared/Button';
import SurveyQuestion from '../shared/SurveyQuestion';
import { SURVEY_OPTIONS, MOCK_SUBSCRIPTION } from '@/constants/cancellation';
import { getDownsellPrice, formatCurrency } from '@/utils/cancellation';

const SurveyStep: React.FC = () => {
  const {
    rolesAppliedSurvey,
    companiesEmailedSurvey,
    companiesInterviewedSurvey,
    setRolesAppliedSurvey,
    setCompaniesEmailedSurvey,
    setCompaniesInterviewedSurvey,
    setAcceptedDownsell,
    setCurrentStep
  } = useCancellationContext();
  
  const downsellPrice = getDownsellPrice(MOCK_SUBSCRIPTION.monthly_price);
  const originalPrice = MOCK_SUBSCRIPTION.monthly_price / 100;
  
  const isFormComplete = rolesAppliedSurvey !== null && 
                        companiesEmailedSurvey !== null && 
                        companiesInterviewedSurvey !== null;
  
  const handleGetDiscount = () => {
    setAcceptedDownsell(true);
    setCurrentStep('downsell_completed');
  };
  
  const handleContinue = () => {
    if (isFormComplete) {
      setCurrentStep('reason_selection');
    }
  };
  
  return (
    <>
      {/* Desktop Layout */}
      <div className="hidden lg:flex">
        {/* Left Content */}
        <div className="flex-1 p-6 pr-4">
          <div className="space-y-4">
            <div>
              <h3 className="text-2xl font-bold text-[#41403D] leading-tight mb-4">
                Help us understand how you were using Migrate Mate.
              </h3>
            </div>

            {/* Survey Questions */}
            <div className="space-y-4">
              <SurveyQuestion
                question="How many roles did you apply for through Migrate Mate?"
                options={['0', '1 - 5', '6 - 20', '20+']}
                value={rolesAppliedSurvey}
                onChange={(value) => setRolesAppliedSurvey(String(value))}
                underlineWord="apply"
              />
              
              <SurveyQuestion
                question="How many companies did you email directly?"
                options={[...SURVEY_OPTIONS.companies]}
                value={companiesEmailedSurvey}
                onChange={(value) => setCompaniesEmailedSurvey(String(value))}
                underlineWord="email"
              />
              
              <SurveyQuestion
                question="How many different companies did you interview with?"
                options={[...SURVEY_OPTIONS.interviews]}
                value={companiesInterviewedSurvey}
                onChange={(value) => setCompaniesInterviewedSurvey(String(value))}
                underlineWord="interview"
              />
            </div>

            {/* Buttons */}
            <div className="space-y-3">
              <Button
                onClick={handleGetDiscount}
                variant="success"
                fullWidth
                className="font-semibold"
              >
                Get 50% off | {formatCurrency(downsellPrice)} <span className="text-green-200 line-through">{formatCurrency(originalPrice)}</span>
              </Button>
              <Button
                onClick={handleContinue}
                disabled={!isFormComplete}
                variant={isFormComplete ? "danger" : "secondary"}
                fullWidth
              >
                Continue
              </Button>
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className="w-[350px] relative overflow-hidden rounded-2xl mr-5 self-start" style={{ height: '400px', marginTop: '15px' }}>
          {/* Image handled by parent ModalLayout */}
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden">
        {/* Content */}
        <div className="p-4">
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-bold text-[#41403D] leading-tight mb-4">
                Help us understand how you were using Migrate Mate.
              </h3>
            </div>

            {/* Survey Questions */}
            <div className="space-y-4">
              <SurveyQuestion
                question="How many roles did you apply for through Migrate Mate?"
                options={['0', '1 - 5', '6 - 20', '20+']}
                value={rolesAppliedSurvey}
                onChange={(value) => setRolesAppliedSurvey(String(value))}
                underlineWord="apply"
              />
              
              <SurveyQuestion
                question="How many companies did you email directly?"
                options={[...SURVEY_OPTIONS.companies]}
                value={companiesEmailedSurvey}
                onChange={(value) => setCompaniesEmailedSurvey(String(value))}
                underlineWord="email"
              />
              
              <SurveyQuestion
                question="How many different companies did you interview with?"
                options={[...SURVEY_OPTIONS.interviews]}
                value={companiesInterviewedSurvey}
                onChange={(value) => setCompaniesInterviewedSurvey(String(value))}
                underlineWord="interview"
              />
            </div>

            {/* Buttons */}
            <div className="space-y-3 mb-6">
              <Button
                onClick={handleGetDiscount}
                variant="success"
                fullWidth
                className="font-semibold"
                size="sm"
              >
                Get 50% off | {formatCurrency(downsellPrice)} <span className="text-green-200 line-through">{formatCurrency(originalPrice)}</span>
              </Button>
              <Button
                onClick={handleContinue}
                disabled={!isFormComplete}
                variant={isFormComplete ? "danger" : "secondary"}
                fullWidth
                size="sm"
              >
                Continue
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SurveyStep;
