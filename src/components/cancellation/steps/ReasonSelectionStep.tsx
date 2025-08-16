import React from 'react';
import { useCancellationContext } from '@/contexts/CancellationContext';
import Button from '../shared/Button';
import RadioGroup from '../shared/RadioGroup';
import TextArea from '../shared/TextArea';
import { CANCELLATION_REASONS, MOCK_SUBSCRIPTION } from '@/constants/cancellation';
import { getDownsellPrice, formatCurrency, isReasonFollowUpComplete } from '@/utils/cancellation';

const ReasonSelectionStep: React.FC = () => {
  const {
    cancellationReason,
    reasonFollowUpText,
    setCancellationReason,
    setReasonFollowUpText,
    setAcceptedDownsell,
    setCurrentStep
  } = useCancellationContext();
  
  const onClose = () => {
    setAcceptedDownsell(true);
    // In real app, this would save to database and close
    window.location.reload();
  };
  
  const downsellPrice = getDownsellPrice(MOCK_SUBSCRIPTION.monthly_price);
  const originalPrice = MOCK_SUBSCRIPTION.monthly_price / 100;
  
  const handleCompleteClick = () => {
    if (isReasonFollowUpComplete(cancellationReason, reasonFollowUpText)) {
      setCurrentStep('completed');
    }
  };
  
  const isComplete = isReasonFollowUpComplete(cancellationReason, reasonFollowUpText);
  
  const renderFollowUpQuestion = () => {
    switch (cancellationReason) {
      case 'Too expensive':
        return (
          <>
            <p className="text-[#41403D] font-medium mb-3">
              What would be the maximum you would be willing to pay?*
            </p>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#41403D]">$</span>
              <input
                type="text"
                placeholder=""
                value={reasonFollowUpText}
                onChange={(e) => setReasonFollowUpText(e.target.value)}
                className="w-full pl-6 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
              />
            </div>
          </>
        );
        
      case 'Platform not helpful':
        return (
          <TextArea
            label="What can we change to make the platform more helpful?*"
            error="Please enter at least 25 characters so we can understand your feedback*"
            value={reasonFollowUpText}
            onChange={(e) => setReasonFollowUpText(e.target.value)}
            rows={4}
            showCharCount
            minLength={25}
          />
        );
        
      case 'Not enough relevant jobs':
        return (
          <TextArea
            label="In which way can we make the jobs more relevant?*"
            value={reasonFollowUpText}
            onChange={(e) => setReasonFollowUpText(e.target.value)}
            rows={4}
            showCharCount
            minLength={25}
          />
        );
        
      case 'Decided not to move':
        return (
          <TextArea
            label="What changed for you to decide to not move?*"
            value={reasonFollowUpText}
            onChange={(e) => setReasonFollowUpText(e.target.value)}
            rows={4}
            showCharCount
            minLength={25}
          />
        );
        
      case 'Other':
        return (
          <TextArea
            label="What would have helped you the most?*"
            value={reasonFollowUpText}
            onChange={(e) => setReasonFollowUpText(e.target.value)}
            rows={4}
            showCharCount
            minLength={25}
          />
        );
        
      default:
        return null;
    }
  };
  
  return (
    <>
      {/* Desktop Layout */}
      <div className="hidden lg:flex">
        {/* Left Content */}
        <div className="flex-1 p-8 pr-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-3xl font-bold text-[#41403D] leading-tight mb-2">
                What&apos;s the main reason for cancelling?
              </h3>
              <p className="text-[#41403D] text-sm mb-4">
                Please take a minute to let us know why:
              </p>
              {!cancellationReason && (
                <p className="text-red-500 text-sm mb-6">
                  To help us understand your experience, please select a reason for cancelling*
                </p>
              )}
            </div>

            {/* Radio Options or Selected + Follow-up */}
            <div className="space-y-4 mb-8">
              {!cancellationReason ? (
                <RadioGroup
                  name="cancellation_reason"
                  options={[...CANCELLATION_REASONS]}
                  value={cancellationReason}
                  onChange={setCancellationReason}
                />
              ) : (
                <div className="space-y-4">
                  <RadioGroup
                    name="cancellation_reason"
                    options={[cancellationReason]}
                    value={cancellationReason}
                    onChange={() => {}}
                    customStyle={true}
                  />
                  
                  {/* Follow-up question */}
                  <div className="mt-4">
                    {renderFollowUpQuestion()}
                  </div>
                </div>
              )}
            </div>

            {/* Buttons */}
            <div className="space-y-3">
              <Button
                onClick={onClose}
                variant="success"
                fullWidth
                className="font-semibold"
              >
                Get 50% off | {formatCurrency(downsellPrice)} <span className="text-green-200 line-through">{formatCurrency(originalPrice)}</span>
              </Button>
              <Button
                onClick={handleCompleteClick}
                disabled={!isComplete}
                variant={isComplete ? "danger" : "secondary"}
                fullWidth
              >
                Complete cancellation
              </Button>
            </div>
          </div>
        </div>

        {/* Right Image handled by parent */}
        <div className="w-[400px] relative overflow-hidden rounded-2xl mb-8 mr-5 self-stretch" style={{ marginTop: '25px' }}>
          {/* Image handled by parent ModalLayout */}
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden">
        <div className="p-4">
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-bold text-[#41403D] leading-tight mb-3">
                What&apos;s the main reason for cancelling?
              </h3>
              <p className="text-[#41403D] text-sm mb-3">
                Please take a minute to let us know why:
              </p>
              {!cancellationReason && (
                <p className="text-red-500 text-sm mb-4">
                  To help us understand your experience, please select a reason for cancelling*
                </p>
              )}
            </div>

            {/* Radio Options */}
            <div className="space-y-3 mb-6">
              {!cancellationReason ? (
                <RadioGroup
                  name="cancellation_reason"
                  options={[...CANCELLATION_REASONS]}
                  value={cancellationReason}
                  onChange={setCancellationReason}
                  className="text-sm"
                />
              ) : (
                <div className="space-y-3">
                  <RadioGroup
                    name="cancellation_reason"
                    options={[cancellationReason]}
                    value={cancellationReason}
                    onChange={() => {}}
                    customStyle={true}
                    className="text-sm"
                  />
                  
                  {/* Follow-up question */}
                  <div className="mt-3">
                    {renderFollowUpQuestion()}
                  </div>
                </div>
              )}
            </div>

            {/* Buttons */}
            <div className="space-y-3">
              <Button
                onClick={onClose}
                variant="success"
                fullWidth
                size="sm"
                className="font-semibold"
              >
                Get 50% off | {formatCurrency(downsellPrice)} <span className="text-green-200 line-through">{formatCurrency(originalPrice)}</span>
              </Button>
              <Button
                onClick={handleCompleteClick}
                disabled={!isComplete}
                variant={isComplete ? "danger" : "secondary"}
                fullWidth
                size="sm"
              >
                Complete cancellation
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReasonSelectionStep;
