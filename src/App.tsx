import { useState, useEffect } from 'react';
import { PageId } from './types';
import Navbar from './components/ui/Navbar';
import FloatingGlassNavbar from './components/ui/FloatingGlassNavbar';
import Footer from './components/ui/Footer';
import CursorGlow from './components/ui/CursorGlow';
import CommandCenterPage from './components/home/CommandCenterPage';
import SystemsConstellationsPage from './components/services/SystemsConstellationsPage';
import OrbitDeploymentsPage from './components/orbit/OrbitDeploymentsPage';
import TeamPage from './components/team/TeamPage';
import LaunchPadPage from './components/estimator/LaunchPadPage';
import TransmissionPage from './components/transmission/TransmissionPage';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('command-center');
  const [preselectedSystem, setPreselectedSystem] = useState<string | undefined>(undefined);

  // Sync with browser history/hash if user loads with one, then clean up the URL
  useEffect(() => {
    if (window.location.hash) {
      const hash = window.location.hash.replace('#', '').replace('commandcenter', 'command-center') as PageId;
      if (['command-center', 'systems', 'orbit', 'team', 'launch-pad', 'transmission'].includes(hash)) {
        setCurrentPage(hash);
      }
      // Remove hash from the browser address bar for a clean URL
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  }, []);

  const handleNavigate = (page: PageId) => {
    setCurrentPage(page);
    // Keep URL clean without appending any # fragments
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectSystemForScope = (systemTitle: string) => {
    setPreselectedSystem(systemTitle);
    handleNavigate('launch-pad');
  };

  return (
    <div className="min-h-screen bg-[#070A05] text-[#D8E8C5] flex flex-col selection:bg-orange-600/30 selection:text-orange-200 relative overflow-x-hidden">
      
      {/* Interface Atmospheric Dot Grid Pattern & Ambient Theme Glow */}
      <div 
        className="fixed inset-0 opacity-15 pointer-events-none z-0" 
        style={{ 
          backgroundImage: 'radial-gradient(#EA580C 1px, transparent 1px)', 
          backgroundSize: '40px 40px' 
        }} 
      />
      <div className="fixed top-20 right-40 w-96 h-96 bg-orange-700/10 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="fixed bottom-40 left-20 w-80 h-80 bg-[#3F4C2E]/20 rounded-full blur-[140px] pointer-events-none z-0" />

      {/* Ambient Cursor Indicator */}
      <CursorGlow />

      {/* Fixed Top Glassmorphism Navigation Bar */}
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />

      {/* Main Multi-Page Content with Framer Motion Page Transitions */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {currentPage === 'command-center' && (
            <motion.div
              key="command-center"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
            >
              <CommandCenterPage onNavigate={handleNavigate} />
            </motion.div>
          )}

          {currentPage === 'systems' && (
            <motion.div
              key="systems"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
            >
              <SystemsConstellationsPage
                onNavigate={handleNavigate}
                onSelectSystemForScope={handleSelectSystemForScope}
              />
            </motion.div>
          )}

          {currentPage === 'orbit' && (
            <motion.div
              key="orbit"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
            >
              <OrbitDeploymentsPage onNavigate={handleNavigate} />
            </motion.div>
          )}

          {currentPage === 'team' && (
            <motion.div
              key="team"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
            >
              <TeamPage onNavigate={handleNavigate} />
            </motion.div>
          )}

          {currentPage === 'launch-pad' && (
            <motion.div
              key="launch-pad"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
            >
              <LaunchPadPage
                onNavigate={handleNavigate}
                selectedSystemType={preselectedSystem}
              />
            </motion.div>
          )}

          {currentPage === 'transmission' && (
            <motion.div
              key="transmission"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
            >
              <TransmissionPage onNavigate={handleNavigate} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Global Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Floating Glass Navbar (Appears on Scroll at Middle-Bottom Right) */}
      <FloatingGlassNavbar currentPage={currentPage} onNavigate={handleNavigate} />
    </div>
  );
}
