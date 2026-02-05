import React from 'react';
import { Icon } from '../ui';
import { BLOOD_AREAS, BODY_AREAS, HEAD_AREAS, FREQUENCIES, LABS } from '../../data/constants';

export const CalculatorControls = ({ 
  settings, 
  setSettings,
  frequencyId,
  setFrequencyId,
  selectedLabId,
  setSelectedLabId,
  activeBase, 
  activeExp, 
  onToggleBase, 
  onToggleExp,
  onApplyScenario 
}) => {

  const scenarios = [
    { 
        id: 'man40', 
        label: 'Muž 40 let (Základ)', 
        desc: 'Základní prevence bez drahých vitamínů a speciálních testů.',
        icon: 'male', 
        gender: 'male', 
        age: 40, 
        expandAll: false 
    },
    { 
        id: 'woman40base', 
        label: 'Žena 40 let (Základ)', 
        desc: 'Základní prevence se zaměřením na ženské zdraví (Štítná žláza).',
        icon: 'female', 
        gender: 'female', 
        age: 40, 
        expandAll: false 
    },
    { 
        id: 'woman40', 
        label: 'Žena 40 let (Komplet)', 
        desc: 'Včetně štítné žlázy a vitamínového profilu.',
        icon: 'female', 
        gender: 'female', 
        age: 40, 
        expandAll: true 
    },
    { 
        id: 'senior65', 
        label: 'Senior 65+ (Péče)', 
        desc: 'Maximální péče: ledviny, kognitivní testy a fyzická zdatnost.',
        icon: 'elderly', 
        gender: 'female', 
        age: 65, 
        expandAll: true 
    },
    { 
        id: 'minimal', 
        label: 'Metabolický start', 
        desc: 'Pouze cukr, játra a srdce. Nejlevnější vstupní varianta.',
        icon: 'shutter_speed', 
        customLogic: (area) => ['cardio', 'liver', 'diabetes'].includes(area.id)
    },
    { 
        id: 'athlete', 
        label: 'Sportovec', 
        desc: 'Důraz na regeneraci (Mg), játra a krevní obraz. Vitamíny volitelné.',
        icon: 'fitness_center', 
        gender: 'male',
        age: 30,
        customLogic: (area) => ['energy', 'liver', 'heart', 'minerals', 'bones', 'composition', 'strength'].includes(area.id),
        expandLogic: (area) => area.id === 'energy'
    },
    { 
        id: 'manager', 
        label: 'Manažer (Stres)', 
        desc: 'Srdce (Detail), Játra, Energie. Prevence civilizačních chorob.',
        icon: 'business_center', 
        gender: 'male',
        age: 45,
        customLogic: (area) => ['cardio', 'liver', 'energy', 'diabetes', 'blood_pressure'].includes(area.id),
        expandLogic: (area) => area.id === 'cardio'
    },
    { 
        id: 'vegan', 
        label: 'Vegan / Vegetarián', 
        desc: 'Kontrola deficitů: B12, Železo, Vápník, Bílkoviny.',
        icon: 'eco', 
        gender: 'female',
        age: 30,
        customLogic: (area) => ['energy', 'bones', 'immunity', 'minerals'].includes(area.id),
        expandLogic: (area) => ['energy', 'immunity'].includes(area.id)
    },
    { 
        id: 'biohacker', 
        label: 'Biohacker (Ultimate)', 
        desc: 'Všechny dostupné markery. Kompletní obraz těla.',
        icon: 'science', 
        gender: 'male',
        age: 35,
        expandAll: true
    }
  ];

  const handleSettingChange = (key, val) => {
    setSettings(prev => ({ ...prev, [key]: parseInt(val) || 0 }));
  };

  const renderModuleRow = (area, type) => {
    const isBase = activeBase[area.id];
    const isExp = activeExp[area.id];
    const hasExp = !!area.expansion;

    return (
      <div key={area.id} className="flex items-center justify-between p-3 bg-surface-container rounded-xl border border-surface-outline-variant/50 hover:border-primary/30 transition-colors">
        <div className="flex items-center gap-3 flex-1">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${activeBase[area.id] ? 'bg-primary/20 text-primary' : 'bg-surface-container-high text-surface-outline'}`}>
            <Icon name={area.icon} size={18} />
          </div>
          <div>
            <div className="font-medium text-sm text-surface-on">{area.name}</div>
            <div className="text-[10px] text-surface-on-variant">{area.baseDescription?.slice(0, 50)}...</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onToggleBase(area.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border ${
              isBase 
                ? 'bg-primary text-surface-on-inverse border-primary shadow-sm' 
                : 'bg-transparent text-surface-on-variant border-surface-outline hover:bg-surface-container-high'
            }`}
          >
            {area.price > 0 ? `${area.price} Kč` : 'V ceně'}
          </button>

          {hasExp && (
             <button
             onClick={() => onToggleExp(area.id)}
             disabled={!isBase}
             className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border flex flex-col items-center leading-none gap-0.5 ${
               isExp
                 ? 'bg-tertiary text-surface-on-inverse border-tertiary shadow-sm' 
                 : !isBase 
                    ? 'opacity-30 cursor-not-allowed bg-surface-container-high border-surface-outline'
                    : 'bg-transparent text-tertiary border-tertiary/40 border-dashed hover:bg-tertiary/5'
             }`}
           >
             <span>+ {area.expansion.name.split(' ')[0]}..</span>
             <span className="text-[9px] opacity-80">+{area.expansion.price} Kč</span>
           </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* 1. Scenarios Header */}
      <div>
        <h3 className="text-xs font-bold text-surface-on-variant uppercase tracking-widest mb-3 px-1">Modelové scénáře (Rychlá volba)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {scenarios.map(s => (
            <button
                key={s.id}
                onClick={() => onApplyScenario(s)}
                className="flex items-start gap-3 p-4 rounded-2xl bg-surface-container-high hover:bg-primary/10 hover:text-primary transition-all text-left border border-transparent hover:border-primary/20 group"
            >
                <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Icon name={s.icon} size={24} />
                </div>
                <div className="flex-1">
                    <div className="text-sm font-bold text-surface-on group-hover:text-primary">{s.label}</div>
                    <div className="text-[11px] text-surface-on-variant leading-tight mt-1">{s.desc}</div>
                </div>
            </button>
            ))}
        </div>
      </div>

      {/* 1.5 Frequency & Lab Switch */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Frequency */}
        <div className="bg-surface-container-low p-4 rounded-2xl border border-surface-outline-variant/60">
            <h3 className="text-xs font-bold text-surface-on-variant uppercase tracking-wider mb-3 flex items-center gap-2">
                <Icon name="calendar_month" size={14} />
                Frekvence
            </h3>
            <div className="flex gap-2">
                {FREQUENCIES.map(f => (
                    <button
                        key={f.id}
                        onClick={() => setFrequencyId(f.id)}
                        className={`flex-1 py-2 px-3 rounded-xl border text-sm font-medium transition-all ${
                            frequencyId === f.id
                            ? 'bg-tertiary text-surface-on-inverse border-tertiary shadow-sm'
                            : 'bg-surface hover:bg-surface-container-high border-surface-outline-variant text-surface-on-variant'
                        }`}
                    >
                        {f.label}
                        {f.discount > 0 && <span className="block text-[9px] opacity-80">-{f.discount * 100}%</span>}
                    </button>
                ))}
            </div>
        </div>

        {/* Laboratory Switch */}
        <div className="bg-surface-container-low p-4 rounded-2xl border border-surface-outline-variant/60">
            <h3 className="text-xs font-bold text-surface-on-variant uppercase tracking-wider mb-3 flex items-center gap-2">
                <Icon name="science" size={14} />
                Dodavatel (Laboratoř)
            </h3>
            <div className="flex gap-2">
                {LABS.map(lab => (
                    <button
                        key={lab.id}
                        onClick={() => setSelectedLabId(lab.id)}
                        className={`flex-1 py-2 px-2 rounded-xl border text-xs font-bold transition-all flex flex-col items-center justify-center gap-1 ${
                            selectedLabId === lab.id
                            ? lab.color // Use specific color class when active
                            : 'bg-surface hover:bg-surface-container-high border-surface-outline-variant text-surface-on-variant grayscale opacity-70 hover:opacity-100 hover:grayscale-0'
                        } ${selectedLabId === lab.id ? 'ring-2 ring-offset-1 ring-offset-surface' : ''}`}
                    >
                        {lab.name}
                    </button>
                ))}
            </div>
        </div>
      </div>

      {/* 2. Global Costs Settings */}
      <div className="bg-surface-container-low p-5 rounded-2xl border border-primary/10 shadow-sm">
        <h3 className="text-xs font-bold text-primary uppercase tracking-wider mb-4 flex items-center gap-2">
          <Icon name="tune" size={16} />
          Globální ekonomika (Náklady)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="space-y-1">
            <label className="block text-[10px] font-bold uppercase text-surface-on-variant px-1">Doprava/Logistika</label>
            <div className="relative">
              <input 
                type="number" 
                value={settings.serviceFee} 
                onChange={(e) => handleSettingChange('serviceFee', e.target.value)}
                className="w-full bg-surface border border-surface-outline-variant rounded-xl py-2 px-3 text-sm text-surface-on focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all"
              />
              <span className="absolute right-3 top-2 text-xs text-surface-on-variant">Kč</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="block text-[10px] font-bold uppercase text-surface-on-variant px-1">Sestra (Odběr)</label>
            <div className="relative">
              <input 
                type="number" 
                value={settings.nurseCost} 
                onChange={(e) => handleSettingChange('nurseCost', e.target.value)}
                className="w-full bg-surface border border-surface-outline-variant rounded-xl py-2 px-3 text-sm text-surface-on focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all"
              />
               <span className="absolute right-3 top-2 text-xs text-surface-on-variant">Kč</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="block text-[10px] font-bold uppercase text-surface-on-variant px-1">Rezerva</label>
            <div className="relative">
              <input 
                type="number" 
                value={settings.logisticsCost} 
                onChange={(e) => handleSettingChange('logisticsCost', e.target.value)}
                className="w-full bg-surface border border-surface-outline-variant rounded-xl py-2 px-3 text-sm text-surface-on focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all"
              />
               <span className="absolute right-3 top-2 text-xs text-surface-on-variant">Kč</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="block text-[10px] font-bold uppercase text-surface-on-variant px-1">Sazba DPH</label>
            <div className="relative">
              <select 
                value={settings.vatRate} 
                onChange={(e) => handleSettingChange('vatRate', e.target.value)}
                className="w-full bg-surface border border-surface-outline-variant rounded-xl py-2 px-3 text-sm text-surface-on focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all appearance-none"
              >
                <option value="0">0 % (Neplátce)</option>
                <option value="12">12 % (Snížená)</option>
                <option value="21">21 % (Základní)</option>
              </select>
              <Icon name="expand_more" size={16} className="absolute right-3 top-2.5 text-surface-on-variant pointer-events-none" />
            </div>
          </div>
        </div>
        <p className="text-[10px] text-surface-on-variant mt-3 italic">
            * Ostatní náklady (InBody, Tlak, SPPB) jsou započítány přímo u konkrétních modulů níže.
        </p>
      </div>

      {/* 3. Module Selection */}
      <div className="space-y-6">
        <div>
            <div className="flex items-center justify-between mb-3 px-1">
                <h4 className="text-sm font-bold text-surface-on uppercase tracking-wider">Krevní moduly</h4>
                <span className="text-[10px] text-surface-on-variant font-medium">ZÁKLAD (X) vs ROZŠÍŘENÍ (Y)</span>
            </div>
            <div className="space-y-2">
                {BLOOD_AREAS.map(a => renderModuleRow(a, 'blood'))}
            </div>
        </div>

        <div>
            <h4 className="text-sm font-bold text-surface-on uppercase tracking-wider mb-3 px-1 mt-6">Tělo a Mysl (Služby)</h4>
            <div className="space-y-2">
                {BODY_AREAS.filter(a => !a.hidden).map(a => renderModuleRow(a, 'body'))}
                {HEAD_AREAS.filter(a => !a.hidden).map(a => renderModuleRow(a, 'head'))}
            </div>
        </div>
      </div>
    </div>
  );
};
