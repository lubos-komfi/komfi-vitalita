import React from 'react';
import { Icon } from '../../ui';

export const OrganCard = ({ area, markerCount, isExpanded, onClick }) => {
    return (
        <button
            onClick={onClick}
            className={`w-full p-4 rounded-xl text-left transition-all ${
                isExpanded
                    ? 'bg-primary-container/30 border border-primary/30'
                    : 'bg-surface-container border border-surface-outline-variant hover:border-primary/50'
            }`}
        >
            <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    isExpanded ? 'bg-primary-container' : 'bg-surface-container-high'
                }`}>
                    <Icon name={area.icon} size={20} className={area.color || 'text-surface-on-variant'} />
                </div>
                <div className="flex-1 min-w-0">
                    <div className="font-bold text-sm text-surface-on truncate">{area.name}</div>
                    <div className="text-xs text-surface-on-variant">
                        {markerCount} {markerCount === 1 ? 'marker' : markerCount >= 2 && markerCount <= 4 ? 'markery' : 'markerů'}
                    </div>
                </div>
                <Icon name="chevron_right" size={18} className="text-surface-on-variant flex-shrink-0" />
            </div>
        </button>
    );
};
