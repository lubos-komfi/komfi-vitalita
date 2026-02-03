import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Icon } from '../components/ui';
import {
    LAB_COSTS,
    HEALTH_CATEGORIES,
    FREQUENCIES,
    SERVICE_FEE,
    BLOOD_AREAS,
    BODY_AREAS,
    HEAD_AREAS
} from '../data/constants';

export const FlowView = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const getStepFromPath = () => {
        const pathParts = location.pathname.split('/');
        if (pathParts[1] === 'flow' && pathParts[2]) {
            return parseFloat(pathParts[2]);
        }
        return 0;
    };

    const [internalStep, setInternalStep] = useState(getStepFromPath());
    const [client, setClient] = useState({ gender: 'female', age: 40 });
    const [path, setPath] = useState(null);
    const [frequency, setFrequency] = useState(FREQUENCIES[1]);

    // State for area expansions (stores area IDs that are expanded)
    const [activeTab, setActiveTab] = useState('blood');
    const [expandedBloodAreas, setExpandedBloodAreas] = useState([]);
    const [expandedBodyAreas, setExpandedBodyAreas] = useState([]);
    const [expandedHeadAreas, setExpandedHeadAreas] = useState([]);
    const [tempSelectedModules, setTempSelectedModules] = useState([]);
    const [showDetails, setShowDetails] = useState({});

    useEffect(() => {
        setInternalStep(getStepFromPath());
    }, [location.pathname]);

    const setStep = (newStep) => {
        navigate(`/flow/${newStep}`);
    };

    // Toggle expansion for areas
    const toggleBloodExpansion = (areaId) => {
        if (expandedBloodAreas.includes(areaId)) {
            setExpandedBloodAreas(expandedBloodAreas.filter(id => id !== areaId));
        } else {
            setExpandedBloodAreas([...expandedBloodAreas, areaId]);
        }
    };

    const toggleBodyExpansion = (areaId) => {
        if (expandedBodyAreas.includes(areaId)) {
            setExpandedBodyAreas(expandedBodyAreas.filter(id => id !== areaId));
        } else {
            setExpandedBodyAreas([...expandedBodyAreas, areaId]);
        }
    };

    const toggleHeadExpansion = (areaId) => {
        if (expandedHeadAreas.includes(areaId)) {
            setExpandedHeadAreas(expandedHeadAreas.filter(id => id !== areaId));
        } else {
            setExpandedHeadAreas([...expandedHeadAreas, areaId]);
        }
    };

    // Toggle function for questionnaire
    const toggleModule = (id) => {
        if (tempSelectedModules.includes(id)) {
            setTempSelectedModules(tempSelectedModules.filter(m => m !== id));
        } else {
            setTempSelectedModules([...tempSelectedModules, id]);
        }
    };

    // Calculate prices
    const calculateBloodPrice = () => {
        let total = 0;
        BLOOD_AREAS.forEach(area => {
            if (area.genderFilter && area.genderFilter !== client.gender) return;
            // Base markers
            area.baseMarkers?.forEach(markerId => {
                if (LAB_COSTS[markerId]) total += LAB_COSTS[markerId].price;
            });
            // Expansion markers
            if (expandedBloodAreas.includes(area.id) && area.expansion) {
                area.expansion.markers?.forEach(markerId => {
                    if (LAB_COSTS[markerId]) total += LAB_COSTS[markerId].price;
                });
            }
        });
        return total;
    };

    const calculateBodyPrice = () => {
        let total = 0;
        BODY_AREAS.forEach(area => {
            if (expandedBodyAreas.includes(area.id) && area.price) {
                total += area.price;
            }
        });
        return total;
    };

    const calculateHeadPrice = () => {
        let total = 0;
        HEAD_AREAS.forEach(area => {
            if (expandedHeadAreas.includes(area.id) && area.price) {
                total += area.price;
            }
        });
        return total;
    };

    const calculateTotal = () => {
        const base = SERVICE_FEE + calculateBloodPrice() + calculateBodyPrice() + calculateHeadPrice();
        return Math.round(base * frequency.multiplier * (1 - frequency.discount));
    };

    // Preselect based on questionnaire
    const processQuestionnaireAnswers = (selectedModuleIds) => {
        if (selectedModuleIds.includes('cardio')) {
            setExpandedBloodAreas(prev => [...new Set([...prev, 'cardio'])]);
        }
        if (selectedModuleIds.includes('diabetes')) {
            setExpandedBloodAreas(prev => [...new Set([...prev, 'diabetes'])]);
        }
        if (selectedModuleIds.includes('liver')) {
            setExpandedBloodAreas(prev => [...new Set([...prev, 'liver'])]);
        }
        if (selectedModuleIds.includes('vitamins')) {
            setExpandedBloodAreas(prev => [...new Set([...prev, 'energy'])]);
        }
        if (selectedModuleIds.includes('thyroid')) {
            setExpandedBloodAreas(prev => [...new Set([...prev, 'thyroid'])]);
        }
    };

    // Tabs config
    const tabs = [
        { id: 'blood', label: 'Krev', icon: 'bloodtype', color: 'text-red-500' },
        { id: 'body', label: 'Tělo', icon: 'accessibility_new', color: 'text-teal-500' },
        { id: 'head', label: 'Hlava', icon: 'psychology', color: 'text-purple-500' },
    ];

    // Step 0: Who is this for?
    if (internalStep === 0) return (
        <div className="max-w-4xl mx-auto px-4 py-16 animate-fade-in-up text-center">
            <h1 className="text-4xl font-display mb-12 text-surface-on">Pro koho službu hledáte?</h1>
            <div className="grid md:grid-cols-2 gap-8">
                <button onClick={() => setStep(1)} className="p-12 rounded-3xl text-left bg-surface-container-low border border-surface-outline-variant hover:border-primary transition-colors group">
                    <Icon name="accessibility_new" size={64} className="text-primary mb-6 group-hover:scale-110 transition-transform" />
                    <div className="font-display text-3xl mb-3 text-surface-on">Chci to pro sebe</div>
                    <div className="text-surface-on-variant text-lg">Mít své zdraví pod kontrolou.</div>
                </button>
                <button onClick={() => setStep(1)} className="p-12 rounded-3xl text-left bg-surface-container-low border border-surface-outline-variant hover:border-primary transition-colors group">
                    <Icon name="family_restroom" size={64} className="text-primary mb-6 group-hover:scale-110 transition-transform" />
                    <div className="font-display text-3xl mb-3 text-surface-on">Chci to pro rodiče</div>
                    <div className="text-surface-on-variant text-lg">Zajistit jim tu nejlepší péči.</div>
                </button>
            </div>
        </div>
    );

    // Step 1: What's your goal?
    if (internalStep === 1) return (
        <div className="max-w-5xl mx-auto px-4 py-12 animate-fade-in-up">
            <button onClick={() => setStep(0)} className="mb-8 flex items-center gap-2 text-surface-on-variant hover:text-surface-on transition-opacity">
                <Icon name="arrow_back" /> Zpět
            </button>
            <h2 className="text-4xl font-display text-center mb-16 text-surface-on">Co je vaším cílem?</h2>
            <div className="grid md:grid-cols-2 gap-8">
                <button onClick={() => { setPath('prevention'); setStep(2); }} className="p-10 rounded-3xl text-left bg-surface-container-low border border-surface-outline-variant hover:border-primary transition-all hover:shadow-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-6 text-surface-container-highest group-hover:scale-110 transition-transform">
                        <Icon name="shield" size={150} />
                    </div>
                    <div className="relative z-10">
                        <div className="inline-block px-3 py-1 rounded-full bg-tertiary-container text-tertiary-on-container font-bold text-xs mb-4">Nejoblíbenější</div>
                        <h3 className="font-display text-3xl mb-3 text-surface-on">Chci jistotu (Prevence)</h3>
                        <p className="text-surface-on-variant leading-relaxed mb-6">Screening celého těla bez konkrétních potíží.</p>
                        <div className="flex items-center gap-2 font-bold text-primary group-hover:translate-x-2 transition-transform">Vybrat prevenci <Icon name="arrow_forward" /></div>
                    </div>
                </button>
                <button onClick={() => { setPath('care'); setStep(2); }} className="p-10 rounded-3xl text-left bg-surface-container-low border border-surface-outline-variant hover:border-primary transition-all hover:shadow-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-6 text-surface-container-highest group-hover:scale-110 transition-transform">
                        <Icon name="medical_services" size={150} />
                    </div>
                    <div className="relative z-10">
                        <div className="inline-block px-3 py-1 rounded-full bg-secondary-container text-secondary-on-container font-bold text-xs mb-4">Řešení problémů</div>
                        <h3 className="font-display text-3xl mb-3 text-surface-on">Mám obavy (Péče)</h3>
                        <p className="text-surface-on-variant leading-relaxed mb-6">Chci se zaměřit na konkrétní oblasti a symptomy.</p>
                        <div className="flex items-center gap-2 font-bold text-primary group-hover:translate-x-2 transition-transform">Vybrat péči <Icon name="arrow_forward" /></div>
                    </div>
                </button>
            </div>
        </div>
    );

    // Step 2: Client details
    if (internalStep === 2) return (
        <div className="max-w-2xl mx-auto px-4 py-12 animate-fade-in-up">
            <button onClick={() => setStep(1)} className="mb-8 flex items-center gap-2 text-surface-on-variant hover:text-surface-on transition-opacity">
                <Icon name="arrow_back" /> Zpět
            </button>
            <div className="rounded-3xl p-10 bg-surface-container-low shadow-xl border border-surface-outline-variant">
                <h2 className="text-3xl font-display mb-8 text-center text-surface-on">O kom se bavíme?</h2>
                <div className="space-y-8">
                    <div className="flex p-1 rounded-2xl bg-surface-container-high">
                        <button onClick={() => setClient({ ...client, gender: 'female' })} className={`flex-1 py-4 rounded-xl font-bold transition-all ${client.gender === 'female' ? 'bg-surface text-primary shadow-sm' : 'text-surface-on-variant'}`}>Žena</button>
                        <button onClick={() => setClient({ ...client, gender: 'male' })} className={`flex-1 py-4 rounded-xl font-bold transition-all ${client.gender === 'male' ? 'bg-surface text-primary shadow-sm' : 'text-surface-on-variant'}`}>Muž</button>
                    </div>
                    <div>
                        <div className="flex justify-between mb-3 font-bold text-surface-on-variant">
                            <span>Věk klienta</span>
                            <span>{client.age}+ let</span>
                        </div>
                        <input type="range" min="20" max="80" step="10" value={client.age} onChange={e => setClient({ ...client, age: parseInt(e.target.value) })} className="w-full h-2 rounded-lg accent-primary bg-surface-container-high appearance-none cursor-pointer" />
                    </div>
                    <button onClick={() => setStep(path === 'care' ? 2.5 : 3)} className="w-full py-5 rounded-2xl text-primary-on font-bold text-lg bg-primary shadow-xl hover:scale-105 transition-transform">Pokračovat</button>
                </div>
            </div>
        </div>
    );

    // Step 2.5: What troubles you? (Care path only)
    if (internalStep === 2.5) {
        return (
            <div className="max-w-3xl mx-auto px-4 py-12 animate-fade-in-up">
                <button onClick={() => setStep(2)} className="mb-8 flex items-center gap-2 text-surface-on-variant hover:text-surface-on transition-opacity">
                    <Icon name="arrow_back" /> Zpět
                </button>
                <h2 className="text-3xl font-display mb-8 text-center text-surface-on">Co vás trápí?</h2>
                <p className="text-center text-surface-on-variant mb-8">Vyberte oblasti, které vás zajímají. Na základě odpovědí vám doporučíme vhodné testy.</p>
                <div className="space-y-4">
                    {HEALTH_CATEGORIES.filter(c => c.module).map(cat => {
                        const mod = cat.module;
                        const isSelected = tempSelectedModules.includes(mod.id);
                        return (
                            <div key={mod.id} onClick={() => toggleModule(mod.id)} className={`p-6 rounded-2xl border cursor-pointer transition-all flex items-center gap-6 ${isSelected ? 'bg-primary-container border-primary' : 'bg-surface-container-low border-surface-outline-variant hover:border-surface-outline'}`}>
                                <div className={`w-6 h-6 rounded border flex items-center justify-center ${isSelected ? 'bg-primary border-primary text-primary-on' : 'border-surface-outline'}`}>
                                    {isSelected && <Icon name="check" size={16} />}
                                </div>
                                <div className="flex-1">
                                    <div className="font-bold text-lg mb-1 flex items-center gap-2 text-surface-on">
                                        <Icon name={cat.icon} className={isSelected ? 'text-primary' : 'text-surface-on-variant'} />{cat.title}
                                    </div>
                                    <div className="text-surface-on-variant text-sm">{mod.question}</div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <button
                    onClick={() => {
                        processQuestionnaireAnswers(tempSelectedModules);
                        setStep(3);
                    }}
                    className="w-full mt-8 py-5 rounded-2xl text-primary-on font-bold text-lg bg-primary shadow-xl"
                >
                    Zobrazit můj balíček
                </button>
            </div>
        );
    }

    // Step 3.x: Step-by-step Order Configurator
    // 3.1 = Krev, 3.2 = Tělo, 3.3 = Hlava, 3.4 = Souhrn
    if (internalStep >= 3 && internalStep < 4) {
        // Toggle details visibility
        const toggleDetails = (areaId) => setShowDetails(prev => ({ ...prev, [areaId]: !prev[areaId] }));

        // Count tests helper
        const countTests = (area) => {
            const baseCount = (area.baseMarkers?.length || 0) + (area.tests?.length || 0);
            return baseCount;
        };

        // Health Area Card Component with expandable marker details
        const AreaCard = ({ area, isExpanded, onToggleExpansion, priceOverride, showMarkerDetails, onToggleDetails }) => {
            const expansionPrice = priceOverride || (area.expansion?.markers?.reduce((sum, m) => sum + (LAB_COSTS[m]?.price || 0), 0));
            const baseCount = countTests(area);
            const expansionCount = area.expansion?.markers?.length || area.expansion?.tests?.length || 0;
            const totalCount = baseCount + (isExpanded ? expansionCount : 0);

            return (
                <div className={`rounded-2xl border transition-all overflow-hidden ${isExpanded ? 'border-primary bg-primary-container/20' : 'border-surface-outline-variant bg-surface-container-low'}`}>
                    {/* Area Header */}
                    <div className="p-6">
                        <div className="flex items-start gap-4">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${area.included ? 'bg-tertiary-container' : 'bg-surface-container-high'}`}>
                                <Icon name={area.icon} size={24} className={area.color || (area.included ? 'text-tertiary' : 'text-surface-on-variant')} />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2 flex-wrap">
                                    <h4 className="font-bold text-lg text-surface-on">{area.name}</h4>
                                    <span className="text-xs px-2 py-0.5 rounded-full bg-surface-container-high text-surface-on-variant font-medium">
                                        {totalCount} {totalCount === 1 ? 'test' : totalCount >= 2 && totalCount <= 4 ? 'testy' : 'testů'}
                                    </span>
                                    {area.included && (
                                        <span className="text-xs px-2 py-0.5 rounded-full bg-tertiary-container text-tertiary font-medium">V ceně</span>
                                    )}
                                </div>
                                <p className="text-surface-on-variant text-sm leading-relaxed">
                                    {area.baseDescription}
                                </p>
                            </div>
                        </div>

                        {/* Show details toggle */}
                        {(area.baseMarkers || area.tests) && (
                            <button
                                onClick={() => onToggleDetails(area.id)}
                                className="mt-4 flex items-center gap-2 text-xs text-surface-on-variant hover:text-primary transition-colors"
                            >
                                <Icon name={showMarkerDetails ? 'expand_less' : 'expand_more'} size={16} />
                                <span>{showMarkerDetails ? 'Skrýt měřené parametry' : 'Zobrazit měřené parametry'}</span>
                            </button>
                        )}

                        {/* Marker details list */}
                        {showMarkerDetails && (
                            <div className="mt-3 pl-4 border-l-2 border-surface-outline-variant space-y-1">
                                {area.baseMarkers?.map(markerId => (
                                    <div key={markerId} className="flex items-center gap-2 text-xs text-surface-on-variant">
                                        <Icon name="check_circle" size={14} className="text-tertiary" />
                                        <span>{LAB_COSTS[markerId]?.name || markerId}</span>
                                    </div>
                                ))}
                                {area.tests?.map(testId => (
                                    <div key={testId} className="flex items-center gap-2 text-xs text-surface-on-variant">
                                        <Icon name="check_circle" size={14} className="text-tertiary" />
                                        <span>{testId === 'inbody' ? 'InBody měření' : testId === 'grip' ? 'Síla stisku' : testId === 'bp' ? 'Krevní tlak' : testId}</span>
                                    </div>
                                ))}
                                {isExpanded && area.expansion?.markers?.map(markerId => (
                                    <div key={markerId} className="flex items-center gap-2 text-xs text-primary">
                                        <Icon name="add_circle" size={14} />
                                        <span>{LAB_COSTS[markerId]?.name || markerId}</span>
                                    </div>
                                ))}
                                {isExpanded && area.expansion?.tests?.map(testId => (
                                    <div key={testId} className="flex items-center gap-2 text-xs text-primary">
                                        <Icon name="add_circle" size={14} />
                                        <span>{testId === 'sppb' ? 'SPPB (rovnováha, chůze)' : testId === 'chairstand' ? 'Chair-Stand test' : testId === 'ekg' ? 'EKG' : testId === 'minicog' ? 'Mini-Cog test' : testId === 'audio' ? 'Audiometrie' : testId}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Expansion Toggle */}
                    {area.expansion && (
                        <div
                            onClick={() => onToggleExpansion(area.id)}
                            className={`px-6 py-4 border-t cursor-pointer transition-all ${isExpanded
                                ? 'bg-primary-container border-primary/30'
                                : 'bg-surface-dim border-surface-outline-variant hover:bg-surface-container-high'}`}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className={`w-6 h-6 rounded flex items-center justify-center ${isExpanded ? 'bg-primary text-primary-on' : 'border-2 border-surface-outline'}`}>
                                        {isExpanded && <Icon name="check" size={16} />}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className={`font-bold text-sm ${isExpanded ? 'text-primary' : 'text-surface-on'}`}>
                                                {area.expansion.name}
                                            </span>
                                            <span className="text-xs px-1.5 py-0.5 rounded bg-surface-container-high text-surface-on-variant">
                                                +{expansionCount} {expansionCount === 1 ? 'test' : 'testy'}
                                            </span>
                                        </div>
                                        <div className="text-xs text-surface-on-variant mt-0.5">
                                            {area.expansion.description}
                                        </div>
                                    </div>
                                </div>
                                {expansionPrice > 0 && (
                                    <div className={`text-sm font-bold ${isExpanded ? 'text-primary' : 'text-surface-on-variant'}`}>
                                        +{expansionPrice} Kč
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            );
        };

        // Count total tests in each category
        const bloodTestCount = BLOOD_AREAS.reduce((sum, area) => {
            if (area.genderFilter && area.genderFilter !== client.gender) return sum;
            let count = area.baseMarkers?.length || 0;
            if (expandedBloodAreas.includes(area.id) && area.expansion) {
                count += area.expansion.markers?.length || 0;
            }
            return sum + count;
        }, 0);

        const bodyTestCount = BODY_AREAS.reduce((sum, area) => {
            let count = area.tests?.length || 0;
            if (expandedBodyAreas.includes(area.id) && area.expansion) {
                count += area.expansion.tests?.length || 0;
            }
            return sum + count;
        }, 0);

        const headTestCount = HEAD_AREAS.reduce((sum, area) => {
            if (expandedHeadAreas.includes(area.id)) {
                return sum + (area.expansion?.tests?.length || 0);
            }
            return sum;
        }, 0);

        // Step progress indicator
        const stepConfig = [
            { step: 3.1, label: 'Krev', icon: 'bloodtype', color: 'text-red-500' },
            { step: 3.2, label: 'Tělo', icon: 'accessibility_new', color: 'text-teal-500' },
            { step: 3.3, label: 'Hlava', icon: 'psychology', color: 'text-violet-500' },
            { step: 3.4, label: 'Souhrn', icon: 'receipt_long', color: 'text-primary' }
        ];

        const StepProgress = () => (
            <div className="flex items-center justify-center gap-2 mb-8">
                {stepConfig.map((s, i) => (
                    <React.Fragment key={s.step}>
                        <button
                            onClick={() => internalStep >= s.step && setStep(s.step)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${internalStep === s.step
                                    ? 'bg-primary text-primary-on font-bold'
                                    : internalStep > s.step
                                        ? 'bg-tertiary-container text-tertiary cursor-pointer hover:bg-tertiary/20'
                                        : 'bg-surface-container-high text-surface-on-variant'
                                }`}
                            disabled={internalStep < s.step}
                        >
                            <Icon name={internalStep > s.step ? 'check_circle' : s.icon} size={18} className={internalStep === s.step ? '' : s.color} />
                            <span className="text-sm">{s.label}</span>
                        </button>
                        {i < stepConfig.length - 1 && (
                            <Icon name="chevron_right" size={20} className="text-surface-on-variant" />
                        )}
                    </React.Fragment>
                ))}
            </div>
        );

        // Step 3.1: Krev
        if (internalStep === 3 || internalStep === 3.1) {
            return (
                <div className="max-w-4xl mx-auto px-4 py-12 animate-fade-in-up">
                    <button onClick={() => setStep(path === 'care' ? 2.5 : 2)} className="mb-8 flex items-center gap-2 text-surface-on-variant hover:text-surface-on transition-opacity">
                        <Icon name="arrow_back" /> Zpět
                    </button>

                    <StepProgress />

                    <div className="text-center mb-8">
                        <div className="inline-flex items-center gap-3 mb-4">
                            <div className="w-14 h-14 rounded-2xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                                <Icon name="bloodtype" size={28} className="text-red-500" />
                            </div>
                            <h2 className="text-4xl font-display text-surface-on">Krevní testy</h2>
                        </div>
                        <p className="text-surface-on-variant text-lg max-w-2xl mx-auto">
                            Základní i rozšířené krevní markery odhalující stav vašeho zdraví. Každou sekci můžete rozšířit o detailnější vyšetření.
                        </p>
                    </div>

                    <div className="space-y-4 mb-8">
                        {BLOOD_AREAS.map(area => {
                            if (area.genderFilter && area.genderFilter !== client.gender) return null;
                            return (
                                <AreaCard
                                    key={area.id}
                                    area={area}
                                    isExpanded={expandedBloodAreas.includes(area.id)}
                                    onToggleExpansion={toggleBloodExpansion}
                                    showMarkerDetails={showDetails[area.id]}
                                    onToggleDetails={toggleDetails}
                                />
                            );
                        })}
                    </div>

                    <div className="flex justify-between items-center pt-6 border-t border-surface-outline-variant">
                        <div className="text-surface-on-variant">
                            <span className="text-sm">Vybrané krevní testy:</span>
                            <span className="ml-2 font-bold text-surface-on">{bloodTestCount}</span>
                        </div>
                        <button onClick={() => setStep(3.2)} className="px-8 py-4 rounded-xl bg-primary text-primary-on font-bold hover:scale-105 transition-transform shadow-lg flex items-center gap-2">
                            Pokračovat <Icon name="arrow_forward" />
                        </button>
                    </div>
                </div>
            );
        }

        // Step 3.2: Tělo
        if (internalStep === 3.2) {
            return (
                <div className="max-w-4xl mx-auto px-4 py-12 animate-fade-in-up">
                    <button onClick={() => setStep(3.1)} className="mb-8 flex items-center gap-2 text-surface-on-variant hover:text-surface-on transition-opacity">
                        <Icon name="arrow_back" /> Zpět na Krev
                    </button>

                    <StepProgress />

                    <div className="text-center mb-8">
                        <div className="inline-flex items-center gap-3 mb-4">
                            <div className="w-14 h-14 rounded-2xl bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center">
                                <Icon name="accessibility_new" size={28} className="text-teal-500" />
                            </div>
                            <h2 className="text-4xl font-display text-surface-on">Fyzické testy</h2>
                        </div>
                        <p className="text-surface-on-variant text-lg max-w-2xl mx-auto">
                            Měření tělesných funkcí a fyzické kondice. Základní měření jsou v ceně, rozšíření jsou volitelná.
                        </p>
                    </div>

                    <div className="space-y-4 mb-8">
                        {BODY_AREAS.map(area => (
                            <AreaCard
                                key={area.id}
                                area={area}
                                isExpanded={expandedBodyAreas.includes(area.id)}
                                onToggleExpansion={toggleBodyExpansion}
                                priceOverride={area.price}
                                showMarkerDetails={showDetails[area.id]}
                                onToggleDetails={toggleDetails}
                            />
                        ))}
                    </div>

                    <div className="flex justify-between items-center pt-6 border-t border-surface-outline-variant">
                        <div className="text-surface-on-variant">
                            <span className="text-sm">Vybrané fyzické testy:</span>
                            <span className="ml-2 font-bold text-surface-on">{bodyTestCount}</span>
                        </div>
                        <button onClick={() => setStep(3.3)} className="px-8 py-4 rounded-xl bg-primary text-primary-on font-bold hover:scale-105 transition-transform shadow-lg flex items-center gap-2">
                            Pokračovat <Icon name="arrow_forward" />
                        </button>
                    </div>
                </div>
            );
        }

        // Step 3.3: Hlava
        if (internalStep === 3.3) {
            return (
                <div className="max-w-4xl mx-auto px-4 py-12 animate-fade-in-up">
                    <button onClick={() => setStep(3.2)} className="mb-8 flex items-center gap-2 text-surface-on-variant hover:text-surface-on transition-opacity">
                        <Icon name="arrow_back" /> Zpět na Tělo
                    </button>

                    <StepProgress />

                    <div className="text-center mb-8">
                        <div className="inline-flex items-center gap-3 mb-4">
                            <div className="w-14 h-14 rounded-2xl bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center">
                                <Icon name="psychology" size={28} className="text-violet-500" />
                            </div>
                            <h2 className="text-4xl font-display text-surface-on">Kognitivní testy</h2>
                        </div>
                        <p className="text-surface-on-variant text-lg max-w-2xl mx-auto">
                            Volitelné testy paměti, myšlení a smyslů. Tyto testy nejsou v základu zahrnuty – přidejte je, pokud máte zájem.
                        </p>
                    </div>

                    <div className="space-y-4 mb-8">
                        {HEAD_AREAS.map(area => (
                            <AreaCard
                                key={area.id}
                                area={area}
                                isExpanded={expandedHeadAreas.includes(area.id)}
                                onToggleExpansion={toggleHeadExpansion}
                                priceOverride={area.price}
                                showMarkerDetails={showDetails[area.id]}
                                onToggleDetails={toggleDetails}
                            />
                        ))}
                    </div>

                    <div className="flex justify-between items-center pt-6 border-t border-surface-outline-variant">
                        <div className="text-surface-on-variant">
                            <span className="text-sm">Vybrané kognitivní testy:</span>
                            <span className="ml-2 font-bold text-surface-on">{headTestCount}</span>
                        </div>
                        <button onClick={() => setStep(3.4)} className="px-8 py-4 rounded-xl bg-primary text-primary-on font-bold hover:scale-105 transition-transform shadow-lg flex items-center gap-2">
                            Pokračovat na Souhrn <Icon name="arrow_forward" />
                        </button>
                    </div>
                </div>
            );
        }

        // Step 3.4: Souhrn (with tabs for editing)
        if (internalStep === 3.4) {
            return (
                <div className="max-w-7xl mx-auto px-4 py-12 animate-fade-in-up">
                    <button onClick={() => setStep(3.3)} className="mb-8 flex items-center gap-2 text-surface-on-variant hover:text-surface-on transition-opacity">
                        <Icon name="arrow_back" /> Zpět na Hlava
                    </button>

                    <StepProgress />

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Main content */}
                        <div className="lg:col-span-2 space-y-6">
                            <div>
                                <h2 className="text-4xl font-display mb-2 text-surface-on">Souhrn balíčku</h2>
                                <p className="text-surface-on-variant text-lg">Zkontrolujte si vybrané testy. Kliknutím na záložku můžete upravit výběr.</p>
                            </div>

                            {/* Tabs for editing */}
                            <div className="flex p-1 rounded-2xl bg-surface-container-high">
                                {tabs.map(tab => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`flex-1 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 
                                            ${activeTab === tab.id ? 'bg-surface shadow-md text-surface-on' : 'text-surface-on-variant hover:text-surface-on'}`}
                                    >
                                        <Icon name={tab.icon} className={activeTab === tab.id ? tab.color : ''} />
                                        <span>{tab.label}</span>
                                        <span className={`text-xs px-2 py-0.5 rounded-full ${activeTab === tab.id ? 'bg-primary-container text-primary' : 'bg-surface-container text-surface-on-variant'}`}>
                                            {tab.id === 'blood' ? bloodTestCount : tab.id === 'body' ? bodyTestCount : headTestCount}
                                        </span>
                                    </button>
                                ))}
                            </div>

                            {/* Tab Content */}
                            <div className="space-y-4">
                                {activeTab === 'blood' && (
                                    <>
                                        {BLOOD_AREAS.map(area => {
                                            if (area.genderFilter && area.genderFilter !== client.gender) return null;
                                            return (
                                                <AreaCard
                                                    key={area.id}
                                                    area={area}
                                                    isExpanded={expandedBloodAreas.includes(area.id)}
                                                    onToggleExpansion={toggleBloodExpansion}
                                                    showMarkerDetails={showDetails[area.id]}
                                                    onToggleDetails={toggleDetails}
                                                />
                                            );
                                        })}
                                    </>
                                )}

                                {activeTab === 'body' && (
                                    <>
                                        {BODY_AREAS.map(area => (
                                            <AreaCard
                                                key={area.id}
                                                area={area}
                                                isExpanded={expandedBodyAreas.includes(area.id)}
                                                onToggleExpansion={toggleBodyExpansion}
                                                priceOverride={area.price}
                                                showMarkerDetails={showDetails[area.id]}
                                                onToggleDetails={toggleDetails}
                                            />
                                        ))}
                                    </>
                                )}

                                {activeTab === 'head' && (
                                    <>
                                        {HEAD_AREAS.map(area => (
                                            <AreaCard
                                                key={area.id}
                                                area={area}
                                                isExpanded={expandedHeadAreas.includes(area.id)}
                                                onToggleExpansion={toggleHeadExpansion}
                                                priceOverride={area.price}
                                                showMarkerDetails={showDetails[area.id]}
                                                onToggleDetails={toggleDetails}
                                            />
                                        ))}
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Sticky Sidebar - Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-24 p-8 rounded-3xl bg-surface-container-low border border-surface-outline-variant shadow-xl">
                                <h3 className="font-display text-2xl mb-6 text-surface-on">Váš balíček</h3>

                                {/* Frequency selector */}
                                <div className="flex p-1 rounded-xl bg-surface-container-high mb-6">
                                    {FREQUENCIES.map(f => (
                                        <button key={f.id} onClick={() => setFrequency(f)} className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all flex flex-col items-center justify-center gap-1 ${frequency.id === f.id ? 'bg-surface text-primary shadow-sm' : 'text-surface-on-variant'}`}>
                                            <span>{f.label}</span>
                                            {f.discount > 0 && <span className="text-[9px] px-1.5 rounded-full bg-tertiary-container text-tertiary-on-container">-{Math.round(f.discount * 100)}%</span>}
                                        </button>
                                    ))}
                                </div>

                                {/* Sections summary */}
                                <div className="space-y-4 mb-6 pb-6 border-b border-surface-outline-variant">
                                    <div className="p-4 rounded-xl bg-surface-container border border-surface-outline-variant">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center gap-2">
                                                <Icon name="bloodtype" size={20} className="text-red-500" />
                                                <span className="font-bold text-surface-on">Krev</span>
                                            </div>
                                            <span className="text-xs px-2 py-0.5 rounded-full bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300">
                                                {bloodTestCount} testů
                                            </span>
                                        </div>
                                        <div className="text-sm text-surface-on-variant">{calculateBloodPrice()} Kč</div>
                                    </div>

                                    <div className="p-4 rounded-xl bg-surface-container border border-surface-outline-variant">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center gap-2">
                                                <Icon name="accessibility_new" size={20} className="text-teal-500" />
                                                <span className="font-bold text-surface-on">Tělo</span>
                                            </div>
                                            <span className="text-xs px-2 py-0.5 rounded-full bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300">
                                                {bodyTestCount} testů
                                            </span>
                                        </div>
                                        <div className="text-sm text-surface-on-variant">
                                            {calculateBodyPrice() > 0 ? `+${calculateBodyPrice()} Kč` : 'V ceně služby'}
                                        </div>
                                    </div>

                                    {expandedHeadAreas.length > 0 && (
                                        <div className="p-4 rounded-xl bg-primary-container/30 border border-primary/30">
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex items-center gap-2">
                                                    <Icon name="psychology" size={20} className="text-violet-500" />
                                                    <span className="font-bold text-surface-on">Hlava</span>
                                                </div>
                                                <span className="text-xs px-2 py-0.5 rounded-full bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300">
                                                    {headTestCount} testů
                                                </span>
                                            </div>
                                            <div className="text-sm text-primary font-medium">+{calculateHeadPrice()} Kč</div>
                                        </div>
                                    )}
                                </div>

                                {/* Price breakdown */}
                                <div className="space-y-2 mb-6 pb-6 border-b border-surface-outline-variant text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-surface-on-variant">Služba (sestra, odběr)</span>
                                        <span className="font-bold text-surface-on">{SERVICE_FEE} Kč</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-surface-on-variant">Laboratorní testy</span>
                                        <span className="font-bold text-surface-on">{calculateBloodPrice() + calculateBodyPrice() + calculateHeadPrice()} Kč</span>
                                    </div>
                                    {frequency.discount > 0 && (
                                        <div className="flex justify-between text-tertiary">
                                            <span>Sleva za frekvenci</span>
                                            <span className="font-bold">-{Math.round(frequency.discount * 100)}%</span>
                                        </div>
                                    )}
                                </div>

                                {/* Total */}
                                <div className="flex justify-between items-end mb-8">
                                    <span className="text-sm uppercase font-bold tracking-widest text-surface-on-variant">Celkem / rok</span>
                                    <span className="text-4xl font-display text-primary">{calculateTotal()} Kč</span>
                                </div>

                                <button onClick={() => setStep(4)} className="w-full py-4 rounded-xl bg-primary text-primary-on font-bold hover:scale-105 transition-transform shadow-lg">
                                    Objednat termín
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }

    // Step 4: Success
    if (internalStep === 4) return (
        <div className="max-w-xl mx-auto py-32 text-center animate-fade-in-up">
            <Icon name="celebration" size={100} className="text-primary mb-8 animate-bounce" />
            <h2 className="text-5xl font-display mb-6 text-surface-on">Perfektní!</h2>
            <p className="text-surface-on-variant text-lg mb-8">Vaše objednávka byla přijata. Brzy vás budeme kontaktovat.</p>
            <button onClick={() => window.location.reload()} className="border-b-2 border-current font-bold text-lg pb-1 text-primary">Zpět na úvod</button>
        </div>
    );

    return null;
};
