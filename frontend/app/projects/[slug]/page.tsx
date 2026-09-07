import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ExternalLink, Github, CheckCircle2, Server, Layers } from 'lucide-react';
import { fetchProjectBySlug } from '../../../lib/api';

interface Props {
  params: {
    slug: string;
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const project = await fetchProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 py-12 px-6">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Back Link */}
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Projects</span>
        </Link>

        {/* Header Title & Meta */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-600/10 text-blue-400 border border-blue-500/20">
              {project.category}
            </span>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-zinc-900 text-zinc-300 border border-zinc-800">
              {project.type || 'Featured Personal Project'}
            </span>
            <span className="text-xs text-emerald-400 font-mono">
              Status: {project.status}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {project.title}
          </h1>

          <p className="text-base text-zinc-400 leading-relaxed max-w-3xl">
            {project.detailedDescription || project.shortDescription}
          </p>

          {/* Action Links */}
          <div className="flex items-center gap-4 pt-2">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold inline-flex items-center gap-2 transition-colors"
              >
                <span>Live Application</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-200 text-xs font-semibold inline-flex items-center gap-2 transition-colors"
              >
                <span>View Source Code</span>
                <Github className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>

        {/* Hero Image */}
        <div className="aspect-video w-full rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900">
          <img
            src={project.thumbnail}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Problem & Solution Grid */}
        {(project.problem || project.solution) && (
          <div className="grid sm:grid-cols-2 gap-6">
            {project.problem && (
              <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 space-y-3">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">The Challenge</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">{project.problem}</p>
              </div>
            )}
            {project.solution && (
              <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 space-y-3">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">The Solution</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">{project.solution}</p>
              </div>
            )}
          </div>
        )}

        {/* Technologies Used */}
        <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Server className="w-4 h-4 text-blue-400" />
            <span>Technologies & Stack</span>
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.technologies?.map((tech: string, i: number) => (
              <span
                key={i}
                className="px-3 py-1.5 rounded-lg bg-zinc-800 border border-zinc-700/80 text-xs font-mono text-zinc-200"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Key Features */}
        {project.features && project.features.length > 0 && (
          <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-400" />
              <span>Key Features</span>
            </h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {project.features.map((feat: string, i: number) => (
                <div key={i} className="flex items-start gap-2.5 text-xs text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Gallery */}
        {project.gallery && project.gallery.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Screenshots</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {project.gallery.map((img: string, i: number) => (
                <div key={i} className="aspect-video rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900">
                  <img src={img} alt={`${project.title} screenshot ${i + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
