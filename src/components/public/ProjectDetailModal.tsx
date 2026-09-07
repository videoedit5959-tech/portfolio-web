import React, { useState } from 'react';
import { ProjectData } from '../../types/portfolio';
import { X, ExternalLink, Github, CheckCircle2, AlertCircle } from 'lucide-react';

interface ProjectDetailModalProps {
  project: ProjectData | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  if (!project) return null;

  const currentGalleryImg = selectedImg || project.thumbnail;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white dark:bg-[#141414] border border-zinc-200 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-200 dark:border-white/5 bg-zinc-50 dark:bg-[#0A0A0A] sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-mono uppercase font-bold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
              {project.type}
            </span>
            <span className="text-xs font-mono text-zinc-500 dark:text-gray-400">
              Category: {project.category}
            </span>
          </div>

          <button
            onClick={onClose}
            aria-label="Close project details"
            className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-8">
          {/* Title & Short Description */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white tracking-tight">
              {project.title}
            </h2>
            <p className="mt-2 text-base text-zinc-600 dark:text-gray-300 leading-relaxed">
              {project.shortDescription}
            </p>
          </div>

          {/* Gallery Showcase */}
          <div className="space-y-3">
            <div className="relative h-64 sm:h-96 rounded-xl overflow-hidden border border-zinc-200 dark:border-white/5 bg-zinc-100 dark:bg-black">
              <img
                src={currentGalleryImg}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>

            {project.gallery && project.gallery.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-2">
                {project.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImg(img)}
                    className={`relative w-20 h-14 rounded-lg overflow-hidden border-2 shrink-0 cursor-pointer transition-all ${
                      currentGalleryImg === img
                        ? 'border-blue-500 ring-2 ring-blue-500/20'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Problem & Solution Architecture */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl bg-red-500/5 dark:bg-red-950/20 border border-red-500/20 dark:border-red-900/30">
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-red-600 dark:text-red-400 uppercase tracking-wider mb-2">
                <AlertCircle className="w-4 h-4" />
                <span>The Problem Addressed</span>
              </div>
              <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                {project.problem}
              </p>
            </div>

            <div className="p-5 rounded-xl bg-emerald-500/5 dark:bg-emerald-950/20 border border-emerald-500/20 dark:border-emerald-900/30">
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>The Technical Solution</span>
              </div>
              <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Detailed Narrative */}
          {project.detailedDescription && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest font-mono text-zinc-500 dark:text-gray-400 mb-2">
                Architecture & Engineering Notes
              </h4>
              <p className="text-sm text-zinc-600 dark:text-gray-300 leading-relaxed bg-zinc-50 dark:bg-white/5 p-4 rounded-xl border border-zinc-200/80 dark:border-white/5">
                {project.detailedDescription}
              </p>
            </div>
          )}

          {/* Full Features Breakdown */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest font-mono text-zinc-500 dark:text-gray-400 mb-3">
              Key Features & Capabilities
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {project.features.map((feature, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-3 rounded-lg bg-zinc-50 dark:bg-white/5 border border-zinc-200/60 dark:border-white/5 text-xs text-zinc-800 dark:text-zinc-200 font-medium"
                >
                  <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technologies Used */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest font-mono text-zinc-500 dark:text-gray-400 mb-3">
              Technologies & Tools
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="text-[11px] font-mono uppercase px-3 py-1 rounded-md bg-zinc-100 dark:bg-white/5 text-zinc-700 dark:text-gray-300 border border-zinc-200 dark:border-white/5"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer with Actions */}
        <div className="px-6 py-4 border-t border-zinc-200 dark:border-white/5 bg-zinc-50 dark:bg-[#0A0A0A] flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs text-zinc-500 dark:text-gray-400 font-mono">
            Status: <span className="font-semibold text-emerald-600 dark:text-emerald-400">{project.status}</span>
          </div>

          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold bg-zinc-100 dark:bg-white/5 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-white/10 border border-zinc-300 dark:border-white/10 transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                <span>Source Code</span>
              </a>
            )}

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white transition-colors shadow-xs"
              >
                <span>Live Interactive Demo</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs font-semibold bg-zinc-200 dark:bg-white/10 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-300 dark:hover:bg-white/15 transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
