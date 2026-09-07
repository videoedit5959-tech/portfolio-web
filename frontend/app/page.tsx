import React from 'react';
import Link from 'next/link';
import {
  Code,
  Server,
  Layers,
  Globe,
  Database,
  Smartphone,
  ExternalLink,
  Github,
  Mail,
  MapPin,
  CheckCircle,
  Briefcase,
  Sparkles,
  ArrowRight,
  Send,
} from 'lucide-react';
import { fetchPortfolioData } from '../lib/api';

export default async function HomePage() {
  const data = await fetchPortfolioData();

  const profile = data?.profile || {
    name: 'Asif',
    title: 'MERN Stack Web Developer',
    shortBio: 'I build modern, responsive and scalable web applications using React, Node.js, Express and MongoDB.',
    aboutText: 'I am a dedicated MERN Stack Web Developer passionate about building high-performance, responsive, and maintainable web applications. My foundation is built on practical craftsmanship—transforming ideas into clean interfaces and robust RESTful backends.\n\nWith a strong grasp of modern JavaScript, React component architecture, Express middleware, and MongoDB document modeling, I build full-stack applications with an emphasis on code cleanliness, security, and responsive UX across all screen sizes.',
    email: 'asif.mern.dev@gmail.com',
    location: 'Dhaka, Bangladesh (Available Worldwide)',
    avatarUrl: '/images/profile-placeholder.svg',
    isAvailable: true,
  };

  const skills = data?.skills && data.skills.length > 0 ? data.skills : [
    { name: 'HTML', category: 'Frontend', level: 95 },
    { name: 'CSS', category: 'Frontend', level: 90 },
    { name: 'JavaScript', category: 'Frontend', level: 88 },
    { name: 'React.js', category: 'Frontend', level: 85 },
    { name: 'Tailwind CSS', category: 'Frontend', level: 90 },
    { name: 'Bootstrap', category: 'Frontend', level: 85 },
    { name: 'Node.js', category: 'Backend', level: 84 },
    { name: 'Express.js', category: 'Backend', level: 86 },
    { name: 'MongoDB', category: 'Backend', level: 82 },
    { name: 'WordPress', category: 'CMS', level: 88 },
    { name: 'Elementor', category: 'CMS', level: 92 },
    { name: 'Basic Android Development', category: 'Other', level: 60 },
  ];

  const projects = data?.projects || [];
  const services = data?.services || [];
  const experience = data?.experience || [];

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 selection:bg-blue-600 selection:text-white">
      {/* Top Navigation */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-[#09090b]/80 border-b border-zinc-800">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 font-bold tracking-tight text-white hover:text-blue-400 transition-colors">
            <span className="w-8 h-8 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center text-blue-400 font-mono text-sm">
              &lt;/&gt;
            </span>
            <span>{profile.name}</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#skills" className="hover:text-white transition-colors">Skills</a>
            <a href="#projects" className="hover:text-white transition-colors">Projects</a>
            <a href="#services" className="hover:text-white transition-colors">Services</a>
            <a href="#experience" className="hover:text-white transition-colors">Experience</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/admin/login"
              className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors"
            >
              Admin
            </Link>
            <a
              href="#contact"
              className="text-xs font-semibold px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-colors"
            >
              Hire Me
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 md:py-28 border-b border-zinc-850">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12">
            <div className="flex-1 space-y-6 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-medium text-blue-400">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Available for Full-Stack Opportunities
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                {profile.title}
              </h1>

              <p className="text-lg text-zinc-400 max-w-2xl leading-relaxed">
                {profile.shortBio}
              </p>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2">
                <a
                  href="#projects"
                  className="px-6 py-3 rounded-xl bg-white text-zinc-950 font-semibold text-sm hover:bg-zinc-200 transition-colors inline-flex items-center gap-2"
                >
                  <span>View Projects</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#contact"
                  className="px-6 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 font-semibold text-sm hover:bg-zinc-800 hover:text-white transition-colors"
                >
                  Get in Touch
                </a>
              </div>

              <div className="flex items-center justify-center md:justify-start gap-6 pt-4 text-xs text-zinc-500">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-zinc-400" />
                  <span>{profile.location}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Mail className="w-4 h-4 text-zinc-400" />
                  <span>{profile.email}</span>
                </div>
              </div>
            </div>

            <div className="w-48 h-48 sm:w-60 sm:h-60 md:w-72 md:h-72 rounded-3xl overflow-hidden border border-zinc-800 bg-zinc-900 p-2 shadow-2xl flex-shrink-0">
              <img
                src={profile.avatarUrl || '/images/profile-placeholder.svg'}
                alt={profile.name}
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 border-b border-zinc-900">
        <div className="max-w-6xl mx-auto px-6 space-y-10">
          <div className="max-w-2xl">
            <h2 className="text-xs uppercase tracking-widest text-blue-500 font-bold mb-2">Background</h2>
            <h3 className="text-3xl font-bold tracking-tight text-white">About Me & Philosophy</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-4 text-zinc-400 leading-relaxed text-base">
              {profile.aboutText.split('\n\n').map((paragraph: string, idx: number) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 space-y-4">
              <h4 className="text-sm font-bold text-white tracking-wide uppercase">Core Philosophy</h4>
              <p className="text-sm text-zinc-400 italic leading-relaxed">
                "{profile.philosophy}"
              </p>
              <div className="pt-4 border-t border-zinc-800/80 space-y-2 text-xs text-zinc-400">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  <span>Clean component modularity</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  <span>Secure RESTful API patterns</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  <span>Reliable MongoDB document schemas</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 border-b border-zinc-900 bg-zinc-950/40">
        <div className="max-w-6xl mx-auto px-6 space-y-10">
          <div className="max-w-2xl">
            <h2 className="text-xs uppercase tracking-widest text-blue-500 font-bold mb-2">Expertise</h2>
            <h3 className="text-3xl font-bold tracking-tight text-white">Technical Skills</h3>
            <p className="text-sm text-zinc-400 mt-2">Verified technologies practiced across full-stack applications.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {skills.map((skill: any, idx: number) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-zinc-800 text-zinc-400">
                      {skill.category}
                    </span>
                    <span className="text-xs font-mono text-blue-400">{skill.level}%</span>
                  </div>
                  <h4 className="text-base font-bold text-white tracking-tight">{skill.name}</h4>
                </div>
                <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden mt-4">
                  <div
                    className="bg-blue-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 border-b border-zinc-900">
        <div className="max-w-6xl mx-auto px-6 space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h2 className="text-xs uppercase tracking-widest text-blue-500 font-bold mb-2">Portfolio</h2>
              <h3 className="text-3xl font-bold tracking-tight text-white">Featured Personal Projects</h3>
            </div>
            <p className="text-xs text-zinc-400">Database source of truth • Full-Stack Demos</p>
          </div>

          {projects.length === 0 ? (
            <div className="p-12 rounded-2xl border border-dashed border-zinc-800 text-center space-y-3">
              <Briefcase className="w-8 h-8 text-zinc-600 mx-auto" />
              <p className="text-zinc-400 text-sm">No personal projects currently published.</p>
              <p className="text-zinc-600 text-xs">Admin can publish personal projects directly from the dashboard.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project: any) => (
                <div
                  key={project._id || project.slug}
                  className="rounded-2xl bg-zinc-900 border border-zinc-800 overflow-hidden flex flex-col hover:border-zinc-700 transition-colors group"
                >
                  <div className="relative aspect-video bg-zinc-800 overflow-hidden">
                    <img
                      src={project.thumbnail}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-3 left-3 text-[11px] font-semibold px-2.5 py-1 rounded-md bg-zinc-900/90 backdrop-blur-sm border border-zinc-700 text-zinc-200">
                      {project.type || 'Featured Personal Project'}
                    </span>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs text-zinc-400">
                        <span>{project.category}</span>
                        <span className="text-emerald-400">{project.status}</span>
                      </div>
                      <h4 className="text-lg font-bold text-white tracking-tight">{project.title}</h4>
                      <p className="text-xs text-zinc-400 line-clamp-3 leading-relaxed">
                        {project.shortDescription}
                      </p>
                    </div>

                    <div className="space-y-4 pt-2">
                      <div className="flex flex-wrap gap-1.5">
                        {project.technologies?.slice(0, 4).map((tech: string, i: number) => (
                          <span key={i} className="text-[10.5px] px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 font-mono">
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-zinc-800/80">
                        <Link
                          href={`/projects/${project.slug}`}
                          className="text-xs font-semibold text-blue-400 hover:text-blue-300 inline-flex items-center gap-1"
                        >
                          <span>Case Study</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                        <div className="flex items-center gap-3">
                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-zinc-400 hover:text-white transition-colors"
                            >
                              <Github className="w-4 h-4" />
                            </a>
                          )}
                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-zinc-400 hover:text-white transition-colors"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 border-b border-zinc-900 bg-zinc-950/30">
        <div className="max-w-6xl mx-auto px-6 space-y-10">
          <div className="max-w-2xl">
            <h2 className="text-xs uppercase tracking-widest text-blue-500 font-bold mb-2">Offerings</h2>
            <h3 className="text-3xl font-bold tracking-tight text-white">Services & Capabilities</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {services.map((service: any, idx: number) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-4 hover:border-zinc-700 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-500/20 text-blue-400 flex items-center justify-center">
                  <Layers className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-bold text-white tracking-tight">{service.title}</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">{service.description}</p>
                <div className="pt-2 border-t border-zinc-800/80 space-y-2">
                  {service.highlights?.map((hl: string, i: number) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-zinc-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section (Truthful empty state per prompt) */}
      <section id="experience" className="py-20 border-b border-zinc-900">
        <div className="max-w-6xl mx-auto px-6 space-y-10">
          <div className="max-w-2xl">
            <h2 className="text-xs uppercase tracking-widest text-blue-500 font-bold mb-2">Career</h2>
            <h3 className="text-3xl font-bold tracking-tight text-white">Work Experience</h3>
          </div>

          {experience.length === 0 ? (
            <div className="p-8 rounded-2xl bg-zinc-900/40 border border-zinc-800 text-center space-y-2">
              <Briefcase className="w-6 h-6 text-zinc-500 mx-auto" />
              <p className="text-zinc-300 font-medium text-sm">
                Currently building hands-on experience through personal projects and continuous learning.
              </p>
              <p className="text-zinc-500 text-xs max-w-lg mx-auto">
                Open to full-time junior / mid-level full-stack positions and contract opportunities.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {experience.map((exp: any, idx: number) => (
                <div key={idx} className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-base font-bold text-white">{exp.position}</h4>
                      <p className="text-xs text-blue-400">{exp.company}</p>
                    </div>
                    <span className="text-xs font-mono text-zinc-500">
                      {exp.startDate} - {exp.isCurrent ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="max-w-4xl mx-auto px-6 space-y-10">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="text-xs uppercase tracking-widest text-blue-500 font-bold">Inquiries</h2>
            <h3 className="text-3xl font-bold tracking-tight text-white">Send a Direct Message</h3>
            <p className="text-xs text-zinc-400">
              Validated and saved directly into the database. No simulated responses.
            </p>
          </div>

          <form
            action="/api/contact"
            method="POST"
            className="p-8 rounded-3xl bg-zinc-900 border border-zinc-800 shadow-xl space-y-5"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-xs font-medium text-zinc-300">Your Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="e.g. Alex Morgan"
                  className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium text-zinc-300">Your Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="alex@example.com"
                  className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-zinc-300">Subject</label>
              <input
                type="text"
                name="subject"
                required
                placeholder="Project Inquiry / Job Opportunity"
                className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-zinc-300">Message</label>
              <textarea
                name="message"
                rows={5}
                required
                minLength={10}
                placeholder="Please describe your requirements or project details..."
                className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-blue-600/20"
            >
              <Send className="w-4 h-4" />
              <span>Send Secure Message</span>
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-zinc-850 text-center text-xs text-zinc-500">
        <p>© {new Date().getFullYear()} Asif. Built with React, Node.js, Express & MongoDB.</p>
      </footer>
    </div>
  );
}
