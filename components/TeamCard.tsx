
import React from 'react';
import { TeamMember } from '../types';

interface TeamCardProps {
  member: TeamMember;
}

const TeamCard: React.FC<TeamCardProps> = ({ member }) => {
  return (
    <div className="group relative bg-slate-800 border border-slate-700 rounded-lg overflow-hidden shadow-md transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-cyan-500/30 hover:border-cyan-500 hover:-translate-y-2">
      <div className="relative h-56 overflow-hidden">
        <img
          src={member.imageUrl}
          alt={`Profile of ${member.name}`}
          className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
        <p className="text-md font-medium text-cyan-400 mb-3">{member.role}</p>
        <p className="text-slate-400 text-sm leading-relaxed">
          {member.description}
        </p>
      </div>
    </div>
  );
};

export default TeamCard;
