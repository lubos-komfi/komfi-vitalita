import React, { useState, useEffect } from 'react';
import { Icon } from '../../ui';

const PROCESSING_TEXTS = [
    'Analyzuji odpovědi...',
    'Vybírám optimální markery...',
    'Kontroluji doporučení podle věku...',
    'Připravuji nabídku na míru...',
];

export const StepProcessing = ({ onComplete, processAnswers, tempSelectedModules }) => {
    const [progress, setProgress] = useState(0);
    const [textIndex, setTextIndex] = useState(0);

    useEffect(() => {
        // Process answers when this step mounts
        processAnswers(tempSelectedModules);

        const progressInterval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(progressInterval);
                    return 100;
                }
                return prev + 2;
            });
        }, 60);

        const textInterval = setInterval(() => {
            setTextIndex(prev => (prev + 1) % PROCESSING_TEXTS.length);
        }, 800);

        const completeTimeout = setTimeout(() => {
            onComplete();
        }, 3200);

        return () => {
            clearInterval(progressInterval);
            clearInterval(textInterval);
            clearTimeout(completeTimeout);
        };
    }, []);

    return (
        <div className="max-w-md mx-auto px-4 py-32 text-center animate-fade-in-up">
            {/* Pulsing icon */}
            <div className="w-24 h-24 rounded-3xl bg-primary-container flex items-center justify-center mx-auto mb-8 animate-pulse">
                <Icon name="auto_awesome" size={48} className="text-primary" />
            </div>

            {/* Rotating text */}
            <p className="text-lg font-medium text-surface-on mb-8 h-7 transition-all">
                {PROCESSING_TEXTS[textIndex]}
            </p>

            {/* Progress bar */}
            <div className="w-full h-2 rounded-full bg-surface-container-highest overflow-hidden">
                <div
                    className="h-full rounded-full bg-primary transition-all duration-100 ease-linear"
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
    );
};
