import React from 'react';
import { ProfileData } from '../../types/portfolio';
import { Lock, Github, Linkedin, MessageSquare, ArrowUp, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  profile: ProfileData;
  onNavigateAdmin: () => void;
  onNavigateHome?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  profile,
  onNavigateAdmin,
  onNavigateHome,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-zinc-100 dark:bg-[#0D0D0D] border-t border-zinc-200 dark:border-white/5 text-zinc-600 dark:text-gray-400 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-zinc-200 dark:border-white/5">
          {/* Developer Identity */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2.5">
              <div className="w-7 h-7 bg-blue-600 rounded-md flex items-center justify-center font-bold text-xs text-white">
                {profile.name ? profile.name.charAt(0).toUpperCase() : 'A'}
              </div>
              <span className="font-bold text-base tracking-tight text-zinc-900 dark:text-white">
                {profile.name ? profile.name.toUpperCase().split(' ')[0] : 'ASIF'}
                <span className="text-blue-500">.</span>DEV
              </span>
              <span className="text-zinc-400 dark:text-zinc-600">|</span>
              <span className="text-xs font-mono text-zinc-500 dark:text-gray-400">
                {profile.title}
              </span>
            </div>
            <p className="mt-2 text-xs text-zinc-500 dark:text-gray-400 max-w-md">
              Building modern, responsive, and scalable web applications using React, Node.js, Express, and MongoDB.
            </p>
          </div>

          {/* Operational Status & Social Channels */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            {/* System Status */}
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-200/60 dark:bg-white/5 border border-zinc-300/60 dark:border-white/5 text-[11px] font-mono text-zinc-700 dark:text-gray-300">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Available for Work</span>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-2">
              {profile.socialLinks.github && (
                <a
                  href={profile.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub profile"
                  className="p-2 rounded-lg bg-white dark:bg-white/5 text-zinc-700 dark:text-gray-300 hover:text-zinc-900 dark:hover:text-white border border-zinc-200 dark:border-white/5 hover:border-blue-500/40 transition-colors shadow-2xs"
                >
                  <Github className="w-4 h-4" />
                </a>
              )}
              {profile.socialLinks.linkedin && (
                <a
                  href={profile.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn profile"
                  className="p-2 rounded-lg bg-white dark:bg-white/5 text-zinc-700 dark:text-gray-300 hover:text-zinc-900 dark:hover:text-white border border-zinc-200 dark:border-white/5 hover:border-blue-500/40 transition-colors shadow-2xs"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
              {profile.socialLinks.whatsapp && (
                <a
                  href={profile.socialLinks.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp chat"
                  className="p-2 rounded-lg bg-white dark:bg-white/5 text-emerald-600 dark:text-emerald-400 border border-zinc-200 dark:border-white/5 hover:border-emerald-500/40 transition-colors shadow-2xs"
                >
                  <MessageSquare className="w-4 h-4" />
                </a>
              )}
              <button
                onClick={scrollToTop}
                aria-label="Scroll back to top"
                className="p-2 rounded-lg bg-white dark:bg-white/5 text-zinc-700 dark:text-gray-300 hover:text-zinc-900 dark:hover:text-white border border-zinc-200 dark:border-white/5 transition-colors shadow-2xs cursor-pointer ml-1"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Core Tech Stack Bar (Clean Minimalism Pattern) */}
        <div className="py-4 flex flex-wrap items-center justify-between gap-4 text-xs font-mono border-b border-zinc-200 dark:border-white/5 text-zinc-500 dark:text-gray-500">
          <div className="flex flex-wrap items-center gap-3 sm:gap-6">
            <span className="text-zinc-900 dark:text-white font-bold tracking-widest text-[10px] uppercase">
              Core Tech Stack:
            </span>
            <span className="hover:text-blue-500 cursor-default transition-colors">React.js</span>
            <span className="hover:text-blue-500 cursor-default transition-colors">Node.js</span>
            <span className="hover:text-blue-500 cursor-default transition-colors">Express</span>
            <span className="hover:text-blue-500 cursor-default transition-colors">MongoDB</span>
            <span className="hover:text-blue-500 cursor-default transition-colors">Tailwind</span>
          </div>

          <button
            onClick={onNavigateAdmin}
            className="inline-flex items-center gap-1.5 text-zinc-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-white transition-colors cursor-pointer text-xs"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Admin CMS</span>
            <ArrowUpRight className="w-3 h-3" />
          </button>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 dark:text-gray-500">
          <p>
            © {new Date().getFullYear()} {profile.name}. All projects demonstrated are personal & featured works.
          </p>
          <p className="font-mono text-[11px]">
            Engineered with React, Vite & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
};
