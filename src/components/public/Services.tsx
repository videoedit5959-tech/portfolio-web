import React from 'react';
import { ServiceData } from '../../types/portfolio';
import { IconRenderer } from '../common/IconRenderer';
import { Check } from 'lucide-react';

interface ServicesProps {
  services: ServiceData[];
  onContactClick?: () => void;
}

export const Services: React.FC<ServicesProps> = ({ services, onContactClick }) => {
  const activeServices = services.filter((s) => s.isActive);

  const handleContact = () => {
    if (onContactClick) {
      onContactClick();
    } else {
      const el = document.getElementById('contact');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="services"
      className="py-20 md:py-28 bg-zinc-50/50 dark:bg-[#0A0A0A] border-t border-zinc-200/80 dark:border-white/5 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-blue-600 dark:text-blue-500 font-mono text-xs uppercase tracking-widest font-semibold block mb-3">
            Professional Offerings
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white tracking-tight">
            Services & Technical Solutions
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-600 dark:text-gray-400 leading-relaxed">
            From single-page React interfaces to complete full-stack MERN systems and custom WordPress platforms, here is how I can contribute to your project or agency team.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {activeServices.map((service) => (
            <div
              key={service.id}
              className="flex flex-col justify-between p-6 rounded-2xl bg-white dark:bg-[#141414] border border-zinc-200/80 dark:border-white/5 hover:border-zinc-300 dark:hover:border-white/15 shadow-xs hover:shadow-md transition-all group"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 dark:bg-white/5 border border-blue-500/20 dark:border-white/5 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-5 group-hover:scale-105 transition-transform">
                  <IconRenderer name={service.iconName} className="w-6 h-6" />
                </div>

                <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2.5 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {service.title}
                </h3>

                <p className="text-sm text-zinc-600 dark:text-gray-400 leading-relaxed mb-4">
                  {service.description}
                </p>
              </div>

              {service.highlights && service.highlights.length > 0 && (
                <div className="pt-4 border-t border-zinc-100 dark:border-white/5 mt-auto">
                  <ul className="space-y-1.5 text-xs text-zinc-700 dark:text-zinc-300 font-medium">
                    {service.highlights.map((h, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Quick Consultation Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-white dark:bg-[#141414] border border-zinc-200 dark:border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
          <div>
            <h3 className="text-base font-bold text-zinc-900 dark:text-white">
              Need a custom full-stack web build or technical assistance?
            </h3>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-gray-400 mt-0.5">
              Let's discuss requirements, timeline, and architectural approach.
            </p>
          </div>
          <button
            onClick={handleContact}
            className="px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors shrink-0 cursor-pointer shadow-xs"
          >
            Discuss a Project
          </button>
        </div>
      </div>
    </section>
  );
};
