import React, { useState } from 'react';
import { ProjectData } from '../../types/portfolio';
import { Github, ExternalLink, ArrowRight, ArrowUpRight, CheckCircle2, ShieldCheck } from 'lucide-react';

interface FeaturedProjectsProps {
  projects: ProjectData[];
  onSelectProject: (project: ProjectData) => void;
}

export const FeaturedProjects: React.FC<FeaturedProjectsProps> = ({
  projects,
  onSelectProject,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'E-Commerce', 'SaaS', 'Full Stack'];

  const filteredProjects =
    selectedCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  return (
    <section
      id="projects"
      className="py-20 md:py-28 bg-zinc-50/50 dark:bg-[#0A0A0A] border-t border-zinc-200/80 dark:border-white/5 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <span className="text-blue-600 dark:text-blue-500 font-mono text-xs uppercase tracking-widest font-semibold block mb-3">
              Featured Demonstrations
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white tracking-tight">
              Featured Personal & Demo Projects
            </h2>
            <p className="mt-3 text-base text-zinc-600 dark:text-gray-400 leading-relaxed">
              Production-quality web applications engineered to solve real-world user requirements. Every project is built from scratch with clean code, modern architectures, and complete MERN stack integration.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-zinc-200/60 dark:bg-[#141414] border border-zinc-300/60 dark:border-white/5 self-start md:self-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-zinc-600 dark:text-gray-400 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Note on transparency */}
        <div className="mb-10 p-3.5 rounded-xl bg-zinc-100/80 dark:bg-[#141414] border border-zinc-200 dark:border-white/5 flex items-center gap-3 text-xs text-zinc-600 dark:text-gray-400">
          <ShieldCheck className="w-4 h-4 text-blue-500 shrink-0" />
          <span>
            <strong className="text-zinc-800 dark:text-zinc-200 font-semibold">Transparency Guarantee:</strong> All projects below are personal software engineering projects and full-stack demos created by Asif to demonstrate real architectural proficiency.
          </span>
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="flex flex-col rounded-2xl bg-white dark:bg-[#141414] border border-zinc-200/80 dark:border-white/5 hover:border-zinc-300 dark:hover:border-white/15 shadow-xs hover:shadow-lg transition-all duration-300 overflow-hidden group"
            >
              {/* Card Image Banner */}
              <div className="relative h-52 sm:h-56 overflow-hidden bg-zinc-100 dark:bg-zinc-950/80">
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-black/80 text-white backdrop-blur-md border border-white/10">
                    {project.category}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold uppercase bg-blue-600/90 text-white backdrop-blur-md">
                    Demo Project
                  </span>
                </div>
              </div>

              {/* Card Content */}
              <div className="flex-1 p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="text-xl font-bold text-zinc-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h3>
                    <button
                      onClick={() => onSelectProject(project)}
                      aria-label={`Open details for ${project.title}`}
                      className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-white/5 flex items-center justify-center text-zinc-700 dark:text-white group-hover:bg-blue-600 group-hover:text-white transition-colors cursor-pointer shrink-0"
                    >
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-600 dark:text-gray-400 line-clamp-2 mb-4 leading-relaxed">
                    {project.shortDescription}
                  </p>

                  {/* Problem & Solution Mini Snippet */}
                  <div className="p-3 rounded-xl bg-zinc-50 dark:bg-black/40 border border-zinc-200/60 dark:border-white/5 space-y-2 mb-4 text-[11px]">
                    <div>
                      <span className="font-bold text-red-500 font-mono mr-1">
                        Problem:
                      </span>
                      <span className="text-zinc-600 dark:text-gray-400 line-clamp-1">
                        {project.problem}
                      </span>
                    </div>
                    <div>
                      <span className="font-bold text-emerald-500 font-mono mr-1">
                        Solution:
                      </span>
                      <span className="text-zinc-600 dark:text-gray-400 line-clamp-1">
                        {project.solution}
                      </span>
                    </div>
                  </div>

                  {/* Key Features Preview */}
                  <div className="space-y-1.5 mb-5">
                    <p className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 font-semibold">
                      Featured Modules:
                    </p>
                    {project.features.slice(0, 3).map((feat, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-xs text-zinc-700 dark:text-zinc-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                        <span className="truncate">{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech stack badges */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.technologies.slice(0, 4).map((tech, i) => (
                      <span
                        key={tech}
                        className={`text-[10px] font-mono px-2 py-0.5 rounded uppercase ${
                          i === 0
                            ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20'
                            : 'bg-zinc-100 dark:bg-white/5 text-zinc-700 dark:text-gray-400 border border-zinc-200 dark:border-white/5'
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded text-zinc-500">
                        +{project.technologies.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Action Links */}
                <div className="pt-4 border-t border-zinc-100 dark:border-white/5 flex items-center justify-between gap-2">
                  <button
                    onClick={() => onSelectProject(project)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-500 cursor-pointer"
                  >
                    <span>View Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center gap-2">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="View source code on GitHub"
                        className="p-2 rounded-lg text-zinc-600 dark:text-gray-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/5 transition-colors"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Visit live demo"
                        className="p-2 rounded-lg text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
