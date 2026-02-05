import React from 'react';
import { CalculatorControls } from '../components/margin/CalculatorControls';
import { ResultCard } from '../components/margin/ResultCard';
import { useMarginCalculator } from '../hooks/useMarginCalculator';
import { Icon } from '../components/ui';

export const MarginView = () => {
  const {
    settings,
    setSettings,
    frequencyId,
    setFrequencyId,
    selectedLabId,
    setSelectedLabId,
    activeBaseModules,
    activeExpansionModules,
    toggleBase,
    toggleExpansion,
    applyScenario,
    results
  } = useMarginCalculator();

  return (
    <div className="min-h-screen bg-surface text-surface-on pb-20">
      {/* Header */}
      <div className="bg-surface-container-low border-b border-surface-outline-variant py-8 px-6">
        <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-display font-bold text-primary flex items-center gap-3">
                <Icon name="calculate" size={32} />
                Interaktivní Kalkulátor Marže
            </h1>
            <p className="text-surface-on-variant mt-2 max-w-2xl">
                Simulace ekonomiky pro modulární systém. Vyberte scénář (osobu) nebo si poskládejte vlastní balíček.
                Ceny jsou aktualizovány dle aktuálních nabídek laboratoří (CityLab, EUC, Synlab, Unilabs).
            </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Col: Controls */}
        <div className="lg:col-span-7 space-y-8">
            <CalculatorControls 
                settings={settings}
                setSettings={setSettings}
                frequencyId={frequencyId}
                setFrequencyId={setFrequencyId}
                selectedLabId={selectedLabId}
                setSelectedLabId={setSelectedLabId}
                activeBase={activeBaseModules}
                activeExp={activeExpansionModules}
                onToggleBase={toggleBase}
                onToggleExp={toggleExpansion}
                onApplyScenario={applyScenario}
            />
        </div>

        {/* Right Col: Sticky Result Card */}
        <div className="lg:col-span-5">
            <ResultCard results={results} />
        </div>
      </div>
    </div>
  );
};