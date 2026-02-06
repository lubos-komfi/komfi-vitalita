import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../components/ui';
import { HOW_IT_WORKS_STEPS } from '../data/constants';

export const HowItWorksView = () => {
    const navigate = useNavigate();

    return (
        <div className="max-w-xl mx-auto px-4 py-16">
            <div className="text-center mb-16">
                <h1 className="text-5xl font-display mb-4 text-surface-on">Jak to funguje</h1>
                <p className="text-lg text-surface-on-variant">
                    Od prvního dotazníku po zlepšení zdraví — v 5 jednoduchých krocích.
                </p>
            </div>

            {/* Steps list */}
            <div className="relative pl-12">
                {/* Vertical line */}
                <div className="absolute left-[19px] top-4 bottom-4 w-px bg-surface-outline-variant" />

                <div className="space-y-10">
                    {HOW_IT_WORKS_STEPS.map((step, i) => (
                        <div key={i} className="relative">
                            {/* Step number circle on the line */}
                            <div className="absolute -left-12 top-0 w-10 h-10 rounded-full bg-primary text-primary-on text-sm font-bold flex items-center justify-center z-10">
                                {i + 1}
                            </div>

                            {/* Content */}
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <Icon name={step.icon} size={18} className="text-primary" />
                                    <h3 className="font-display text-xl text-surface-on">{step.title}</h3>
                                </div>
                                <p className="text-surface-on-variant leading-relaxed text-sm">{step.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* CTA */}
            <div className="text-center mt-16">
                <button
                    onClick={() => navigate('/flow/0')}
                    className="px-10 py-5 rounded-2xl text-primary-on font-bold text-lg bg-primary shadow-xl hover:scale-[1.02] transition-transform inline-flex items-center gap-2"
                >
                    Začít <Icon name="arrow_forward" />
                </button>
            </div>
        </div>
    );
};
