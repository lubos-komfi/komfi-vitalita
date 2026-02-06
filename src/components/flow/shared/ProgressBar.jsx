import React from 'react';

export const ProgressBar = ({ currentStep, totalSteps = 7, onStepClick }) => {
    return (
        <div className="fixed bottom-3 left-3 z-50 flex items-center gap-1 opacity-30 hover:opacity-80 transition-opacity">
            {Array.from({ length: totalSteps }, (_, i) => {
                const step = i;
                const isCompleted = currentStep > step;
                const isCurrent = currentStep === step;

                return (
                    <React.Fragment key={step}>
                        <button
                            onClick={() => onStepClick(step)}
                            className="cursor-pointer"
                            title={`Step ${step}`}
                        >
                            <div className={`w-2 h-2 rounded-full transition-all ${
                                isCurrent
                                    ? 'bg-primary ring-2 ring-primary/40'
                                    : isCompleted
                                        ? 'bg-primary'
                                        : 'bg-surface-outline-variant'
                            }`} />
                        </button>
                        {i < totalSteps - 1 && (
                            <div className={`h-[1px] w-3 ${
                                isCompleted ? 'bg-primary' : 'bg-surface-outline-variant'
                            }`} />
                        )}
                    </React.Fragment>
                );
            })}
        </div>
    );
};
