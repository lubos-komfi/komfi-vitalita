import React from 'react';
import { Icon } from '../../ui';

export const StepRegistration = ({ registration, setRegistration, onNext }) => {
    return (
        <div className="max-w-md mx-auto px-4 py-8 animate-fade-in-up">
            <div className="text-center mb-10">
                <div className="w-16 h-16 rounded-2xl bg-primary-container flex items-center justify-center mx-auto mb-4">
                    <Icon name="person_add" size={32} className="text-primary" />
                </div>
                <h2 className="text-3xl font-display mb-3 text-surface-on">Zaregistrujte se</h2>
                <p className="text-surface-on-variant">
                    Připravíme vám personalizovanou nabídku a pošleme ji na e-mail.
                </p>
            </div>

            <div className="space-y-4 mb-8">
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-sm font-medium text-surface-on mb-1.5">Jméno</label>
                        <input
                            type="text"
                            value={registration.firstName}
                            onChange={e => setRegistration(r => ({ ...r, firstName: e.target.value }))}
                            placeholder="Jan"
                            className="w-full px-4 py-3 rounded-xl bg-surface-container border border-surface-outline-variant transition-colors text-surface-on placeholder:text-surface-on-variant/50 focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-surface-on mb-1.5">Příjmení</label>
                        <input
                            type="text"
                            value={registration.lastName}
                            onChange={e => setRegistration(r => ({ ...r, lastName: e.target.value }))}
                            placeholder="Novák"
                            className="w-full px-4 py-3 rounded-xl bg-surface-container border border-surface-outline-variant transition-colors text-surface-on placeholder:text-surface-on-variant/50 focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-surface-on mb-1.5">E-mail</label>
                    <input
                        type="email"
                        value={registration.email}
                        onChange={e => setRegistration(r => ({ ...r, email: e.target.value }))}
                        placeholder="jan@novak.cz"
                        className="w-full px-4 py-3 rounded-xl bg-surface-container border border-surface-outline-variant transition-colors text-surface-on placeholder:text-surface-on-variant/50 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>
            </div>

            <button
                onClick={onNext}
                className="w-full py-5 rounded-2xl text-primary-on font-bold text-lg bg-primary shadow-xl hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
            >
                Zobrazit moji nabídku <Icon name="arrow_forward" />
            </button>
        </div>
    );
};
