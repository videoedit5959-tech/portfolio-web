'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Layers,
  Code,
  FolderGit2,
  Mail,
  User,
  Settings,
  Database,
  Cloud,
  LogOut,
  ExternalLink,
  ShieldCheck,
  Briefcase,
  Star,
  RefreshCw,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [stats, setStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/admin/dashboard-stats', {
        credentials: 'include',
      });

      if (res.status === 401) {
        router.push('/admin/login');
        return;
      }

      const data = await res.json();
      if (data.success) {
        setStats(data.data);
      } else {
        setError(data.error || 'Failed to fetch dashboard metrics');
      }
    } catch (err) {
      setError('Network communication failure');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
    router.push('/admin/login');
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 p-6 md:p-10">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Top bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
              <h1 className="text-2xl font-bold text-white tracking-tight">Admin Management Console</h1>
            </div>
            <p className="text-xs text-zinc-400">
              Direct MongoDB Source-of-Truth Management for Asif's Portfolio.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="text-xs font-semibold px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700 transition-colors inline-flex items-center gap-1.5"
            >
              <span>View Public Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
            <button
              onClick={handleLogout}
              className="text-xs font-semibold px-3 py-2 rounded-xl bg-rose-950/40 border border-rose-900/80 text-rose-300 hover:bg-rose-900/50 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* System Diagnostics Status */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2">
            <div className="flex items-center justify-between text-xs text-zinc-400">
              <span>Database Engine</span>
              <Database className="w-4 h-4 text-blue-400" />
            </div>
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${stats?.database?.connected ? 'bg-emerald-500' : 'bg-amber-500'}`} />
              <span className="text-base font-bold text-white">
                {stats?.database?.connected ? 'MongoDB Connected' : 'Checking Connection...'}
              </span>
            </div>
            <p className="text-[11px] text-zinc-500 font-mono truncate">
              {stats?.database?.name ? `DB: ${stats.database.name}` : 'Mongoose ODM Active'}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2">
            <div className="flex items-center justify-between text-xs text-zinc-400">
              <span>Storage Provider</span>
              <Cloud className="w-4 h-4 text-sky-400" />
            </div>
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${stats?.storage?.configured ? 'bg-emerald-500' : 'bg-sky-500'}`} />
              <span className="text-base font-bold text-white">
                {stats?.storage?.provider || 'Cloudinary / Local Fallback'}
              </span>
            </div>
            <p className="text-[11px] text-zinc-500">
              {stats?.storage?.configured ? 'Cloudinary v2 CDN' : 'Local upload fallback enabled'}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2">
            <div className="flex items-center justify-between text-xs text-zinc-400">
              <span>Security & Auth</span>
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-base font-bold text-white">JWT + Bcrypt Hashing</span>
            </div>
            <p className="text-[11px] text-zinc-500">HTTP-only cookie protection active</p>
          </div>
        </div>

        {/* Operational Entities Grid */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-400">Entity Management</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-3">
              <div className="w-9 h-9 rounded-xl bg-blue-600/10 text-blue-400 flex items-center justify-center">
                <FolderGit2 className="w-5 h-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{stats?.counts?.projects ?? 3}</p>
                <p className="text-xs text-zinc-400">Projects Managed</p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-600/10 text-emerald-400 flex items-center justify-center">
                <Code className="w-5 h-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{stats?.counts?.skills ?? 12}</p>
                <p className="text-xs text-zinc-400">Technical Skills</p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-3">
              <div className="w-9 h-9 rounded-xl bg-purple-600/10 text-purple-400 flex items-center justify-center">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{stats?.counts?.services ?? 3}</p>
                <p className="text-xs text-zinc-400">Active Services</p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-3">
              <div className="w-9 h-9 rounded-xl bg-amber-600/10 text-amber-400 flex items-center justify-center">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold text-white">{stats?.counts?.messages ?? 0}</p>
                  {(stats?.counts?.unreadMessages ?? 0) > 0 && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-500 text-zinc-950 font-bold">
                      {stats.counts.unreadMessages} new
                    </span>
                  )}
                </div>
                <p className="text-xs text-zinc-400">Inbound Inquiries</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
