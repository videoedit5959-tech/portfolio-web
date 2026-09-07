import React from 'react';
import { ProfileData } from '../../types/portfolio';
import { Code2, Server, Globe, CheckCircle, Cpu, ShieldCheck, Zap } from 'lucide-react';

interface AboutProps {
  profile: ProfileData;
  projectsCount?: number;
  skillsCount?: number;
}

export const About: React.FC<AboutProps> = ({ profile }) => {
  return (
    <section
      id="about"
      className="py-20 md:py-28 bg-white dark:bg-[#0A0A0A] border-t border-zinc-200/80 dark:border-white/5 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-blue-600 dark:text-blue-500 font-mono text-xs uppercase tracking-widest font-semibold block mb-3">
            About Developer
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white tracking-tight">
            Engineering Clean Interfaces & Reliable Backends
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-600 dark:text-gray-400 leading-relaxed">
            {profile.aboutText}
          </p>
        </div>

        {/* 3 Core Capability Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {/* Frontend Pillar */}
          <div className="rounded-2xl p-6 sm:p-7 bg-white dark:bg-[#141414] border border-zinc-200/80 dark:border-white/5 hover:border-zinc-300 dark:hover:border-white/15 transition-all group shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 dark:bg-white/5 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
              <Code2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              Frontend Craftsmanship
            </h3>
            <p className="text-sm text-zinc-600 dark:text-gray-400 mb-4 leading-relaxed">
              Component-based architecture prioritizing fast render speeds, reusable hooks, and seamless responsive design across all devices.
            </p>
            <ul className="space-y-2 border-t border-zinc-100 dark:border-white/5 pt-4 text-xs font-medium text-zinc-700 dark:text-zinc-300">
              {profile.specializations.frontend.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Backend Pillar */}
          <div className="rounded-2xl p-6 sm:p-7 bg-white dark:bg-[#141414] border border-zinc-200/80 dark:border-white/5 hover:border-zinc-300 dark:hover:border-white/15 transition-all group shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 dark:bg-white/5 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
              <Server className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
              Backend Architecture
            </h3>
            <p className="text-sm text-zinc-600 dark:text-gray-400 mb-4 leading-relaxed">
              Robust Express.js REST APIs with structured controllers, route guards, secure JWT authentication, and optimized MongoDB queries.
            </p>
            <ul className="space-y-2 border-t border-zinc-100 dark:border-white/5 pt-4 text-xs font-medium text-zinc-700 dark:text-zinc-300">
              {profile.specializations.backend.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CMS & Mobile Exploration */}
          <div className="rounded-2xl p-6 sm:p-7 bg-white dark:bg-[#141414] border border-zinc-200/80 dark:border-white/5 hover:border-zinc-300 dark:hover:border-white/15 transition-all group shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 dark:bg-white/5 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
              CMS & Ecosystem
            </h3>
            <p className="text-sm text-zinc-600 dark:text-gray-400 mb-4 leading-relaxed">
              Practical expertise building tailored WordPress sites and visual Elementor layouts, alongside exploring native mobile fundamentals with Android.
            </p>
            <ul className="space-y-2 border-t border-zinc-100 dark:border-white/5 pt-4 text-xs font-medium text-zinc-700 dark:text-zinc-300">
              {profile.specializations.cms.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Engineering Philosophy Banner */}
        <div className="rounded-2xl p-6 sm:p-8 bg-zinc-100 dark:bg-[#141414] text-zinc-900 dark:text-white border border-zinc-200 dark:border-white/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xs">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-mono text-xs font-semibold uppercase tracking-wider">
              <Cpu className="w-4 h-4" />
              <span>Development Philosophy</span>
            </div>
            <blockquote className="text-base sm:text-lg font-medium text-zinc-800 dark:text-zinc-200 italic leading-snug">
              "{profile.philosophy}"
            </blockquote>
          </div>

          <div className="flex flex-wrap md:flex-col gap-3 text-xs font-mono text-zinc-600 dark:text-gray-400 shrink-0">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Security & Validation First</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-blue-500" />
              <span>Zero Bloat & Optimized UX</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
