import React from 'react';
import {
  ProfileData,
  ProjectData,
  SkillData,
  ServiceData,
  ContactMessageData,
} from '../../../types/portfolio';
import { AdminTab } from '../AdminSidebar';
import {
  FolderGit2,
  Code2,
  Layers,
  Inbox,
  CheckCircle2,
  Clock,
  ArrowRight,
  Database,
  Server,
  Terminal,
  ShieldCheck,
} from 'lucide-react';

interface AdminOverviewTabProps {
  profile: ProfileData;
  projects: ProjectData[];
  skills: SkillData[];
  services: ServiceData[];
  messages: ContactMessageData[];
  onNavigateTab: (tab: AdminTab) => void;
  onMarkMessageRead: (id: string) => void;
}

export const AdminOverviewTab: React.FC<AdminOverviewTabProps> = ({
  profile,
  projects,
  skills,
  services,
  messages,
  onNavigateTab,
  onMarkMessageRead,
}) => {
  const unreadMessages = messages.filter((m) => !m.isRead);

  const stats = [
    {
      title: 'Featured Projects',
      value: projects.length,
      caption: `${projects.filter((p) => p.featured).length} featured on homepage`,
      icon: <FolderGit2 className="w-5 h-5 text-cyan-500" />,
      tab: 'projects' as AdminTab,
    },
    {
      title: 'Active Skills',
      value: skills.filter((s) => s.isActive).length,
      caption: 'Across 4 technical categories',
      icon: <Code2 className="w-5 h-5 text-emerald-500" />,
      tab: 'skills' as AdminTab,
    },
    {
      title: 'Services Offered',
      value: services.filter((s) => s.isActive).length,
      caption: 'Production solutions',
      icon: <Layers className="w-5 h-5 text-indigo-500" />,
      tab: 'services' as AdminTab,
    },
    {
      title: 'Contact Messages',
      value: messages.length,
      caption: `${unreadMessages.length} unread submissions`,
      icon: <Inbox className="w-5 h-5 text-amber-500" />,
      tab: 'messages' as AdminTab,
      highlight: unreadMessages.length > 0,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-zinc-900 to-zinc-800 text-white border border-zinc-700/60 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-wider mb-2">
            <Terminal className="w-4 h-4" />
            <span>MERN Stack Developer Portfolio Control</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Welcome back, {profile.name}
          </h2>
          <p className="mt-1 text-sm text-zinc-300 max-w-xl">
            Manage your personal showcase projects, skills, services, and live contact submissions. All changes update the public portfolio dynamically.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onNavigateTab('projects')}
            className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 text-xs font-bold transition-colors cursor-pointer shadow-xs"
          >
            Manage Projects
          </button>
          <button
            onClick={() => onNavigateTab('profile')}
            className="px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold border border-zinc-700 transition-colors cursor-pointer"
          >
            Edit Profile
          </button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((item) => (
          <div
            key={item.title}
            onClick={() => onNavigateTab(item.tab)}
            className={`p-5 rounded-2xl bg-white dark:bg-zinc-900 border transition-all cursor-pointer group ${
              item.highlight
                ? 'border-amber-400/80 dark:border-amber-500/50 shadow-xs'
                : 'border-zinc-200/80 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 shadow-xs hover:shadow-md'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono uppercase text-zinc-500 dark:text-zinc-400 font-semibold">
                {item.title}
              </span>
              <div className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
            </div>

            <div className="text-3xl font-extrabold text-zinc-900 dark:text-white mb-1">
              {item.value}
            </div>

            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              {item.caption}
            </p>
          </div>
        ))}
      </div>

      {/* Two Column Layout: Recent Messages & Architecture Health */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Inquiries */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                Recent Inquiries & Leads
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Direct submissions captured via the portfolio contact form
              </p>
            </div>
            <button
              onClick={() => onNavigateTab('messages')}
              className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:underline cursor-pointer flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {messages.length === 0 ? (
            <div className="p-8 text-center text-xs text-zinc-400 font-mono">
              No contact submissions yet.
            </div>
          ) : (
            <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {messages.slice(0, 4).map((msg) => (
                <div key={msg.id} className="py-3.5 flex items-start justify-between gap-4 group">
                  <div className="space-y-1 overflow-hidden">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-zinc-900 dark:text-white">
                        {msg.name}
                      </span>
                      {!msg.isRead && (
                        <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-amber-500 text-white">
                          New
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
                      {msg.subject} • {msg.email}
                    </p>
                    <p className="text-xs text-zinc-600 dark:text-zinc-300 line-clamp-1 italic">
                      "{msg.message}"
                    </p>
                  </div>

                  <div className="shrink-0 flex items-center gap-2">
                    {!msg.isRead && (
                      <button
                        onClick={() => onMarkMessageRead(msg.id)}
                        className="px-2.5 py-1 text-[11px] rounded-lg font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 cursor-pointer"
                      >
                        Mark Read
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* MERN Architecture Overview */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-zinc-900 dark:text-white">
            System & Storage Health
          </h3>

          <div className="space-y-3 text-xs">
            <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-100 dark:border-zinc-800 flex items-start gap-3">
              <Database className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-zinc-900 dark:text-white">
                  Database & Persistence Layer
                </p>
                <p className="text-zinc-500 dark:text-zinc-400 mt-0.5">
                  Synchronized with Mongoose models & client-side persistent storage. Zero data loss on refresh.
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-100 dark:border-zinc-800 flex items-start gap-3">
              <Server className="w-5 h-5 text-cyan-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-zinc-900 dark:text-white">
                  API & Rate Limiting Guard
                </p>
                <p className="text-zinc-500 dark:text-zinc-400 mt-0.5">
                  Rate limiting active on contact endpoints (20s cool-down per IP/device).
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-100 dark:border-zinc-800 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-zinc-900 dark:text-white">
                  Admin Authorization
                </p>
                <p className="text-zinc-500 dark:text-zinc-400 mt-0.5">
                  JWT protected session with 24-hour expiration token.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
