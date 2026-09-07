import React from 'react';
import { ShieldCheck, Sparkles, Clock, MessageSquareCode, Layers, RefreshCw } from 'lucide-react';

export const WhyWorkWithMe: React.FC = () => {
  const reasons = [
    {
      icon: <Layers className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
      title: 'Full-Stack Architectural Cohesion',
      description: 'I do not just build isolated UI components or raw endpoints; I bridge MongoDB schemas, Express middleware, and React state into unified, performant applications.',
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />,
      title: 'Security & Robust Validation',
      description: 'Password hashing with bcrypt, stateless JWT authorization, strict CORS policies, and sanitized inputs are standard practice across all backends.',
    },
    {
      icon: <Sparkles className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
      title: 'Mobile-First Responsive Precision',
      description: 'Leveraging Tailwind CSS utility architecture to ensure every layout, button, and typography element feels balanced on mobile phones, tablets, and ultra-wide screens.',
    },
    {
      icon: <MessageSquareCode className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
      title: 'Clear, Transparent Communication',
      description: 'Proactive updates, honest capability assessment, and zero inflated jargon. I keep clients and engineering leads informed with straightforward progress.',
    },
    {
      icon: <Clock className="w-6 h-6 text-amber-600 dark:text-amber-400" />,
      title: 'Agile & Agency-Friendly Delivery',
      description: 'Comfortable collaborating with design systems, managing Git branches, reviewing PRs, and delivering clean, comment-guided code ready for deployment.',
    },
    {
      icon: <RefreshCw className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />,
      title: 'MERN + CMS Flexibility',
      description: 'Need a custom Node/React application or a high-converting WordPress & Elementor website? I switch between both ecosystems with ease.',
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-zinc-50/50 dark:bg-[#0A0A0A] border-t border-zinc-200/80 dark:border-white/5 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-16">
          <span className="text-blue-600 dark:text-blue-500 font-mono text-xs uppercase tracking-widest font-semibold block mb-3">
            Developer Values
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white tracking-tight">
            Why Work With Me
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-600 dark:text-gray-400 leading-relaxed">
            A reliable developer dedicated to writing clean code, respecting project timelines, and creating maintainable software solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white dark:bg-[#141414] border border-zinc-200/80 dark:border-white/5 hover:border-zinc-300 dark:hover:border-white/15 shadow-xs hover:shadow-md transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 dark:bg-white/5 border border-blue-500/20 dark:border-white/5 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                {reason.icon}
              </div>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {reason.title}
              </h3>
              <p className="text-sm text-zinc-600 dark:text-gray-400 leading-relaxed">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
