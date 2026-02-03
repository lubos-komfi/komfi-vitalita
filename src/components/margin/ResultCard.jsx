// src/components/margin/ResultCard.jsx
import React from 'react';
import { Icon } from '../ui';

export const ResultCard = ({ data, selectedFreq }) => {
    const marginPercent = Math.round((data.totalMargin / data.netRevenue) * 100);

    return (
        <div className="rounded-2xl p-6 shadow-xl relative flex flex-col h-full bg-surface-container-low border border-surface-outline-variant">
            <div className="absolute top-0 left-0 w-full h-1.5 rounded-t-2xl" style={{ backgroundColor: data.color }}></div>

            {/* Header */}
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h3 className="text-xl font-display text-surface-on">{data.name}</h3>
                    <div className="text-xs text-surface-on-variant font-bold uppercase">{selectedFreq.label}</div>
                </div>
                <div className="text-right">
                    <div className="text-3xl font-bold text-surface-on">{data.netRevenue.toLocaleString()} Kč</div>
                    {data.discountValue > 0 && <div className="text-[10px] text-tertiary font-bold bg-tertiary-container px-2 py-0.5 rounded-full inline-block">Sleva {Math.round(selectedFreq.discount * 100)}% (-{data.discountValue} Kč)</div>}
                </div>
            </div>

            {/* Summary Box */}
            <div className="mb-6 p-4 rounded-xl bg-surface-container border border-surface-outline-variant">
                <div className="flex justify-between text-sm mb-1 text-surface-on-variant">
                    <span>Náklady ({selectedFreq.multiplier}×)</span>
                    <span>- {data.totalAnnualCost.toLocaleString()} Kč</span>
                </div>
                <div className="h-px bg-surface-outline-variant my-3"></div>
                <div className="flex justify-between items-end">
                    <span className="font-bold text-sm text-surface-on">ČISTÝ ZISK</span>
                    <div className="text-right">
                        <div className={`text-2xl font-bold ${data.totalMargin < 0 ? 'text-error' : 'text-tertiary'}`}>{data.totalMargin.toLocaleString()} Kč</div>
                        <div className="text-xs font-bold text-surface-on-variant">{marginPercent}% marže</div>
                    </div>
                </div>
            </div>

            {/* Bill Details */}
            <div className="space-y-2 text-sm flex-1">
                <div className="text-xs font-bold uppercase tracking-widest text-surface-on-variant mb-2 border-b border-surface-outline-variant pb-2">Rozpad 1 návštěvy</div>

                <div className="flex justify-between items-center text-surface-on-variant">
                    <span className="flex items-center gap-2"><Icon name="directions_car" size={14} /> Provoz (Sestra+Auto)</span>
                    <span>{data.visitOperationalCost} Kč</span>
                </div>

                {data.koItem && (
                    <div className="flex justify-between items-center text-surface-on-variant">
                        <span className="flex items-center gap-2"><Icon name="bloodtype" size={14} /> {data.koItem.name}</span>
                        <span>{data.koItem.price}</span>
                    </div>
                )}

                {data.labItems.map((item, i) => (
                    <div key={i} className={`flex justify-between items-center ${item.isSmart ? 'text-tertiary font-bold' : 'text-surface-on-variant'}`}>
                        <span className="flex items-center gap-2">
                            {item.isSmart && <Icon name="auto_awesome" size={14} />}
                            {item.name}
                        </span>
                        <span>{item.price}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};
