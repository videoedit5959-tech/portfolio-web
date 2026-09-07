import React from 'react';
import { ProfileData, SkillData, ProjectData } from '../../types/portfolio';
import { X, Printer, Download, Mail, MapPin, Globe, FileText, CheckCircle2 } from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ProfileData;
  skills: SkillData[];
  projects: ProjectData[];
}

export const ResumeModal: React.FC<ResumeModalProps> = ({
  isOpen,
  onClose,
  profile,
  skills,
  projects,
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const resumeText = `
ASIF - MERN STACK WEB DEVELOPER
Email: ${profile.email} | Location: ${profile.location}
GitHub: ${profile.socialLinks.github} | LinkedIn: ${profile.socialLinks.linkedin}

PROFESSIONAL SUMMARY
${profile.shortBio}

CORE TECHNICAL SKILLS
- Frontend: HTML5, CSS3, JavaScript (ES6+), React.js, Tailwind CSS, Bootstrap
- Backend: Node.js, Express.js, MongoDB, Mongoose, RESTful APIs, JWT Authentication
- CMS: WordPress, Elementor & Elementor Pro
- Other: Basic Android Development

FEATURED PERSONAL PROJECTS
${projects
  .map(
    (p) => `
* ${p.title} (${p.category} - ${p.type})
  Technologies: ${p.technologies.join(', ')}
  Overview: ${p.shortDescription}
  Key Features:
  ${p.features.slice(0, 4).map((f) => `  - ${f}`).join('\n')}
`
  )
  .join('\n')}

DEVELOPMENT PHILOSOPHY
${profile.philosophy}
    `;

    const blob = new Blob([resumeText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Asif-MERN-Stack-Developer-Resume.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white dark:bg-[#141414] border border-zinc-200 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
        {/* Modal Controls Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-200 dark:border-white/5 bg-zinc-50 dark:bg-[#0A0A0A] sticky top-0 z-10 print:hidden">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span className="font-bold text-sm text-zinc-900 dark:text-white">
              Resume Preview • {profile.name}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white transition-colors cursor-pointer shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Text Resume</span>
            </button>
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-zinc-100 dark:bg-white/5 hover:bg-zinc-200 dark:hover:bg-white/10 text-zinc-800 dark:text-gray-200 transition-colors cursor-pointer border border-zinc-300 dark:border-white/10"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>
            <button
              onClick={onClose}
              aria-label="Close resume preview"
              className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-white/10 transition-colors cursor-pointer ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Resume Content */}
        <div className="p-8 sm:p-12 overflow-y-auto bg-white text-zinc-900 dark:bg-[#0A0A0A] dark:text-zinc-100 font-sans space-y-8 print:p-0 print:text-black">
          {/* Header */}
          <div className="border-b border-zinc-200 dark:border-white/10 pb-6">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
              {profile.name}
            </h1>
            <p className="text-lg font-bold text-blue-600 dark:text-blue-400 mt-1">
              {profile.title}
            </p>

            <div className="flex flex-wrap gap-4 mt-3 text-xs text-zinc-600 dark:text-gray-400 font-mono">
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-blue-500" />
                {profile.email}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                {profile.location}
              </span>
              <span className="flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-blue-500" />
                {profile.socialLinks.github}
              </span>
            </div>
          </div>

          {/* Summary */}
          <div>
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-500 dark:text-gray-400 mb-2">
              Professional Summary
            </h2>
            <p className="text-sm sm:text-base text-zinc-700 dark:text-gray-300 leading-relaxed">
              {profile.aboutText}
            </p>
          </div>

          {/* Technical Skills Breakdown */}
          <div>
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-500 dark:text-gray-400 mb-3">
              Technical Competencies
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-[#141414] border border-zinc-200 dark:border-white/5">
                <span className="font-bold text-blue-600 dark:text-blue-400 font-mono block mb-1">
                  Frontend Development
                </span>
                <p className="text-zinc-600 dark:text-gray-400">
                  {skills
                    .filter((s) => s.category === 'Frontend')
                    .map((s) => s.name)
                    .join(' • ')}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-[#141414] border border-zinc-200 dark:border-white/5">
                <span className="font-bold text-emerald-600 dark:text-emerald-400 font-mono block mb-1">
                  Backend & Database
                </span>
                <p className="text-zinc-600 dark:text-gray-400">
                  {skills
                    .filter((s) => s.category === 'Backend')
                    .map((s) => s.name)
                    .join(' • ')}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-[#141414] border border-zinc-200 dark:border-white/5">
                <span className="font-bold text-amber-600 dark:text-amber-400 font-mono block mb-1">
                  CMS & Builders
                </span>
                <p className="text-zinc-600 dark:text-gray-400">
                  {skills
                    .filter((s) => s.category === 'CMS')
                    .map((s) => s.name)
                    .join(' • ')}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-[#141414] border border-zinc-200 dark:border-white/5">
                <span className="font-bold text-purple-600 dark:text-purple-400 font-mono block mb-1">
                  Mobile & Tools
                </span>
                <p className="text-zinc-600 dark:text-gray-400">
                  {skills
                    .filter((s) => s.category === 'Other')
                    .map((s) => s.name)
                    .join(' • ')}
                </p>
              </div>
            </div>
          </div>

          {/* Featured Personal Projects */}
          <div>
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-500 dark:text-gray-400 mb-3">
              Featured Personal Projects
            </h2>
            <div className="space-y-4">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="p-4 rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-50/60 dark:bg-[#141414]"
                >
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-bold text-sm text-zinc-900 dark:text-white">
                      {proj.title}
                    </h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded uppercase bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                      {proj.type}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-600 dark:text-gray-400 mt-1">
                    {proj.shortDescription}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {proj.technologies.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-zinc-200/70 dark:bg-white/5 text-zinc-700 dark:text-gray-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
