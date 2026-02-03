// src/components/flow/FlowSuccess.jsx
import React from 'react';
import { Icon } from '../ui';

export const FlowSuccess = ({ onReset }) => (
    <div className="max-w-xl mx-auto py-32 text-center animate-fade-in-up px-4">
        <div className="w-24 h-24 bg-tertiary-container text-tertiary-on-container rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
            <Icon name="celebration" size={48} />
        </div>
        <h2 className="text-display-medium mb-6 text-primary">Děkujeme za důvěru!</h2>
        <p className="text-headline-small opacity-70 mb-12 leading-relaxed">Vaše objednávka byla přijata. Sestra se vám ozve během zítřka.</p>
        <button onClick={onReset} className="btn-tonal">Zpět na úvod</button>
    </div>
);
