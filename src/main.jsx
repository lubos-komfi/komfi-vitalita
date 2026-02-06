import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { InternalModeProvider, useInternalMode } from './context/InternalModeContext';

import './index.css';

// Lazy loading views
const LazyFlowView = React.lazy(() => import('./views/FlowView').then(module => ({ default: module.FlowView })));
const LazyMeasurementView = React.lazy(() => import('./views/MeasurementView').then(module => ({ default: module.MeasurementView })));
const LazyMarginView = React.lazy(() => import('./views/MarginView').then(module => ({ default: module.MarginView })));
const LazyAnalysisView = React.lazy(() => import('./views/AnalysisView').then(module => ({ default: module.AnalysisView })));
const LazyCompetitionView = React.lazy(() => import('./views/CompetitionView').then(module => ({ default: module.CompetitionView })));
const LazyHowItWorksView = React.lazy(() => import('./views/HowItWorksView').then(module => ({ default: module.HowItWorksView })));

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-[50vh] text-primary">
    <span className="material-icons animate-spin text-4xl">autorenew</span>
  </div>
);

const AppLayout = () => {
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const { showInternal, setShowInternal } = useInternalMode();

  return (
    <div className="min-h-screen bg-surface transition-colors duration-300 font-sans text-surface-on">
      <nav className="z-50 bg-surface/95 backdrop-blur-sm">
        <div className="w-full px-4 py-4 flex items-center justify-between">
          {/* Logo - far left */}
          <div className="flex items-center gap-2 cursor-pointer flex-shrink-0" onClick={() => navigate('/')}>
            <img
              src={isDark ? "/img/komfi_logo_off-white.svg" : "/img/komfi_logo_off-black.svg"}
              alt="Komfi"
              className="h-4"
            />
            <img src="/img/vitalitaLogo.svg" alt="Vitalita" className="h-4" />
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/')}
              className="px-4 py-1.5 rounded-full text-xs font-bold bg-primary text-primary-on hover:scale-[1.02] transition-transform"
            >
              Objednávka
            </button>
            <button
            onClick={() => setShowInternal(!showInternal)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${
              showInternal
                ? 'bg-violet-100 text-violet-700 border-violet-300 dark:bg-violet-900/40 dark:text-violet-300 dark:border-violet-700'
                : 'bg-surface-container text-surface-on-variant border-surface-outline-variant opacity-50 hover:opacity-100'
            }`}
            title="Interní poznámky"
          >
            <span className="material-icons text-[16px]">science</span>
            {showInternal && <span>Interní</span>}
            </button>
          </div>
        </div>
      </nav>

      <main>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<LazyFlowView />} />
            <Route path="/flow/*" element={<LazyFlowView />} />
            <Route path="/jak-to-funguje" element={<LazyHowItWorksView />} />
            <Route path="/measurements" element={<LazyMeasurementView />} />
            <Route path="/analysis" element={<LazyAnalysisView />} />
            <Route path="/competition" element={<LazyCompetitionView />} />
            <Route path="/margins" element={<LazyMarginView />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <InternalModeProvider>
        <HashRouter>
          <AppLayout />
        </HashRouter>
      </InternalModeProvider>
    </ThemeProvider>
  </React.StrictMode>
);
