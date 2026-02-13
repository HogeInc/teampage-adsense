
import React from 'react';
import TeamCard from './components/TeamCard';
import { TEAM_MEMBERS } from './constants';
import AdBanner from './components/AdBanner';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-white p-4 sm:p-8">
      <div className="container mx-auto">
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
              <TeamCard key={member.name} member={member} />
            ))}
          </div>
        </main>
            
        <footer className="text-center mt-16 text-slate-500">
          <AdBanner dataAdSlot="6616142400" />
          <p>&copy; Hoge Inc. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
