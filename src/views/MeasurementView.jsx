// src/views/MeasurementView.jsx
import React from 'react';
import { Icon } from '../components/ui';

export const MeasurementView = () => {
  const rows = [
    { type: 'header', label: '1. FYZICKÝ STANDARD (Vždy v ceně každé návštěvy)' },
    { type: 'row', label: 'Sestra do domu (Odběr + Asistence)', all: true },
    { type: 'row', label: 'Krevní tlak a puls (Trend)', all: true },
    { type: 'row', label: 'InBody (Svaly, Tuk, Voda)', all: true },
    { type: 'row', label: 'Grip Strength (Síla stisku)', all: true },
    { type: 'header', label: '2. LABORATORNÍ ZÁKLAD (Vždy v ceně)' },
    { type: 'row', label: 'Krevní obraz + Destičky', all: true },
    { type: 'row', label: 'Glukóza (Cukr)', all: true },
    { type: 'row', label: 'Základní moč chemicky', all: true },
    { type: 'header', label: '3. SPECIFICKÁ DIAGNOSTIKA (Dle profilu)' },
    { type: 'row', label: 'Lipidový profil (Cholesterol, Tuky)', p1: true, p2: false, p3: false, note: 'V ostatních dle věku (Smart Logic)' },
    { type: 'row', label: 'Jaterní testy (ALT, AST)', p1: true, p2: true, p3: 'Komplet' },
    { type: 'row', label: 'Ledviny (Kreatinin, GFR)', p1: true, p2: false, p3: 'Komplet' },
    { type: 'row', label: 'Štítná žláza (TSH, fT4)', p1: false, p2: true, p3: false, note: 'Ženy do 40 let vždy' },
    { type: 'row', label: 'Zásoby železa (Ferritin)', p1: false, p2: true, p3: false, note: 'Ženy do 40 let vždy' },
    { type: 'row', label: 'Vitamín D', p1: true, p2: false, p3: false },
    { type: 'row', label: 'Vitamín B12 + Folát', p1: false, p2: true, p3: false },
    { type: 'row', label: 'Minerály (Mg, K, Na)', p1: false, p2: true, p3: false },
    { type: 'row', label: 'Zánět (CRP)', p1: false, p2: false, p3: true },
    { type: 'row', label: 'Kyselina močová (Dna)', p1: false, p2: false, p3: true },
    { type: 'row', label: 'Nutriční stav (Albumin)', p1: false, p2: false, p3: true },
    { type: 'header', label: '4. SMART LOGIC (Automatické přídavky ZDARMA)' },
    { type: 'smart', label: 'PSA (Prostata)', condition: 'Muži 50+' },
    { type: 'smart', label: 'Kosti (Vápník, Fosfor)', condition: 'Ženy 40+' },
    { type: 'smart', label: 'Ferritin (Železo)', condition: 'Ženy 18-39' },
    { type: 'smart', label: 'TSH (Štítná žláza)', condition: 'Ženy 18-39' },
    { type: 'smart', label: 'Lipidy (Cholesterol)', condition: 'Muži 40-50' },
    { type: 'smart', label: 'Homocystein', condition: 'Muži 60+' },
  ];

  const profiles = [
    { name: 'PREVENCE', icon: 'shield', color: 'text-primary' },
    { name: 'ROVNOVÁHA', icon: 'balance', color: 'text-secondary' },
    { name: 'PÉČE', icon: 'local_hospital', color: 'text-error' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 animate-fade-in-up">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-display mb-4 text-surface-on">Detailní matice měření</h2>
        <p className="text-surface-on-variant">Kompletní přehled toho, co měříme.</p>
      </div>
      <div className="rounded-3xl overflow-hidden shadow-xl bg-surface-container-low border border-surface-outline-variant">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container">
              <th className="p-6 font-display text-lg w-1/3 text-surface-on">Položka / Měření</th>
              {profiles.map((p, i) => (
                <th key={i} className="p-6 text-center w-1/5 border-l border-surface-outline-variant">
                  <div className={`flex flex-col items-center ${p.color}`}>
                    <Icon name={p.icon} size={32} className="mb-2" />
                    <span>{p.name}</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => {
              if (row.type === 'header') return (
                <tr key={i}>
                  <td colSpan="4" className="p-4 bg-surface-container font-bold text-xs uppercase tracking-widest border-t border-b border-surface-outline-variant text-surface-on-variant">{row.label}</td>
                </tr>
              );
              if (row.type === 'smart') return (
                <tr key={i} className="border-t border-surface-outline-variant hover:bg-tertiary-container/10 transition-colors">
                  <td className="p-4 px-6 font-medium flex items-center gap-2 text-surface-on">
                    <Icon name="auto_awesome" size={16} className="text-tertiary" /> {row.label}
                  </td>
                  <td colSpan="3" className="p-4 text-center font-bold text-tertiary text-sm border-l border-surface-outline-variant">
                    <span className="px-3 py-1 rounded-full bg-tertiary-container border border-tertiary/20">Automaticky: {row.condition}</span>
                  </td>
                </tr>
              );
              return (
                <tr key={i} className="border-t border-surface-outline-variant hover:bg-surface-container-low transition-colors">
                  <td className="p-4 px-6 text-sm font-medium text-surface-on">
                    {row.label}
                    {row.note && <span className="text-xs text-surface-on-variant block font-normal">{row.note}</span>}
                  </td>
                  <td className="p-4 text-center border-l border-surface-outline-variant">
                    {row.all || row.p1 ? <Icon name="check" className="text-tertiary font-bold" /> : <span className="text-surface-outline-variant">—</span>}
                  </td>
                  <td className="p-4 text-center border-l border-surface-outline-variant">
                    {row.all || row.p2 ? <Icon name="check" className="text-tertiary font-bold" /> : <span className="text-surface-outline-variant">—</span>}
                  </td>
                  <td className="p-4 text-center border-l border-surface-outline-variant">
                    {row.all || row.p3 ? <Icon name="check" className="text-tertiary font-bold" /> : <span className="text-surface-outline-variant">—</span>}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};