import React from 'react';
import { useCancellationContext } from '@/contexts/CancellationContext';
import Button from '../shared/Button';

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
    <div className="flex flex-col h-full justify-between">
        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-bold text-[#41403D] mb-4">
              Congrats on the new role! 🎉
            </h3>
            <div className="mb-6">
              <p className="text-[#41403D] mb-4">Did you find this job with MigrateMate?*</p>
              <div className="flex space-x-3">
                <button
                  onClick={() => setFoundJobWithMigrateMate(true)}
                  className={`w-full px-6 py-2 rounded-lg border transition-colors ${
                    foundJobWithMigrateMate === true
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-[#41403D] border-gray-300 hover:border-gray-400'
                  }`}
                >
                  Yes
                </button>
                <button
                  onClick={() => setFoundJobWithMigrateMate(false)}
                  className={`w-full px-6 py-2 rounded-lg border transition-colors ${
                    foundJobWithMigrateMate === false
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-[#41403D] border-gray-300 hover:border-gray-400'
                  }`}
                >
                  No
                </button>
              </div>
            </div>
          </div>

          {/* Survey Questions */}
          <div className="space-y-4">
            <div>
              <label className="block text-[#41403D] mb-2">
                How many roles did you <u>apply</u> for through MigrateMate?*
              </label>
              <div className="grid grid-cols-4 gap-2">
                {["0", "1-5", "6-20", "20+"].map((option, index) => (
                  <button
                    key={option}
                    onClick={() => setRolesApplied(index)}
                    className={`px-4 py-2 rounded-lg border transition-colors h-10 ${
                      rolesApplied === index
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-[#41403D] border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-[#41403D] mb-2">
                How many companies did you <u>email</u> directly?*
              </label>
              <div className="grid grid-cols-4 gap-2">
                {["0", "1-5", "6-20", "20+"].map((option, index) => (
                  <button
                    key={option}
                    onClick={() => setCompaniesEmailed(index)}
                    className={`px-4 py-2 rounded-lg border transition-colors h-10 ${
                      companiesEmailed === index
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-[#41403D] border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-[#41403D] mb-2">
                How many different companies did you <u>interview</u> with?*
              </label>
              <div className="grid grid-cols-4 gap-2">
                {["0", "1-2", "3-5", "5+"].map((option, index) => (
                  <button
                    key={option}
                    onClick={() => setCompaniesInterviewed(index)}
                    className={`px-4 py-2 rounded-lg border transition-colors h-10 ${
                      companiesInterviewed === index
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-[#41403D] border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
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
  );
};

export default CongratsStep;
