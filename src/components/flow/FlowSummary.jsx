// src/components/flow/FlowSummary.jsx
import React from 'react';
import { Icon } from '../ui';
import { FREQUENCIES, PHYSICAL_MEASUREMENTS } from '../../data/constants';

export const FlowSummary = ({
    selectedProfile,
    memberDetails,
    selectedFrequency,
    setSelectedFrequency,
    onBack,
    onNext
}) => {
    const calculatePrice = (profile, freq) => Math.round((profile.price * freq.multiplier) * (1 - freq.discount));
    // Check if selectedProfile has markers, if not fallback
    const displayMarkers = selectedProfile?.markers ? [...selectedProfile.markers] : [];

    return (
        <div className="max-w-6xl mx-auto px-4 py-12 animate-fade-in-up">
            <button onClick={onBack} className="btn-text mb-8"><Icon name="arrow_back" className="mr-2" /> Zpět k údajům</button>

            {/* HERO CARD */}
            <div className="card-filled p-10 mb-16 flex flex-col md:flex-row gap-10 items-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2" style={{ backgroundColor: selectedProfile.color }}></div>
                <div className="flex-1 relative z-10">
                    <span className="text-label-small font-bold uppercase tracking-widest opacity-60 mb-2 block">Doporučený program pro vás</span>
                    <h2 className="text-display-large mb-4 text-primary">{selectedProfile.name}</h2>
                    <p className="text-headline-small opacity-70 leading-relaxed">{selectedProfile.tagline}</p>

                    <div className="flex flex-wrap gap-3 mt-6">
                        <div className="px-4 py-2 rounded-lg bg-surface-container-high border border-surface-outline-variant/30 text-label-large font-bold flex items-center gap-2">
                            <Icon name="home_health" size={20} className="text-primary" /> Sestra u vás doma
                        </div>
                        {memberDetails.age >= 50 && (
                            <div className="px-4 py-2 rounded-lg bg-surface-container-high border border-surface-outline-variant/30 text-label-large font-bold flex items-center gap-2 text-tertiary">
                                <Icon name="auto_awesome" size={20} /> Smart Screening 50+
                            </div>
                        )}
                    </div>
                </div>

                {/* PRICING BOX */}
                <div className="text-right shrink-0 bg-surface/50 p-6 rounded-2xl border border-surface-outline-variant/20 backdrop-blur-sm min-w-[280px]">
                    <div className="text-display-medium text-primary mb-1">{calculatePrice(selectedProfile, selectedFrequency).toLocaleString()} Kč</div>
                    <div className="text-label-medium font-bold opacity-50 mb-6 uppercase tracking-widest">celkem za rok</div>
                    <div className="flex flex-col gap-2">
                        {FREQUENCIES.map(f => (
                            <button
                                key={f.id}
                                onClick={() => setSelectedFrequency(f)}
                                className={`px-4 py-3 rounded-xl text-sm font-bold transition-all flex justify-between items-center gap-4
                                ${selectedFrequency.id === f.id
                                        ? 'bg-primary text-primary-on shadow-md'
                                        : 'bg-surface hover:bg-surface-container-high text-surface-on'}`}
                            >
                                <span>{f.label}</span>
                                {f.discount > 0 ? <span className={`text-[10px] px-2 py-0.5 rounded-full ${selectedFrequency.id === f.id ? 'bg-white/20' : 'bg-primary-container text-primary-on-container'}`}>-{Math.round(f.discount * 100)}%</span> : <span className="opacity-30 text-[10px]">Standard</span>}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="space-y-20 mb-20">
                {/* SECTION 1 */}
                <section>
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-10 h-10 rounded-full bg-secondary-container text-secondary-on-container flex items-center justify-center font-display text-xl">1</div>
                        <h3 className="text-headline-medium font-display">Návštěva sestry u vás doma</h3>
                    </div>
                    <div className="grid md:grid-cols-3 gap-4">
                        {Object.values(PHYSICAL_MEASUREMENTS).map(m => (
                            <div key={m.id} className="card-outlined p-6 flex items-start gap-4">
                                <Icon name={m.icon} size={28} className="text-primary" />
                                <div>
                                    <div className="text-title-medium font-bold mb-1">{m.name}</div>
                                    <div className="text-body-small opacity-60 mb-2">{m.why}</div>
                                    <p className="text-body-medium opacity-80 leading-snug">{m.youWillSee}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* SECTION 2 */}
                <section>
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-10 h-10 rounded-full bg-tertiary-container text-tertiary-on-container flex items-center justify-center font-display text-xl">2</div>
                        <h3 className="text-headline-medium font-display">Detailní laboratorní rozbor</h3>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {displayMarkers.map((m, i) => (
                            <div key={i} className="card-filled p-6 flex items-start gap-4 bg-surface-container-low">
                                <Icon name="science" size={28} style={{ color: selectedProfile.color }} />
                                <div>
                                    <div className="text-title-medium font-bold mb-1">{m.name}</div>
                                    <div className="text-body-small opacity-60 mb-2">{m.why}</div>
                                    <p className="text-body-medium opacity-80 leading-snug">{m.youWillSee}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* SECTION 3 */}
                <section>
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-10 h-10 rounded-full bg-primary-container text-primary-on-container flex items-center justify-center font-display text-xl">3</div>
                        <h3 className="text-headline-medium font-display">Lékařský report</h3>
                    </div>
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <p className="text-headline-small leading-relaxed opacity-80">
                                Výsledky přeložíme do <strong>srozumitelné řeči</strong>. Žádná latina, jen jasná doporučení.
                            </p>
                            <ul className="space-y-4">
                                {['Semafor zdraví', 'Grafy trendů', 'Doporučení stravy', 'Sdílení s lékařem'].map((txt, i) => (
                                    <li key={i} className="flex gap-3 font-bold text-title-medium opacity-80 items-center">
                                        <Icon name="check_circle" className="text-primary" /> {txt}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {/* Placeholder UI for report */}
                        <div className="card-outlined p-8 bg-surface-container-low border-dashed">
                            <div className="flex items-center gap-4 mb-6 opacity-50">
                                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xl">92</div>
                                <div className="flex-1 space-y-2">
                                    <div className="h-2 w-1/3 bg-surface-on opacity-20 rounded"></div>
                                    <div className="h-2 w-1/2 bg-surface-on opacity-10 rounded"></div>
                                </div>
                            </div>
                            <div className="space-y-4 opacity-30">
                                <div className="h-8 bg-surface-container-high rounded w-full"></div>
                                <div className="h-8 bg-surface-container-high rounded w-3/4"></div>
                            </div>
                            <div className="mt-8 text-center text-label-small font-bold uppercase tracking-widest opacity-40">Ukázka výstupu</div>
                        </div>
                    </div>
                </section>
            </div>

            {/* FINAL CTA - NO STICKY */}
            <div className="mt-12 text-center">
                <button onClick={onNext} className="btn-primary h-20 px-12 text-2xl shadow-elevation-3 hover:scale-[1.02] transition-transform w-full md:w-auto">
                    Závazně objednat návštěvu
                </button>
                <p className="mt-4 text-body-small opacity-60">Ještě dnes neplatíte. Ozveme se pro termín.</p>
            </div>
        </div>
    );
};
