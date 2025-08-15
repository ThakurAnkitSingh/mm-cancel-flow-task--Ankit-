'use client';

import { useState } from 'react';
import Image from 'next/image';

type FlowStep = 'initial' | 'congrats' | 'feedback' | 'visa' | 'completed';

interface CancellationFlowProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CancellationFlow({ isOpen, onClose }: CancellationFlowProps) {
  const [currentStep, setCurrentStep] = useState<FlowStep>('initial');
  const [foundJobWithMigrateMate, setFoundJobWithMigrateMate] = useState<boolean | null>(null);
  const [rolesApplied, setRolesApplied] = useState<number | null>(null);
  const [companiesEmailed, setCompaniesEmailed] = useState<number | null>(null);
  const [companiesInterviewed, setCompaniesInterviewed] = useState<number | null>(null);
  const [feedback, setFeedback] = useState('');
  const [hasImmigrationLawyer, setHasImmigrationLawyer] = useState<boolean | null>(null);
  const [visaType, setVisaType] = useState('');

  if (!isOpen) return null;

  const handleBack = () => {
    if (currentStep === 'congrats') {
      setCurrentStep('initial');
    } else if (currentStep === 'feedback') {
      setCurrentStep('congrats');
    } else if (currentStep === 'visa') {
      setCurrentStep('feedback');
    }
  };

  const handleFoundJob = () => {
    setCurrentStep('congrats');
  };

  const handleCongratsContinue = () => {
    // Only proceed if all required fields are filled
    if (foundJobWithMigrateMate !== null && 
        rolesApplied !== null && 
        companiesEmailed !== null && 
        companiesInterviewed !== null) {
      setCurrentStep('feedback');
    }
  };

  const handleFeedbackContinue = () => {
    if ((foundJobWithMigrateMate === true || foundJobWithMigrateMate === false) && 
        feedback.length >= 25) {
      setCurrentStep('visa');
    }
  };

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
      case 'completed':
        return { step: 3, total: 3 }; // Show as completed
      default:
        return { step: 0, total: 3 };
    }
  };

  const stepInfo = getStepInfo();

  return (
    <div className="fixed inset-0 bg-[#BAB8B4] bg-opacity-50 flex items-end justify-center z-50 lg:items-center lg:p-0.5">
      <div className="bg-white rounded-t-2xl lg:rounded-2xl shadow-xl w-full max-w-4xl lg:w-[1000px] mt-6 lg:mt-0" style={{ height: 'auto', maxHeight: '90vh' }}>
        {currentStep === 'initial' && (
          <>
            {/* Header */}
            <div className="flex items-center justify-between p-6">
              <h2 className="text-lg font-bold text-black flex-1 text-center">Subscription Cancellation</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 ml-4"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="border-t border-gray-200"></div>

            {/* Desktop Layout */}
            <div className="hidden lg:flex">
              {/* Left Content */}
              <div className="flex-1 p-8 pr-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-3xl font-bold text-[#41403D] leading-tight mb-4">
                      Hey mate,<br />
                      Quick one before you go.
                    </h3>
                    <div className="flex items-center mb-6">
                    <h3 className="text-3xl font-bold text-[#41403D] leading-tight mb-4 italic">
                      Have you found a job yet?
                    </h3>
                    </div>
                    <p className="text-[#41403D] leading-relaxed font-medium">
                      Whatever your answer, we just want to help you take the next step. 
                      With visa support, or by hearing how we can do better.
                    </p>
                  </div>
                  <div className="border-t border-gray-200"></div>

                  
                  <div className="space-y-3">
                    <button
                      onClick={handleFoundJob}
                      className="w-full py-3 px-6 bg-white border border-gray-300 text-[#41403D] rounded-lg hover:bg-gray-50 transition-colors font-medium"
                    >
                      Yes, I&apos;ve found a job
                    </button>
                    <button
                      onClick={() => {/* Handle "No" flow later */}}
                      className="w-full py-3 px-6 bg-white border border-gray-300 text-[#41403D] rounded-lg hover:bg-gray-50 transition-colors font-medium"
                    >
                      Not yet - I&apos;m still looking
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Image */}
              <div className="w-[400px] h-[333px] relative overflow-hidden rounded-2xl m-5 mt-20">
                <Image
                  src="/empire-state-compressed.jpg"
                  alt="New York City skyline with Empire State Building"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* Mobile Layout */}
            <div className="lg:hidden">
              {/* Image on top */}
              <div className="h-48 relative overflow-hidden rounded-2xl m-5">
                <Image
                  src="/empire-state-compressed.jpg"
                  alt="New York City skyline with Empire State Building"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Content below */}
              <div className="p-4">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-[#41403D] leading-tight mb-3">
                      Hey mate,<br />
                      Quick one before you go.
                    </h3>
                    <p className="text-lg text-[#41403D] italic font-medium mb-3">Have you found a job yet?</p>
                    <p className="text-[#41403D] text-sm leading-relaxed">
                      Whatever your answer, we just want to help you take the next step. 
                      With visa support, or by hearing how we can do better.
                    </p>
                  </div>
                  
                  <div className="space-y-3 pt-2">
                    <button
                      onClick={handleFoundJob}
                      className="w-full py-3 px-4 bg-white border border-gray-300 text-[#41403D] rounded-lg hover:bg-gray-50 transition-colors font-medium"
                    >
                      Yes, I&apos;ve found a job
                    </button>
                    <button
                      onClick={() => {/* Handle "No" flow later */}}
                      className="w-full py-3 px-4 bg-white border border-gray-300 text-[#41403D] rounded-lg hover:bg-gray-50 transition-colors font-medium"
                    >
                      Not yet - I&apos;m still looking
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {currentStep === 'completed' && (
          <>
            {/* Completion Header */}
            <div className="flex items-center justify-between p-6">
              <div className="flex items-center justify-center flex-1">
                <h2 className="text-lg font-bold text-black mx-2">Subscription Cancelled</h2>
                <div className="flex items-center">
                  <div className="flex items-center">
                    <div className="px-2 py-1 rounded-lg flex items-center">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="w-4 h-2 rounded-md bg-green-500 mx-0.5" />
                      ))}
                      <span className="text-sm text-[#41403D] ml-2">Completed</span>
                    </div>
                  </div>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 ml-4"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="border-t border-gray-200"></div>

            {/* Desktop Layout */}
            <div className="hidden lg:flex">
              {/* Left Content */}
              <div className="flex-1 p-8 pr-6">
                <div className="space-y-6">
                  <div>
                    {foundJobWithMigrateMate === true ? (
                      <>
                        <h3 className="text-3xl font-bold text-[#41403D] leading-tight mb-6">
                          All done, your cancellation&apos;s been processed.
                        </h3>
                        <p className="text-[#41403D] leading-relaxed mb-8">
                          We&apos;re stoked to hear you&apos;ve landed a job and sorted your visa. 
                          Big congrats from the team. 🙌
                        </p>
                      </>
                    ) : (
                      <>
                        <h3 className="text-3xl font-bold text-[#41403D] leading-tight mb-8">
                          Your cancellation&apos;s all sorted, mate, no more charges.
                        </h3>
                        
                        {/* Profile Section */}
                        <div className="mb-6 bg-gray-100 p-4 rounded-lg">
                          <div className="flex items-center mb-4">
                            <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
                              <Image 
                                src="/mihailo-profile.jpeg" 
                                alt="Mihailo Bozic"
                                width={48}
                                height={48}
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <div className="font-semibold text-[#41403D]">Mihailo Bozic</div>
                              <div className="text-[#41403D] text-sm">&lt;mihailo@migratemate.co&gt;</div>
                            </div>
                          </div>
                          <div className="space-y-3 pl-12">
                            <p className="text-[#41403D] text-sm font-bold">
                              I&apos;ll be reaching out soon to help with the visa side of things.
                            </p>
                            <p className="text-[#41403D] text-sm">
                              We&apos;ve got your back, whether it&apos;s questions, paperwork, or just 
                              figuring out your options.
                            </p>
                            <p className="text-[#41403D] text-sm font-bold">
                              Keep an eye on your inbox, I&apos;ll be in touch <u>shortly</u>.
                            </p>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                  <div className="border-t border-gray-200"></div>

                  
                  <button
                    onClick={onClose}
                    className="w-full py-3 px-6 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
                  >
                    Finish
                  </button>
                </div>
              </div>

              {/* Right Image */}
              <div className="w-[400px] h-auto relative overflow-hidden rounded-2xl m-5">
                <Image
                  src="/empire-state-compressed.jpg"
                  alt="New York City skyline with Empire State Building"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* Mobile Layout */}
            <div className="lg:hidden">
              {/* Image on top */}
              <div className="h-48 relative overflow-hidden rounded-t-2xl">
                <Image
                  src="/empire-state-compressed.jpg"
                  alt="New York City skyline with Empire State Building"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Content below */}
              <div className="p-6">
                <div className="space-y-6">
                  <div>
                    {foundJobWithMigrateMate === true ? (
                      <>
                        <h3 className="text-2xl font-bold text-[#41403D] leading-tight mb-4">
                          All done, your cancellation&apos;s been processed.
                        </h3>
                        <p className="text-[#41403D] text-sm leading-relaxed">
                          We&apos;re stoked to hear you&apos;ve landed a job and sorted your visa. 
                          Big congrats from the team. 🙌
                        </p>
                      </>
                    ) : (
                      <>
                        <h3 className="text-2xl font-bold text-[#41403D] leading-tight mb-6">
                          Your cancellation&apos;s all sorted, mate, no more charges.
                        </h3>
                        
                        {/* Profile Section */}
                        <div className="flex items-center mb-4 bg-gray-100 p-4 rounded-lg">
                          <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                            <Image 
                              src="/mihailo-profile.jpeg" 
                              alt="Mihailo Bozic"
                              fill
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <div className="font-semibold text-[#41403D] text-sm">Mihailo Bozic</div>
                            <div className="text-[#41403D] text-xs">&lt;mihailo@migratemate.co&gt;</div>
                          </div>
                          <div className="space-y-3 mb-6">
                          <p className="text-[#41403D] text-sm">
                            I&apos;ll be reaching out soon to help with the visa side of things.
                          </p>
                          <p className="text-[#41403D] text-sm">
                            We&apos;ve got your back, whether it&apos;s questions, paperwork, or just 
                            figuring out your options.
                          </p>
                          <p className="text-[#41403D] text-sm">
                            Keep an eye on your inbox, I&apos;ll be in touch <u>shortly</u>.
                          </p>
                        </div>
                        </div>
                      </>
                    )}
                  </div>
                  
                  <button
                    onClick={onClose}
                    className="w-full py-3 px-6 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
                  >
                    Finish
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Other screens (congrats, feedback) */}
        {currentStep !== 'initial' && currentStep !== 'completed' && (
          <>
            {/* Header with back button and progress */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <button
                onClick={handleBack}
                className="flex items-center text-[#41403D] hover:text-[#41403D]"
              >
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back
              </button>
              
              <div className="flex items-center">
                <h2 className="text-lg font-semibold text-black">Subscription Cancellation</h2>
                <div className="flex items-center ml-3 space-x-2">
                  <div className="flex space-x-1">
                    {[...Array(stepInfo.total)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-4 h-2 rounded-sm ${
                          i < stepInfo.step ? 'bg-green-500' : 'bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-[#41403D]">Step {stepInfo.step} of {stepInfo.total}</span>
                </div>
              </div>
              
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content for other screens */}
            <div className="flex flex-col lg:flex-row">
              {/* Left Content */}
              <div className="flex-1 p-8">
                {currentStep === 'congrats' && ( 
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
                            How many roles did you apply for through MigrateMate?*
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
                            How many companies did you email directly?*
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
                            How many different companies did you interview with?*
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
                      <button
                        onClick={handleCongratsContinue}
                        disabled={foundJobWithMigrateMate === null || rolesApplied === null || companiesEmailed === null || companiesInterviewed === null}
                        className="w-full py-3 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:bg-gray-300 disabled:cursor-not-allowed disabled:text-gray-500"
                      >
                        Continue
                      </button>
                    </div>
                  </div>
                )}

                {currentStep === 'feedback' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-2xl font-bold text-[#41403D] mb-4">
                        What&apos;s one thing you wish we could&apos;ve helped you with?
                      </h3>
                      <p className="text-[#41403D] mb-6">
                        We&apos;re always looking to improve, your thoughts can help us make MigrateMate more useful for others.*
                      </p>
                    </div>

                    <div>
                      <textarea
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        placeholder="Your feedback..."
                        className="w-full h-40 p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                      />
                      <div className="text-right text-sm text-[#41403D] mt-2">
                        Min 25 characters ({feedback.length}/25)
                      </div>
                    </div>

                    <button
                      onClick={handleFeedbackContinue}
                      disabled={feedback.length < 25}
                      className="w-full py-3 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:bg-gray-300 disabled:cursor-not-allowed disabled:text-gray-500"
                    >
                      Continue
                    </button>
                  </div>
                )}

                {currentStep === 'visa' && (
                  <div className="space-y-6">
                    <div>
                      {foundJobWithMigrateMate === true ? (
                        <h3 className="text-2xl font-bold text-[#41403D] mb-4">
                          We helped you land the job, now let&apos;s help you secure your visa.
                        </h3>
                      ) : (
                        <>
                          <h3 className="text-2xl font-bold text-[#41403D] mb-2">
                          You landed the job!<br />
                          <em>That&apos;s what we live for.</em>
                         </h3>
                         <h4 className="text-xl font-bold text-[#41403D] mb-4">
                          Even if it wasn&apos;t through Migrate Mate, let us help get your visa sorted.
                        </h4>
                        </>
                      )}
                     
                     <div className="mb-4">
                       <p className="text-[#41403D] mb-2">Is your company providing an immigration lawyer to help with your visa?*</p>
                       <div className="space-y-2">
                         <label className="flex items-center">
                           <input
                             type="radio"
                             name="immigrationLawyer"
                             checked={hasImmigrationLawyer === true}
                             onChange={() => setHasImmigrationLawyer(true)}
                             className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                           />
                           <span className="text-[#41403D]">Yes</span>
                         </label>
                         <label className="flex items-center">
                           <input
                             type="radio"
                             name="immigrationLawyer"
                             checked={hasImmigrationLawyer === false}
                             onChange={() => setHasImmigrationLawyer(false)}
                             className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                           />
                           <span className="text-[#41403D]">No</span>
                         </label>
                       </div>
                     </div>

                     {hasImmigrationLawyer === true && (
                       <div className="mb-4">
                         <label className="block text-[#41403D] mb-2">
                           What visa will you be applying for?*
                         </label>
                         <input
                           type="text"
                           value={visaType}
                           onChange={(e) => setVisaType(e.target.value)}
                           className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                           onBlur={() => {
                             if (!visaType.trim()) {
                               setHasImmigrationLawyer(null);
                             }
                           }}
                         />
                       </div>
                     )}
                     
                     {hasImmigrationLawyer === false && (
                       <div className="mb-4">
                         <label className="block text-[#41403D] mb-2">
                           We can connect you with one of our trusted partners. Which visa would you like to apply for?*
                         </label>
                         <input
                           type="text"
                           value={visaType}
                           onChange={(e) => setVisaType(e.target.value)}
                           className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                           onBlur={() => {
                             if (!visaType.trim()) {
                               setHasImmigrationLawyer(null);
                             }
                           }}
                         />
                       </div>
                     )}
                   </div>
                   <div className="border-t border-gray-200 mt-2"></div>

                   <div className="pt-3">
                     <button
                       onClick={() => setCurrentStep('completed')}
                       disabled={hasImmigrationLawyer === null || !visaType.trim()}
                       className="w-full py-3 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:bg-gray-300 disabled:cursor-not-allowed disabled:text-gray-500"
                     >
                       Complete cancellation
                     </button>
                   </div>
                 </div>
                )}
              </div>

              {/* Right Image for other screens */}
              <div className="lg:w-[400px] h-auto relative m-5 overflow-hidden rounded-2xl">
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
          </>
        )}
      </div>
    </div>
  );
}
