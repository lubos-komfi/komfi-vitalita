// src/views/MarginView.jsx
import React from 'react';
import { PROFILES_SPEC } from '../data/constants';
import { useMarginCalculator } from '../hooks/useMarginCalculator';
import { CalculatorControls, ResultCard } from '../components/margin';

export const MarginView = () => {
    const {
        age, setAge,
        gender, setGender,
        selectedFreqId, setSelectedFreqId,
        nurseCost, setNurseCost,
        transportCost, setTransportCost,
        selectedFreq,
        calculateProfile,
    } = useMarginCalculator();

    return (
        <div className="max-w-7xl mx-auto px-4 py-12 animate-fade-in-up">
            <div className="text-center mb-8">
                <h2 className="text-4xl font-display mb-4 text-surface-on">Unit Economics Simulátor</h2>
                <p className="text-surface-on-variant">Interaktivní model marže zohledňující demografii, frekvenci a provozní náklady.</p>
            </div>

            {/* Controls */}
            <CalculatorControls
                age={age} setAge={setAge}
                gender={gender} setGender={setGender}
                selectedFreqId={selectedFreqId} setSelectedFreqId={setSelectedFreqId}
                nurseCost={nurseCost} setNurseCost={setNurseCost}
                transportCost={transportCost} setTransportCost={setTransportCost}
            />

            {/* Results */}
            <div className="grid md:grid-cols-3 gap-6">
                {Object.keys(PROFILES_SPEC).map(key => {
                    const data = calculateProfile(key);
                    if (!data) return null;
                    return (
                        <ResultCard
                            key={key}
                            data={data}
                            selectedFreq={selectedFreq}
                        />
                    );
                })}
            </div>
        </div>
    );
};