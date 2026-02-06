import React, { useState, useRef, useEffect } from 'react';
import { Icon } from '../../ui';
import { PAYMENT_OPTIONS } from '../../../data/constants';

export const PaymentToggle = ({ selected, onSelect, upfrontPrice, splitPrice, savings }) => {
    const [showTooltip, setShowTooltip] = useState(false);
    const tooltipRef = useRef(null);

    useEffect(() => {
        if (!showTooltip) return;
        const handleClick = (e) => {
            if (tooltipRef.current && !tooltipRef.current.contains(e.target)) {
                setShowTooltip(false);
            }
        };
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, [showTooltip]);

    return (
        <div className="space-y-3">
            <div className="flex p-1 rounded-xl bg-surface-container-high">
                <button
                    onClick={() => onSelect(PAYMENT_OPTIONS.upfront)}
                    className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                        selected.id === 'upfront'
                            ? 'bg-surface text-primary shadow-sm'
                            : 'text-surface-on-variant'
                    }`}
                >
                    Najednou
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-tertiary-container text-tertiary-on-container">-5%</span>
                </button>
                <button
                    onClick={() => onSelect(PAYMENT_OPTIONS.split)}
                    className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all ${
                        selected.id === 'split'
                            ? 'bg-surface text-primary shadow-sm'
                            : 'text-surface-on-variant'
                    }`}
                >
                    2 splátky
                </button>
            </div>

            {selected.id === 'upfront' ? (
                <div className="text-center">
                    <div className="flex items-center justify-center gap-1.5">
                        <span className="text-3xl font-display text-primary">{upfrontPrice.toLocaleString('cs-CZ')} Kč</span>
                        <div className="relative" ref={tooltipRef}>
                            <button
                                onClick={() => setShowTooltip(!showTooltip)}
                                className="w-5 h-5 rounded-full bg-surface-container-high text-surface-on-variant flex items-center justify-center hover:bg-surface-container-highest transition-colors text-xs font-bold"
                            >
                                i
                            </button>
                            {showTooltip && (
                                <div className="absolute bottom-full right-0 mb-2 w-64 p-3 rounded-xl bg-surface-on text-surface text-xs leading-relaxed shadow-xl z-50">
                                    Cena vychází z vašeho osobního profilu — zohledňujeme věk, pohlaví i vaše odpovědi v dotazníku. Na základě těchto údajů vybíráme právě ty markery a testy, které jsou pro vás nejrelevantnější. Platíte jen za to, co má pro vaše zdraví skutečný přínos.
                                    <div className="absolute bottom-0 right-4 translate-y-1/2 rotate-45 w-2 h-2 bg-surface-on" />
                                </div>
                            )}
                        </div>
                    </div>
                    {savings > 0 && (
                        <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-tertiary-container text-tertiary-on-container text-sm font-bold">
                            <Icon name="savings" size={16} />
                            Ušetříte {savings.toLocaleString('cs-CZ')} Kč
                        </div>
                    )}
                </div>
            ) : (
                <div className="text-center">
                    <div className="flex items-center justify-center gap-1.5">
                        <span className="text-3xl font-display text-primary">2× {splitPrice.toLocaleString('cs-CZ')} Kč</span>
                        <div className="relative" ref={tooltipRef}>
                            <button
                                onClick={() => setShowTooltip(!showTooltip)}
                                className="w-5 h-5 rounded-full bg-surface-container-high text-surface-on-variant flex items-center justify-center hover:bg-surface-container-highest transition-colors text-xs font-bold"
                            >
                                i
                            </button>
                            {showTooltip && (
                                <div className="absolute bottom-full right-0 mb-2 w-64 p-3 rounded-xl bg-surface-on text-surface text-xs leading-relaxed shadow-xl z-50">
                                    Cena vychází z vašeho osobního profilu — zohledňujeme věk, pohlaví i vaše odpovědi v dotazníku. Na základě těchto údajů vybíráme právě ty markery a testy, které jsou pro vás nejrelevantnější. Platíte jen za to, co má pro vaše zdraví skutečný přínos.
                                    <div className="absolute bottom-0 right-4 translate-y-1/2 rotate-45 w-2 h-2 bg-surface-on" />
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="text-xs text-surface-on-variant mt-1">
                        Celkem {(splitPrice * 2).toLocaleString('cs-CZ')} Kč
                    </div>
                </div>
            )}
        </div>
    );
};
