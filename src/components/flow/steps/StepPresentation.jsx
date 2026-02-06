import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Icon } from '../../ui';
import {
    BLOOD_AREAS,
    BODY_AREAS,
    HEAD_AREAS,
    LAB_COSTS,
    PHYSICAL_TESTS,
    COGNITIVE_TESTS,
    TEXT_VARIANTS,
} from '../../../data/constants';
import { TestDetailModal } from '../shared/TestDetailModal';
import { PaymentToggle } from '../shared/PaymentToggle';

const MembershipCheckbox = ({ checked, onChange }) => {
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
        <div className="mb-4">
            <div className="flex items-center gap-3">
                <label className="flex items-center gap-3 cursor-pointer group flex-1">
                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all flex-shrink-0 ${
                        checked
                            ? 'bg-primary border-primary'
                            : 'border-surface-outline-variant group-hover:border-primary'
                    }`}>
                        {checked && (
                            <Icon name="check" size={14} className="text-primary-on" />
                        )}
                    </div>
                    <span className="text-sm text-surface-on">
                        Mám Komfi členství
                        <span className="text-xs ml-1.5 px-1.5 py-0.5 rounded-full bg-tertiary-container text-tertiary-on-container font-medium">-2.5%</span>
                    </span>
                    <input
                        type="checkbox"
                        checked={checked}
                        onChange={(e) => onChange(e.target.checked)}
                        className="sr-only"
                    />
                </label>
                <div className="relative" ref={tooltipRef}>
                    <button
                        onClick={() => setShowTooltip(!showTooltip)}
                        className="w-5 h-5 rounded-full bg-surface-container-high text-surface-on-variant flex items-center justify-center hover:bg-surface-container-highest transition-colors text-xs font-bold"
                    >
                        i
                    </button>
                    {showTooltip && (
                        <div className="absolute bottom-full right-0 mb-2 w-64 p-3 rounded-xl bg-surface-on text-surface text-xs leading-relaxed shadow-xl z-50">
                            Komfi členství je potřeba pro využívání všech Komfi služeb. Pokud už ho máte z jiné služby (např. Bistro), nemusíte nic řešit. Pokud ne, členství vám automaticky aktivujeme s objednávkou.
                            <div className="absolute bottom-0 right-4 translate-y-1/2 rotate-45 w-2 h-2 bg-surface-on" />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const MobileBottomBar = () => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            const scrollBottom = window.innerHeight + window.scrollY;
            const docHeight = document.documentElement.scrollHeight;
            // Hide when near bottom (within 100px)
            setVisible(docHeight - scrollBottom > 100);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToBottom = () => {
        window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
    };

    if (!visible) return null;

    return (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-primary p-3 shadow-2xl z-40">
            <button
                onClick={scrollToBottom}
                className="w-full flex items-center justify-center gap-2 text-primary-on font-bold text-base"
            >
                Objednat
                <Icon name="keyboard_arrow_down" size={20} className="text-primary-on" />
            </button>
        </div>
    );
};

export const StepPresentation = ({
    client,
    textVariant,
    expandedBloodAreas,
    expandedBodyAreas,
    expandedHeadAreas,
    getWhyText,
    expansionReasons,
    pricing,
    paymentOption,
    setPaymentOption,
    hasKomfiMembership,
    setHasKomfiMembership,
    onNext,
}) => {
    const t = TEXT_VARIANTS[textVariant] || TEXT_VARIANTS.self;
    const [modalArea, setModalArea] = useState(null);
    const [modalExpanded, setModalExpanded] = useState(false);

    // Get visible blood areas (respecting gender filter)
    const visibleBloodAreas = BLOOD_AREAS.filter(area => {
        if (area.genderFilter && area.genderFilter !== client.gender) return false;
        return true;
    });

    // Get body areas with included or expanded
    const visibleBodyAreas = BODY_AREAS.filter(area => {
        return area.included || expandedBodyAreas.includes(area.id);
    });

    // Get head areas that are expanded
    const visibleHeadAreas = HEAD_AREAS.filter(area => {
        return expandedHeadAreas.includes(area.id);
    });

    // Count markers for an area
    const getMarkerCount = (area, isExpanded) => {
        let count = (area.baseMarkers?.length || 0) + (area.tests?.length || 0);
        if (isExpanded && area.expansion) {
            count += (area.expansion.markers?.length || 0) + (area.expansion.tests?.length || 0);
        }
        return count;
    };

    // Get WHY variant for styling
    const getWhyVariant = (areaId) => {
        const reason = expansionReasons[areaId];
        if (reason === 'age') return 'age';
        if (reason === 'gender') return 'gender';
        if (reason === 'questionnaire') return 'questionnaire';
        return 'default';
    };

    const openModal = (area, expandedIds) => {
        setModalArea(area);
        setModalExpanded(expandedIds.includes(area.id));
    };

    // Area card component
    const AreaCard = ({ area, expandedIds }) => {
        const isExpanded = expandedIds.includes(area.id);
        const whyText = getWhyText(area.id);
        const markerCount = getMarkerCount(area, isExpanded);

        return (
            <div
                onClick={() => openModal(area, expandedIds)}
                className="p-5 rounded-2xl bg-surface-container-low border border-surface-outline-variant flex flex-col h-full cursor-pointer hover:border-primary/40 hover:shadow-md transition-all"
            >
                {/* Icon + Title row */}
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-14 h-14 rounded-2xl bg-surface-container-high flex items-center justify-center flex-shrink-0">
                        <Icon name={area.icon} size={36} className={area.color || 'text-surface-on-variant'} />
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="font-display text-lg text-surface-on leading-tight">{area.name}</h4>
                            <span className="text-[11px] px-2.5 py-1 rounded-full bg-primary/15 text-primary font-bold whitespace-nowrap flex-shrink-0">
                                {markerCount} {markerCount === 1 ? 'test' : markerCount >= 2 && markerCount <= 4 ? 'testy' : 'testů'}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Description below */}
                <p className="text-xs text-surface-on-variant mb-3 line-clamp-2">{area.baseDescription}</p>

                {/* AI Why Tag - only for expanded areas */}
                {whyText && (
                    <div className="mb-3 p-3 rounded-xl bg-violet-50 dark:bg-violet-900/20 border border-violet-200 dark:border-violet-700/40">
                        <div className="flex items-start gap-2">
                            <Icon name="auto_awesome" size={16} className="text-violet-600 dark:text-violet-400 flex-shrink-0 mt-0.5" />
                            <p className="text-xs text-violet-700 dark:text-violet-300 leading-relaxed font-medium line-clamp-3">{whyText}</p>
                        </div>
                    </div>
                )}

                {/* More info hint - right aligned */}
                <div className="mt-auto pt-3 flex justify-end">
                    <span className="text-xs text-primary font-semibold flex items-center gap-1">
                        Více info <Icon name="arrow_forward" size={14} />
                    </span>
                </div>
            </div>
        );
    };

    // Area section component
    const AreaSection = ({ title, icon, iconColor, areas, expandedIds, bgColor }) => {
        if (areas.length === 0) return null;

        // Sort: non-expanded (shorter) cards first, expanded (taller) last
        const sorted = [...areas].sort((a, b) => {
            const aExp = expandedIds.includes(a.id) ? 1 : 0;
            const bExp = expandedIds.includes(b.id) ? 1 : 0;
            return aExp - bExp;
        });

        return (
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${bgColor}`}>
                        <Icon name={icon} size={20} className={iconColor} />
                    </div>
                    <h3 className="font-display text-xl text-surface-on">{title}</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {sorted.map(area => (
                        <AreaCard key={area.id} area={area} expandedIds={expandedIds} />
                    ))}
                </div>
            </div>
        );
    };

    // Count total tests
    const bloodTestCount = visibleBloodAreas.reduce((sum, area) => sum + getMarkerCount(area, expandedBloodAreas.includes(area.id)), 0);
    const bodyTestCount = visibleBodyAreas.reduce((sum, area) => sum + getMarkerCount(area, expandedBodyAreas.includes(area.id)), 0);
    const headTestCount = visibleHeadAreas.reduce((sum, area) => sum + getMarkerCount(area, expandedHeadAreas.includes(area.id)), 0);
    const totalTestCount = bloodTestCount + bodyTestCount + headTestCount;

    return (
        <div className="max-w-7xl mx-auto px-4 py-4 pb-16 lg:pb-4 animate-fade-in-up">
            <div className="grid lg:grid-cols-5 gap-8">
                {/* Left column - main content (~65%) */}
                <div className="lg:col-span-3">
                    <h2 className="text-4xl font-display mb-2 text-surface-on">
                        {t.resultIntro}
                    </h2>
                    <p className="text-surface-on-variant text-lg mb-8">
                        nabídku na míru — {totalTestCount} testů ve {visibleBloodAreas.length + visibleBodyAreas.length + visibleHeadAreas.length} oblastech
                    </p>

                    {/* Blood */}
                    <AreaSection
                        title="Krevní odběry"
                        icon="bloodtype"
                        iconColor="text-red-500"
                        bgColor="bg-red-100 dark:bg-red-900/30"
                        areas={visibleBloodAreas}
                        expandedIds={expandedBloodAreas}
                    />

                    {/* Body */}
                    <AreaSection
                        title="Tělesné měření"
                        icon="accessibility_new"
                        iconColor="text-teal-500"
                        bgColor="bg-teal-100 dark:bg-teal-900/30"
                        areas={visibleBodyAreas}
                        expandedIds={expandedBodyAreas}
                    />

                    {/* Head */}
                    {visibleHeadAreas.length > 0 && (
                        <AreaSection
                            title="Mentální kondice"
                            icon="psychology"
                            iconColor="text-violet-500"
                            bgColor="bg-violet-100 dark:bg-violet-900/30"
                            areas={visibleHeadAreas}
                            expandedIds={expandedHeadAreas}
                        />
                    )}
                </div>

                {/* Right panel - sticky sidebar (~35%) */}
                <div className="lg:col-span-2">
                    <div className="sticky top-24 p-8 rounded-3xl bg-surface-container-low border border-surface-outline-variant shadow-xl">
                        <h3 className="font-display text-2xl mb-6 text-surface-on">Váš balíček</h3>

                        {/* Category summary cards */}
                        <div className="space-y-4 mb-6 pb-6 border-b border-surface-outline-variant">
                            <div className="p-4 rounded-xl bg-surface-container border border-surface-outline-variant">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Icon name="bloodtype" size={20} className="text-red-500" />
                                        <span className="font-bold text-surface-on">Krevní odběry</span>
                                    </div>
                                    <span className="text-xs px-2 py-0.5 rounded-full bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300">
                                        {bloodTestCount} testů
                                    </span>
                                </div>
                            </div>

                            <div className="p-4 rounded-xl bg-surface-container border border-surface-outline-variant">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Icon name="accessibility_new" size={20} className="text-teal-500" />
                                        <span className="font-bold text-surface-on">Tělesné měření</span>
                                    </div>
                                    <span className="text-xs px-2 py-0.5 rounded-full bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300">
                                        {bodyTestCount} testů
                                    </span>
                                </div>
                            </div>

                            {headTestCount > 0 && (
                                <div className="p-4 rounded-xl bg-primary-container/30 border border-primary/30">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Icon name="psychology" size={20} className="text-violet-500" />
                                            <span className="font-bold text-surface-on">Mentální kondice</span>
                                        </div>
                                        <span className="text-xs px-2 py-0.5 rounded-full bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300">
                                            {headTestCount} testů
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Co je zahrnuto */}
                        <div className="space-y-3 mb-6 pb-6 border-b border-surface-outline-variant text-sm">
                            <h4 className="text-xs uppercase tracking-wider text-surface-on-variant font-bold mb-3">Co je zahrnuto</h4>

                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-lg bg-primary-container flex items-center justify-center flex-shrink-0">
                                    <Icon name="medical_services" size={16} className="text-primary" />
                                </div>
                                <div>
                                    <span className="font-bold text-surface-on">2× návštěvy</span>
                                    <span className="text-surface-on-variant"> zdravotní sestry</span>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0">
                                    <Icon name="bloodtype" size={16} className="text-red-500" />
                                </div>
                                <div>
                                    <span className="font-bold text-surface-on">2× Krevní odběr</span>
                                    <span className="text-surface-on-variant"> s analýzou {bloodTestCount} biomarkerů</span>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-lg bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center flex-shrink-0">
                                    <Icon name="scale" size={16} className="text-teal-500" />
                                </div>
                                <div>
                                    <span className="font-bold text-surface-on">2× Analýza složení těla</span>
                                    <span className="text-surface-on-variant block text-xs">(svalová hmota, viscerální tuk)</span>
                                </div>
                            </div>

                            <div className="border-t border-surface-outline-variant pt-3 mt-3 space-y-3">
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center flex-shrink-0">
                                        <Icon name="auto_awesome" size={16} className="text-violet-500" />
                                    </div>
                                    <div>
                                        <span className="font-bold text-surface-on">AI interpretace výsledků</span>
                                        <span className="text-surface-on-variant block text-xs">Personalizovaná doporučení</span>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                                        <Icon name="trending_up" size={16} className="text-blue-500" />
                                    </div>
                                    <span className="text-surface-on">Sledování vývoje zdraví v čase</span>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center flex-shrink-0">
                                        <Icon name="share" size={16} className="text-amber-500" />
                                    </div>
                                    <span className="text-surface-on">Sdílení zprávy s lékařem</span>
                                </div>

                                {!hasKomfiMembership && (
                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-primary-container flex items-center justify-center flex-shrink-0">
                                            <img src="/img/komfi_icon.svg" alt="" className="w-4 h-4" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
                                            <Icon name="card_membership" size={16} className="text-primary hidden" />
                                        </div>
                                        <div>
                                            <span className="font-bold text-surface-on">Komfi členství zdarma</span>
                                            <span className="text-surface-on-variant block text-xs">v hodnotě 2 108 Kč na první rok</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Komfi membership */}
                        <MembershipCheckbox
                            checked={hasKomfiMembership}
                            onChange={setHasKomfiMembership}
                        />

                        {/* Payment toggle */}
                        <div className="mb-6">
                            <PaymentToggle
                                selected={paymentOption}
                                onSelect={setPaymentOption}
                                upfrontPrice={pricing.upfrontPrice}
                                splitPrice={pricing.splitPrice}
                                savings={pricing.savings}
                            />
                        </div>

                        {/* CTA */}
                        <button
                            onClick={onNext}
                            className="w-full py-4 rounded-xl bg-primary text-primary-on font-bold hover:scale-[1.02] transition-transform shadow-lg text-lg"
                        >
                            Objednat
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile scroll-to-bottom CTA */}
            <MobileBottomBar />

            {/* Test Detail Modal - portal to body for full viewport overlay */}
            {modalArea && createPortal(
                <TestDetailModal
                    area={modalArea}
                    isExpanded={modalExpanded}
                    whyText={getWhyText(modalArea.id)}
                    whyVariant={getWhyVariant(modalArea.id)}
                    onClose={() => setModalArea(null)}
                />,
                document.body
            )}
        </div>
    );
};
