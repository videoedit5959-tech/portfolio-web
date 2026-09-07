import React from 'react';
import { ExperienceData } from '../../types/portfolio';
import { Calendar, Lightbulb } from 'lucide-react';

interface ExperienceProps {
  experience: ExperienceData[];
}

export const Experience: React.FC<ExperienceProps> = ({ experience }) => {
  return (
    <section
      id="experience"
      className="py-20 md:py-28 bg-white dark:bg-[#0A0A0A] border-t border-zinc-200/80 dark:border-white/5 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-blue-600 dark:text-blue-500 font-mono text-xs uppercase tracking-widest font-semibold block mb-3">
            Career Journey & Learning
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white tracking-tight">
            Hands-on Engineering & Experience
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-600 dark:text-gray-400 leading-relaxed">
            Focusing on active codebase craftsmanship, full-stack architecture, independent project delivery, and continuous modern web technologies mastery.
          </p>
        </div>

        {/* Honest Framing Note */}
        <div className="mb-12 p-5 rounded-2xl bg-zinc-100/80 dark:bg-[#141414] border border-zinc-200 dark:border-white/5 flex items-start gap-4">
          <div className="p-2 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 shrink-0">
            <Lightbulb className="w-5 h-5" />
          </div>
          <div className="text-sm">
            <h4 className="font-bold text-zinc-900 dark:text-white mb-1">
              Pragmatic, Proof-of-Work Mindset
            </h4>
            <p className="text-zinc-600 dark:text-gray-400 leading-relaxed">
              Rather than claiming unverified corporate tenures, my experience is anchored in building complete production-ready full-stack software from scratch. Every project in this portfolio proves proficiency with database modeling, REST API engineering, frontend state management, and modern responsive design.
            </p>
          </div>
        </div>

        {/* Timeline Items */}
        <div className="relative border-l-2 border-zinc-200 dark:border-white/10 ml-4 md:ml-6 space-y-10">
          {experience.map((item) => (
            <div key={item.id} className="relative pl-6 md:pl-8 group">
              {/* Timeline marker node */}
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-white dark:bg-[#0A0A0A] border-2 border-blue-600 group-hover:scale-125 transition-transform" />

              <div className="p-6 rounded-2xl bg-white dark:bg-[#141414] border border-zinc-200/80 dark:border-white/5 hover:border-zinc-300 dark:hover:border-white/15 transition-all shadow-xs">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded uppercase bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                    {item.type}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-gray-400 font-mono">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{item.period}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
                  {item.position}
                </h3>
                <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-3">
                  {item.companyOrContext}
                </p>

                <p className="text-sm text-zinc-600 dark:text-gray-400 leading-relaxed mb-4">
                  {item.description}
                </p>

                {item.technologies && item.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-zinc-100 dark:border-white/5">
                    {item.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-zinc-100 dark:bg-white/5 text-zinc-700 dark:text-gray-400 border border-zinc-200 dark:border-white/5"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
