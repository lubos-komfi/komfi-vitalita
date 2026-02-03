// src/views/AnalysisView.jsx
import React from 'react';
import { Icon } from '../components/ui';

export const AnalysisView = () => (
    <div className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-4xl font-display mb-12 text-center text-surface-on">Analýza</h2>
        <div className="p-8 rounded-3xl bg-surface-container-low border border-surface-outline-variant shadow-lg mb-8">
            <h3 className="text-2xl font-display mb-4 text-primary">Problém vs. Řešení</h3>
            <p className="text-surface-on-variant mb-4">Původní statické balíčky nutily klienta rozumět medicíně. Nový model "Smart Screening" přenáší tuto odpovědnost na systém.</p>
            <ul className="space-y-2 font-bold text-sm text-surface-on">
                <li className="flex gap-2"><Icon name="check" className="text-tertiary" /> Odstranění rozhodovací paralýzy</li>
                <li className="flex gap-2"><Icon name="check" className="text-tertiary" /> Zvýšení vnímané hodnoty (Bonusy zdarma)</li>
                <li className="flex gap-2"><Icon name="check" className="text-tertiary" /> Medicínská relevance (Age-based)</li>
            </ul>
        </div>
    </div>
);