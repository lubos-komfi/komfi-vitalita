import React from 'react';
import { Icon } from '../../ui';

export const StepSuccess = ({ registration }) => {
    return (
        <div className="max-w-xl mx-auto py-32 text-center animate-fade-in-up">
            <Icon name="celebration" size={100} className="text-primary mb-8 animate-bounce" />
            <h2 className="text-5xl font-display mb-6 text-surface-on">Perfektní!</h2>
            <p className="text-surface-on-variant text-lg mb-4">
                Vaše objednávka byla přijata.
            </p>
            {registration?.email && (
                <p className="text-surface-on-variant mb-8">
                    Potvrzení jsme odeslali na <span className="font-bold text-surface-on">{registration.email}</span>
                </p>
            )}
            <button
                onClick={() => window.location.reload()}
                className="border-b-2 border-current font-bold text-lg pb-1 text-primary"
            >
                Zpět na úvod
            </button>
        </div>
    );
};
