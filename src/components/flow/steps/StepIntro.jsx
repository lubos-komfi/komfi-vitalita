import React from 'react';
import { Icon } from '../../ui';
import { TEXT_VARIANTS } from '../../../data/constants';

export const StepIntro = ({ textVariant, onNext }) => {
    const t = TEXT_VARIANTS[textVariant] || TEXT_VARIANTS.self;

    return (
        <div className="max-w-2xl mx-auto px-4 py-8 animate-fade-in-up">
            <div className="text-center mb-12">
                <div className="w-20 h-20 rounded-3xl bg-primary-container flex items-center justify-center mx-auto mb-6">
                    <Icon name="health_and_safety" size={40} className="text-primary" />
                </div>
                <h2 className="text-4xl font-display mb-4 text-surface-on">
                    Zjistíme, co {t.possessive} tělo potřebuje
                </h2>
                <p className="text-surface-on-variant text-lg leading-relaxed mb-6">
                    Zeptáme se {t.pronoun} na pár otázek o zdraví a životním stylu.
                    Na základě odpovědí připravíme nabídku testů na míru.
                </p>
            </div>

            <div className="space-y-4 mb-10">
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-surface-container-low">
                    <div className="w-10 h-10 rounded-xl bg-primary-container flex items-center justify-center flex-shrink-0">
                        <Icon name="quiz" size={20} className="text-primary" />
                    </div>
                    <div>
                        <div className="font-bold text-surface-on">Krátký dotazník</div>
                        <div className="text-sm text-surface-on-variant">Pár jednoduchých otázek o zdravotních obavách</div>
                    </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-surface-container-low">
                    <div className="w-10 h-10 rounded-xl bg-tertiary-container flex items-center justify-center flex-shrink-0">
                        <Icon name="auto_awesome" size={20} className="text-tertiary" />
                    </div>
                    <div>
                        <div className="font-bold text-surface-on">Nabídka na míru</div>
                        <div className="text-sm text-surface-on-variant">Automaticky vybereme optimální sadu testů</div>
                    </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-surface-container-low">
                    <div className="w-10 h-10 rounded-xl bg-secondary-container flex items-center justify-center flex-shrink-0">
                        <Icon name="event_repeat" size={20} className="text-secondary" />
                    </div>
                    <div>
                        <div className="font-bold text-surface-on">2× ročně</div>
                        <div className="text-sm text-surface-on-variant">Pravidelné sledování pro zachycení trendů. Sleva 2,5 % při platbě najednou.</div>
                    </div>
                </div>
            </div>

            <div className="flex justify-center">
                <button
                    onClick={onNext}
                    className="px-10 py-5 rounded-2xl text-primary-on font-bold text-lg bg-primary shadow-xl hover:scale-[1.02] transition-transform flex items-center gap-2"
                >
                    Začít <Icon name="arrow_forward" />
                </button>
            </div>
        </div>
    );
};
