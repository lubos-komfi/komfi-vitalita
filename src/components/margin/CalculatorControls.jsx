// src/components/margin/CalculatorControls.jsx
import React from 'react';
import { Icon } from '../ui';
import { FREQUENCIES } from '../../data/constants';

export const CalculatorControls = ({
    age, setAge,
    gender, setGender,
    selectedFreqId, setSelectedFreqId,
    nurseCost, setNurseCost,
    transportCost, setTransportCost
}) => {
    return (
        <div className="bg-surface-container-low p-6 rounded-3xl shadow-lg border border-surface-outline-variant mb-12">
            <div className="grid md:grid-cols-2 gap-8">
                {/* User Inputs */}
                <div className="space-y-6">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-surface-on-variant">1. Klient & Program</h3>
                    <div className="flex gap-4">
                        <div className="flex p-1 rounded-xl bg-surface-container-high flex-1">
                            <button onClick={() => setGender('female')} className={`flex-1 py-3 rounded-lg font-bold transition-all flex items-center justify-center gap-2 ${gender === 'female' ? 'bg-surface text-error shadow-sm' : 'text-surface-on-variant'}`}><Icon name="female" /> Žena</button>
                            <button onClick={() => setGender('male')} className={`flex-1 py-3 rounded-lg font-bold transition-all flex items-center justify-center gap-2 ${gender === 'male' ? 'bg-surface text-secondary shadow-sm' : 'text-surface-on-variant'}`}><Icon name="male" /> Muž</button>
                        </div>
                        <div className="flex p-1 rounded-xl bg-surface-container-high flex-1">
                            {FREQUENCIES.map(f => (
                                <button key={f.id} onClick={() => setSelectedFreqId(f.id)} className={`flex-1 py-3 rounded-lg font-bold transition-all ${selectedFreqId === f.id ? 'bg-surface text-primary shadow-sm' : 'text-surface-on-variant'}`}>{f.label}</button>
                            ))}
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between mb-2 font-bold"><span className="text-surface-on-variant">Věk</span><span className="text-surface-on">{age} let</span></div>
                        <input type="range" min="18" max="90" value={age} onChange={e => setAge(parseInt(e.target.value))} className="w-full h-2 bg-surface-container-high rounded-lg appearance-none cursor-pointer accent-primary" />
                    </div>
                </div>

                {/* Costs Inputs */}
                <div className="space-y-6">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-surface-on-variant">2. Provozní náklady (Variable)</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold mb-2 text-surface-on-variant">Cena sestry (1 návštěva)</label>
                            <div className="flex items-center bg-surface-container-high rounded-xl px-4 py-3">
                                <input type="number" value={nurseCost} onChange={e => setNurseCost(Number(e.target.value))} className="bg-transparent w-full font-bold outline-none text-right text-surface-on" />
                                <span className="ml-2 text-sm text-surface-on-variant">Kč</span>
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-bold mb-2 text-surface-on-variant">Palivo/Doprava/Režie</label>
                            <div className="flex items-center bg-surface-container-high rounded-xl px-4 py-3">
                                <input type="number" value={transportCost} onChange={e => setTransportCost(Number(e.target.value))} className="bg-transparent w-full font-bold outline-none text-right text-surface-on" />
                                <span className="ml-2 text-sm text-surface-on-variant">Kč</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
