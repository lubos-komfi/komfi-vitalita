import React, { Fragment } from 'react';
import { Icon } from '../components/ui';
import { BLOOD_AREAS, BODY_AREAS, HEAD_AREAS, LAB_COSTS, MARKER_AVAILABILITY } from '../data/constants';

export const CompetitionView = () => {
  const macromoPackages = [
    { id: 'm_prem', name: 'Premium', fixedCount: 56 },
    { id: 'm_zakl', name: 'Základní', fixedCount: 34 },
    { id: 'm_muz', name: 'Mužské hormony', fixedCount: 7 },
    { id: 'm_reg', name: 'Regulace hmotnosti', fixedCount: 48 },
    { id: 'm_str', name: 'Střeva a trávení', fixedCount: 39 },
    { id: 'm_srd', name: 'Zdraví srdce', fixedCount: 26 },
    { id: 'm_vla', name: 'Zdraví vlasů', fixedCount: 27 },
    { id: 'm_enr', name: 'Energie a Únava', fixedCount: 35 },
  ];

  // Build rows from BLOOD_AREAS
  const bloodRows = [];
  BLOOD_AREAS.forEach(area => {
    // Base markers - vždy v základu
    area.baseMarkers?.forEach((markerId, idx) => {
      bloodRows.push({
        areaId: area.id,
        areaName: area.name,
        areaIcon: area.icon,
        isFirstInArea: idx === 0,
        name: LAB_COSTS[markerId]?.name || markerId,
        markerId,
        type: 'base',
        genderFilter: area.genderFilter,
        condition: area.genderFilter === 'female' ? 'Ženy' : area.genderFilter === 'male' ? 'Muži 40+' : null,
      });
    });
    // Expansion markers - volitelné
    area.expansion?.markers?.forEach(markerId => {
      bloodRows.push({
        areaId: area.id,
        areaName: area.name,
        areaIcon: area.icon,
        isFirstInArea: false,
        name: LAB_COSTS[markerId]?.name || markerId,
        markerId,
        type: 'expansion',
        genderFilter: area.genderFilter,
        condition: null,
      });
    });
  });

  // Body tests
  const bodyRows = [];
  BODY_AREAS.filter(a => !a.hidden).forEach(area => {
    if (area.included && area.tests) {
      area.tests.forEach((testId, idx) => {
        const testNames = { inbody: 'InBody měření', grip: 'Síla stisku', bp: 'Krevní tlak' };
        bodyRows.push({
          areaId: area.id,
          areaName: area.name,
          areaIcon: area.icon,
          isFirstInArea: idx === 0,
          name: testNames[testId] || testId,
          type: 'base',
        });
      });
    }
    area.expansion?.tests?.forEach(testId => {
      const testNames = { sppb: 'SPPB (rovnováha, chůze)', chairstand: 'Chair-Stand test', ekg: 'EKG' };
      bodyRows.push({
        areaId: area.id,
        areaName: area.name,
        areaIcon: area.icon,
        isFirstInArea: false,
        name: testNames[testId] || testId,
        type: 'expansion',
      });
    });
  });

  // Head tests
  const headRows = [];
  HEAD_AREAS.forEach(area => {
    area.expansion?.tests?.forEach((testId, idx) => {
      const testNames = { minicog: 'Mini-Cog test', audio: 'Audiometrie' };
      headRows.push({
        areaId: area.id,
        areaName: area.name,
        areaIcon: area.icon,
        isFirstInArea: idx === 0,
        name: testNames[testId] || testId,
        type: 'expansion',
      });
    });
  });

  const renderKomfiCell = (row) => {
    if (row.type === 'base') {
      // Základní - vždy zahrnuto
      if (row.condition) {
        // S podmínkou věku/pohlaví = základ + auto
        return (
          <div className="flex flex-col items-center gap-1">
            <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-green-200 dark:bg-green-900/50">
              <Icon name="check" size={14} className="text-green-700 dark:text-green-300" />
              <span className="text-[10px] font-medium text-green-700 dark:text-green-300">V základu</span>
            </div>
            <span className="text-[9px] text-violet-600 dark:text-violet-400 bg-violet-100 dark:bg-violet-900/30 px-1.5 py-0.5 rounded">
              Auto: {row.condition}
            </span>
          </div>
        );
      }
      return (
        <div className="flex items-center justify-center gap-1 px-2 py-1 rounded-lg bg-green-200 dark:bg-green-900/50">
          <Icon name="check" size={14} className="text-green-700 dark:text-green-300" />
          <span className="text-[10px] font-medium text-green-700 dark:text-green-300">V základu</span>
        </div>
      );
    } else {
      // Volitelné rozšíření - dva tagy
      const autoLabel = row.areaName || 'Rozšíření';
      return (
        <div className="flex flex-col items-center gap-1">
          <span className="text-[10px] font-medium text-secondary bg-secondary-container px-2 py-0.5 rounded-full">
            Volitelné
          </span>
          <span className="text-[9px] text-violet-600 dark:text-violet-400 bg-violet-100 dark:bg-violet-900/30 px-1.5 py-0.5 rounded">
            Auto: {autoLabel}
          </span>
        </div>
      );
    }
  };

  const renderMacromoCell = (row, pkgId) => {
    if (!row.markerId) return <span className="text-surface-outline">—</span>;
    const hasIt = MARKER_AVAILABILITY[row.markerId]?.includes(pkgId);
    if (hasIt) {
      return (
        <div className="w-6 h-6 rounded-full bg-green-200 dark:bg-green-900/50 text-green-700 dark:text-green-300 flex items-center justify-center mx-auto">
          <Icon name="check" size={14} />
        </div>
      );
    }
    return <span className="text-surface-outline">—</span>;
  };

  const renderRow = (row, isBlood = true) => (
    <tr key={row.name + row.areaId} className="hover:bg-surface-container transition-colors border-b border-surface-outline-variant/30">
      <td className="p-3 px-4 font-medium text-surface-on sticky left-0 bg-surface-container-low z-20 border-r border-surface-outline-variant">
        <span className="text-sm">{row.name}</span>
      </td>
      <td className="p-3 text-center border-r border-primary/20 bg-primary/5">
        {renderKomfiCell(row)}
      </td>
      {isBlood && macromoPackages.map(pkg => (
        <td key={pkg.id} className="p-3 text-center border-r border-surface-outline-variant/30">
          {renderMacromoCell(row, pkg.id)}
        </td>
      ))}
      {!isBlood && macromoPackages.map(pkg => (
        <td key={pkg.id} className="p-3 text-center border-r border-surface-outline-variant/30">
          <span className="text-surface-outline">—</span>
        </td>
      ))}
    </tr>
  );

  const renderCategoryHeader = (title, icon) => (
    <tr className="bg-surface-container-high">
      <td
        colSpan={10}
        className="p-3 px-4 font-bold text-sm uppercase tracking-wider text-surface-on border-b border-surface-outline-variant sticky left-0 z-10"
      >
        <div className="flex items-center gap-2">
          <Icon name={icon} size={16} className="text-primary" />
          {title}
        </div>
      </td>
    </tr>
  );

  const renderAreaHeader = (row) => (
    <tr className="bg-surface-container/50">
      <td colSpan={10} className="p-2 px-4 text-xs font-bold text-surface-on-variant uppercase tracking-wider border-b border-surface-outline-variant/30 sticky left-0 z-10">
        <div className="flex items-center gap-2">
          <Icon name={row.areaIcon} size={12} className="text-primary" />
          {row.areaName}
        </div>
      </td>
    </tr>
  );

  return (
    <div className="min-h-screen bg-surface text-surface-on">
      {/* Header - hidden 
      <div className="py-12 px-8 text-center bg-surface-container-low">
        <h1 className="text-4xl font-display font-bold text-primary mb-3">Srovnání s trhem</h1>
        <p className="text-surface-on-variant max-w-xl mx-auto text-sm">
          Komfi nabízí flexibilní přístup - základní testy vždy, rozšíření dle potřeby.
        </p>
      </div>
      */}

      {/* Legend - hidden
      <div className="px-8 py-4 flex flex-wrap gap-6 justify-center text-sm">
        <div className="flex items-center gap-2">
          <Icon name="check" size={14} className="text-tertiary" />
          <span className="text-[11px] font-medium text-tertiary">V základu</span>
          <span className="text-surface-on-variant text-xs">= vždy zahrnuto</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-medium text-secondary bg-secondary-container px-2 py-0.5 rounded-full">Volitelné</span>
          <span className="text-surface-on-variant text-xs">= můžete přidat</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[9px] text-secondary bg-secondary-container px-1.5 py-0.5 rounded">Auto</span>
          <span className="text-surface-on-variant text-xs">= automaticky dle věku/pohlaví</span>
        </div>
      </div>
      */}

      {/* Table */}
      <div className="px-8 py-6 max-w-[1600px] mx-auto">
        <div className="overflow-x-auto rounded-2xl border border-surface-outline-variant bg-surface-container-low">
          <table className="w-full text-sm text-left border-collapse min-w-[900px]">
            <thead>
              <tr>
                <th className="p-2 sticky left-0 z-30 w-40 bg-surface-container-low border-r border-b border-surface-outline-variant"></th>
                <th className="p-2 text-center bg-primary/15 text-primary border-b border-r border-primary/30 font-display font-bold w-28">
                  Komfi
                </th>
                <th colSpan="8" className="p-3 text-center bg-surface-container-high text-surface-on-variant border-b border-surface-outline-variant font-display">
                  Macromo
                </th>
              </tr>
              <tr className="bg-surface-container">
                <th className="p-3 bg-surface-container-low sticky left-0 z-30 border-b border-r border-surface-outline-variant font-bold text-surface-on-variant uppercase tracking-widest text-[10px]">
                  Test / Marker
                </th>
                <th className="p-3 text-center border-b border-r border-primary/20 bg-primary/10 text-[10px] font-bold text-primary uppercase">
                  Jeden modulární test
                </th>
                {macromoPackages.map(pkg => (
                  <th key={pkg.id} className="p-2 text-center border-b border-r border-surface-outline-variant w-20 bg-surface-container">
                    <div className="font-bold text-[10px] leading-tight text-surface-on">{pkg.name}</div>
                    <div className="text-[9px] text-surface-on-variant mt-1">{pkg.fixedCount} testů</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Blood Tests */}
              {renderCategoryHeader('Krevní testy', 'bloodtype')}
              {(() => {
                let currentArea = null;
                return bloodRows.map(row => {
                  const showHeader = row.isFirstInArea && row.areaId !== currentArea;
                  currentArea = row.areaId;
                  return (
                    <Fragment key={row.name + row.markerId}>
                      {showHeader && renderAreaHeader(row)}
                      {renderRow(row, true)}
                    </Fragment>
                  );
                });
              })()}

              {/* Body Tests */}
              {renderCategoryHeader('Tělesné testy', 'accessibility_new')}
              {bodyRows.map(row => renderRow(row, false))}

              {/* Head Tests */}
              {renderCategoryHeader('Kognitivní testy', 'psychology')}
              {headRows.map(row => renderRow(row, false))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
