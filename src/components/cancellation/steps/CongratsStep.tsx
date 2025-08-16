import React from 'react';
import { useCancellationContext } from '@/contexts/CancellationContext';
import Button from '../shared/Button';
import SurveyQuestion from '../shared/SurveyQuestion';
import { SURVEY_OPTIONS } from '@/constants/cancellation';

const CongratsStep: React.FC = () => {
  const {
    foundJobWithMigrateMate,
    rolesApplied,
    companiesEmailed,
    companiesInterviewed,
    setFoundJobWithMigrateMate,
    setRolesApplied,
    setCompaniesEmailed,
    setCompaniesInterviewed,
    setCurrentStep
  } = useCancellationContext();
  
  const handleContinue = () => {
    if (foundJobWithMigrateMate !== null && 
        rolesApplied !== null && 
        companiesEmailed !== null && 
        companiesInterviewed !== null) {
      setCurrentStep('feedback');
    }
  };
  
  const isFormComplete = foundJobWithMigrateMate !== null && 
                        rolesApplied !== null && 
                        companiesEmailed !== null && 
                        companiesInterviewed !== null;
  
  return (
    <div className="flex-1 p-8">
      <div className="flex flex-col h-full justify-between">
        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-bold text-[#41403D] mb-4">
              Congrats on the new role! 🎉
            </h3>
            <div className="mb-6">
              <p className="text-[#41403D] mb-4">Did you find this job with MigrateMate?*</p>
              <div className="flex space-x-3">
                <Button
                  onClick={() => setFoundJobWithMigrateMate(true)}
                  variant={foundJobWithMigrateMate === true ? 'primary' : 'secondary'}
                  fullWidth
                >
                  Yes
                </Button>
                <Button
                  onClick={() => setFoundJobWithMigrateMate(false)}
                  variant={foundJobWithMigrateMate === false ? 'primary' : 'secondary'}
                  fullWidth
                >
                  No
                </Button>
              </div>
            </div>
          </div>

          {/* Survey Questions */}
          <div className="space-y-4">
            <SurveyQuestion
              question="How many roles did you apply for through MigrateMate?*"
              options={SURVEY_OPTIONS.roles}
              value={rolesApplied}
              onChange={(index) => setRolesApplied(Number(index))}
              variant="blue"
              underlineWord="apply"
            />
            
            <SurveyQuestion
              question="How many companies did you email directly?*"
              options={SURVEY_OPTIONS.companies}
              value={companiesEmailed}
              onChange={(index) => setCompaniesEmailed(Number(index))}
              variant="blue"
              underlineWord="email"
            />
            
            <SurveyQuestion
              question="How many different companies did you interview with?*"
              options={SURVEY_OPTIONS.interviews}
              value={companiesInterviewed}
              onChange={(index) => setCompaniesInterviewed(Number(index))}
              variant="blue"
              underlineWord="interview"
            />
          </div>
        </div>
        
        <div className="mt-6">
          <Button
            onClick={handleContinue}
            disabled={!isFormComplete}
            variant="primary"
            fullWidth
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CongratsStep;
