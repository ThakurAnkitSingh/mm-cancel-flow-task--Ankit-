import React from 'react';
import { useCancellationContext } from '@/contexts/CancellationContext';
import Button from '../shared/Button';
import TextArea from '../shared/TextArea';
import { MIN_FEEDBACK_LENGTH } from '@/constants/cancellation';

const FeedbackStep: React.FC = () => {
  const {
    feedback,
    setFeedback,
    setCurrentStep
  } = useCancellationContext();
  
  const handleContinue = () => {
    if (feedback.length >= MIN_FEEDBACK_LENGTH) {
      setCurrentStep('visa');
    }
  };
  
  return (
    <div className="flex-1 p-8">
      <div className="space-y-6">
        <div>
          <h3 className="text-2xl font-bold text-[#41403D] mb-4">
            What&apos;s one thing you wish we could&apos;ve helped you with?
          </h3>
          <p className="text-[#41403D] mb-6">
            We&apos;re always looking to improve, your thoughts can help us make MigrateMate more useful for others.*
          </p>
        </div>

        <TextArea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Your feedback..."
          rows={4}
          className="h-40"
          showCharCount
          minLength={MIN_FEEDBACK_LENGTH}
        />

        <Button
          onClick={handleContinue}
          disabled={feedback.length < MIN_FEEDBACK_LENGTH}
          variant="primary"
          fullWidth
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default FeedbackStep;
