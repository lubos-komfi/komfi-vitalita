import React, { useEffect } from 'react';
import { Icon } from '../../ui';
import { LAB_COSTS, PHYSICAL_TESTS, COGNITIVE_TESTS } from '../../../data/constants';

export const TestDetailModal = ({ area, isExpanded, whyText, whyVariant, onClose }) => {
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handleEscape);
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = '';
        };
    }, [onClose]);

    if (!area) return null;

    const baseMarkerNames = area.baseMarkers?.map(m => ({
        id: m,
        name: LAB_COSTS[m]?.name || m,
        type: 'base'
    })) || [];

    const baseTestNames = area.tests?.map(t => {
        const test = [...PHYSICAL_TESTS, ...COGNITIVE_TESTS].find(m => m.id === t);
        return { id: t, name: test?.name || t, type: 'base' };
    }) || [];

    const expansionMarkerNames = isExpanded && area.expansion?.markers
        ? area.expansion.markers.map(m => ({
            id: m,
            name: LAB_COSTS[m]?.name || m,
            type: 'expansion'
        }))
        : [];

    const expansionTestNames = isExpanded && area.expansion?.tests
        ? area.expansion.tests.map(t => {
            const test = [...PHYSICAL_TESTS, ...COGNITIVE_TESTS].find(m => m.id === t);
            return { id: t, name: test?.name || t, type: 'expansion' };
        })
        : [];

    const allItems = [...baseMarkerNames, ...baseTestNames, ...expansionMarkerNames, ...expansionTestNames];

    // Split detailDescription into paragraphs
    const paragraphs = (area.detailDescription || area.baseDescription || '').split('\n\n');

    return (
        <div
            className="fixed inset-0 z-[9999] flex items-center justify-center"
            onClick={onClose}
        >
            {/* Overlay - full viewport */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

            {/* Modal */}
            <div
                className="relative bg-white dark:bg-surface rounded-3xl w-[85%] max-w-[850px] max-h-[80vh] overflow-y-auto shadow-2xl animate-fade-in-up"
                onClick={e => e.stopPropagation()}
            >
                {/* Placeholder image - very subtle gray */}
                <div className="relative w-full h-52 bg-[#f5f5f5] dark:bg-surface-container rounded-t-3xl flex items-center justify-center overflow-hidden">
                    <Icon name={area.icon} size={72} className={`${area.color || 'text-surface-on-variant'} opacity-[0.08]`} />
                    {/* Close button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/80 dark:bg-surface/80 backdrop-blur flex items-center justify-center hover:bg-white dark:hover:bg-surface transition-colors shadow-sm"
                    >
                        <Icon name="close" size={18} className="text-surface-on" />
                    </button>
                </div>

                {/* Content - centered with max-width */}
                <div className="px-8 py-8 mx-auto max-w-[600px]">
                    {/* Title */}
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center">
                            <Icon name={area.icon} size={26} className={area.color || 'text-surface-on-variant'} />
                        </div>
                        <div>
                            <h3 className="font-display text-2xl text-surface-on">{area.name}</h3>
                            <span className="text-xs text-surface-on-variant">
                                {allItems.length} {allItems.length === 1 ? 'test' : allItems.length >= 2 && allItems.length <= 4 ? 'testy' : 'testů'}
                            </span>
                        </div>
                    </div>

                    {/* Description paragraphs */}
                    <div className="space-y-4 mb-8">
                        {paragraphs.map((p, i) => (
                            <p key={i} className="text-sm text-surface-on-variant leading-relaxed">{p}</p>
                        ))}
                    </div>

                    {/* AI Why Tag */}
                    {whyText && (
                        <div className="mb-8 p-4 rounded-xl bg-violet-50 dark:bg-violet-900/20 border border-violet-200 dark:border-violet-700/40">
                            <div className="flex items-start gap-2.5">
                                <Icon name="auto_awesome" size={18} className="text-violet-600 dark:text-violet-400 flex-shrink-0 mt-0.5" />
                                <p className="text-sm text-violet-700 dark:text-violet-300 leading-relaxed font-medium">{whyText}</p>
                            </div>
                        </div>
                    )}

                    {/* Markers list */}
                    <div>
                        <h4 className="text-xs uppercase tracking-wider text-surface-on-variant font-bold mb-4">
                            Měřené markery a testy
                        </h4>
                        <div className="space-y-2.5">
                            {allItems.map(item => (
                                <div key={item.id} className="flex items-center gap-2.5 text-sm py-1">
                                    <Icon
                                        name={item.type === 'expansion' ? 'add_circle' : 'check_circle'}
                                        size={18}
                                        className={item.type === 'expansion' ? 'text-primary' : 'text-tertiary'}
                                    />
                                    <span className={item.type === 'expansion' ? 'text-primary font-medium' : 'text-surface-on'}>
                                        {item.name}
                                    </span>
                                    {item.type === 'expansion' && (
                                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary/10 text-primary ml-auto">rozšíření</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
