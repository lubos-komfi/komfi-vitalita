import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Routes, Route, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { ThemeToggle } from './components/ui';
import { HomeView } from './views/HomeView';
// Note: We are keeping direct imports for now to avoid specific lazy loading issues with named exports if not handled perfectly, 
// but usually React.lazy supports it if we map it. 
// Actually implementation plan said lazy loading.
// Let's do it properly.

import './index.css';

// Lazy loading views Wrapper
const LazyHomeView = React.lazy(() => import('./views/HomeView').then(module => ({ default: module.HomeView })));
const LazyFlowView = React.lazy(() => import('./views/FlowView').then(module => ({ default: module.FlowView })));
const LazyMeasurementView = React.lazy(() => import('./views/MeasurementView').then(module => ({ default: module.MeasurementView })));
const LazyMarginView = React.lazy(() => import('./views/MarginView').then(module => ({ default: module.MarginView })));
const LazyAnalysisView = React.lazy(() => import('./views/AnalysisView').then(module => ({ default: module.AnalysisView })));
const LazyCompetitionView = React.lazy(() => import('./views/CompetitionView').then(module => ({ default: module.CompetitionView })));

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-[50vh] text-primary">
    <span className="material-icons animate-spin text-4xl">autorenew</span>
  </div>
);

const AppLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Přehled', icon: 'home' },
    { path: '/competition', label: 'Konkurence', icon: 'compare_arrows' },
    { path: '/flow', label: 'Objednat', icon: 'add_circle' },
    { path: '/measurements', label: 'Měření', icon: 'monitor_heart' },
    { path: '/analysis', label: 'Analýza', icon: 'analytics' },
    { path: '/margins', label: 'Kalkulačka', icon: 'calculate' }
  ];

  return (
    <div className="min-h-screen bg-surface transition-colors duration-300 font-sans text-surface-on">
      <nav className="z-50 bg-surface/95 backdrop-blur-sm border-b border-surface-outline-variant/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-10 h-10 bg-primary-container rounded-full flex items-center justify-center text-primary-on-container">
              <span className="material-icons">spa</span>
            </div>
            <span className="font-display text-2xl text-primary">Komfi Vitalita</span>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex gap-2 p-1 bg-surface-container rounded-full border border-surface-outline-variant/30">
              {navItems.map(item => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => `px-5 py-2.5 rounded-full text-sm font-medium transition-all flex items-center gap-2
                      ${isActive
                      ? 'bg-secondary-container text-secondary-on-container shadow-sm'
                      : 'text-surface-on-variant hover:bg-surface-dim hover:text-surface-on'
                    }`}
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      <main>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<LazyHomeView onNavigate={(p) => navigate(p === 'home' ? '/' : '/' + p)} />} />
            <Route path="/flow/*" element={<LazyFlowView />} />
            <Route path="/measurements" element={<LazyMeasurementView />} />
            <Route path="/analysis" element={<LazyAnalysisView />} />
            <Route path="/competition" element={<LazyCompetitionView />} />
            <Route path="/margins" element={<LazyMarginView />} />
          </Routes>
        </Suspense>
      </main>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-surface-container border-t border-surface-outline-variant/20 px-2 py-3 z-50">
        <div className="flex justify-around items-center">
          {navItems.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `flex flex-col items-center gap-1 min-w-[64px] transition-colors
                  ${isActive ? 'text-primary' : 'text-surface-on-variant hover:text-surface-on'}`}
            >
              {({ isActive }) => (
                <>
                  <div className={`w-16 h-8 rounded-full flex items-center justify-center transition-colors
                      ${isActive ? 'bg-secondary-container' : 'bg-transparent'}`}>
                    <span className="material-icons">{item.icon}</span>
                  </div>
                  <span className="text-[11px] font-medium tracking-wide">
                    {item.label === 'Kalkulačka' ? 'Kalk.' :
                      item.label === 'Measurements' ? 'Měření' :
                        item.label}
                  </span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <HashRouter>
        <AppLayout />
      </HashRouter>
    </ThemeProvider>
  </React.StrictMode>
);
