import React from 'react';

// Placeholder data for team members – replace with real data later.
const teamMembers = [
  { name: 'Member A', role: 'Founder & CEO', img: 'https://via.placeholder.com/150' },
  { name: 'Member B', role: 'CTO', img: 'https://via.placeholder.com/150' },
  { name: 'Member C', role: 'Lead Designer', img: 'https://via.placeholder.com/150' },
  { name: 'Member D', role: 'Senior Engineer', img: 'https://via.placeholder.com/150' },
];

/**
 * TeamMembers – a premium, responsive grid of team member cards.
 * Uses TailwindCSS utilities for a modern glass‑morphism feel.
 */
const TeamMembers: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-neutral-900 to-neutral-800">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-white mb-12">
          Our Team
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {teamMembers.map((member) => (
            <div
              key={member.name}
              className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-center transition-transform hover:scale-105"
            >
              <img
                src={member.img}
                alt={member.name}
                className="w-24 h-24 mx-auto rounded-full object-cover mb-4 border-4 border-white/20"
              />
              <h3 className="text-xl font-semibold text-white">{member.name}</h3>
              <p className="text-neutral-300">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamMembers;
