import React from 'react';
import { Icon } from '../../ui';

export const WhyTag = ({ text, variant = 'default' }) => {
    const styles = {
        default: 'bg-surface-container-high text-surface-on-variant',
        questionnaire: 'bg-primary/10 text-primary dark:bg-primary/20',
        age: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
        gender: 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300',
    };

    const icons = {
        default: 'info',
        questionnaire: 'quiz',
        age: 'cake',
        gender: 'wc',
    };

    return (
        <div className={`inline-flex items-start gap-1.5 px-3 py-1.5 rounded-lg text-xs leading-relaxed ${styles[variant] || styles.default}`}>
            <Icon name={icons[variant] || icons.default} size={14} className="flex-shrink-0 mt-0.5" />
            <span>{text}</span>
        </div>
    );
};
