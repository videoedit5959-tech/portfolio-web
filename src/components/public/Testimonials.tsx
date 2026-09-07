import React from 'react';
import { TestimonialData } from '../../types/portfolio';
import { Quote } from 'lucide-react';

interface TestimonialsProps {
  testimonials: TestimonialData[];
}

export const Testimonials: React.FC<TestimonialsProps> = ({ testimonials }) => {
  const activeList = testimonials.filter((t) => t.isActive);

  if (activeList.length === 0) return null;

  return (
    <section
      id="testimonials"
      className="py-20 md:py-28 bg-white dark:bg-[#0A0A0A] border-t border-zinc-200/80 dark:border-white/5 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-16">
          <span className="text-blue-600 dark:text-blue-500 font-mono text-xs uppercase tracking-widest font-semibold block mb-3">
            Peer & Collaborator Feedback
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white tracking-tight">
            Recommendations & Peer Reviews
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-600 dark:text-gray-400 leading-relaxed">
            Insights from developer peers and technical collaborators regarding code quality, responsiveness, and problem solving.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {activeList.map((item) => (
            <div
              key={item.id}
              className="p-8 rounded-2xl bg-white dark:bg-[#141414] border border-zinc-200/80 dark:border-white/5 hover:border-zinc-300 dark:hover:border-white/15 shadow-xs flex flex-col justify-between relative group transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                    <Quote className="w-5 h-5" />
                  </div>
                  {item.isSample && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded uppercase bg-zinc-100 dark:bg-white/5 text-zinc-600 dark:text-gray-400 border border-zinc-200 dark:border-white/5">
                      Sample Peer Feedback
                    </span>
                  )}
                </div>

                <p className="text-zinc-700 dark:text-zinc-300 text-base leading-relaxed italic mb-6">
                  "{item.content}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-zinc-100 dark:border-white/5">
                <img
                  src={item.avatarUrl}
                  alt={item.name}
                  className="w-11 h-11 rounded-full object-cover border border-zinc-200 dark:border-white/10"
                />
                <div>
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-white">
                    {item.name}
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-gray-400">
                    {item.position} • {item.companyOrContext}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
