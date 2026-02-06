import { useMemo } from 'react';
import {
    SERVICE_FEE,
    BLOOD_AREAS,
    BODY_AREAS,
    HEAD_AREAS,
} from '../data/constants';

export const usePricing = (client, expandedBloodAreas, expandedBodyAreas, expandedHeadAreas, paymentOption, hasKomfiMembership) => {
    const FREQUENCY_MULTIPLIER = 2; // Fixed 2x/year

    const calculateBloodPrice = () => {
        let total = 0;
        BLOOD_AREAS.forEach(area => {
            if (area.genderFilter && area.genderFilter !== client.gender) return;
            total += (area.price || 0);
            if (expandedBloodAreas.includes(area.id) && area.expansion) {
                total += (area.expansion.price || 0);
            }
        });
        return Math.round(total);
    };

    const calculateBodyPrice = () => {
        let total = 0;
        BODY_AREAS.forEach(area => {
            if (area.included) {
                total += (area.price || 0);
            }
            if (expandedBodyAreas.includes(area.id) && area.expansion) {
                total += (area.expansion.price || 0);
            }
        });
        return Math.round(total);
    };

    const calculateHeadPrice = () => {
        let total = 0;
        HEAD_AREAS.forEach(area => {
            if (expandedHeadAreas.includes(area.id) && area.expansion) {
                total += (area.expansion.price || 0);
            }
        });
        return Math.round(total);
    };

    const roundTo10 = (n) => Math.round(n / 10) * 10;

    const pricing = useMemo(() => {
        const bloodPrice = calculateBloodPrice();
        const bodyPrice = calculateBodyPrice();
        const headPrice = calculateHeadPrice();
        const singleVisitPrice = SERVICE_FEE + bloodPrice + bodyPrice + headPrice;
        const yearlyBase = roundTo10(singleVisitPrice * FREQUENCY_MULTIPLIER);

        const membershipDiscount = hasKomfiMembership ? 0.025 : 0;
        const upfrontDiscount = 0.05;
        const totalDiscount = paymentOption.id === 'upfront' ? upfrontDiscount + membershipDiscount : membershipDiscount;

        const discountedPrice = roundTo10(yearlyBase * (1 - totalDiscount));
        const upfrontPrice = roundTo10(yearlyBase * (1 - upfrontDiscount - membershipDiscount));
        const savings = yearlyBase - discountedPrice;
        const splitBase = hasKomfiMembership ? roundTo10(yearlyBase * (1 - membershipDiscount)) : yearlyBase;
        const splitPrice = roundTo10(splitBase / 2);

        const totalPrice = discountedPrice;

        return {
            bloodPrice,
            bodyPrice,
            headPrice,
            singleVisitPrice,
            yearlyBase,
            upfrontPrice,
            splitPrice,
            savings,
            totalPrice,
            totalDiscount,
            frequencyMultiplier: FREQUENCY_MULTIPLIER,
        };
    }, [client.gender, expandedBloodAreas, expandedBodyAreas, expandedHeadAreas, paymentOption, hasKomfiMembership]);

    return pricing;
};
