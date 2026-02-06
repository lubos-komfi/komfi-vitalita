import React from 'react';
import { useFlowState } from '../hooks/useFlowState';
import { useTestRecommendation } from '../hooks/useTestRecommendation';
import { usePricing } from '../hooks/usePricing';
import { ProgressBar } from '../components/flow/shared/ProgressBar';
import { StepIntro } from '../components/flow/steps/StepIntro';
import { StepTarget } from '../components/flow/steps/StepTarget';
import { StepDemographics } from '../components/flow/steps/StepDemographics';
import { StepQuestionnaire } from '../components/flow/steps/StepQuestionnaire';
import { StepRegistration } from '../components/flow/steps/StepRegistration';
import { StepProcessing } from '../components/flow/steps/StepProcessing';
import { StepPresentation } from '../components/flow/steps/StepPresentation';
import { StepSuccess } from '../components/flow/steps/StepSuccess';

export const FlowView = () => {
    const flow = useFlowState();
    const recommendation = useTestRecommendation(flow.client);
    const pricing = usePricing(
        flow.client,
        recommendation.expandedBloodAreas,
        recommendation.expandedBodyAreas,
        recommendation.expandedHeadAreas,
        flow.paymentOption,
        flow.hasKomfiMembership
    );

    const { internalStep, highestStepReached, setStep } = flow;

    const renderStep = () => {
        switch (internalStep) {
            case 0:
                return (
                    <StepIntro
                        textVariant={flow.textVariant}
                        onNext={() => setStep(1)}
                    />
                );
            case 1:
                return (
                    <StepTarget
                        setClient={flow.setClient}
                        onSelectSelf={() => setStep(2)}
                        onSelectParents={() => setStep(2)}
                    />
                );
            case 2:
                return (
                    <StepDemographics
                        client={flow.client}
                        setClient={flow.setClient}
                        textVariant={flow.textVariant}
                        expandedBloodAreas={recommendation.expandedBloodAreas}
                        expandedBodyAreas={recommendation.expandedBodyAreas}
                        expandedHeadAreas={recommendation.expandedHeadAreas}
                        onNext={() => setStep(3)}
                    />
                );
            case 3:
                return (
                    <StepQuestionnaire
                        tempSelectedModules={flow.tempSelectedModules}
                        setTempSelectedModules={flow.setTempSelectedModules}
                        textVariant={flow.textVariant}
                        client={flow.client}
                        onComplete={() => setStep(4)}
                    />
                );
            case 4:
                return (
                    <StepProcessing
                        processAnswers={recommendation.processAnswers}
                        tempSelectedModules={flow.tempSelectedModules}
                        onComplete={() => setStep(5)}
                    />
                );
            case 5:
                return (
                    <StepRegistration
                        registration={flow.registration}
                        setRegistration={flow.setRegistration}
                        onNext={() => setStep(6)}
                    />
                );
            case 6:
                return (
                    <StepPresentation
                        client={flow.client}
                        textVariant={flow.textVariant}
                        expandedBloodAreas={recommendation.expandedBloodAreas}
                        expandedBodyAreas={recommendation.expandedBodyAreas}
                        expandedHeadAreas={recommendation.expandedHeadAreas}
                        getWhyText={recommendation.getWhyText}
                        expansionReasons={recommendation.expansionReasons}
                        pricing={pricing}
                        paymentOption={flow.paymentOption}
                        setPaymentOption={flow.setPaymentOption}
                        hasKomfiMembership={flow.hasKomfiMembership}
                        setHasKomfiMembership={flow.setHasKomfiMembership}
                        onNext={() => setStep(7)}
                    />
                );
            case 7:
                return (
                    <StepSuccess registration={flow.registration} />
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-[80vh]">
            <ProgressBar
                currentStep={internalStep}
                totalSteps={8}
                onStepClick={setStep}
            />
            {renderStep()}
        </div>
    );
};
