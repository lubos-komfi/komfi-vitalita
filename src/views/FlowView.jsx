import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Icon } from '../components/ui';
import { LAB_COSTS, HEALTH_CATEGORIES, FREQUENCIES, SERVICE_FEE } from '../data/constants';

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
    const [selectedModules, setSelectedModules] = useState([]);
    const [frequency, setFrequency] = useState(FREQUENCIES[1]);

    useEffect(() => {
        setInternalStep(getStepFromPath());
    }, [location.pathname]);

    const setStep = (newStep) => {
        navigate(`/flow/${newStep}`);
    };

    const calculateTotal = (gender, selectedModules) => {
        let total = SERVICE_FEE;
        HEALTH_CATEGORIES.forEach(cat => {
            cat.base.forEach(itemKey => {
                if (typeof itemKey === 'string') {
                    if (itemKey === 'psa' && gender === 'female') return;
                    if (itemKey === 'tsh' && gender === 'male') return;
                    if (LAB_COSTS[itemKey]) total += LAB_COSTS[itemKey].price;
                }
            });
        });
        selectedModules.forEach(modId => {
            const category = HEALTH_CATEGORIES.find(c => c.module && c.module.id === modId);
            if (category && category.module) {
                category.module.markers.forEach(m => { if (LAB_COSTS[m]) total += LAB_COSTS[m].price; });
            }
        });
        return Math.round(total);
    };

    const calculatePrice = () => {
        let total = calculateTotal(client.gender, selectedModules);
        return Math.round(total * frequency.multiplier * (1 - frequency.discount));
    };

    const toggleModule = (id) => {
        if (selectedModules.includes(id)) { setSelectedModules(selectedModules.filter(m => m !== id)); }
        else { setSelectedModules([...selectedModules, id]); }
    };

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
                <button onClick={() => { setPath('prevention'); setStep(2); setSelectedModules([]); }} className="p-10 rounded-3xl text-left bg-surface-container-low border border-surface-outline-variant hover:border-primary transition-all hover:shadow-xl relative overflow-hidden group">
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
                <button onClick={() => { setPath('care'); setStep(2); setSelectedModules([]); }} className="p-10 rounded-3xl text-left bg-surface-container-low border border-surface-outline-variant hover:border-primary transition-all hover:shadow-xl relative overflow-hidden group">
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
    if (internalStep === 2.5) return (
        <div className="max-w-3xl mx-auto px-4 py-12 animate-fade-in-up">
            <button onClick={() => setStep(2)} className="mb-8 flex items-center gap-2 text-surface-on-variant hover:text-surface-on transition-opacity">
                <Icon name="arrow_back" /> Zpět
            </button>
            <h2 className="text-3xl font-display mb-8 text-center text-surface-on">Co vás trápí?</h2>
            <div className="space-y-4">
                {HEALTH_CATEGORIES.filter(c => c.module).map(cat => {
                    const mod = cat.module;
                    const isSelected = selectedModules.includes(mod.id);
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
            <button onClick={() => setStep(3)} className="w-full mt-8 py-5 rounded-2xl text-primary-on font-bold text-lg bg-primary shadow-xl">Zobrazit můj balíček</button>
        </div>
    );

    // Step 3: Program configuration
    if (internalStep === 3) return (
        <div className="max-w-7xl mx-auto px-4 py-12 animate-fade-in-up">
            <button onClick={() => setStep(path === 'care' ? 2.5 : 2)} className="mb-8 flex items-center gap-2 text-surface-on-variant hover:text-surface-on transition-opacity">
                <Icon name="arrow_back" /> Zpět
            </button>
            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <div>
                        <h2 className="text-4xl font-display mb-2 text-surface-on">Sestavení programu</h2>
                        <p className="text-surface-on-variant text-lg">Základ je vždy v ceně. Moduly si můžete přidat.</p>
                    </div>
                    {HEALTH_CATEGORIES.map(cat => {
                        if (cat.id === 'prostate' && client.gender !== 'male') return null;
                        if (cat.id === 'thyroid' && client.gender === 'male' && !cat.module) return null;
                        const mod = cat.module;
                        const isActive = mod ? selectedModules.includes(mod.id) : false;
                        const hasBase = cat.base.some(b => typeof b === 'object' || (b !== 'psa' && b !== 'tsh') || (b === 'psa' && client.gender === 'male') || (b === 'tsh' && client.gender === 'female'));
                        if (!hasBase && !mod) return null;
                        return (
                            <div key={cat.id} className="rounded-3xl bg-surface-container-low border border-surface-outline-variant overflow-hidden">
                                <div className="p-6 border-b border-surface-outline-variant bg-surface-container flex items-center gap-3">
                                    <Icon name={cat.icon} className="text-primary" />
                                    <h3 className="font-display text-xl text-surface-on">{cat.title}</h3>
                                </div>
                                <div className="p-6">
                                    {hasBase && (
                                        <div className="mb-4">
                                            <div className="text-xs font-bold uppercase tracking-widest text-tertiary mb-3 flex items-center gap-2">
                                                <Icon name="check_circle" size={14} /> Vždy v ceně
                                            </div>
                                            <div className="grid sm:grid-cols-2 gap-2 text-sm text-surface-on-variant">
                                                {cat.base.map((b, i) => {
                                                    const key = typeof b === 'string' ? b : null;
                                                    const label = typeof b === 'string' ? LAB_COSTS[b]?.name : b.name;
                                                    if (key === 'psa' && client.gender === 'female') return null;
                                                    if (key === 'tsh' && client.gender === 'male') return null;
                                                    return <div key={i} className="flex gap-2 items-center"><div className="w-1.5 h-1.5 rounded-full bg-tertiary"></div>{label}</div>
                                                })}
                                            </div>
                                        </div>
                                    )}
                                    {mod && (
                                        <div className={`mt-6 p-4 rounded-xl border transition-all ${isActive ? 'bg-primary-container border-primary' : 'bg-surface border-surface-outline-variant'}`}>
                                            <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleModule(mod.id)}>
                                                <div>
                                                    <div className="font-bold flex items-center gap-2 text-surface-on">
                                                        {isActive ? <Icon name="check_box" className="text-primary" /> : <Icon name="check_box_outline_blank" className="text-surface-on-variant" />}
                                                        Rozšířit: {mod.name}
                                                    </div>
                                                    <div className="text-sm text-surface-on-variant ml-8">{mod.desc}</div>
                                                </div>
                                                <div className="text-sm font-bold text-surface-on-variant ml-4">+{mod.markers.reduce((s, m) => s + LAB_COSTS[m].price, 0)} Kč</div>
                                            </div>
                                            {isActive && path === 'care' && <div className="mt-3 ml-8 text-xs text-secondary font-medium bg-secondary-container p-2 rounded-lg inline-block">Doporučeno na základě dotazníku.</div>}
                                            {isActive && <div className="mt-3 ml-8 pt-3 border-t border-surface-outline-variant text-sm text-surface-on-variant grid sm:grid-cols-2 gap-1">{mod.markers.map(m => <div key={m}>+ {LAB_COSTS[m].name}</div>)}</div>}
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="lg:col-span-1">
                    <div className="sticky top-24 p-8 rounded-3xl bg-surface-container-low border border-surface-outline-variant shadow-xl">
                        <h3 className="font-display text-2xl mb-2 text-surface-on">Nastavení</h3>
                        <div className="text-xs text-surface-on-variant mb-6 flex gap-3">
                            <span className="flex items-center gap-1"><Icon name="bloodtype" size={14} /> Odběry</span>
                            <span className="flex items-center gap-1"><Icon name="scale" size={14} /> InBody</span>
                            <span className="flex items-center gap-1"><Icon name="monitor_heart" size={14} /> Tlak</span>
                            <span className="flex items-center gap-1"><Icon name="front_hand" size={14} /> Síla</span>
                        </div>
                        <div className="flex p-1 rounded-xl bg-surface-container-high mb-6 relative">
                            {FREQUENCIES.map(f => (
                                <button key={f.id} onClick={() => setFrequency(f)} className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all relative z-10 flex flex-col items-center justify-center gap-1 ${frequency.id === f.id ? 'bg-surface text-primary shadow-sm' : 'text-surface-on-variant'}`}>
                                    <span>{f.label}</span>
                                    {f.discount > 0 && <span className="text-[9px] px-1.5 rounded-full bg-tertiary-container text-tertiary-on-container">-{Math.round(f.discount * 100)}%</span>}
                                </button>
                            ))}
                        </div>
                        <div className="space-y-3 mb-6 pb-6 border-b border-surface-outline-variant text-sm">
                            <div className="flex justify-between">
                                <span className="text-surface-on-variant">Základní prevence</span>
                                <span className="font-bold text-surface-on">V ceně</span>
                            </div>
                            {selectedModules.map(modId => {
                                const cat = HEALTH_CATEGORIES.find(c => c.module && c.module.id === modId);
                                if (!cat) return null;
                                const mod = cat.module;
                                let price = mod.markers.reduce((s, m) => s + LAB_COSTS[m].price, 0);
                                return (
                                    <div key={modId} className="flex justify-between text-primary">
                                        <span className="font-bold">+ {mod.name}</span>
                                        <span className="font-bold">{price} Kč</span>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="flex justify-between items-end mb-8">
                            <span className="text-sm uppercase font-bold tracking-widest text-surface-on-variant">Celkem</span>
                            <span className="text-4xl font-display text-primary">{calculatePrice()} Kč</span>
                        </div>
                        <button onClick={() => setStep(4)} className="w-full py-4 rounded-xl bg-primary text-primary-on font-bold">Objednat termín</button>
                    </div>
                </div>
            </div>
        </div>
    );

    // Step 4: Success
    if (internalStep === 4) return (
        <div className="max-w-xl mx-auto py-32 text-center animate-fade-in-up">
            <Icon name="celebration" size={100} className="text-primary mb-8 animate-bounce" />
            <h2 className="text-5xl font-display mb-6 text-surface-on">Perfektní!</h2>
            <button onClick={() => window.location.reload()} className="border-b-2 border-current font-bold text-lg pb-1 text-primary">Zpět na úvod</button>
        </div>
    );

    return null;
};
