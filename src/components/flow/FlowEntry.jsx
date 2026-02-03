// src/components/flow/FlowEntry.jsx
import React from 'react';
import { Icon } from '../ui';

export const FlowEntry = ({ onNext }) => (
    <div className="max-w-4xl mx-auto px-4 py-16 animate-fade-in-up text-center">
        <h1 className="text-display-large mb-12 text-primary">Pro koho službu hledáte?</h1>
        <div className="grid md:grid-cols-2 gap-6">
            <button onClick={onNext} className="card-filled p-12 text-left hover:bg-surface-container-high transition-colors group">
                <Icon name="accessibility_new" size={64} className="text-primary mb-6 group-hover:scale-110 transition-transform" />
                <div className="font-display text-headline-medium mb-2">Chci to pro sebe</div>
                <div className="text-body-large opacity-70">Mít své zdraví pod kontrolou.</div>
            </button>
            <button onClick={onNext} className="card-filled p-12 text-left hover:bg-surface-container-high transition-colors group">
                <Icon name="family_restroom" size={64} className="text-primary mb-6 group-hover:scale-110 transition-transform" />
                <div className="font-display text-headline-medium mb-2">Chci to pro rodiče</div>
                <div className="text-body-large opacity-70">Zajistit jim tu nejlepší péči.</div>
            </button>
        </div>
    </div>
);
