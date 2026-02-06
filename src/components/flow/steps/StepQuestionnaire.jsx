import React, { useState } from 'react';
import { Icon } from '../../ui';
import { HEALTH_CATEGORIES, TEXT_VARIANTS, MODULE_TO_AREA_MAP, BLOOD_AREAS, BODY_AREAS, HEAD_AREAS, LAB_COSTS, PHYSICAL_TESTS, COGNITIVE_TESTS } from '../../../data/constants';
import { useInternalMode } from '../../../context/InternalModeContext';

const ANSWER_OPTIONS = [
    { id: 'yes', label: 'Ano', value: 1 },
    { id: 'no', label: 'Ne', value: -1 },
    { id: 'dunno', label: 'Nevím', value: 0 },
];

export const StepQuestionnaire = ({ tempSelectedModules, setTempSelectedModules, textVariant, client, onComplete }) => {
    const { showInternal } = useInternalMode();

    // Get all questions (filter by gender - e.g. skip prostate for women)
    const allQuestions = HEALTH_CATEGORIES
        .filter(c => c.module)
        .filter(c => {
            if (c.id === 'prostate' && client.gender === 'female') return false;
            return true;
        });

    const [questionIndex, setQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({}); // moduleId -> likert value
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    const currentQuestion = allQuestions[questionIndex];
    const totalQuestions = allQuestions.length;
    const isLastQuestion = questionIndex >= totalQuestions - 1;

    const t = TEXT_VARIANTS[textVariant] || TEXT_VARIANTS.self;

    const handleAnswer = (option) => {
        const mod = currentQuestion.module;

        // Show checked state briefly
        setSelectedOption(option.id);

        // Save answer
        setAnswers(prev => ({ ...prev, [mod.id]: option.value }));

        // If positive answer (Ano), add to selected modules
        if (option.value > 0) {
            if (!tempSelectedModules.includes(mod.id)) {
                setTempSelectedModules(prev => [...prev, mod.id]);
            }
        } else {
            // Remove if previously selected
            setTempSelectedModules(prev => prev.filter(id => id !== mod.id));
        }

        // Auto-advance with brief transition
        setTimeout(() => {
            setIsTransitioning(true);
            setTimeout(() => {
                if (isLastQuestion) {
                    onComplete();
                } else {
                    setQuestionIndex(prev => prev + 1);
                    setSelectedOption(null);
                    setIsTransitioning(false);
                }
            }, 300);
        }, 200);
    };

    // Get question text based on variant
    const questionText = textVariant === 'parents' && currentQuestion.module.questionParents
        ? currentQuestion.module.questionParents
        : currentQuestion.module.question;

    const symptoms = currentQuestion.module.symptoms || [];

    // Internal debug info for current question
    const getModuleDebugInfo = () => {
        const mod = currentQuestion.module;
        const mapping = MODULE_TO_AREA_MAP[mod.id];

        const allAreas = [...BLOOD_AREAS, ...BODY_AREAS, ...HEAD_AREAS];
        const area = mapping ? allAreas.find(a => a.id === mapping.areaId) : null;

        // Area expansion markers/tests resolved to names
        const expansionMarkerNames = (area?.expansion?.markers || []).map(m => LAB_COSTS[m]?.name || m);
        const expansionTestNames = (area?.expansion?.tests || []).map(t => {
            const test = [...PHYSICAL_TESTS, ...COGNITIVE_TESTS].find(m => m.id === t);
            return test?.name || t;
        });
        const allExpansionNames = [...expansionMarkerNames, ...expansionTestNames];

        return {
            areaName: area?.name || null,
            areaIcon: area?.icon || null,
            expansionName: area?.expansion?.name || null,
            expansionItems: allExpansionNames,
            hasExpansion: allExpansionNames.length > 0,
        };
    };

    const debugInfo = showInternal ? getModuleDebugInfo() : null;

    return (
        <div className="min-h-[80vh] flex flex-col">
            {/* Progress indicator - pinned to top */}
            <div className="w-full px-4 pt-4 pb-2">
                <div className="max-w-2xl mx-auto">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-surface-on-variant font-medium">
                            Otázka {questionIndex + 1} z {totalQuestions}
                        </span>
                    </div>
                    <div className="w-full h-1 rounded-full bg-surface-container-highest overflow-hidden">
                        <div
                            className="h-full rounded-full bg-primary transition-all duration-300 ease-out"
                            style={{ width: `${((questionIndex + 1) / totalQuestions) * 100}%` }}
                        />
                    </div>
                </div>
            </div>

            {/* Question - centered */}
            <div className="flex-1 flex flex-col justify-center max-w-2xl mx-auto px-4 py-8 w-full">
                <div className={`transition-all duration-300 ${isTransitioning ? 'opacity-0 translate-x-8' : 'opacity-100 translate-x-0'}`}>
                    {/* Category icon */}
                    <div className="flex items-center gap-2 mb-4">
                        <Icon name={currentQuestion.icon} size={20} className="text-primary" />
                        <span className="text-sm font-medium text-primary">{currentQuestion.title}</span>
                    </div>

                    {/* Main question - Gambarina */}
                    <h2 className="text-4xl md:text-5xl font-display leading-tight mb-8 text-surface-on">
                        {questionText}
                    </h2>

                    {/* Symptoms - Satoshi */}
                    {symptoms.length > 0 && (
                        <div className="mb-10">
                            <div className="flex flex-wrap gap-2">
                                {symptoms.map((symptom, i) => (
                                    <span
                                        key={i}
                                        className="px-3 py-1.5 rounded-full text-sm bg-surface-container-low text-surface-on-variant border border-surface-outline-variant"
                                    >
                                        {symptom}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Answers - full width with checkboxes */}
                    <div className="flex flex-col gap-2">
                        {ANSWER_OPTIONS.map(option => (
                            <button
                                key={option.id}
                                onClick={() => handleAnswer(option)}
                                className={`w-full px-6 py-3.5 rounded-xl text-left font-semibold transition-all flex items-center justify-between ${
                                    selectedOption === option.id
                                        ? 'bg-primary/15 border-primary border-2 text-surface-on'
                                        : 'hover:bg-primary/10 hover:border-primary bg-surface-container-low border border-surface-outline-variant text-surface-on'
                                }`}
                            >
                                <span>{option.label}</span>
                                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                                    selectedOption === option.id
                                        ? 'bg-primary border-primary'
                                        : 'border-surface-outline-variant'
                                }`}>
                                    {selectedOption === option.id && (
                                        <Icon name="check" size={14} className="text-primary-on" />
                                    )}
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* Internal debug panel */}
                    {showInternal && debugInfo && (
                        <div className="mt-8 p-4 rounded-2xl bg-violet-50 dark:bg-violet-900/20 border border-violet-200 dark:border-violet-700/40">
                            <div className="flex items-center gap-2 mb-3">
                                <Icon name="science" size={16} className="text-violet-600 dark:text-violet-400" />
                                <span className="text-xs font-bold text-violet-600 dark:text-violet-400 uppercase tracking-wider">Při odpovědi „Ano"</span>
                            </div>

                            <div className="space-y-2 text-xs">
                                {/* Area expansion */}
                                {debugInfo.areaName && (
                                    <div className="flex items-start gap-2 px-3 py-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300">
                                        <Icon name={debugInfo.areaIcon || 'add_circle'} size={14} className="flex-shrink-0 mt-0.5" />
                                        <div>
                                            <div className="font-semibold">Rozšíření oblasti „{debugInfo.areaName}"</div>
                                            {debugInfo.hasExpansion && (
                                                <div className="opacity-80 mt-0.5">{debugInfo.expansionItems.join(', ')}</div>
                                            )}
                                        </div>
                                    </div>
                                )}

                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
