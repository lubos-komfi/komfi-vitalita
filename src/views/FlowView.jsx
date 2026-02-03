import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Icon } from '../components/ui';
import {
    LAB_COSTS,
    HEALTH_CATEGORIES,
    FREQUENCIES,
    SERVICE_FEE,
    PHYSICAL_TESTS,
    COGNITIVE_TESTS,
    BLOOD_TEST_GROUPS
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

    // New state for tabbed order builder
    const [activeTab, setActiveTab] = useState('blood');
    const [selectedBloodTests, setSelectedBloodTests] = useState([]);
    const [selectedPhysicalTests, setSelectedPhysicalTests] = useState([]);
    const [selectedCognitiveTests, setSelectedCognitiveTests] = useState([]);
    const [recommendedTests, setRecommendedTests] = useState([]); // From questionnaire
    const [tempSelectedModules, setTempSelectedModules] = useState([]); // For questionnaire step

    useEffect(() => {
        setInternalStep(getStepFromPath());
    }, [location.pathname]);

    const setStep = (newStep) => {
        navigate(`/flow/${newStep}`);
    };

    // Toggle functions
    const toggleBloodTest = (testId) => {
        if (selectedBloodTests.includes(testId)) {
            setSelectedBloodTests(selectedBloodTests.filter(t => t !== testId));
        } else {
            setSelectedBloodTests([...selectedBloodTests, testId]);
        }
    };

    const togglePhysicalTest = (testId) => {
        const test = PHYSICAL_TESTS.find(t => t.id === testId);
        if (test?.included) return; // Can't toggle included tests
        if (selectedPhysicalTests.includes(testId)) {
            setSelectedPhysicalTests(selectedPhysicalTests.filter(t => t !== testId));
        } else {
            setSelectedPhysicalTests([...selectedPhysicalTests, testId]);
        }
    };

    const toggleCognitiveTest = (testId) => {
        if (selectedCognitiveTests.includes(testId)) {
            setSelectedCognitiveTests(selectedCognitiveTests.filter(t => t !== testId));
        } else {
            setSelectedCognitiveTests([...selectedCognitiveTests, testId]);
        }
    };

    // Calculate prices
    const calculateBloodPrice = () => {
        let total = 0;
        // Base tests always included
        BLOOD_TEST_GROUPS.find(g => g.id === 'base')?.tests.forEach(testId => {
            if (LAB_COSTS[testId]) total += LAB_COSTS[testId].price;
        });
        // Selected extras
        selectedBloodTests.forEach(testId => {
            if (LAB_COSTS[testId]) total += LAB_COSTS[testId].price;
        });
        return total;
    };

    const calculatePhysicalPrice = () => {
        return selectedPhysicalTests.reduce((sum, testId) => {
            const test = PHYSICAL_TESTS.find(t => t.id === testId);
            return sum + (test?.price || 0);
        }, 0);
    };

    const calculateCognitivePrice = () => {
        return selectedCognitiveTests.reduce((sum, testId) => {
            const test = COGNITIVE_TESTS.find(t => t.id === testId);
            return sum + (test?.price || 0);
        }, 0);
    };

    const calculateTotal = () => {
        const base = SERVICE_FEE + calculateBloodPrice() + calculatePhysicalPrice() + calculateCognitivePrice();
        return Math.round(base * frequency.multiplier * (1 - frequency.discount));
    };

    // Preselect tests based on questionnaire answers
    const processQuestionnaireAnswers = (selectedModuleIds) => {
        const recommended = [];
        // Map questionnaire to blood tests
        if (selectedModuleIds.includes('cardio')) {
            recommended.push('apob', 'homocystein');
            setSelectedBloodTests(prev => [...new Set([...prev, 'apob', 'homocystein'])]);
        }
        if (selectedModuleIds.includes('diabetes')) {
            recommended.push('hba1c', 'cpeptid');
            setSelectedBloodTests(prev => [...new Set([...prev, 'hba1c', 'cpeptid'])]);
        }
        if (selectedModuleIds.includes('liver')) {
            recommended.push('bilirubin', 'alp');
            setSelectedBloodTests(prev => [...new Set([...prev, 'bilirubin', 'alp'])]);
        }
        if (selectedModuleIds.includes('vitamins')) {
            recommended.push('vitD', 'vitB12', 'folat', 'zinek');
            setSelectedBloodTests(prev => [...new Set([...prev, 'vitD', 'vitB12', 'folat', 'zinek'])]);
        }
        if (selectedModuleIds.includes('iron')) {
            recommended.push('ferritin');
            setSelectedBloodTests(prev => [...new Set([...prev, 'ferritin'])]);
        }
        if (selectedModuleIds.includes('thyroid')) {
            recommended.push('ft4', 'anti_tpo');
            setSelectedBloodTests(prev => [...new Set([...prev, 'ft4', 'anti_tpo'])]);
        }
        setRecommendedTests(recommended);
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

    // Toggle function for questionnaire
    const toggleModule = (id) => {
        if (tempSelectedModules.includes(id)) {
            setTempSelectedModules(tempSelectedModules.filter(m => m !== id));
        } else {
            setTempSelectedModules([...tempSelectedModules, id]);
        }
    };

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

    // Step 3: NEW Tabbed Order Configurator
    if (internalStep === 3) {
        // Test card component
        const TestCard = ({ test, isSelected, isIncluded, isRecommended, onToggle }) => (
            <div
                onClick={() => !isIncluded && onToggle(test.id)}
                className={`p-4 rounded-xl border transition-all ${isIncluded ? 'cursor-default' : 'cursor-pointer hover:shadow-md'} 
                    ${isIncluded ? 'bg-tertiary-container/30 border-tertiary/30' :
                        isSelected ? 'bg-primary-container border-primary' :
                            'bg-surface-container-low border-surface-outline-variant hover:border-surface-outline'}`}
            >
                <div className="flex items-start gap-4">
                    <div className={`mt-1 w-6 h-6 rounded flex items-center justify-center flex-shrink-0 
                        ${isIncluded ? 'bg-tertiary text-tertiary-on' :
                            isSelected ? 'bg-primary text-primary-on' :
                                'border-2 border-surface-outline'}`}>
                        {(isIncluded || isSelected) && <Icon name="check" size={16} />}
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                            <Icon name={test.icon} size={18} className={isSelected || isIncluded ? 'text-primary' : 'text-surface-on-variant'} />
                            <span className={`font-bold ${isIncluded ? 'text-tertiary' : 'text-surface-on'}`}>{test.name}</span>
                            {isIncluded && <span className="text-xs px-2 py-0.5 rounded-full bg-tertiary/20 text-tertiary font-medium">V ceně</span>}
                            {isRecommended && <span className="text-xs px-2 py-0.5 rounded-full bg-secondary-container text-secondary-on-container font-medium">Doporučeno</span>}
                        </div>
                        <div className="text-sm text-surface-on-variant mt-1">{test.desc}</div>
                    </div>
                    {!isIncluded && test.price > 0 && (
                        <div className="text-sm font-bold text-surface-on-variant flex-shrink-0">
                            +{test.price} Kč
                        </div>
                    )}
                </div>
            </div>
        );

        // Blood test card for lab markers
        const BloodTestCard = ({ testId, isSelected, isIncluded, isRecommended }) => {
            const test = LAB_COSTS[testId];
            if (!test) return null;
            return (
                <div
                    onClick={() => !isIncluded && toggleBloodTest(testId)}
                    className={`p-3 rounded-lg border transition-all ${isIncluded ? 'cursor-default' : 'cursor-pointer hover:shadow-sm'} 
                        ${isIncluded ? 'bg-tertiary-container/30 border-tertiary/30' :
                            isSelected ? 'bg-primary-container border-primary' :
                                'bg-surface border-surface-outline-variant hover:border-surface-outline'}`}
                >
                    <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 
                            ${isIncluded ? 'bg-tertiary text-tertiary-on' :
                                isSelected ? 'bg-primary text-primary-on' :
                                    'border border-surface-outline'}`}>
                            {(isIncluded || isSelected) && <Icon name="check" size={14} />}
                        </div>
                        <div className="flex-1 min-w-0">
                            <span className={`text-sm ${isIncluded ? 'text-tertiary' : 'text-surface-on'}`}>{test.name}</span>
                            {isRecommended && <span className="ml-2 text-xs px-1.5 py-0.5 rounded bg-secondary-container text-secondary-on-container">!</span>}
                        </div>
                        {!isIncluded && (
                            <span className="text-xs font-medium text-surface-on-variant">+{test.price} Kč</span>
                        )}
                    </div>
                </div>
            );
        };

        return (
            <div className="max-w-7xl mx-auto px-4 py-12 animate-fade-in-up">
                <button onClick={() => setStep(path === 'care' ? 2.5 : 2)} className="mb-8 flex items-center gap-2 text-surface-on-variant hover:text-surface-on transition-opacity">
                    <Icon name="arrow_back" /> Zpět
                </button>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main content */}
                    <div className="lg:col-span-2 space-y-6">
                        <div>
                            <h2 className="text-4xl font-display mb-2 text-surface-on">Sestavte si balíček</h2>
                            <p className="text-surface-on-variant text-lg">Vyberte si testy ze tří kategorií. Základ je vždy v ceně.</p>
                        </div>

                        {/* Tabs */}
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
                                    {tab.id === 'blood' && selectedBloodTests.length > 0 && (
                                        <span className="text-xs px-2 py-0.5 rounded-full bg-primary text-primary-on">{selectedBloodTests.length}</span>
                                    )}
                                    {tab.id === 'body' && selectedPhysicalTests.length > 0 && (
                                        <span className="text-xs px-2 py-0.5 rounded-full bg-primary text-primary-on">{selectedPhysicalTests.length}</span>
                                    )}
                                    {tab.id === 'head' && selectedCognitiveTests.length > 0 && (
                                        <span className="text-xs px-2 py-0.5 rounded-full bg-primary text-primary-on">{selectedCognitiveTests.length}</span>
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* Tab Content */}
                        <div className="rounded-3xl bg-surface-container-low border border-surface-outline-variant p-6 min-h-[400px]">
                            {/* Blood Tab */}
                            {activeTab === 'blood' && (
                                <div className="space-y-6">
                                    {BLOOD_TEST_GROUPS.map(group => {
                                        if (group.genderFilter && group.genderFilter !== client.gender) return null;
                                        const hasTests = group.tests?.length > 0 || group.extras?.length > 0;
                                        if (!hasTests) return null;

                                        return (
                                            <div key={group.id} className="space-y-3">
                                                <div className="flex items-center gap-2">
                                                    {group.icon && <Icon name={group.icon} className="text-primary" size={20} />}
                                                    <h4 className="font-bold text-surface-on">{group.name}</h4>
                                                    {group.included && <span className="text-xs px-2 py-0.5 rounded-full bg-tertiary-container text-tertiary font-medium">Vždy v ceně</span>}
                                                </div>
                                                <div className="grid sm:grid-cols-2 gap-2">
                                                    {group.tests?.map(testId => (
                                                        <BloodTestCard
                                                            key={testId}
                                                            testId={testId}
                                                            isIncluded={group.included}
                                                            isSelected={selectedBloodTests.includes(testId)}
                                                            isRecommended={recommendedTests.includes(testId)}
                                                        />
                                                    ))}
                                                    {group.extras?.map(testId => (
                                                        <BloodTestCard
                                                            key={testId}
                                                            testId={testId}
                                                            isIncluded={false}
                                                            isSelected={selectedBloodTests.includes(testId)}
                                                            isRecommended={recommendedTests.includes(testId)}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}

                            {/* Body Tab */}
                            {activeTab === 'body' && (
                                <div className="space-y-4">
                                    <p className="text-surface-on-variant text-sm mb-4">
                                        Fyzické testy prováděné přímo u vás doma naší sestrou.
                                    </p>
                                    {PHYSICAL_TESTS.map(test => (
                                        <TestCard
                                            key={test.id}
                                            test={test}
                                            isIncluded={test.included}
                                            isSelected={selectedPhysicalTests.includes(test.id)}
                                            isRecommended={false}
                                            onToggle={togglePhysicalTest}
                                        />
                                    ))}
                                </div>
                            )}

                            {/* Head Tab */}
                            {activeTab === 'head' && (
                                <div className="space-y-4">
                                    <p className="text-surface-on-variant text-sm mb-4">
                                        Kognitivní a smyslové testy pro kompletní geriatrický screening.
                                    </p>
                                    {COGNITIVE_TESTS.map(test => (
                                        <TestCard
                                            key={test.id}
                                            test={test}
                                            isIncluded={false}
                                            isSelected={selectedCognitiveTests.includes(test.id)}
                                            isRecommended={false}
                                            onToggle={toggleCognitiveTest}
                                        />
                                    ))}
                                </div>
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

                            {/* Price breakdown */}
                            <div className="space-y-3 mb-6 pb-6 border-b border-surface-outline-variant text-sm">
                                <div className="flex justify-between">
                                    <span className="text-surface-on-variant flex items-center gap-2">
                                        <Icon name="home_health" size={16} /> Služba
                                    </span>
                                    <span className="font-bold text-surface-on">{SERVICE_FEE} Kč</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-surface-on-variant flex items-center gap-2">
                                        <Icon name="bloodtype" size={16} className="text-red-500" /> Krev
                                    </span>
                                    <span className="font-bold text-surface-on">{calculateBloodPrice()} Kč</span>
                                </div>
                                {calculatePhysicalPrice() > 0 && (
                                    <div className="flex justify-between text-primary">
                                        <span className="flex items-center gap-2">
                                            <Icon name="accessibility_new" size={16} /> Tělo
                                        </span>
                                        <span className="font-bold">+{calculatePhysicalPrice()} Kč</span>
                                    </div>
                                )}
                                {calculateCognitivePrice() > 0 && (
                                    <div className="flex justify-between text-primary">
                                        <span className="flex items-center gap-2">
                                            <Icon name="psychology" size={16} /> Hlava
                                        </span>
                                        <span className="font-bold">+{calculateCognitivePrice()} Kč</span>
                                    </div>
                                )}
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

                            {/* Quick stats */}
                            <div className="mt-6 pt-6 border-t border-surface-outline-variant grid grid-cols-3 gap-2 text-center">
                                <div>
                                    <div className="text-2xl font-bold text-surface-on">
                                        {BLOOD_TEST_GROUPS.find(g => g.id === 'base')?.tests.length + selectedBloodTests.length}
                                    </div>
                                    <div className="text-xs text-surface-on-variant">Krevních testů</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-surface-on">
                                        {PHYSICAL_TESTS.filter(t => t.included).length + selectedPhysicalTests.length}
                                    </div>
                                    <div className="text-xs text-surface-on-variant">Fyzických testů</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-surface-on">
                                        {selectedCognitiveTests.length}
                                    </div>
                                    <div className="text-xs text-surface-on-variant">Kognitivních</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
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
