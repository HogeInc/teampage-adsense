import React from 'react';

interface SatireDisclaimerProps {
  onBack: () => void;
}

const SatireDisclaimer: React.FC<SatireDisclaimerProps> = ({ onBack }) => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <button 
        onClick={onBack}
        className="mb-8 flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors font-medium group"
      >
        <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Home
      </button>
      
      <h1 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
        Satire & Project Disclaimer
      </h1>

      <div className="space-y-8 text-slate-300 leading-relaxed">
        <section className="p-6 bg-orange-500/10 border border-orange-500/20 rounded-xl">
          <h2 className="text-2xl font-semibold text-white mb-4">A Work of Satire</h2>
          <p className="text-lg">
            Please be advised: This website is a <strong>satirical project</strong>. The "Team Members," their roles (such as "Chief Meme Officer" or "Vibe Architect"), and the accompanying biographies are fictional works intended for entertainment purposes only.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">Not Financial Advice & DYOR</h2>
          <div className="p-6 bg-slate-800/50 border border-slate-700 rounded-xl">
            <p className="text-white font-bold mb-2 uppercase tracking-wide">Financial Disclaimer:</p>
            <p className="mb-4">
              The content provided on this website does not constitute financial, investment, or trading advice. Cryptocurrencies are highly volatile assets and carry significant risk.
            </p>
            <p className="text-cyan-400 font-bold">
              Always Do Your Own Research (DYOR) before participating in any decentralized project or purchasing any digital assets.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">HOGE is Decentralized</h2>
          <p className="mb-4">
            HOGE Finance is a fully decentralized, community-driven DeFi project. Contrary to the structure presented on this landing page, <strong>HOGE currently has no "Core Team,"</strong> official corporate office, or centralized management. It is owned and operated entirely by its community of holders worldwide.
          </p>
          <div className="p-4 bg-slate-800/80 border-l-4 border-cyan-500 rounded-r-lg mb-4">
            <p className="italic text-slate-200">
              Note: Should a lead team come about again in the future, this site will be updated to reflect those changes accurately. Until such a time, all content here is strictly for entertainment and historical community appreciation.
            </p>
          </div>
          <p>
            Any resemblance to actual persons, living or dead, or actual corporate hierarchies is purely coincidental and part of the satirical theme of this showcase.
          </p>
        </section>

        <section className="p-8 bg-slate-800/50 rounded-2xl border border-slate-700 text-center">
          <h2 className="text-2xl font-semibold text-white mb-4">Seeking Official Information?</h2>
          <p className="mb-6 text-slate-400">
            If you are looking for actual project details, the official roadmap, or decentralized governance information, please visit the primary community hub:
          </p>
          <a 
            href="https://hogefinance.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 bg-cyan-500 text-slate-900 font-bold rounded-full hover:bg-cyan-400 transition-all transform hover:scale-105 shadow-lg shadow-cyan-500/20"
          >
            Visit HogeFinance.com
          </a>
        </section>
      </div>
    </div>
  );
};

export default SatireDisclaimer;