import React from 'react';
import { Icon } from '../../ui';

export const StepTarget = ({ setClient, onSelectSelf, onSelectParents }) => {
    return (
        <div className="max-w-4xl mx-auto px-4 py-8 animate-fade-in-up">
            <h2 className="text-4xl font-display text-center mb-12 text-surface-on">Pro koho službu hledáte?</h2>
            <div className="grid md:grid-cols-2 gap-3">
                <button
                    onClick={() => {
                        setClient(c => ({ ...c, target: 'self', age: 40 }));
                        onSelectSelf();
                    }}
                    className="p-12 rounded-3xl text-left transition-all group bg-surface-container-low border border-surface-outline-variant hover:border-primary hover:shadow-xl"
                >
                    <Icon name="accessibility_new" size={64} className="text-primary mb-6 group-hover:scale-110 transition-transform" />
                    <div className="font-display text-3xl mb-3 text-surface-on">Chci to pro sebe</div>
                    <div className="text-surface-on-variant text-lg">Mít své zdraví pod kontrolou.</div>
                </button>
                <button
                    onClick={() => {
                        setClient(c => ({ ...c, target: 'parents', age: 60 }));
                        onSelectParents();
                    }}
                    className="p-12 rounded-3xl text-left transition-all group bg-surface-container-low border border-surface-outline-variant hover:border-primary hover:shadow-xl"
                >
                    <Icon name="family_restroom" size={64} className="text-primary mb-6 group-hover:scale-110 transition-transform" />
                    <div className="font-display text-3xl mb-3 text-surface-on">Chci to pro blízkého</div>
                    <div className="text-surface-on-variant text-lg">Zajistit mu tu nejlepší péči.</div>
                </button>
            </div>
        </div>
    );
};
