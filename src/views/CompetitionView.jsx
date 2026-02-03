import React, { Fragment } from 'react';
import { Icon } from '../components/ui';
import { HEALTH_CATEGORIES, LAB_COSTS, MARKER_AVAILABILITY } from '../data/constants';

export const CompetitionView = () => {
  const packages = [
    { id: 'v_prev', name: 'Prevence', brand: 'komfi', fixedCount: 'Základ' },
    { id: 'v_pece', name: 'Péče', brand: 'komfi', fixedCount: 'Flexibilní' },
    { id: 'm_prem', name: 'Premium Krevní test', brand: 'macromo', fixedCount: 56 },
    { id: 'm_zakl', name: 'Základní Krevní test', brand: 'macromo', fixedCount: 34 },
    { id: 'm_muz', name: 'Mužské hormony Krevní test', brand: 'macromo', fixedCount: 7 },
    { id: 'm_reg', name: 'Regulace hmotnosti Krevní test', brand: 'macromo', fixedCount: 48 },
    { id: 'm_str', name: 'Střeva a trávení Krevní test', brand: 'macromo', fixedCount: 39 },
    { id: 'm_srd', name: 'Zdraví srdce – Premium Krevní test', brand: 'macromo', fixedCount: 26 },
    { id: 'm_vla', name: 'Zdraví vlasů Krevní test', brand: 'macromo', fixedCount: 27 },
    { id: 'm_enr', name: 'Energie a Únava Krevní test', brand: 'macromo', fixedCount: 35 },
  ];
  const constraints = { psa: 'Muži 40+', tsh: 'Ženy', ferritin: 'Ženy do 50' };

  return (
    <div className="w-full">
      <div className="relative border-b border-surface-outline-variant bg-surface overflow-x-auto">
        <table className="w-full text-sm text-left border-collapse min-w-[1600px]">
          <thead>
            <tr className="bg-surface border-b border-surface-outline-variant">
              <th colSpan="12" className="p-12 text-center bg-surface">
                <h1 className="text-5xl font-display font-bold text-primary mb-2">Srovnání s trhem</h1>
              </th>
            </tr>
            <tr className="bg-surface-container">
              <th className="p-4 sticky left-0 z-30 w-64 bg-surface-container border-r border-b border-surface-outline-variant"></th>
              <th colSpan="2" className="p-3 text-center bg-primary-container text-primary border-b border-r border-primary/20 text-lg font-display">Komfi</th>
              <th colSpan="8" className="p-3 text-center bg-surface-container-high text-surface-on-variant border-b border-surface-outline-variant text-lg font-display">Macromo</th>
            </tr>
            <tr>
              <th className="p-4 bg-surface-container sticky left-0 top-0 z-30 border-b border-r border-surface-outline-variant font-bold text-surface-on-variant uppercase tracking-widest text-xs align-bottom shadow-sm">Kategorie</th>
              {packages.map(pkg => (
                <th key={pkg.id} className={`p-4 text-center border-b border-r border-surface-outline-variant w-32 align-bottom sticky top-0 z-20 shadow-sm backdrop-blur-sm ${pkg.brand === 'komfi' ? 'bg-primary-container/95' : 'bg-surface/95'}`}>
                  <div className="font-bold text-[12px] leading-tight h-12 flex items-center justify-center mb-2 text-surface-on">{pkg.name}</div>
                  <div className={`text-[10px] font-bold px-2 py-1 rounded-full inline-block ${pkg.brand === 'komfi' ? 'bg-primary text-primary-on' : 'bg-surface-container-high text-surface-on-variant'}`}>{pkg.fixedCount}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {HEALTH_CATEGORIES.map((cat, i) => {
              const items = [];
              cat.base.forEach(b => {
                items.push({ name: typeof b === 'string' ? LAB_COSTS[b]?.name : b.name, type: 'base', key: typeof b === 'string' ? b : null });
              });
              if (cat.module) {
                cat.module.markers.forEach((m, idx) => {
                  items.push({ name: LAB_COSTS[m].name, type: 'module', key: m, isFirstInModule: idx === 0, isLastInModule: idx === cat.module.markers.length - 1 });
                });
              }
              if (items.length === 0) return null;

              return (
                <Fragment key={i}>
                  <tr className="bg-surface-container">
                    <td colSpan="12" className="p-3 px-6 font-bold text-xs uppercase tracking-widest text-surface-on-variant border-b border-surface-outline-variant sticky left-0 z-10 flex items-center gap-2">
                      <Icon name={cat.icon} size={16} /> {cat.title}
                    </td>
                  </tr>
                  {items.map((item, j) => {
                    const removeBorder = item.type === 'module' && !item.isLastInModule;
                    return (
                      <tr key={j} className={`hover:bg-surface-container-low transition-colors ${removeBorder ? 'border-none' : 'border-b border-surface-outline-variant/50'}`}>
                        <td className="p-4 px-6 font-medium text-surface-on sticky left-0 bg-surface z-20 border-r border-surface-outline-variant shadow-[4px_0_8px_-4px_rgba(0,0,0,0.1)]">
                          <div className="flex flex-col">
                            <span>{item.name}</span>
                            {item.type === 'module' && <span className="text-[9px] text-secondary font-normal">Součást modulu</span>}
                          </div>
                        </td>
                        {packages.map(pkg => {
                          let active = false;
                          if (pkg.brand === 'komfi') {
                            if (pkg.id === 'v_prev') active = item.type === 'base';
                            if (pkg.id === 'v_pece') {
                              if (item.type === 'base') active = true;
                              if (item.type === 'module') active = 'module';
                            }
                          } else {
                            if (item.key && MARKER_AVAILABILITY[item.key] && MARKER_AVAILABILITY[item.key].includes(pkg.id)) active = true;
                          }
                          return (
                            <td key={pkg.id} className={`p-4 text-center border-r border-surface-outline-variant transition-colors ${pkg.brand === 'komfi' && active === true ? 'bg-tertiary-container/30' : ''}`}>
                              <div className="flex flex-col items-center justify-center">
                                {active === 'module' ? (
                                  item.isFirstInModule ? <div className="text-[9px] font-bold text-secondary bg-secondary-container px-2 py-1 rounded-full uppercase tracking-wider inline-block">Volitelné</div> : null
                                ) : active ? (
                                  <>
                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${pkg.brand === 'komfi' ? 'bg-tertiary-container text-tertiary' : 'text-surface-on-variant'}`}>
                                      <Icon name="check" size={14} className="font-bold" />
                                    </div>
                                    {pkg.brand === 'komfi' && item.key && constraints[item.key] && (<span className="text-[9px] font-bold text-tertiary mt-1">{constraints[item.key]}</span>)}
                                  </>
                                ) : (
                                  <div className="w-6 h-6 flex items-center justify-center text-surface-outline-variant">
                                    <Icon name="close" size={14} className="font-bold" />
                                  </div>
                                )}
                              </div>
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
