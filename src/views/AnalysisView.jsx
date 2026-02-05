// src/views/AnalysisView.jsx
import React from 'react';
import { Icon } from '../components/ui';
import { LAB_COSTS, LABS } from '../data/constants';

export const AnalysisView = () => {
    // Seznam všech markerů pro srovnání
    const markerIds = Object.keys(LAB_COSTS);

    return (
        <div className="max-w-6xl mx-auto px-4 py-12 animate-fade-in-up">
            <h2 className="text-4xl font-display mb-12 text-center text-surface-on">Analýza a Srovnání Laboratoří</h2>
            
            {/* 1. Lab Comparison Table */}
            <div className="p-8 rounded-3xl bg-surface-container-low border border-surface-outline-variant shadow-lg mb-12 overflow-hidden flex flex-col">
                <div className="flex items-center justify-between mb-6 flex-shrink-0">
                    <h3 className="text-2xl font-display text-primary flex items-center gap-3">
                        <Icon name="biotech" size={28} />
                        Srovnání nákladových cen (Kč)
                    </h3>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-tertiary/10 border border-tertiary/20 text-tertiary text-xs font-bold">
                        <Icon name="check_circle" size={14} />
                        Nejlepší nabídka zvýrazněna
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-surface-outline-variant">
                                <th className="py-4 px-4 text-xs font-bold uppercase tracking-wider text-surface-on-variant bg-surface-container-low sticky top-0 z-30">Biomarker</th>
                                {LABS.map(lab => (
                                    <th key={lab.id} className="py-4 px-4 text-xs font-bold uppercase tracking-wider text-center bg-surface-container-low sticky top-0 z-30">
                                        <div className={`inline-block px-2 py-1 rounded-md ${lab.color.split(' ')[0]} ${lab.color.split(' ')[1]}`}>
                                            {lab.name}
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-surface-outline-variant/30">
                            {markerIds.map(mId => {
                                const marker = LAB_COSTS[mId];
                                const prices = marker.prices;
                                // Najít nejlevnější
                                const validPrices = Object.values(prices).filter(p => p > 0);
                                const minPrice = validPrices.length > 0 ? Math.min(...validPrices) : 0;

                                return (
                                    <tr key={mId} className="hover:bg-surface-container transition-colors">
                                        <td className="py-3 px-4 border-r border-surface-outline-variant/30 sticky left-0 bg-surface-container-low z-10">
                                            <div className="font-bold text-sm text-surface-on">{marker.name}</div>
                                            <div className="text-[10px] text-surface-on-variant font-mono uppercase">{mId}</div>
                                        </td>
                                        {LABS.map(lab => {
                                            const price = prices[lab.id] || 0;
                                            const isBest = price > 0 && price === minPrice;
                                            return (
                                                <td key={lab.id} className="py-3 px-4 text-center">
                                                    {price > 0 ? (
                                                        <div className={`inline-flex items-center justify-center gap-1 px-3 py-1 rounded-full transition-all ${
                                                            isBest 
                                                            ? 'bg-tertiary/15 text-tertiary font-bold ring-1 ring-tertiary/30' 
                                                            : 'text-surface-on-variant font-mono'
                                                        }`}>
                                                            {isBest && <Icon name="check" size={14} />}
                                                            <span className="text-sm">{price} Kč</span>
                                                        </div>
                                                    ) : (
                                                        <span className="text-surface-outline">—</span>
                                                    )}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                <div className="mt-6 p-4 bg-surface-container rounded-xl border border-dashed border-surface-outline-variant flex-shrink-0">
                    <p className="text-xs text-surface-on-variant leading-relaxed italic">
                        * Data vycházejí z historických nabídek uložených v Notionu. Zelené zvýraznění s fajfkou značí <b>nejlepší nabídku</b> pro daný marker, kterou systém automaticky vybírá pro simulaci zisku.
                    </p>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* 2. Strategy Logic */}
                <div className="p-8 rounded-3xl bg-surface-container-low border border-surface-outline-variant shadow-lg">
                    <h3 className="text-2xl font-display mb-4 text-primary">Problém vs. Řešení</h3>
                    <p className="text-surface-on-variant mb-4">Původní statické balíčky nutily klienta rozumět medicíně. Nový model "Smart Screening" přenáší tuto odpovědnost na systém.</p>
                    <ul className="space-y-3 font-bold text-sm text-surface-on">
                        <li className="flex gap-2"><Icon name="check" className="text-tertiary" /> Odstranění rozhodovací paralýzy</li>
                        <li className="flex gap-2"><Icon name="check" className="text-tertiary" /> Zvýšení vnímané hodnoty (Bonusy zdarma)</li>
                        <li className="flex gap-2"><Icon name="check" className="text-tertiary" /> Medicínská relevance (Age-based)</li>
                    </ul>
                </div>

                {/* 3. Economic Analysis */}
                <div className="p-8 rounded-3xl bg-surface-container-low border border-surface-outline-variant shadow-lg">
                    <h3 className="text-2xl font-display mb-4 text-primary">Ekonomická logika</h3>
                    <p className="text-surface-on-variant mb-4">Díky využití CityLab nabídky můžeme dramaticky snížit variabilní náklady na krevní testy a investovat marži do "Sestry doma".</p>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center p-3 bg-surface rounded-xl border border-surface-outline-variant">
                            <span className="text-sm font-medium">Průměrný náklad na krev (CityLab)</span>
                            <span className="font-bold text-tertiary">~450 Kč</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-surface rounded-xl border border-surface-outline-variant">
                            <span className="text-sm font-medium">Průměrný náklad na krev (EUC)</span>
                            <span className="font-bold text-red-500">~680 Kč</span>
                        </div>
                        <p className="text-xs text-surface-on-variant mt-2 italic">
                            Rozdíl 230 Kč na jedné návštěvě pokrývá téměř celé náklady na dopravu a čas sestry.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
