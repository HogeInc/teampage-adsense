import React, { useState, useEffect, useCallback } from 'react';
import TeamCard from './components/TeamCard';
import { TEAM_MEMBERS } from './constants';
import AdBanner from './components/AdBanner';
import PrivacyPolicy from './components/PrivacyPolicy';
import MemberDetail from './components/MemberDetail';
import SatireDisclaimer from './components/SatireDisclaimer';
import { TeamMember } from './types';

const App: React.FC = () => {
  const [view, setView] = useState<'home' | 'privacy' | 'member' | 'satire'>('home');
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  // Helper to parse the current pathname and set the view accordingly
  const syncViewWithUrl = useCallback(() => {
    const path = window.location.pathname;
    
    if (path === '/privacy') {
      setView('privacy');
      setSelectedMember(null);
    } else if (path === '/satire') {
      setView('satire');
      setSelectedMember(null);
    } else if (path.startsWith('/member/')) {
      const memberSlug = path.replace('/member/', '');
      const member = TEAM_MEMBERS.find(m => 
        m.name.toLowerCase().replace(/\s+/g, '-') === memberSlug
      );
      if (member) {
        setSelectedMember(member);
        setView('member');
      } else {
        setView('home');
        setSelectedMember(null);
      }
    } else {
      setView('home');
      setSelectedMember(null);
    }
  }, []);

  // Sync on initial load and handle browser back/forward buttons
  useEffect(() => {
    syncViewWithUrl();
    window.addEventListener('popstate', syncViewWithUrl);
    return () => window.removeEventListener('popstate', syncViewWithUrl);
  }, [syncViewWithUrl]);

  // Custom navigation function using History API
  const navigateTo = (path: string) => {
    window.history.pushState({}, '', path);
    syncViewWithUrl();
  };

  // Dynamically load AdSense after initial mount
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2514992641687016";
    script.async = true;
    script.crossOrigin = "anonymous";
    document.head.appendChild(script);
  }, []);

  // Scroll to top when switching views
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view, selectedMember]);

  const handleMemberClick = (member: TeamMember) => {
    const slug = member.name.toLowerCase().replace(/\s+/g, '-');
    navigateTo(`/member/${slug}`);
  };

  const handleBack = () => {
    navigateTo('/');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-4 sm:p-8">
      <div className="container mx-auto">
        {view === 'home' && (
          <>
            <header className="text-center mb-12">
              <AdBanner dataAdSlot="3918661022" />
              <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-500 mb-2">
                Meet Our Team
              </h1>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                The creative minds and passionate professionals driving our success.
              </p>
            </header>
            
            <main>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {TEAM_MEMBERS.map((member) => (
                  <TeamCard 
                    key={member.name} 
                    member={member} 
                    onClick={() => handleMemberClick(member)}
                  />
                ))}
              </div>
            </main>
          </>
        )}

        {view === 'privacy' && (
          <PrivacyPolicy onBack={handleBack} />
        )}

        {view === 'satire' && (
          <SatireDisclaimer onBack={handleBack} />
        )}

        {view === 'member' && selectedMember && (
          <MemberDetail 
            member={selectedMember} 
            onBack={handleBack} 
          />
        )}
            
        <footer className="text-center mt-16 text-slate-500 border-t border-slate-800 pt-8">
          <AdBanner dataAdSlot="6616142400" />
          <div className="flex flex-col items-center gap-4">
            <p>&copy; 2021-{new Date().getFullYear()} Hoge Inc. All rights reserved.</p>
            <nav className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-sm">
              <button 
                onClick={() => navigateTo('/')} 
                className={`hover:text-cyan-400 transition-colors ${view === 'home' ? 'text-cyan-400 font-bold' : ''}`}
              >
                Team
              </button>
              <button 
                onClick={() => navigateTo('/privacy')} 
                className={`hover:text-cyan-400 transition-colors ${view === 'privacy' ? 'text-cyan-400 font-bold' : ''}`}
              >
                Privacy Policy
              </button>
              <button 
                onClick={() => navigateTo('/satire')} 
                className={`hover:text-orange-400 transition-colors ${view === 'satire' ? 'text-orange-400 font-bold' : ''}`}
              >
                Satire Disclaimer
              </button>
            </nav>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;