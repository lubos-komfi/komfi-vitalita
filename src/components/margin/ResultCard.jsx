import React from 'react';
import { Icon } from '../ui';
import { LABS } from '../../data/constants';

export const ResultCard = ({ results }) => {
  const {
    visitPriceWithVat,
    visitNetRevenue,
    visitGrossProfit,
    
    frequency,
    annualPriceWithVat,
    annualNetRevenue,
    annualGrossProfit,
    annualMarginPercent,
    
    items,
    visitLabCost,
    visitServiceCost,
    vatRate,
    selectedLabId
  } = results;

  const currentLab = LABS.find(l => l.id === selectedLabId) || LABS[0];

  const getMarginColor = (m) => {
    if (m >= 40) return 'text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400';
    if (m >= 25) return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-400';
    return 'text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400';
  };

  return (
    <div className="bg-surface-container-low rounded-2xl border border-surface-outline-variant/60 overflow-hidden shadow-xl sticky top-6">
      {/* Annual Summary Header */}
      <div className="p-6 border-b border-surface-outline-variant bg-surface-container">
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
                <h2 className="text-2xl font-display font-bold text-surface-on">Roční Výhled</h2>
                <span className="bg-tertiary/10 text-tertiary text-xs px-2 py-0.5 rounded font-medium border border-tertiary/20">
                    {frequency.label}
                </span>
            </div>
            <p className="text-sm text-surface-on-variant">Ekonomika klienta po odečtení DPH ({vatRate}%)</p>
          </div>
          <div className={`px-3 py-1 rounded-full text-sm font-bold ${getMarginColor(annualMarginPercent)}`}>
            Marže {annualMarginPercent.toFixed(1)} %
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
            <div className="bg-surface rounded-xl p-3 border border-surface-outline-variant/50 relative overflow-hidden group">
                <div className="text-[10px] uppercase text-surface-on-variant font-bold tracking-wider relative z-10">Roční Obrat (s DPH)</div>
                <div className="text-2xl font-bold text-primary relative z-10">{annualPriceWithVat.toLocaleString()} Kč</div>
                <div className="text-[10px] text-surface-on-variant relative z-10 mt-1 font-mono">
                    Netto: {Math.round(annualNetRevenue).toLocaleString()} Kč
                </div>
                <Icon name="payments" size={64} className="absolute -right-4 -bottom-4 text-primary/5 z-0 group-hover:text-primary/10 transition-colors" />
            </div>
            <div className="bg-surface rounded-xl p-3 border border-surface-outline-variant/50 relative overflow-hidden group">
                <div className="text-[10px] uppercase text-surface-on-variant font-bold tracking-wider relative z-10">Roční Hrubý Zisk</div>
                <div className="text-2xl font-bold text-tertiary relative z-10">{Math.round(annualGrossProfit).toLocaleString()} Kč</div>
                <div className="text-[10px] text-surface-on-variant relative z-10 mt-1 font-mono">
                    Marže z Netto tržby
                </div>
                <Icon name="trending_up" size={64} className="absolute -right-4 -bottom-4 text-tertiary/5 z-0 group-hover:text-tertiary/10 transition-colors" />
            </div>
        </div>
      </div>

      {/* Per Visit Breakdown */}
      <div className="bg-surface-container-high/30 p-3 border-b border-surface-outline-variant/50 flex justify-between items-center text-xs px-6">
          <span className="text-surface-on-variant font-medium uppercase tracking-wide">Ekonomika 1 návštěvy</span>
          <div className="flex gap-4">
              <span className="text-surface-on">Cena s DPH: <b className="text-primary">{visitPriceWithVat.toLocaleString()}</b></span>
              <span className="text-surface-on">Netto Zisk: <b className="text-tertiary">{Math.round(visitGrossProfit).toLocaleString()}</b></span>
          </div>
      </div>

      {/* Breakdown List */}
      <div className="p-4 max-h-[400px] overflow-y-auto">
        <h3 className="text-xs font-bold text-surface-on-variant uppercase mb-3 px-2 flex justify-between">
            <span>Položky (1 návštěva)</span>
            <span className="text-[9px] font-normal lowercase italic">Zdroj nákladů: {currentLab.name}</span>
        </h3>
        
        {/* Fixed Costs Row */}
        <div className="flex justify-between items-center py-2 px-2 border-b border-dashed border-surface-outline-variant/50 text-xs">
            <span className="text-surface-on font-medium">Fixní náklady (Odběr + Logistika)</span>
            <span className="text-error font-mono">- {visitServiceCost.toLocaleString()} Kč</span>
        </div>

        {items.map((item, idx) => (
          <div key={idx} className="flex justify-between items-center py-2 px-2 border-b border-surface-outline-variant/30 text-sm group hover:bg-surface-container-high/50 rounded transition-colors">
            <div className="flex items-center gap-2">
               {item.type === 'expansion' && <Icon name="add" size={12} className="text-tertiary" /> }
               <span className={item.type === 'base' ? 'font-medium text-surface-on' : 'text-surface-on-variant'}>
                 {item.name}
               </span>
            </div>
            <div className="text-right">
               <div className="font-mono text-surface-on">{item.price > 0 ? `+${item.price}` : '0'} Kč</div>
               <div className="text-[10px] text-surface-on-variant/60 font-mono flex flex-col items-end">
                 <span>Netto: {Math.round(item.netPrice)}</span>
                 <span className="flex items-center gap-1">
                    Náklad ({currentLab.name}): <b>{item.cost}</b>
                 </span>
               </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Totals */}
      <div className="p-4 bg-surface-container border-t border-surface-outline-variant text-xs space-y-2">
         <div className="flex justify-between text-surface-on-variant">
            <span>Celkové náklady Lab ({currentLab.name})</span>
            <span>{visitLabCost.toLocaleString()} Kč</span>
         </div>
         <div className="flex justify-between text-surface-on-variant">
            <span>Celkové náklady Služba (1x)</span>
            <span>{visitServiceCost.toLocaleString()} Kč</span>
         </div>
         <div className="flex justify-between text-surface-on font-bold pt-2 border-t border-surface-outline-variant/30">
            <span>Celkové náklady (SUM)</span>
            <span>{(visitLabCost + visitServiceCost).toLocaleString()} Kč</span>
         </div>
      </div>
    </div>
  );
};