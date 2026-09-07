import React, { useState } from 'react';
import { SkillData, SkillCategory } from '../../types/portfolio';
import { IconRenderer } from '../common/IconRenderer';
import { Code2, Server, Globe, Smartphone, Sparkles } from 'lucide-react';

interface SkillsProps {
  skills: SkillData[];
}

export const Skills: React.FC<SkillsProps> = ({ skills }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories: { label: string; value: string; icon: React.ReactNode }[] = [
    { label: 'All Stack', value: 'All', icon: <Sparkles className="w-3.5 h-3.5" /> },
    { label: 'Frontend', value: 'Frontend', icon: <Code2 className="w-3.5 h-3.5" /> },
    { label: 'Backend', value: 'Backend', icon: <Server className="w-3.5 h-3.5" /> },
    { label: 'CMS', value: 'CMS', icon: <Globe className="w-3.5 h-3.5" /> },
    { label: 'Other', value: 'Other', icon: <Smartphone className="w-3.5 h-3.5" /> },
  ];

  const activeSkills = skills.filter((s) => s.isActive);
  const filteredSkills =
    selectedCategory === 'All'
      ? activeSkills
      : activeSkills.filter((s) => s.category === selectedCategory);

  const getCategoryBadgeClass = (category: SkillCategory) => {
    switch (category) {
      case 'Frontend':
        return 'text-blue-600 dark:text-blue-400 bg-blue-500/10 border-blue-500/20';
      case 'Backend':
        return 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
      case 'CMS':
        return 'text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/20';
      case 'Other':
        return 'text-purple-600 dark:text-purple-400 bg-purple-500/10 border-purple-500/20';
      default:
        return 'text-zinc-600 dark:text-gray-400 bg-zinc-100 dark:bg-white/5 border-zinc-200 dark:border-white/10';
    }
  };

  return (
    <section
      id="skills"
      className="py-20 md:py-28 bg-white dark:bg-[#0A0A0A] border-t border-zinc-200/80 dark:border-white/5 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <span className="text-blue-600 dark:text-blue-500 font-mono text-xs uppercase tracking-widest font-semibold block mb-3">
              Technical Competencies
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white tracking-tight">
              Skills & Technology Stack
            </h2>
            <p className="mt-3 text-base text-zinc-600 dark:text-gray-400 leading-relaxed">
              Verified technologies actively utilized across my personal full-stack projects, responsive frontend applications, and WordPress solutions.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-zinc-200/60 dark:bg-[#141414] border border-zinc-300/60 dark:border-white/5 self-start md:self-auto">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat.value
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-zinc-600 dark:text-gray-400 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                {cat.icon}
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredSkills.map((skill) => (
            <div
              key={skill.id}
              className="p-5 rounded-2xl bg-white dark:bg-[#141414] border border-zinc-200/80 dark:border-white/5 hover:border-zinc-300 dark:hover:border-white/15 shadow-xs hover:shadow-md transition-all group"
            >
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 dark:bg-white/5 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-105 transition-transform">
                    <IconRenderer name={skill.iconName} className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-zinc-900 dark:text-white text-base">
                      {skill.name}
                    </h3>
                    <span
                      className={`inline-block text-[10px] font-mono px-2 py-0.5 rounded border mt-0.5 uppercase ${getCategoryBadgeClass(
                        skill.category
                      )}`}
                    >
                      {skill.category}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-mono font-bold text-zinc-700 dark:text-zinc-300">
                    {skill.level}%
                  </span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-zinc-100 dark:bg-white/5 rounded-full h-1.5 overflow-hidden">
                <div
                  className="h-full rounded-full bg-blue-600 dark:bg-blue-500 transition-all duration-500"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
