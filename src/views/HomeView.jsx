import React from 'react';
import { Icon } from '../components/ui';

export const HomeView = ({ onNavigate }) => (
    <div className="max-w-5xl mx-auto px-4 py-20 text-center animate-fade-in-up">
        {/* Badge */}
        <div className="inline-block px-4 py-1.5 rounded-full bg-primary-container text-primary font-bold text-sm mb-6 border border-primary/20">
            Nová logika prevence 2026
        </div>

        {/* Headline */}
        <h1 className="text-6xl font-display mb-6 leading-tight text-surface-on">
            Zdraví není balíček.<br />
            Zdraví je skládačka.
        </h1>

        {/* Subhead */}
        <p className="text-xl text-surface-on-variant max-w-2xl mx-auto mb-12 leading-relaxed">
            Opouštíme fixní balíčky. Představujeme <strong className="text-surface-on">jeden silný základ</strong>, který si jednoduše rozšíříte o to, co vás skutečně trápí.
        </p>

        {/* CTA */}
        <button onClick={() => onNavigate('flow')} className="px-10 py-5 rounded-2xl bg-primary text-primary-on font-bold text-xl shadow-lg hover:scale-105 transition-transform mb-20 flex items-center justify-center mx-auto gap-3">
            Sestavit můj program <Icon name="arrow_forward" />
        </button>
    </div>
);
