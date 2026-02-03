// src/hooks/useMarginCalculator.js
import { useState } from 'react';
import { LAB_COSTS, PROFILES_SPEC, FREQUENCIES } from '../data/constants';

export const useMarginCalculator = () => {
    const [age, setAge] = useState(50);
    const [gender, setGender] = useState('female');
    const [selectedFreqId, setSelectedFreqId] = useState('1x');
    const [nurseCost, setNurseCost] = useState(200);
    const [transportCost, setTransportCost] = useState(75);

    const selectedFreq = FREQUENCIES.find(f => f.id === selectedFreqId) || FREQUENCIES[0];

    const getAddons = (age, gender) => {
        const addons = [];
        if (gender === 'female') {
            if (age >= 18 && age <= 39) { addons.push('zeleo'); addons.push('tsh'); }
            if (age >= 40) addons.push('kosti');
            if (age >= 55) addons.push('gluk');
        }
        if (gender === 'male') {
            if (age >= 18 && age <= 39) addons.push('jatra_full');
            if (age >= 40 && age <= 50) addons.push('lipid');
            if (age >= 50) addons.push('psa');
            if (age >= 60) addons.push('homocystein');
        }
        return addons;
    };

    const calculateProfile = (profileKey) => {
        const profile = PROFILES_SPEC[profileKey];
        if (!profile) return null;

        const addonsKeys = getAddons(age, gender);
        const allKeys = [...new Set([...profile.base, ...addonsKeys])];

        const allLabItems = allKeys.map(key => {
            const isSmart = !profile.base.includes(key);
            const costItem = LAB_COSTS[key] || { name: key, price: 0 };
            return { ...costItem, id: key, isSmart };
        }).filter(item => item.name);

        // Separate KO + Diff
        const koItem = allLabItems.find(item => item.id === 'ko');
        const labItems = allLabItems.filter(item => item.id !== 'ko');

        const labCostSingle = allLabItems.reduce((sum, item) => sum + item.price, 0);
        const visitOperationalCost = nurseCost + transportCost;
        const totalCostSingle = labCostSingle + visitOperationalCost;
        const totalAnnualCost = totalCostSingle * selectedFreq.multiplier;

        const grossRevenue = profile.price * selectedFreq.multiplier;
        const discountValue = Math.round(grossRevenue * selectedFreq.discount);
        const netRevenue = grossRevenue - discountValue;
        const totalMargin = netRevenue - totalAnnualCost;

        return { ...profile, labItems, koItem, totalAnnualCost, netRevenue, discountValue, totalMargin, visitOperationalCost };
    };

    return {
        age, setAge,
        gender, setGender,
        selectedFreqId, setSelectedFreqId,
        nurseCost, setNurseCost,
        transportCost, setTransportCost,
        selectedFreq,
        calculateProfile,
    };
};
