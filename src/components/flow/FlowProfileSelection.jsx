// src/components/flow/FlowProfileSelection.jsx
import React from 'react';
import { Icon } from '../ui';
import { PROFILES_SPEC } from '../../data/constants';

export const FlowProfileSelection = ({ onBack, onSelect }) => (
    <div className="max-w-6xl mx-auto px-4 py-12 animate-fade-in-up">
        <button onClick={onBack} className="btn-text mb-8"><Icon name="arrow_back" className="mr-2" /> Zpět</button>
        <h2 className="text-display-medium text-center mb-16">Jak se cítíte?</h2>
        <div className="grid md:grid-cols-3 gap-6">
            {Object.values(PROFILES_SPEC).map(p => (
                <button key={p.id} onClick={() => onSelect(p)} className="card-outlined p-8 text-left hover:bg-surface-container-low relative overflow-hidden group transition-all">
                    <div className="absolute top-0 left-0 w-1.5 h-full group-hover:w-full transition-all duration-500 opacity-10" style={{ backgroundColor: p.color }}></div>
                    <div className="relative z-10">
                        <Icon name={p.icon} size={48} style={{ color: p.color }} className="mb-6" />
                        <h3 className="font-display text-headline-small mb-2">{p.name}</h3>
                        <p className="text-body-medium opacity-70 leading-relaxed">{p.tagline}</p>
                    </div>
                </button>
            ))}
        </div>
    </div>
);
