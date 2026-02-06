import { useState, useEffect } from 'react';
import {
    BLOOD_AREAS,
    BODY_AREAS,
    HEAD_AREAS,
    MODULE_TO_AREA_MAP,
    HEALTH_CATEGORIES,
    LAB_COSTS,
    PHYSICAL_TESTS,
    COGNITIVE_TESTS,
} from '../data/constants';

export const useTestRecommendation = (client) => {
    const [expandedBloodAreas, setExpandedBloodAreas] = useState([]);
    const [expandedBodyAreas, setExpandedBodyAreas] = useState([]);
    const [expandedHeadAreas, setExpandedHeadAreas] = useState([]);
    // Track WHY each area was expanded: { areaId: 'age' | 'gender' | 'questionnaire' | 'base' }
    const [expansionReasons, setExpansionReasons] = useState({});

    // Auto-expand based on age/gender
    useEffect(() => {
        if (client.dynamicMarkers) {
            const reasons = {};

            const autoExpandedBlood = BLOOD_AREAS
                .filter(area => {
                    if (!area.expansion) return false;
                    if (area.expansion.autoExpandForAge && client.age >= area.expansion.autoExpandForAge) {
                        reasons[area.id] = 'age';
                        return true;
                    }
                    if (area.expansion.autoExpandForGender && area.expansion.autoExpandForGender === client.gender) {
                        reasons[area.id] = 'gender';
                        return true;
                    }
                    return false;
                })
                .map(area => area.id);

            const autoExpandedBody = BODY_AREAS
                .filter(area => {
                    if (!area.expansion) return false;
                    if (area.expansion.autoExpandForAge && client.age >= area.expansion.autoExpandForAge) {
                        reasons[area.id] = 'age';
                        return true;
                    }
                    if (area.expansion.autoExpandForGender && area.expansion.autoExpandForGender === client.gender) {
                        reasons[area.id] = 'gender';
                        return true;
                    }
                    return false;
                })
                .map(area => area.id);

            const autoExpandedHead = HEAD_AREAS
                .filter(area => {
                    if (!area.expansion) return false;
                    if (area.expansion.autoExpandForAge && client.age >= area.expansion.autoExpandForAge) {
                        reasons[area.id] = 'age';
                        return true;
                    }
                    if (area.expansion.autoExpandForGender && area.expansion.autoExpandForGender === client.gender) {
                        reasons[area.id] = 'gender';
                        return true;
                    }
                    return false;
                })
                .map(area => area.id);

            setExpandedBloodAreas(prev => [...new Set([...prev, ...autoExpandedBlood])]);
            setExpandedBodyAreas(prev => [...new Set([...prev, ...autoExpandedBody])]);
            setExpandedHeadAreas(prev => [...new Set([...prev, ...autoExpandedHead])]);
            setExpansionReasons(prev => ({ ...prev, ...reasons }));
        }
    }, [client.dynamicMarkers, client.age, client.gender]);

    // Process questionnaire answers → expand appropriate areas
    const processAnswers = (selectedModuleIds) => {
        const newReasons = {};

        selectedModuleIds.forEach(moduleId => {
            const mapping = MODULE_TO_AREA_MAP[moduleId];
            if (!mapping) return;

            newReasons[mapping.areaId] = 'questionnaire';

            if (mapping.type === 'blood') {
                setExpandedBloodAreas(prev => [...new Set([...prev, mapping.areaId])]);
            } else if (mapping.type === 'body') {
                setExpandedBodyAreas(prev => [...new Set([...prev, mapping.areaId])]);
            } else if (mapping.type === 'head') {
                setExpandedHeadAreas(prev => [...new Set([...prev, mapping.areaId])]);
            }
        });

        setExpansionReasons(prev => ({ ...prev, ...newReasons }));
    };

    // Generate WhyTag text for an area
    const getWhyText = (areaId) => {
        const reason = expansionReasons[areaId];
        if (!reason) return null;

        // Find the BLOOD/BODY/HEAD area
        const allAreas = [...BLOOD_AREAS, ...BODY_AREAS, ...HEAD_AREAS];
        const area = allAreas.find(a => a.id === areaId);
        if (!area) return null;

        const indicatesSuffix = area.indicates
            ? ` To může indikovat ${area.indicates}.`
            : '';

        if (reason === 'age') {
            const ageThreshold = area.expansion?.autoExpandForAge;
            const expansionNames = area.expansion?.markers
                ?.map(m => LAB_COSTS[m]?.name || m)
                .join(' a ') ||
                area.expansion?.tests
                    ?.map(t => {
                        const marker = [...PHYSICAL_TESTS, ...COGNITIVE_TESTS].find(m => m.id === t);
                        return marker?.name || t;
                    })
                    .join(' a ') || '';
            return `Přidali jsme ${expansionNames} na základě věku (${ageThreshold}+).${indicatesSuffix}`;
        }
        if (reason === 'gender') {
            const g = area.expansion?.autoExpandForGender;
            const expansionNames = area.expansion?.markers
                ?.map(m => LAB_COSTS[m]?.name || m)
                .join(' a ') ||
                area.expansion?.tests
                    ?.map(t => {
                        const marker = [...PHYSICAL_TESTS, ...COGNITIVE_TESTS].find(m => m.id === t);
                        return marker?.name || t;
                    })
                    .join(' a ') || '';
            const genderText = g === 'female' ? 'doporučeno pro ženy' : 'doporučeno pro muže';
            return `Přidali jsme ${expansionNames} — ${genderText}.${indicatesSuffix}`;
        }
        if (reason === 'questionnaire') {
            // Find the HEALTH_CATEGORY that maps to this area
            const cat = HEALTH_CATEGORIES.find(c => {
                if (!c.module) return false;
                const m = MODULE_TO_AREA_MAP[c.module.id];
                return m && m.areaId === areaId;
            });
            if (cat && cat.module?.whyTemplate) {
                const baseNames = area.baseMarkers
                    ?.map(m => LAB_COSTS[m]?.name || m)
                    .join(', ') || '';
                const expansionNames = area.expansion?.markers
                    ?.map(m => LAB_COSTS[m]?.name || m)
                    .join(' a ') ||
                    area.expansion?.tests
                        ?.map(t => {
                            const marker = [...PHYSICAL_TESTS, ...COGNITIVE_TESTS].find(m => m.id === t);
                            return marker?.name || t;
                        })
                        .join(' a ') || '';
                const base = cat.module.whyTemplate
                    .replace('{baseNames}', baseNames)
                    .replace('{expansionNames}', expansionNames);
                return `${base}${indicatesSuffix}`;
            }
            return `Rozšířeno na základě vašich odpovědí v dotazníku.${indicatesSuffix}`;
        }

        return null;
    };

    // Check if an area is expanded
    const isAreaExpanded = (areaId) => {
        return expandedBloodAreas.includes(areaId) ||
            expandedBodyAreas.includes(areaId) ||
            expandedHeadAreas.includes(areaId);
    };

    return {
        expandedBloodAreas,
        expandedBodyAreas,
        expandedHeadAreas,
        expansionReasons,
        processAnswers,
        getWhyText,
        isAreaExpanded,
        setExpandedBloodAreas,
        setExpandedBodyAreas,
        setExpandedHeadAreas,
    };
};
