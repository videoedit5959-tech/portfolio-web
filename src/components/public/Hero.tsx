import React, { useState } from 'react';
import { ProfileData } from '../../types/portfolio';
import { ArrowRight, Mail, FileDown, CheckCircle2, ArrowUpRight, Code2, Database } from 'lucide-react';

interface HeroProps {
  profile: ProfileData;
  onOpenResume: () => void;
  onViewProjects?: () => void;
  onContactClick?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  profile,
  onOpenResume,
  onViewProjects,
  onContactClick,
}) => {
  const [imgError, setImgError] = useState(false);

  const handleProjectsClick = () => {
    if (onViewProjects) {
      onViewProjects();
    } else {
      const el = document.getElementById('projects');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleContactClick = () => {
    if (onContactClick) {
      onContactClick();
    } else {
      const el = document.getElementById('contact');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-zinc-50/70 dark:bg-[#0A0A0A] text-zinc-900 dark:text-white transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Clean Minimalist Intro */}
          <div className="lg:col-span-5 flex flex-col justify-center text-left">
            {/* Status indicator */}
            <div className="flex items-center gap-2 mb-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span className="text-blue-600 dark:text-blue-500 font-mono text-xs sm:text-sm tracking-widest uppercase font-semibold">
                {profile.isAvailable ? 'Available for projects' : 'Building modern web apps'}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight mb-4 text-zinc-900 dark:text-white">
              MERN Stack <br />
              <span className="text-zinc-500 dark:text-gray-400">Web Developer</span>
            </h1>

            {/* Description */}
            <p className="text-zinc-600 dark:text-gray-400 text-base sm:text-lg mb-8 leading-relaxed max-w-lg">
              {profile.shortBio ||
                'I build modern, responsive and scalable web applications using React, Node.js, Express and MongoDB.'}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 sm:gap-4 mb-8">
              <button
                id="hero-view-projects-btn"
                onClick={handleProjectsClick}
                className="bg-blue-600 hover:bg-blue-500 text-white px-6 sm:px-8 py-3 rounded-lg font-semibold text-sm transition-colors shadow-xs cursor-pointer inline-flex items-center gap-2 group"
              >
                <span>View My Work</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                id="hero-resume-btn"
                onClick={onOpenResume}
                className="border border-zinc-300 dark:border-white/20 text-zinc-800 dark:text-white px-6 sm:px-8 py-3 rounded-lg font-semibold text-sm hover:bg-zinc-100 dark:hover:bg-white/5 transition-colors cursor-pointer inline-flex items-center gap-2"
              >
                <FileDown className="w-4 h-4 text-blue-500" />
                <span>Download CV</span>
              </button>

              <button
                id="hero-contact-btn"
                onClick={handleContactClick}
                className="border border-zinc-200 dark:border-white/10 text-zinc-700 dark:text-zinc-300 px-5 py-3 rounded-lg font-semibold text-sm hover:bg-zinc-100 dark:hover:bg-white/5 transition-colors cursor-pointer inline-flex items-center gap-2"
              >
                <Mail className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
                <span>Contact</span>
              </button>
            </div>

            {/* Core Tech Stack Micro-Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-zinc-200/80 dark:border-white/5">
              <span className="text-[11px] font-mono text-zinc-600 dark:text-gray-400 uppercase tracking-wider mr-1">
                Core Stack:
              </span>
              {['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS'].map((tech, i) => (
                <span
                  key={tech}
                  className={`px-2.5 py-1 text-[10px] font-mono uppercase rounded ${
                    i === 0
                      ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20'
                      : 'bg-zinc-200/70 dark:bg-white/5 text-zinc-700 dark:text-gray-400 border border-zinc-300/40 dark:border-white/5'
                  }`}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Right Column: Clean Minimalism Bento Grid */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {/* Top Row: 2 Minimalist Bento Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Bento Card 1: E-Commerce / Digital Market */}
              <div
                onClick={handleProjectsClick}
                className="bg-white dark:bg-[#141414] rounded-2xl p-6 border border-zinc-200 dark:border-white/5 relative overflow-hidden group hover:border-blue-500/40 dark:hover:border-white/15 transition-all shadow-xs cursor-pointer"
              >
                <div className="flex justify-between items-start mb-6 sm:mb-8">
                  <span className="text-[10px] uppercase tracking-widest text-blue-600 dark:text-blue-400 font-bold font-mono">
                    E-Commerce
                  </span>
                  <div className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-white/5 flex items-center justify-center text-zinc-700 dark:text-white group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2 text-zinc-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  Digital Market
                </h3>
                <p className="text-xs text-zinc-500 dark:text-gray-400 line-clamp-2 leading-relaxed">
                  Full-featured commerce platform with React, cart persistence, and Node.js REST API.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="px-2 py-0.5 bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[10px] rounded font-mono uppercase">
                    MongoDB
                  </span>
                  <span className="px-2 py-0.5 bg-zinc-100 dark:bg-white/5 text-zinc-600 dark:text-gray-400 text-[10px] rounded font-mono uppercase">
                    Express
                  </span>
                  <span className="px-2 py-0.5 bg-zinc-100 dark:bg-white/5 text-zinc-600 dark:text-gray-400 text-[10px] rounded font-mono uppercase">
                    React
                  </span>
                </div>
              </div>

              {/* Bento Card 2: SaaS Tool / Task Manager */}
              <div
                onClick={handleProjectsClick}
                className="bg-white dark:bg-[#141414] rounded-2xl p-6 border border-zinc-200 dark:border-white/5 relative overflow-hidden group hover:border-emerald-500/40 dark:hover:border-white/15 transition-all shadow-xs cursor-pointer"
              >
                <div className="flex justify-between items-start mb-6 sm:mb-8">
                  <span className="text-[10px] uppercase tracking-widest text-emerald-600 dark:text-emerald-400 font-bold font-mono">
                    SaaS Platform
                  </span>
                  <div className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-white/5 flex items-center justify-center text-zinc-700 dark:text-white group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2 text-zinc-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  Task & Team Hub
                </h3>
                <p className="text-xs text-zinc-500 dark:text-gray-400 line-clamp-2 leading-relaxed">
                  Full-stack task manager with JWT auth, kanban workflows, and responsive dashboard.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] rounded font-mono uppercase">
                    MERN Stack
                  </span>
                  <span className="px-2 py-0.5 bg-zinc-100 dark:bg-white/5 text-zinc-600 dark:text-gray-400 text-[10px] rounded font-mono uppercase">
                    Auth
                  </span>
                  <span className="px-2 py-0.5 bg-zinc-100 dark:bg-white/5 text-zinc-600 dark:text-gray-400 text-[10px] rounded font-mono uppercase">
                    Tailwind
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Row: Wide Featured Project & Profile Integration Card */}
            <div className="bg-white dark:bg-[#141414] rounded-2xl p-6 border border-zinc-200 dark:border-white/5 flex flex-col sm:flex-row gap-5 items-center shadow-xs">
              {/* Visual Avatar / Graphic Frame */}
              <div className="w-full sm:w-40 h-32 sm:h-32 rounded-xl overflow-hidden bg-gradient-to-br from-zinc-800 to-zinc-950 border border-zinc-300 dark:border-white/10 shrink-0 relative flex items-center justify-center">
                {profile.avatarUrl && !imgError ? (
                  <img
                    src={profile.avatarUrl}
                    alt={`Photo of ${profile.name}`}
                    onError={() => setImgError(true)}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center p-3 text-white">
                    <Code2 className="w-8 h-8 text-blue-400 mx-auto mb-1" />
                    <span className="text-xs font-mono font-bold text-white block">{profile.name}</span>
                    <span className="text-[9px] text-gray-400 font-mono">Full-Stack Dev</span>
                  </div>
                )}
                <div className="absolute bottom-2 right-2 bg-blue-600 text-white p-1 rounded-md shadow-xs">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Content Description */}
              <div className="flex-1 w-full">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] uppercase tracking-widest text-amber-600 dark:text-amber-400 font-bold font-mono">
                    Featured Demonstration
                  </span>
                  <button
                    onClick={handleProjectsClick}
                    aria-label="View demo projects"
                    className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-white/5 flex items-center justify-center text-zinc-700 dark:text-white hover:bg-blue-600 hover:text-white transition-colors cursor-pointer"
                  >
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                <h3 className="text-xl font-bold mb-1 text-zinc-900 dark:text-white">
                  Enterprise MERN Architecture
                </h3>
                <p className="text-xs text-zinc-500 dark:text-gray-400 line-clamp-2 leading-relaxed">
                  High-performance web architecture featuring normalized MongoDB schemas, Express validation, and fluid Tailwind CSS interfaces.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="px-2 py-0.5 bg-zinc-100 dark:bg-white/5 text-zinc-600 dark:text-gray-400 text-[10px] rounded font-mono uppercase">
                    Tailwind CSS
                  </span>
                  <span className="px-2 py-0.5 bg-zinc-100 dark:bg-white/5 text-zinc-600 dark:text-gray-400 text-[10px] rounded font-mono uppercase">
                    MERN Stack
                  </span>
                  <span className="px-2 py-0.5 bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[10px] rounded font-mono uppercase">
                    Production Ready
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
