import React from 'react';
import { Icon } from '../../ui';
import { TEXT_VARIANTS, BLOOD_AREAS, BODY_AREAS, HEAD_AREAS } from '../../../data/constants';
import { useInternalMode } from '../../../context/InternalModeContext';

export const StepDemographics = ({ client, setClient, textVariant, expandedBloodAreas, expandedBodyAreas, expandedHeadAreas, onNext }) => {
    const t = TEXT_VARIANTS[textVariant] || TEXT_VARIANTS.self;
    const { showInternal } = useInternalMode();

    // Compute what's triggered by current age/gender
    const getTriggeredItems = () => {
        const items = [];

        // Gender-filtered areas (visible/hidden)
        BLOOD_AREAS.forEach(area => {
            if (area.genderFilter) {
                const visible = area.genderFilter === client.gender;
                items.push({
                    type: visible ? 'module' : 'hidden',
                    label: area.name,
                    icon: area.icon,
                    color: area.color,
                    reason: visible
                        ? `Zobrazeno — oblast pro ${area.genderFilter === 'female' ? 'ženy' : 'muže'}`
                        : `Skryto — pouze pro ${area.genderFilter === 'female' ? 'ženy' : 'muže'}`,
                });
            }
        });

        // Auto-expanded by age
        [...BLOOD_AREAS, ...BODY_AREAS, ...HEAD_AREAS].forEach(area => {
            if (area.expansion?.autoExpandForAge) {
                const triggered = client.age >= area.expansion.autoExpandForAge;
                items.push({
                    type: triggered ? 'expansion' : 'inactive',
                    label: `${area.name} — ${area.expansion.name}`,
                    icon: area.icon,
                    color: area.color,
                    reason: triggered
                        ? `Rozšířeno — věk ${client.age}+ ≥ ${area.expansion.autoExpandForAge}`
                        : `Neaktivní — vyžaduje věk ${area.expansion.autoExpandForAge}+`,
                });
            }
        });

        // Auto-expanded by gender
        [...BLOOD_AREAS, ...BODY_AREAS, ...HEAD_AREAS].forEach(area => {
            if (area.expansion?.autoExpandForGender) {
                const triggered = area.expansion.autoExpandForGender === client.gender;
                if (!area.genderFilter || area.genderFilter === client.gender) {
                    items.push({
                        type: triggered ? 'expansion' : 'inactive',
                        label: `${area.name} — ${area.expansion.name}`,
                        icon: area.icon,
                        color: area.color,
                        reason: triggered
                            ? `Rozšířeno — pohlaví ${client.gender === 'female' ? 'žena' : 'muž'}`
                            : `Neaktivní — pouze pro ${area.expansion.autoExpandForGender === 'female' ? 'ženy' : 'muže'}`,
                    });
                }
            }
        });

        return items;
    };

    const triggeredItems = showInternal ? getTriggeredItems() : [];

    return (
        <div className="max-w-4xl mx-auto px-4 py-8 animate-fade-in-up">
            <h2 className="text-4xl font-display text-center mb-12 text-surface-on">{t.genderQ}</h2>
            <div className="max-w-md mx-auto space-y-8">
                <div className="flex p-1 rounded-2xl bg-surface-container-high">
                    <button
                        onClick={() => setClient({ ...client, gender: 'female' })}
                        className={`flex-1 py-4 rounded-xl font-bold transition-all ${
                            client.gender === 'female' ? 'bg-surface text-primary shadow-sm' : 'text-surface-on-variant'
                        }`}
                    >
                        Žena
                    </button>
                    <button
                        onClick={() => setClient({ ...client, gender: 'male' })}
                        className={`flex-1 py-4 rounded-xl font-bold transition-all ${
                            client.gender === 'male' ? 'bg-surface text-primary shadow-sm' : 'text-surface-on-variant'
                        }`}
                    >
                        Muž
                    </button>
                </div>

                <div className="py-4">
                    <h3 className="text-2xl font-display text-center mb-6 text-surface-on">{t.ageQ}</h3>
                    <div className="text-center mb-6">
                        <span className="text-5xl font-display text-primary">{client.age}+</span>
                    </div>

                    <div className="relative max-w-md mx-auto">
                        <div className="absolute top-1/2 -translate-y-1/2 left-2.5 right-2.5 h-1 bg-surface-container-highest rounded-full" />
                        <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-0">
                            {[30, 35, 40, 45, 50, 55, 60, 65].map(age => (
                                <div key={age} className="w-5 h-5 rounded-full bg-surface-container-highest" />
                            ))}
                        </div>
                        <input
                            type="range"
                            min="30"
                            max="65"
                            step="5"
                            value={client.age}
                            onChange={e => setClient({ ...client, age: parseInt(e.target.value) })}
                            className="w-full h-5 appearance-none cursor-pointer relative z-10 bg-transparent
                                [&::-webkit-slider-thumb]:appearance-none
                                [&::-webkit-slider-thumb]:w-4
                                [&::-webkit-slider-thumb]:h-4
                                [&::-webkit-slider-thumb]:rounded-full
                                [&::-webkit-slider-thumb]:bg-primary
                                [&::-webkit-slider-thumb]:shadow-md
                                [&::-webkit-slider-thumb]:cursor-grab
                                [&::-webkit-slider-thumb]:active:cursor-grabbing
                                [&::-webkit-slider-thumb]:border-2
                                [&::-webkit-slider-thumb]:border-white
                                [&::-webkit-slider-thumb]:-mt-0.5
                                [&::-moz-range-thumb]:w-4
                                [&::-moz-range-thumb]:h-4
                                [&::-moz-range-thumb]:rounded-full
                                [&::-moz-range-thumb]:bg-primary
                                [&::-moz-range-thumb]:shadow-md
                                [&::-moz-range-thumb]:cursor-grab
                                [&::-moz-range-thumb]:active:cursor-grabbing
                                [&::-moz-range-thumb]:border-2
                                [&::-moz-range-thumb]:border-white
                                [&::-webkit-slider-runnable-track]:bg-transparent
                                [&::-webkit-slider-runnable-track]:h-5
                                [&::-moz-range-track]:bg-transparent
                                [&::-moz-range-track]:h-5"
                        />
                    </div>

                    <div className="max-w-md mx-auto flex justify-between text-xs text-surface-on-variant mt-1 px-0.5">
                        <span>30+</span>
                        <span>65+</span>
                    </div>
                </div>

                <button
                    onClick={onNext}
                    className="w-full py-5 rounded-2xl text-primary-on font-bold text-lg bg-primary shadow-xl hover:scale-[1.02] transition-transform"
                >
                    Pokračovat
                </button>
            </div>

            {/* Internal debug panel */}
            {showInternal && triggeredItems.length > 0 && (
                <div className="mt-10 max-w-md mx-auto p-4 rounded-2xl bg-violet-50 dark:bg-violet-900/20 border border-violet-200 dark:border-violet-700/40">
                    <div className="flex items-center gap-2 mb-3">
                        <Icon name="science" size={16} className="text-violet-600 dark:text-violet-400" />
                        <span className="text-xs font-bold text-violet-600 dark:text-violet-400 uppercase tracking-wider">Aktivní pravidla</span>
                    </div>
                    <div className="space-y-2">
                        {triggeredItems.map((item, i) => (
                            <div
                                key={i}
                                className={`flex items-start gap-2 text-xs px-3 py-2 rounded-lg transition-all ${
                                    item.type === 'module' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300' :
                                    item.type === 'expansion' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' :
                                    item.type === 'hidden' ? 'bg-red-50 dark:bg-red-900/20 text-red-400 dark:text-red-400 line-through opacity-60' :
                                    'bg-surface-container text-surface-on-variant opacity-50'
                                }`}
                            >
                                <Icon name={item.icon} size={14} className="flex-shrink-0 mt-0.5" />
                                <div>
                                    <div className="font-semibold">{item.label}</div>
                                    <div className="opacity-80">{item.reason}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
