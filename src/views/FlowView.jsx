import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
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
    const [searchParams] = useSearchParams();
    const isAltVariant = searchParams.get('variant') === 'alt';

    const getStepFromPath = () => {
        const pathParts = location.pathname.split('/');
        if (pathParts[1] === 'flow' && pathParts[2]) {
            return parseFloat(pathParts[2]);
        }
        return 0;
    };

    const [internalStep, setInternalStep] = useState(getStepFromPath());
    const [highestStepReached, setHighestStepReached] = useState(getStepFromPath());
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
    const [expandedSymptoms, setExpandedSymptoms] = useState({});
    const [devMode, setDevMode] = useState(false); // Dev mode to show marker labels
    const [showCostsAndMargin, setShowCostsAndMargin] = useState(false); // Toggle to show costs and margins
    const [hasKomfiMembership, setHasKomfiMembership] = useState(false); // Komfi membership discount

    useEffect(() => {
        const currentStep = getStepFromPath();
        setInternalStep(currentStep);
        // Update highest step reached
        setHighestStepReached(prev => Math.max(prev, currentStep));
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
        let total = Math.round(base * frequency.multiplier * (1 - frequency.discount));
        if (hasKomfiMembership) {
            total = Math.round(total * 0.975); // 2.5% discount for members
        }
        return total;
    };

    // Preselect based on questionnaire - expanded for all areas
    const processQuestionnaireAnswers = (selectedModuleIds) => {
        // Blood areas mapping
        if (selectedModuleIds.includes('cardio')) {
            setExpandedBloodAreas(prev => [...new Set([...prev, 'cardio'])]);
        }
        if (selectedModuleIds.includes('diabetes')) {
            setExpandedBloodAreas(prev => [...new Set([...prev, 'diabetes'])]);
        }
        if (selectedModuleIds.includes('liver')) {
            setExpandedBloodAreas(prev => [...new Set([...prev, 'liver'])]);
        }
        if (selectedModuleIds.includes('kidney')) {
            setExpandedBloodAreas(prev => [...new Set([...prev, 'kidney'])]);
        }
        if (selectedModuleIds.includes('vitamins')) {
            setExpandedBloodAreas(prev => [...new Set([...prev, 'energy'])]);
        }
        if (selectedModuleIds.includes('inflammation')) {
            setExpandedBloodAreas(prev => [...new Set([...prev, 'inflammation'])]);
        }
        if (selectedModuleIds.includes('thyroid')) {
            setExpandedBloodAreas(prev => [...new Set([...prev, 'thyroid'])]);
        }
        // Body areas mapping
        if (selectedModuleIds.includes('mobility')) {
            setExpandedBodyAreas(prev => [...new Set([...prev, 'mobility'])]);
        }
        // Head areas mapping
        if (selectedModuleIds.includes('memory')) {
            setExpandedHeadAreas(prev => [...new Set([...prev, 'memory'])]);
        }
    };

    // Tabs config (without Souhrn - that's a separate view)
    const tabs = [
        { id: 'blood', label: 'Krev', icon: 'bloodtype', color: 'text-red-500' },
        { id: 'body', label: 'Tělo', icon: 'accessibility_new', color: 'text-teal-500' },
        { id: 'head', label: 'Hlava', icon: 'psychology', color: 'text-purple-500' },
    ];

    // Primary progress steps configuration (without Souhrn in breadcrumb)
    const primarySteps = [
        { step: 0, label: 'Pro koho' },
        { step: 1, label: 'Cíl' },
        { step: 2, label: 'Údaje' },
        { step: 2.5, label: 'Obavy', showOnlyFor: 'care' },
        { step: 3, label: 'Výběr' },
        { step: 4, label: 'Hotovo' }
    ];

    // Get visible primary steps based on path
    const getVisiblePrimarySteps = () => {
        return primarySteps.filter(s => !s.showOnlyFor || s.showOnlyFor === path);
    };

    // Get the main step number (for steps like 3.1, 3.2, etc. return 3)
    const getMainStep = (step) => Math.floor(step);
    const highestMainStepReached = getMainStep(highestStepReached);

    // Primary Progress Bar Component - compact for header level
    const PrimaryProgressBar = () => {
        const visibleSteps = getVisiblePrimarySteps();
        const currentMainStep = getMainStep(internalStep);

        return (
            <div className="py-3 mb-8">
                <div className="flex items-start justify-center gap-0">
                    {visibleSteps.map((s, i) => {
                        const mainStep = getMainStep(s.step);
                        const isCompleted = currentMainStep > mainStep || (currentMainStep === mainStep && internalStep > s.step);
                        const isCurrent = currentMainStep === mainStep;
                        // Allow clicking on any step that was visited (even future ones)
                        const isClickable = mainStep <= highestMainStepReached;
                        const wasVisited = mainStep <= highestMainStepReached;

                        return (
                            <React.Fragment key={s.step}>
                                {/* Circle with label */}
                                <button
                                    onClick={() => isClickable && setStep(s.step)}
                                    disabled={!isClickable}
                                    className={`flex flex-col items-center gap-1.5 ${isClickable ? 'cursor-pointer' : 'cursor-default'}`}
                                >
                                    <div className={`w-4 h-4 rounded-full transition-all flex-shrink-0 ${isCompleted
                                        ? 'bg-primary hover:scale-125'
                                        : isCurrent
                                            ? 'bg-primary ring-3 ring-primary/30'
                                            : wasVisited
                                                ? 'bg-primary/50 hover:scale-125'
                                                : 'bg-surface-outline-variant'
                                        }`} />
                                    <span className={`text-[11px] font-medium whitespace-nowrap ${isCurrent
                                        ? 'text-primary font-bold'
                                        : isCompleted || wasVisited
                                            ? 'text-surface-on'
                                            : 'text-surface-on-variant'
                                        }`}>
                                        {s.label}
                                    </span>
                                </button>
                                {/* Line between circles */}
                                {i < visibleSteps.length - 1 && (
                                    <div className={`h-[2px] w-10 md:w-16 mt-2 transition-all ${currentMainStep > mainStep
                                        ? 'bg-primary'
                                        : wasVisited && mainStep < highestMainStepReached
                                            ? 'bg-primary/50'
                                            : 'bg-surface-outline-variant'
                                        }`} />
                                )}
                            </React.Fragment>
                        );
                    })}
                </div>
            </div>
        );
    };

    // Content wrapper with top margin
    const ContentWrapper = ({ children, className = "" }) => (
        <div className={`pt-[15px] ${className}`}>
            {children}
        </div>
    );

    // Step 0: For whom?
    if (internalStep === 0) return (
        <div className="max-w-4xl mx-auto px-4 py-8 animate-fade-in-up">
            <PrimaryProgressBar />
            <h2 className="text-4xl font-display text-center mb-12 text-surface-on">Pro koho službu hledáte?</h2>
            <div className="grid md:grid-cols-2 gap-3">
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
        <div className="max-w-4xl mx-auto px-4 py-8 animate-fade-in-up">
            <PrimaryProgressBar />
            <h2 className="text-4xl font-display text-center mb-12 text-surface-on">Co je vaším cílem?</h2>
            <div className="grid md:grid-cols-2 gap-3">
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
        <div className="max-w-4xl mx-auto px-4 py-8 animate-fade-in-up">
            <PrimaryProgressBar />
            <h2 className="text-4xl font-display text-center mb-12 text-surface-on">O kom se bavíme?</h2>
            <div className="max-w-md mx-auto space-y-8">
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
                <button onClick={() => setStep(path === 'care' ? 2.5 : 3)} className="w-full py-5 rounded-2xl text-primary-on font-bold text-lg bg-primary shadow-xl hover:scale-[1.02] transition-transform">Pokračovat</button>
            </div>
        </div>
    );

    // Step 2.5: What troubles you? Part 1 - Metabolism and organs (Care path only)
    if (internalStep === 2.5) {
        const step1Categories = HEALTH_CATEGORIES.filter(c => c.module && c.questionStep === 1);

        return (
            <div className="max-w-4xl mx-auto px-4 py-8 animate-fade-in-up">
                <PrimaryProgressBar />
                <h2 className="text-4xl font-display text-center mb-3 text-surface-on">Máte obavy ohledně...</h2>
                <p className="text-center text-surface-on-variant mb-8">Metabolismus a vnitřní orgány</p>

                {/* Dev mode switch - aligned right with cards */}
                <div className="max-w-xl mx-auto flex justify-end items-center gap-2 mb-4">
                    <span className="text-[10px] text-surface-on-variant">
                        Zobrazit interní popisky
                    </span>
                    <button
                        onClick={() => setDevMode(!devMode)}
                        className={`relative inline-flex h-4 w-8 items-center rounded-full transition-colors ${devMode ? 'bg-tertiary' : 'bg-surface-container-high'
                            }`}
                    >
                        <span className={`inline-block h-3 w-3 transform rounded-full bg-white shadow-sm transition-transform ${devMode ? 'translate-x-4' : 'translate-x-0.5'
                            }`} />
                    </button>
                </div>

                {/* Cards container - centered */}
                <div className="flex flex-col items-center gap-3">
                    {step1Categories.map(cat => {
                        const mod = cat.module;
                        const isSelected = tempSelectedModules.includes(mod.id);
                        const hasSymptoms = mod.symptoms && mod.symptoms.length > 0;

                        return (
                            <div
                                key={mod.id}
                                onClick={() => toggleModule(mod.id)}
                                className={`relative w-full min-w-[320px] max-w-xl rounded-2xl overflow-hidden transition-all cursor-pointer ${isSelected
                                    ? 'bg-primary/20 dark:bg-primary/30 ring-2 ring-primary'
                                    : 'bg-surface-container-low hover:bg-surface-container-high'
                                    }`}
                            >
                                {/* Checkbox - top right */}
                                <div className={`absolute top-3 right-3 w-5 h-5 rounded flex items-center justify-center ${isSelected
                                    ? 'bg-primary text-primary-on'
                                    : 'border-2 border-surface-outline'
                                    }`}>
                                    {isSelected && <Icon name="check" size={14} />}
                                </div>

                                <div className="p-4 pr-10">
                                    <div className="flex items-start gap-3">
                                        {/* Icon */}
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${isSelected ? 'bg-primary-container' : 'bg-surface-container-high'
                                            }`}>
                                            <Icon name={cat.icon} size={20} className={isSelected ? 'text-primary' : 'text-surface-on-variant'} />
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 min-w-0">
                                            <div className="font-bold text-surface-on">{mod.question}</div>
                                            {/* Internal labels - only when devMode is on */}
                                            {devMode && (
                                                <div className="text-surface-on-variant text-xs mt-0.5">{mod.name} • {mod.desc}</div>
                                            )}

                                            {/* Symptoms shown directly as tags */}
                                            {hasSymptoms && (
                                                <div className="flex flex-wrap gap-1.5 mt-2">
                                                    {mod.symptoms.map((symptom, i) => (
                                                        <span
                                                            key={i}
                                                            className={`px-2 py-0.5 rounded-full text-xs ${isSelected
                                                                ? 'bg-primary/30 text-primary-on dark:text-primary'
                                                                : 'bg-surface-container-high text-surface-on-variant'
                                                                }`}
                                                        >
                                                            {symptom}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="max-w-xl mx-auto">
                    <button
                        onClick={() => setStep(2.6)}
                        className="w-full mt-8 py-5 rounded-2xl text-primary-on font-bold text-lg bg-primary shadow-xl hover:scale-[1.02] transition-transform"
                    >
                        Pokračovat
                    </button>
                </div>
            </div>
        );
    }

    // Step 2.6: What troubles you? Part 2 - Energy, immunity and functions (Care path only)
    if (internalStep === 2.6) {
        const step2Categories = HEALTH_CATEGORIES.filter(c => c.module && c.questionStep === 2);

        return (
            <div className="max-w-4xl mx-auto px-4 py-8 animate-fade-in-up">
                <PrimaryProgressBar />
                <h2 className="text-4xl font-display text-center mb-3 text-surface-on">Máte obavy ohledně...</h2>
                <p className="text-center text-surface-on-variant mb-8">Energie, imunita a funkce</p>

                {/* Dev mode switch - aligned right with cards */}
                <div className="max-w-xl mx-auto flex justify-end items-center gap-2 mb-4">
                    <span className="text-[10px] text-surface-on-variant">
                        Zobrazit interní popisky
                    </span>
                    <button
                        onClick={() => setDevMode(!devMode)}
                        className={`relative inline-flex h-4 w-8 items-center rounded-full transition-colors ${devMode ? 'bg-tertiary' : 'bg-surface-container-high'
                            }`}
                    >
                        <span className={`inline-block h-3 w-3 transform rounded-full bg-white shadow-sm transition-transform ${devMode ? 'translate-x-4' : 'translate-x-0.5'
                            }`} />
                    </button>
                </div>

                {/* Cards container - centered */}
                <div className="flex flex-col items-center gap-3">
                    {step2Categories.map(cat => {
                        const mod = cat.module;
                        const isSelected = tempSelectedModules.includes(mod.id);
                        const hasSymptoms = mod.symptoms && mod.symptoms.length > 0;

                        return (
                            <div
                                key={mod.id}
                                onClick={() => toggleModule(mod.id)}
                                className={`relative w-full min-w-[320px] max-w-xl rounded-2xl overflow-hidden transition-all cursor-pointer ${isSelected
                                    ? 'bg-primary/20 dark:bg-primary/30 ring-2 ring-primary'
                                    : 'bg-surface-container-low hover:bg-surface-container-high'
                                    }`}
                            >
                                {/* Checkbox - top right */}
                                <div className={`absolute top-3 right-3 w-5 h-5 rounded flex items-center justify-center ${isSelected
                                    ? 'bg-primary text-primary-on'
                                    : 'border-2 border-surface-outline'
                                    }`}>
                                    {isSelected && <Icon name="check" size={14} />}
                                </div>

                                <div className="p-4 pr-10">
                                    <div className="flex items-start gap-3">
                                        {/* Icon */}
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${isSelected ? 'bg-primary-container' : 'bg-surface-container-high'
                                            }`}>
                                            <Icon name={cat.icon} size={20} className={isSelected ? 'text-primary' : 'text-surface-on-variant'} />
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 min-w-0">
                                            <div className="font-bold text-surface-on">{mod.question}</div>
                                            {/* Internal labels - only when devMode is on */}
                                            {devMode && (
                                                <div className="text-surface-on-variant text-xs mt-0.5">{mod.name} • {mod.desc}</div>
                                            )}

                                            {/* Symptoms shown directly as tags */}
                                            {hasSymptoms && (
                                                <div className="flex flex-wrap gap-1.5 mt-2">
                                                    {mod.symptoms.map((symptom, i) => (
                                                        <span
                                                            key={i}
                                                            className={`px-2 py-0.5 rounded-full text-xs ${isSelected
                                                                ? 'bg-primary/30 text-primary-on dark:text-primary'
                                                                : 'bg-surface-container-high text-surface-on-variant'
                                                                }`}
                                                        >
                                                            {symptom}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="max-w-xl mx-auto">
                    <button
                        onClick={() => {
                            processQuestionnaireAnswers(tempSelectedModules);
                            setStep(3);
                        }}
                        className="w-full mt-8 py-5 rounded-2xl text-primary-on font-bold text-lg bg-primary shadow-xl hover:scale-[1.02] transition-transform"
                    >
                        Zobrazit můj balíček
                    </button>
                </div>
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

            // Check if this is a toggle-only card (no base content, only expansion)
            const isToggleOnly = !area.baseMarkers && !area.tests && area.expansion;

            // Toggle-only card layout - simple clickable card
            if (isToggleOnly) {
                return (
                    <div
                        onClick={() => onToggleExpansion(area.id)}
                        className={`w-full rounded-2xl transition-all overflow-hidden cursor-pointer ${isExpanded
                            ? 'ring-2 ring-primary bg-primary-container/20'
                            : 'bg-surface-container-low hover:bg-surface-container-high'}`}
                    >
                        <div className="p-6">
                            <div className="flex items-start gap-4">
                                {/* Icon */}
                                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 ${isExpanded ? 'bg-primary-container' : 'bg-surface-container-high'}`}>
                                    <Icon name={area.icon} size={32} className={isExpanded ? 'text-primary' : (area.color || 'text-surface-on-variant')} />
                                </div>
                                {/* Content */}
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                                        <h4 className={`font-bold text-2xl ${isExpanded ? 'text-primary' : 'text-surface-on'}`}>{area.name}</h4>
                                        <span className="text-xs px-2 py-0.5 rounded-full bg-surface-container-high text-surface-on-variant font-medium">
                                            {expansionCount} {expansionCount === 1 ? 'test' : expansionCount >= 2 && expansionCount <= 4 ? 'testy' : 'testů'}
                                        </span>
                                    </div>
                                    <p className="text-surface-on-variant text-sm leading-relaxed">
                                        {area.baseDescription}
                                    </p>
                                    {/* Tests included */}
                                    {isExpanded && area.expansion?.tests && (
                                        <div className="mt-3 space-y-1">
                                            {area.expansion.tests.map(testId => (
                                                <div key={testId} className="flex items-center gap-2 text-xs text-primary">
                                                    <Icon name="check_circle" size={14} />
                                                    <span>{testId === 'sppb' ? 'SPPB (rovnováha, chůze)' : testId === 'chairstand' ? 'Chair-Stand test' : testId === 'ekg' ? 'EKG' : testId === 'minicog' ? 'Mini-Cog test' : testId === 'audio' ? 'Audiometrie' : testId}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                {/* Checkbox - top right */}
                                <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${isExpanded ? 'bg-primary text-primary-on' : 'border-2 border-surface-outline'}`}>
                                    {isExpanded && <Icon name="check" size={18} />}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            }

            // Standard card layout (with base content + optional expansion)
            // Check if this card has base content (should show "included" checkbox)
            const hasBaseContent = area.baseMarkers || area.tests;

            return (
                <div className="w-full rounded-2xl transition-all overflow-hidden bg-surface-container-low">
                    {/* Area Header */}
                    <div className="p-6">
                        <div className="flex items-start gap-4">
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 ${hasBaseContent ? 'bg-tertiary-container' : 'bg-surface-container-high'}`}>
                                <Icon name={area.icon} size={28} className={area.color || (hasBaseContent ? 'text-tertiary' : 'text-surface-on-variant')} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-2">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <h4 className="font-bold text-xl text-surface-on">{area.name}</h4>
                                        {/* Test count with expand arrow - next to title */}
                                        {(area.baseMarkers || area.tests) && (
                                            <button
                                                onClick={(e) => { e.stopPropagation(); onToggleDetails(area.id); }}
                                                className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-surface-container-high text-surface-on-variant font-medium hover:bg-surface-container-highest transition-colors"
                                            >
                                                <span>{totalCount} {totalCount === 1 ? 'test' : totalCount >= 2 && totalCount <= 4 ? 'testy' : 'testů'}</span>
                                                <Icon name={showMarkerDetails ? 'expand_less' : 'expand_more'} size={14} />
                                            </button>
                                        )}
                                    </div>
                                    {/* Included checkbox - top right */}
                                    {hasBaseContent && (
                                        <div className="flex-shrink-0">
                                            {/* All base content cards (baseMarkers or tests with included) get small gray checkbox */}
                                            {/* because they're always included and can't be toggled off */}
                                            <div className="w-5 h-5 rounded-md flex items-center justify-center bg-neutral-400 text-white opacity-70">
                                                <Icon name="check" size={12} />
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="flex items-center gap-2 mt-1 flex-wrap">
                                    {/* Gender segment tag */}
                                    {area.genderFilter && (
                                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium flex items-center gap-1 ${area.genderFilter === 'female'
                                            ? 'bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400'
                                            : 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                                            }`}>
                                            <Icon name={area.genderFilter === 'female' ? 'female' : 'male'} size={12} />
                                            {area.genderFilter === 'female' ? 'Extra pro ženy' : 'Extra pro muže'}
                                        </span>
                                    )}
                                </div>

                                {/* Marker details list - shown when expanded */}
                                {showMarkerDetails && (
                                    <div className="mb-3 space-y-1">
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

                                <p className="text-surface-on-variant text-sm leading-relaxed">
                                    {area.baseDescription}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Expansion Toggle - compact single line with checkbox */}
                    {area.expansion && (
                        <div
                            onClick={() => onToggleExpansion(area.id)}
                            className={`px-4 py-3 border-t cursor-pointer transition-all ${isExpanded
                                ? 'bg-primary/15 dark:bg-primary/25 border-primary/30'
                                : 'bg-surface-dim/50 border-surface-outline-variant hover:bg-surface-container-high'}`}
                        >
                            <div className="flex items-center gap-3">
                                {/* Checkbox - round */}
                                <div className={`w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center transition-all ${isExpanded
                                    ? 'bg-primary text-primary-on'
                                    : 'border-2 border-surface-outline hover:border-primary'
                                    }`}>
                                    {isExpanded && <Icon name="check" size={14} />}
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <span className={`font-semibold text-sm ${isExpanded ? 'text-primary' : 'text-surface-on'}`}>
                                            Rozšířit o více testů?
                                        </span>
                                        <span className="text-xs px-1.5 py-0.5 rounded bg-surface-container-high text-surface-on-variant">
                                            +{expansionCount} {expansionCount === 1 ? 'test' : expansionCount >= 2 && expansionCount <= 4 ? 'testy' : 'testů'}
                                        </span>
                                    </div>
                                    {/* Description only shows when selected */}
                                    {isExpanded && (
                                        <div className="text-xs mt-1 text-surface-on-variant">
                                            {area.expansion.description}
                                        </div>
                                    )}
                                </div>

                                {/* Price - only when selected */}
                                {isExpanded && expansionPrice > 0 && (
                                    <div className="text-sm font-bold flex-shrink-0 text-primary">
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

        // Step config for tabs (without Souhrn)
        const stepConfig = [
            { step: 3.1, label: 'Krev', icon: 'bloodtype', color: 'text-red-500', count: bloodTestCount },
            { step: 3.2, label: 'Tělo', icon: 'accessibility_new', color: 'text-teal-500', count: bodyTestCount },
            { step: 3.3, label: 'Hlava', icon: 'psychology', color: 'text-violet-500', count: headTestCount },
        ];

        const StepProgress = () => {
            // Find active index for positioning
            const activeIndex = stepConfig.findIndex(s =>
                internalStep === s.step || (s.step === 3.1 && internalStep === 3)
            );

            return (
                <div className="py-3 mb-6">
                    {/* Primary progress bar */}
                    <PrimaryProgressBar />
                    {/* Secondary tabs - segmented control style + Dev toggle */}
                    <div className="flex justify-center items-center gap-4">
                        <div className="relative inline-flex p-1 rounded-full bg-primary/10 dark:bg-primary/20">
                            {/* Sliding background indicator */}
                            <div
                                className="absolute top-1 bottom-1 rounded-full bg-surface dark:bg-surface-container-highest transition-all duration-300 ease-out shadow-sm"
                                style={{
                                    width: `calc(${100 / stepConfig.length}% - 4px)`,
                                    left: `calc(${(activeIndex / stepConfig.length) * 100}% + 2px)`,
                                }}
                            />
                            {/* Tab buttons */}
                            {stepConfig.map((s) => {
                                const isActive = internalStep === s.step || (s.step === 3.1 && internalStep === 3);

                                return (
                                    <button
                                        key={s.step}
                                        onClick={() => setStep(s.step)}
                                        className={`relative z-10 flex items-center gap-2 px-5 py-2 rounded-full transition-colors ${isActive
                                            ? 'text-surface-on'
                                            : 'text-surface-on-variant hover:text-surface-on'
                                            }`}
                                    >
                                        <Icon name={s.icon} size={16} className={s.color} />
                                        <span className="text-sm font-medium">{s.label}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            );
        };

        // Step 3.1: Krev
        if (internalStep === 3 || internalStep === 3.1) {
            return (
                <div className="max-w-6xl mx-auto px-4 py-4 animate-fade-in-up">
                    <StepProgress />

                    <div className="text-center mb-10">
                        <div className="inline-flex items-center gap-4 mb-4">
                            <div className="w-16 h-16 rounded-2xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                                <Icon name="bloodtype" size={32} className="text-red-500" />
                            </div>
                            <h2 className="text-5xl font-display text-surface-on">Krevní testy</h2>
                        </div>
                        <p className="text-surface-on-variant text-lg max-w-2xl mx-auto">
                            Základní i rozšířené krevní markery odhalující stav vašeho zdraví. Každou sekci můžete rozšířit o detailnější vyšetření.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-3 mb-8">
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

                    <div className="flex justify-end pt-6 border-t border-surface-outline-variant">
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
                <div className="max-w-6xl mx-auto px-4 py-4 animate-fade-in-up">
                    <StepProgress />

                    <div className="text-center mb-10">
                        <div className="inline-flex items-center gap-4 mb-4">
                            <div className="w-16 h-16 rounded-2xl bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center">
                                <Icon name="accessibility_new" size={32} className="text-teal-500" />
                            </div>
                            <h2 className="text-5xl font-display text-surface-on">Fyzické testy</h2>
                        </div>
                        <p className="text-surface-on-variant text-lg max-w-2xl mx-auto">
                            Měření tělesných funkcí a fyzické kondice. Základní měření jsou v ceně, rozšíření jsou volitelná.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-3 mb-8">
                        {BODY_AREAS.filter(a => !a.hidden).map(area => (
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

                    <div className="flex justify-end pt-6 border-t border-surface-outline-variant">
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
                <div className="max-w-6xl mx-auto px-4 py-4 animate-fade-in-up">
                    <StepProgress />

                    <div className="text-center mb-10">
                        <div className="inline-flex items-center gap-4 mb-4">
                            <div className="w-16 h-16 rounded-2xl bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center">
                                <Icon name="psychology" size={32} className="text-violet-500" />
                            </div>
                            <h2 className="text-5xl font-display text-surface-on">Kognitivní testy</h2>
                        </div>
                        <p className="text-surface-on-variant text-lg max-w-2xl mx-auto">
                            Volitelné testy paměti, myšlení a smyslů. Tyto testy nejsou v základu zahrnuty – přidejte je, pokud máte zájem.
                        </p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-3 mb-8">
                        {HEAD_AREAS.filter(a => !a.hidden).map(area => (
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

                    <div className="flex justify-end pt-6 border-t border-surface-outline-variant">
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
                <div className="max-w-7xl mx-auto px-4 py-4 animate-fade-in-up">
                    {/* Back button instead of navigation to save space */}
                    <button onClick={() => setStep(3.3)} className="mb-4 flex items-center gap-2 text-surface-on-variant hover:text-surface-on transition-colors">
                        <Icon name="arrow_back" size={20} /> Zpět na výběr
                    </button>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Main content */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-4xl font-display mb-2 text-surface-on">Souhrn balíčku</h2>
                                    <p className="text-surface-on-variant text-lg">Zkontrolujte si vybrané testy. Kliknutím na záložku můžete upravit výběr.</p>
                                </div>
                                {/* Toggle for costs and margin - dev feature */}
                                <button
                                    onClick={() => setShowCostsAndMargin(!showCostsAndMargin)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${showCostsAndMargin
                                            ? 'bg-primary text-primary-on'
                                            : 'bg-surface-container-high text-surface-on-variant hover:bg-surface-container-highest'
                                        }`}
                                >
                                    <Icon name={showCostsAndMargin ? 'visibility' : 'visibility_off'} size={18} />
                                    <span>{showCostsAndMargin ? 'Skrýt náklady' : 'Zobrazit náklady'}</span>
                                </button>
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
                                    </button>
                                ))}
                            </div>

                            {/* Tab Content */}
                            <div className="grid md:grid-cols-2 gap-3">
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
                                        {BODY_AREAS.filter(a => !a.hidden).map(area => (
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
                                        {HEAD_AREAS.filter(a => !a.hidden).map(area => (
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

                                {/* What's included - Alternative Variant */}
                                {isAltVariant ? (
                                    <div className="space-y-4 mb-6 pb-6 border-b border-surface-outline-variant">
                                        {/* Visual grid layout */}
                                        <div className="grid grid-cols-2 gap-3">
                                            {/* Visits card */}
                                            <div className="p-4 rounded-2xl bg-gradient-to-br from-primary-container to-primary-container/50 text-center">
                                                <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-primary/20 flex items-center justify-center">
                                                    <Icon name="medical_services" size={24} className="text-primary" />
                                                </div>
                                                <div className="text-2xl font-bold text-primary">{frequency.multiplier}×</div>
                                                <div className="text-xs text-surface-on-variant">Návštěvy sestry</div>
                                            </div>

                                            {/* Blood tests card */}
                                            <div className="p-4 rounded-2xl bg-gradient-to-br from-red-100 to-red-50 dark:from-red-900/30 dark:to-red-900/10 text-center">
                                                <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-red-500/20 flex items-center justify-center">
                                                    <Icon name="bloodtype" size={24} className="text-red-500" />
                                                </div>
                                                <div className="text-2xl font-bold text-red-600 dark:text-red-400">{bloodTestCount}</div>
                                                <div className="text-xs text-surface-on-variant">Biomarkerů</div>
                                            </div>

                                            {/* Body composition card */}
                                            <div className="p-4 rounded-2xl bg-gradient-to-br from-teal-100 to-teal-50 dark:from-teal-900/30 dark:to-teal-900/10 text-center">
                                                <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-teal-500/20 flex items-center justify-center">
                                                    <Icon name="scale" size={24} className="text-teal-500" />
                                                </div>
                                                <div className="text-2xl font-bold text-teal-600 dark:text-teal-400">{frequency.multiplier}×</div>
                                                <div className="text-xs text-surface-on-variant">Analýza těla</div>
                                            </div>

                                            {/* AI card */}
                                            <div className="p-4 rounded-2xl bg-gradient-to-br from-violet-100 to-violet-50 dark:from-violet-900/30 dark:to-violet-900/10 text-center">
                                                <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-violet-500/20 flex items-center justify-center">
                                                    <Icon name="auto_awesome" size={24} className="text-violet-500" />
                                                </div>
                                                <div className="text-lg font-bold text-violet-600 dark:text-violet-400">AI</div>
                                                <div className="text-xs text-surface-on-variant">Interpretace</div>
                                            </div>
                                        </div>

                                        {/* Additional services as pills */}
                                        <div className="flex flex-wrap gap-2 pt-2">
                                            <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-medium flex items-center gap-1">
                                                <Icon name="trending_up" size={12} /> Sledování v čase
                                            </span>
                                            <span className="px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 text-xs font-medium flex items-center gap-1">
                                                <Icon name="share" size={12} /> Sdílení s lékařem
                                            </span>
                                            <span className="px-3 py-1 rounded-full bg-surface-container-high text-surface-on-variant text-xs font-medium flex items-center gap-1 opacity-60">
                                                <Icon name="stethoscope" size={12} /> Konzultace (volitelně)
                                            </span>
                                        </div>
                                    </div>
                                ) : (
                                    /* Original layout */
                                    <div className="space-y-3 mb-6 pb-6 border-b border-surface-outline-variant text-sm">
                                        <h4 className="text-xs uppercase tracking-wider text-surface-on-variant font-bold mb-3">Co je zahrnuto</h4>

                                        {/* Visits */}
                                        <div className="flex items-start gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-primary-container flex items-center justify-center flex-shrink-0">
                                                <Icon name="medical_services" size={16} className="text-primary" />
                                            </div>
                                            <div>
                                                <span className="font-bold text-surface-on">{frequency.multiplier}× návštěvy</span>
                                                <span className="text-surface-on-variant"> zdravotní sestry</span>
                                            </div>
                                        </div>

                                        {/* Blood draws */}
                                        <div className="flex items-start gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0">
                                                <Icon name="bloodtype" size={16} className="text-red-500" />
                                            </div>
                                            <div>
                                                <span className="font-bold text-surface-on">{frequency.multiplier}× Krevní odběr</span>
                                                <span className="text-surface-on-variant"> s analýzou {bloodTestCount} biomarkerů</span>
                                            </div>
                                        </div>

                                        {/* Body composition */}
                                        {expandedBodyAreas.includes('composition') || BODY_AREAS.find(a => a.id === 'composition')?.included ? (
                                            <div className="flex items-start gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center flex-shrink-0">
                                                    <Icon name="scale" size={16} className="text-teal-500" />
                                                </div>
                                                <div>
                                                    <span className="font-bold text-surface-on">{frequency.multiplier}× Analýza složení těla</span>
                                                    <span className="text-surface-on-variant block text-xs">(svalová hmota, viscerální tuk)</span>
                                                </div>
                                            </div>
                                        ) : null}

                                        {/* Blood pressure */}
                                        {expandedBodyAreas.includes('strength') || BODY_AREAS.find(a => a.id === 'strength')?.included ? (
                                            <div className="flex items-start gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center flex-shrink-0">
                                                    <Icon name="monitor_heart" size={16} className="text-emerald-500" />
                                                </div>
                                                <div>
                                                    <span className="font-bold text-surface-on">{frequency.multiplier}× Měření krevního tlaku</span>
                                                </div>
                                            </div>
                                        ) : null}

                                        <div className="border-t border-surface-outline-variant pt-3 mt-3 space-y-3">
                                            {/* AI interpretation */}
                                            <div className="flex items-start gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center flex-shrink-0">
                                                    <Icon name="auto_awesome" size={16} className="text-violet-500" />
                                                </div>
                                                <div>
                                                    <span className="font-bold text-surface-on">AI interpretace výsledků</span>
                                                    <span className="text-surface-on-variant block text-xs">Personalizovaná doporučení</span>
                                                </div>
                                            </div>

                                            {/* Health tracking */}
                                            <div className="flex items-start gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                                                    <Icon name="trending_up" size={16} className="text-blue-500" />
                                                </div>
                                                <span className="text-surface-on">Sledování vývoje zdraví v čase</span>
                                            </div>

                                            {/* Share with doctor */}
                                            <div className="flex items-start gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center flex-shrink-0">
                                                    <Icon name="share" size={16} className="text-amber-500" />
                                                </div>
                                                <span className="text-surface-on">Sdílení zprávy s lékařem</span>
                                            </div>

                                            {/* Consultation (optional) */}
                                            <div className="flex items-start gap-3 opacity-60">
                                                <div className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center flex-shrink-0">
                                                    <Icon name="stethoscope" size={16} className="text-surface-on-variant" />
                                                </div>
                                                <div>
                                                    <span className="text-surface-on">Konzultace s lékařem</span>
                                                    <span className="text-surface-on-variant block text-xs">Volitelně za příplatek</span>
                                                </div>
                                            </div>
                                        </div>

                                        {frequency.discount > 0 && (
                                            <div className="flex justify-between text-tertiary pt-2">
                                                <span>Sleva za frekvenci</span>
                                                <span className="font-bold">-{Math.round(frequency.discount * 100)}%</span>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Frequency selector */}
                                <div className="flex p-1 rounded-xl bg-surface-container-high mb-6">
                                    {FREQUENCIES.map(f => (
                                        <button key={f.id} onClick={() => setFrequency(f)} className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all flex flex-col items-center justify-center gap-1 ${frequency.id === f.id ? 'bg-surface text-primary shadow-sm' : 'text-surface-on-variant'}`}>
                                            <span>{f.label}</span>
                                            {f.discount > 0 && <span className="text-[9px] px-1.5 rounded-full bg-tertiary-container text-tertiary-on-container">-{Math.round(f.discount * 100)}%</span>}
                                        </button>
                                    ))}
                                </div>

                                {/* Total */}
                                <div className="flex justify-between items-end mb-4">
                                    <span className="text-sm uppercase font-bold tracking-widest text-surface-on-variant">Celkem / rok</span>
                                    <span className="text-4xl font-display text-primary">{calculateTotal()} Kč</span>
                                </div>

                                {/* Komfi membership checkbox */}
                                <label className="flex items-center gap-3 p-4 rounded-xl bg-surface-container cursor-pointer hover:bg-surface-container-high transition-colors mb-6">
                                    <input
                                        type="checkbox"
                                        checked={hasKomfiMembership}
                                        onChange={(e) => setHasKomfiMembership(e.target.checked)}
                                        className="w-5 h-5 rounded accent-primary"
                                    />
                                    <div className="flex-1">
                                        <span className="text-sm font-medium text-surface-on">Máte Komfi členství?</span>
                                        <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-tertiary-container text-tertiary-on-container">-2.5%</span>
                                    </div>
                                </label>

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
