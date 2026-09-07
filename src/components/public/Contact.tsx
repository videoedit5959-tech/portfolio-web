import React, { useState } from 'react';
import { ProfileData } from '../../types/portfolio';
import { StorageService } from '../../services/storageService';
import { Mail, MessageSquare, Send, CheckCircle2, AlertCircle, MapPin, Phone, Github, Linkedin, ExternalLink } from 'lucide-react';

interface ContactProps {
  profile: ProfileData;
}

export const Contact: React.FC<ContactProps> = ({ profile }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const validate = () => {
    const err: Record<string, string> = {};
    if (!formData.name.trim()) {
      err.name = 'Please provide your full name.';
    }
    if (!formData.email.trim()) {
      err.email = 'Please provide your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      err.email = 'Please enter a valid email address.';
    }
    if (!formData.subject.trim()) {
      err.subject = 'Please specify a subject.';
    }
    if (!formData.message.trim()) {
      err.message = 'Please enter your message.';
    } else if (formData.message.trim().length < 15) {
      err.message = 'Message must be at least 15 characters long.';
    } else if (formData.message.trim().length > 2000) {
      err.message = 'Message must be under 2000 characters.';
    }
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      // Small simulated delay for UX
      await new Promise((res) => setTimeout(res, 500));

      const result = StorageService.submitMessage({
        name: formData.name.trim(),
        email: formData.email.trim(),
        subject: formData.subject.trim(),
        message: formData.message.trim(),
      });

      if (!result.success) {
        setApiError(result.error || 'Failed to submit message.');
        setIsSubmitting(false);
        return;
      }

      setSubmitSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setErrors({});
    } catch (err) {
      console.error(err);
      setApiError('An unexpected error occurred. Please try again or reach out directly via email.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-20 md:py-28 bg-zinc-50/50 dark:bg-[#0A0A0A] border-t border-zinc-200/80 dark:border-white/5 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-blue-600 dark:text-blue-500 font-mono text-xs uppercase tracking-widest font-semibold block mb-3">
            Let's Connect
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white tracking-tight">
            Start a Conversation
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-600 dark:text-gray-400 leading-relaxed">
            Have a project in mind, an engineering role, or a technical inquiry? Send a message through the form or connect directly through any of the channels below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Left Column: Direct Contact Details & Links */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#141414] border border-zinc-200/80 dark:border-white/5 shadow-xs space-y-6">
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                Contact Information
              </h3>

              <div className="space-y-4">
                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-start gap-3.5 p-3 rounded-xl hover:bg-zinc-50 dark:hover:bg-white/5 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">Direct Email</p>
                    <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 truncate group-hover:text-blue-500 transition-colors">
                      {profile.email}
                    </p>
                  </div>
                </a>

                <div className="flex items-start gap-3.5 p-3 rounded-xl">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">Location & Base</p>
                    <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                      {profile.location}
                    </p>
                  </div>
                </div>

                {profile.phone && (
                  <div className="flex items-start gap-3.5 p-3 rounded-xl">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">Phone / Contact</p>
                      <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                        {profile.phone}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Social Channels */}
              <div className="pt-4 border-t border-zinc-100 dark:border-white/5">
                <p className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider mb-3">
                  Developer & Social Networks
                </p>
                <div className="flex flex-wrap gap-2">
                  {profile.socialLinks.github && (
                    <a
                      href={profile.socialLinks.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-zinc-100 dark:bg-white/5 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-white/10 border border-zinc-200 dark:border-white/5 transition-colors"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>GitHub</span>
                    </a>
                  )}
                  {profile.socialLinks.linkedin && (
                    <a
                      href={profile.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-zinc-100 dark:bg-white/5 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-white/10 border border-zinc-200 dark:border-white/5 transition-colors"
                    >
                      <Linkedin className="w-3.5 h-3.5" />
                      <span>LinkedIn</span>
                    </a>
                  )}
                  {profile.socialLinks.whatsapp && (
                    <a
                      href={profile.socialLinks.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 border border-emerald-200/60 dark:border-emerald-800/40 transition-colors"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Quick reassurance card */}
            <div className="p-5 rounded-2xl bg-white dark:bg-[#141414] border border-zinc-200 dark:border-white/5 text-xs text-zinc-500 dark:text-gray-400 space-y-1 shadow-xs">
              <p className="font-semibold text-zinc-700 dark:text-zinc-300">
                ⚡ Rapid Response Commitment
              </p>
              <p>
                All submitted inquiries are securely recorded in the administrative inbox and usually responded to within 24 business hours.
              </p>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#141414] border border-zinc-200/80 dark:border-white/5 shadow-xs">
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-1">
                Send a Message
              </h3>
              <p className="text-xs sm:text-sm text-zinc-500 dark:text-gray-400 mb-6">
                All fields are validated with anti-spam protections.
              </p>

              {submitSuccess && (
                <div className="mb-6 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-emerald-800 dark:text-emerald-300">
                      Message Dispatched Successfully!
                    </h4>
                    <p className="text-xs text-emerald-700 dark:text-emerald-400 mt-0.5">
                      Thank you for getting in touch. Your message has been saved in the system. Asif will review it shortly.
                    </p>
                    <button
                      onClick={() => setSubmitSuccess(false)}
                      className="mt-2 text-xs font-semibold text-emerald-800 dark:text-emerald-300 underline cursor-pointer"
                    >
                      Send another message
                    </button>
                  </div>
                </div>
              )}

              {apiError && (
                <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-red-800 dark:text-red-300">
                      Submission Error
                    </h4>
                    <p className="text-xs text-red-700 dark:text-red-400 mt-0.5">
                      {apiError}
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-[11px] font-semibold uppercase tracking-wider font-mono text-zinc-700 dark:text-gray-300 mb-1.5"
                    >
                      Your Name *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      placeholder="e.g. Sarah Jenkins"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`w-full px-4 py-2.5 rounded-lg bg-zinc-50 dark:bg-black/30 border text-sm text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all ${
                        errors.name ? 'border-red-500' : 'border-zinc-200 dark:border-white/10'
                      }`}
                    />
                    {errors.name && (
                      <p className="mt-1 text-xs text-red-500 font-medium">{errors.name}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-[11px] font-semibold uppercase tracking-wider font-mono text-zinc-700 dark:text-gray-300 mb-1.5"
                    >
                      Email Address *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      placeholder="you@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full px-4 py-2.5 rounded-lg bg-zinc-50 dark:bg-black/30 border text-sm text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all ${
                        errors.email ? 'border-red-500' : 'border-zinc-200 dark:border-white/10'
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-500 font-medium">{errors.email}</p>
                    )}
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label
                    htmlFor="contact-subject"
                    className="block text-[11px] font-semibold uppercase tracking-wider font-mono text-zinc-700 dark:text-gray-300 mb-1.5"
                  >
                    Subject / Topic *
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    placeholder="e.g. MERN Full-Stack Project Inquiry"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className={`w-full px-4 py-2.5 rounded-lg bg-zinc-50 dark:bg-black/30 border text-sm text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all ${
                      errors.subject ? 'border-red-500' : 'border-zinc-200 dark:border-white/10'
                    }`}
                  />
                  {errors.subject && (
                    <p className="mt-1 text-xs text-red-500 font-medium">{errors.subject}</p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label
                      htmlFor="contact-message"
                      className="block text-[11px] font-semibold uppercase tracking-wider font-mono text-zinc-700 dark:text-gray-300"
                    >
                      Project Details / Message *
                    </label>
                    <span className="text-[11px] font-mono text-zinc-400">
                      {formData.message.length}/2000
                    </span>
                  </div>
                  <textarea
                    id="contact-message"
                    rows={5}
                    placeholder="Tell me about your project requirements, goals, or role specifications..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={`w-full px-4 py-3 rounded-lg bg-zinc-50 dark:bg-black/30 border text-sm text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all resize-none ${
                      errors.message ? 'border-red-500' : 'border-zinc-200 dark:border-white/10'
                    }`}
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs text-red-500 font-medium">{errors.message}</p>
                  )}
                </div>

                {/* Submit button */}
                <button
                  id="contact-submit-btn"
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold text-sm transition-colors cursor-pointer shadow-xs"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Direct Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
