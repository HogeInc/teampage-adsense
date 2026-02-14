import React from 'react';
import { TeamMember } from '../types';

interface TeamCardProps {
  member: TeamMember;
  onClick: () => void;
}

const TeamCard: React.FC<TeamCardProps> = ({ member, onClick }) => {
  return (
    <button 
      onClick={onClick}
      className="text-left group relative bg-slate-800 border border-slate-700 rounded-lg overflow-hidden shadow-md transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-cyan-500/30 hover:border-cyan-500 hover:-translate-y-2 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
      aria-label={`View full article about ${member.name}`}
    >
      <div className="relative h-56 overflow-hidden">
        <img
          src={member.imageUrl}
          alt={`Profile of ${member.name}`}
          className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-4 right-4 bg-cyan-500 text-slate-900 text-[10px] font-bold px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 uppercase tracking-tighter">
          Read Bio
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">{member.name}</h3>
        <p className="text-md font-medium text-cyan-400/80 mb-3">{member.role}</p>
        <p className="text-slate-400 text-sm leading-relaxed line-clamp-2">
          {member.description}
        </p>
      </div>
    </button>
  );
};

export default TeamCard;