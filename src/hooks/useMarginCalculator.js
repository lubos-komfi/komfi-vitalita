import { useState, useMemo } from 'react';
import { LAB_COSTS, BLOOD_AREAS, BODY_AREAS, HEAD_AREAS, SERVICE_FEE, FREQUENCIES } from '../data/constants';

// Updated defaults: Nurse total fee = 300 CZK
const DEFAULT_SETTINGS = {
  serviceFee: SERVICE_FEE, // Logistics/Travel Income (300 Kč)
  nurseCost: 150,          // Base nurse fee for the visit/draw
  logisticsCost: 0,
  vatRate: 21,
};

export const useMarginCalculator = () => {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [frequencyId, setFrequencyId] = useState('1x');
  const [selectedLabId, setSelectedLabId] = useState('citylab'); // Default to CityLab
  const [activeBaseModules, setActiveBaseModules] = useState({});
  const [activeExpansionModules, setActiveExpansionModules] = useState({});

  const applyScenario = (scenario) => {
    const newBase = {};
    const newExpansion = {};

    const shouldInclude = (area) => {
      if (scenario.customLogic) return scenario.customLogic(area);
      if (area.genderFilter && area.genderFilter !== scenario.gender) return false;
      if (area.ageMin && scenario.age < area.ageMin) return false;
      return true;
    };

    const shouldExpand = (area) => {
      if (!area.expansion) return false;
      if (scenario.expandLogic) return scenario.expandLogic(area);
      if (scenario.customLogic) return !!scenario.expandAll;
      if (scenario.expandAll) return true;
      if (area.expansion.autoExpandForAge && scenario.age >= area.expansion.autoExpandForAge) return true;
      if (area.expansion.autoExpandForGender && area.expansion.autoExpandForGender === scenario.gender) return true;
      return false;
    };

    BLOOD_AREAS.forEach(area => {
      if (shouldInclude(area)) {
        newBase[area.id] = true;
        if (shouldExpand(area)) newExpansion[area.id] = true;
      }
    });

    BODY_AREAS.filter(a => !a.hidden).forEach(area => {
       if (shouldInclude(area)) {
         newBase[area.id] = true;
         if (shouldExpand(area)) newExpansion[area.id] = true;
       }
    });

    HEAD_AREAS.filter(a => !a.hidden).forEach(area => {
      if (shouldInclude(area)) {
        newBase[area.id] = true; 
        if (shouldExpand(area)) newExpansion[area.id] = true;
      }
    });

    setActiveBaseModules(newBase);
    setActiveExpansionModules(newExpansion);
  };

  const toggleBase = (id) => {
    setActiveBaseModules(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
    if (activeBaseModules[id]) {
      setActiveExpansionModules(prev => ({ ...prev, [id]: false }));
    }
  };

  const toggleExpansion = (id) => {
    setActiveExpansionModules(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
    if (!activeExpansionModules[id]) {
      setActiveBaseModules(prev => ({ ...prev, [id]: true }));
    }
  };

  const results = useMemo(() => {
    let visitPriceWithVat = settings.serviceFee;
    let visitLabCost = 0;
    let visitServiceCost = settings.nurseCost + settings.logisticsCost;
    let items = [];

    const vatMultiplier = 1 + (settings.vatRate / 100);

    // Helper: Calculate lab cost dynamically based on selected lab
    const calcDynamicLabCost = (markers = []) => {
        return markers.reduce((sum, mId) => {
            const prices = LAB_COSTS[mId]?.prices || {};
            // Fallback order: selected -> citylab -> euc -> 0
            const cost = prices[selectedLabId] || prices['citylab'] || prices['euc'] || 0;
            return sum + cost;
        }, 0);
    };

    const processArea = (area, type) => {
      const isBaseActive = activeBaseModules[area.id];
      const isExpansionActive = activeExpansionModules[area.id];

      if (isBaseActive) {
        const basePrice = area.price || 0;
        // If blood, calculate cost dynamically. If service, use fixed cost from constants.
        const baseCost = type === 'blood' ? calcDynamicLabCost(area.baseMarkers) : (area.cost || 0);
        
        visitPriceWithVat += basePrice;
        
        if (type === 'blood') {
            visitLabCost += baseCost;
        } else {
            visitServiceCost += baseCost;
        }

        const netItemPrice = basePrice / vatMultiplier;

        items.push({
          id: `${area.id}_base`,
          name: area.name,
          type: 'base',
          price: basePrice, 
          netPrice: netItemPrice,
          cost: baseCost,
          margin: netItemPrice - baseCost
        });
      }

      if (isExpansionActive && area.expansion) {
        const expPrice = area.expansion.price || 0;
        // Dynamic cost for blood expansion
        const expCost = type === 'blood' ? calcDynamicLabCost(area.expansion.markers) : (area.expansion.cost || 0);

        visitPriceWithVat += expPrice;
        if (type === 'blood') {
            visitLabCost += expCost;
        } else {
            visitServiceCost += expCost;
        }

        const netItemPrice = expPrice / vatMultiplier;

        items.push({
          id: `${area.id}_exp`,
          name: `+ ${area.expansion.name}`,
          type: 'expansion',
          price: expPrice,
          netPrice: netItemPrice,
          cost: expCost,
          margin: netItemPrice - expCost
        });
      }
    };

    BLOOD_AREAS.forEach(a => processArea(a, 'blood'));
    BODY_AREAS.filter(a => !a.hidden).forEach(a => processArea(a, 'body'));
    HEAD_AREAS.filter(a => !a.hidden).forEach(a => processArea(a, 'head'));

    // Financials
    const visitNetRevenue = visitPriceWithVat / vatMultiplier; 
    const visitVatAmount = visitPriceWithVat - visitNetRevenue; 
    const visitTotalCost = visitLabCost + visitServiceCost;
    const visitGrossProfit = visitNetRevenue - visitTotalCost; 

    // Annual Calculation
    const freqSpec = FREQUENCIES.find(f => f.id === frequencyId) || FREQUENCIES[0];
    const annualPriceRaw = visitPriceWithVat * freqSpec.multiplier;
    const annualPriceWithVat = annualPriceRaw * (1 - freqSpec.discount);
    const annualNetRevenue = annualPriceWithVat / vatMultiplier;
    const annualVatAmount = annualPriceWithVat - annualNetRevenue;
    const annualCost = visitTotalCost * freqSpec.multiplier;
    const annualGrossProfit = annualNetRevenue - annualCost;
    const annualMarginPercent = annualNetRevenue > 0 ? (annualGrossProfit / annualNetRevenue) * 100 : 0;

    return {
      visitPriceWithVat,
      visitNetRevenue,
      visitVatAmount,
      visitTotalCost,
      visitLabCost,
      visitServiceCost,
      visitGrossProfit,
      frequency: freqSpec,
      annualPriceWithVat,
      annualNetRevenue,
      annualVatAmount,
      annualCost,
      annualGrossProfit,
      annualMarginPercent,
      items,
      vatRate: settings.vatRate,
      selectedLabId // Export selected lab for labeling
    };
  }, [settings, activeBaseModules, activeExpansionModules, frequencyId, selectedLabId]);

  return {
    settings,
    setSettings,
    frequencyId,
    setFrequencyId,
    selectedLabId,
    setSelectedLabId,
    activeBaseModules,
    activeExpansionModules,
    toggleBase,
    toggleExpansion,
    applyScenario,
    results
  };
};