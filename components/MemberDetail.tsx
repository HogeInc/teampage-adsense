import React from 'react';
import { TeamMember } from '../types';
import AdBanner from './AdBanner';

interface MemberDetailProps {
  member: TeamMember;
  onBack: () => void;
}

const MemberDetail: React.FC<MemberDetailProps> = ({ member, onBack }) => {
  return (
    <article className="max-w-5xl mx-auto py-8 px-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <button 
        onClick={onBack}
        className="mb-8 flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors font-medium group"
      >
        <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Team
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Media & Quick Info */}
        <div className="lg:col-span-5">
          <div className="sticky top-8">
            <div className="rounded-2xl overflow-hidden border border-slate-700 shadow-2xl shadow-cyan-500/10">
              <img 
                src={member.imageUrl} 
                alt={`${member.name} - ${member.role}`} 
                loading="lazy"
                decoding="async"
                className="w-full aspect-square object-cover"
              />
            </div>
            <div className="mt-6 p-6 bg-slate-800/50 rounded-xl border border-slate-700">
              <p className="text-slate-400 text-sm uppercase tracking-widest font-bold mb-2">Primary Directive</p>
              <p className="text-cyan-400 font-medium italic">"{member.description}"</p>
            </div>
            <div className="hidden lg:block mt-8">
            </div>
          </div>
        </div>

        {/* Right Column: Article Content */}
        <div className="lg:col-span-7">
          <header className="mb-8">
            <h1 className="text-5xl font-extrabold text-white mb-4 leading-tight">
              {member.name}
            </h1>
            <p className="text-2xl text-teal-400 font-semibold">{member.role}</p>
          </header>

          <section className="prose prose-invert prose-cyan max-w-none">
            <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-700 pb-2">Biography</h2>
            <p className="text-slate-300 text-lg leading-relaxed mb-6 whitespace-pre-wrap">
              {member.bio}
            </p>
            
            <div className="my-12 p-8 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-cyan-500/20 transition-colors"></div>
              <h3 className="text-xl font-bold text-white mb-4">Legacy of a Legend</h3>
              <p className="text-slate-400 leading-relaxed">
                In the annals of the decentralized world, few have left as profound a mark as {member.name}. 
                Known throughout the sectors as a pillar of the community, {member.role === 'Aspirational Intern' ? 'even as an intern, their' : 'their'} 
                influence resonates in every block mined and every transaction signed. 
                Whether facing a sudden market liquidation or navigating the complexities of a protocol upgrade, 
                the presence of the {member.role} provides the stability needed for true innovation.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-white mb-4">The Future Path</h2>
            <p className="text-slate-300 text-lg leading-relaxed mb-6">
              As we look toward the next horizon, {member.name} remains committed to the core principles of 
              transparency, fun, and unstoppable growth. The mission is far from over, and the path to 
              the moon is being paved one block at a time.
            </p>
          </section>
        </div>
      </div>
    </article>
  );
};

export default MemberDetail;