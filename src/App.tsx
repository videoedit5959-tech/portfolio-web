import React, { useState, useEffect } from 'react';
import { useAuth } from './context/AuthContext';
import { StorageService } from './services/storageService';
import {
  ProfileData,
  ProjectData,
  SkillData,
  ServiceData,
  ExperienceData,
  TestimonialData,
  SiteSettingsData,
} from './types/portfolio';

// Public Components
import { Navbar } from './components/public/Navbar';
import { Hero } from './components/public/Hero';
import { About } from './components/public/About';
import { Skills } from './components/public/Skills';
import { Services } from './components/public/Services';
import { FeaturedProjects } from './components/public/FeaturedProjects';
import { ProjectDetailModal } from './components/public/ProjectDetailModal';
import { Experience } from './components/public/Experience';
import { WhyWorkWithMe } from './components/public/WhyWorkWithMe';
import { Testimonials } from './components/public/Testimonials';
import { Contact } from './components/public/Contact';
import { Footer } from './components/public/Footer';
import { ResumeModal } from './components/public/ResumeModal';

// Admin Components
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminDashboard } from './components/admin/AdminDashboard';

export default function App() {
  const { isAuthenticated } = useAuth();

  // Navigation mode: 'public' | 'admin'
  const [viewMode, setViewMode] = useState<'public' | 'admin'>(() => {
    if (typeof window !== 'undefined' && window.location.hash.includes('admin')) {
      return 'admin';
    }
    return 'public';
  });

  // Modal states
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  // Live portfolio data
  const [profile, setProfile] = useState<ProfileData>(StorageService.getProfile());
  const [projects, setProjects] = useState<ProjectData[]>(StorageService.getProjects());
  const [skills, setSkills] = useState<SkillData[]>(StorageService.getSkills());
  const [services, setServices] = useState<ServiceData[]>(StorageService.getServices());
  const [experience, setExperience] = useState<ExperienceData[]>(StorageService.getExperience());
  const [testimonials, setTestimonials] = useState<TestimonialData[]>(StorageService.getTestimonials());
  const [settings, setSettings] = useState<SiteSettingsData>(StorageService.getSettings());

  // Reload data whenever switching back to public view from admin
  useEffect(() => {
    if (viewMode === 'public') {
      setProfile(StorageService.getProfile());
      setProjects(StorageService.getProjects());
      setSkills(StorageService.getSkills());
      setServices(StorageService.getServices());
      setExperience(StorageService.getExperience());
      setTestimonials(StorageService.getTestimonials());
      setSettings(StorageService.getSettings());
    }
  }, [viewMode]);

  // Sync document title and meta description with settings
  useEffect(() => {
    if (settings.siteTitle) {
      document.title = settings.siteTitle;
    }
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && settings.metaDescription) {
      metaDesc.setAttribute('content', settings.metaDescription);
    }
  }, [settings]);

  // Handle URL hash changes
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash.includes('admin')) {
        setViewMode('admin');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateToAdmin = () => {
    window.location.hash = 'admin';
    setViewMode('admin');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToHome = () => {
    window.location.hash = '';
    setViewMode('public');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Render Admin View
  if (viewMode === 'admin') {
    if (!isAuthenticated) {
      return (
        <AdminLogin
          onBackToPublic={navigateToHome}
          onLoginSuccess={() => setViewMode('admin')}
        />
      );
    }
    return <AdminDashboard onNavigateHome={navigateToHome} />;
  }

  // Render Public Website
  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0A0A] text-zinc-900 dark:text-zinc-100 font-sans transition-colors selection:bg-blue-500/20 selection:text-blue-800 dark:selection:text-blue-300">
      {/* Navigation */}
      <Navbar
        profile={profile}
        onOpenResume={() => setIsResumeModalOpen(true)}
        onNavigateAdmin={navigateToAdmin}
      />

      <main>
        {/* Hero Section */}
        <Hero
          profile={profile}
          onOpenResume={() => setIsResumeModalOpen(true)}
        />

        {/* About Section */}
        <About
          profile={profile}
          projectsCount={projects.length}
          skillsCount={skills.filter((s) => s.isActive).length}
        />

        {/* Skills Section */}
        <Skills skills={skills} />

        {/* Services Section */}
        <Services services={services} />

        {/* Featured Personal Projects */}
        <FeaturedProjects
          projects={projects}
          onSelectProject={(proj) => setSelectedProject(proj)}
        />

        {/* Authentic Experience & Milestones */}
        <Experience experience={experience} />

        {/* Why Work With Me */}
        <WhyWorkWithMe />

        {/* Recommendations & Peer Reviews */}
        <Testimonials testimonials={testimonials} />

        {/* Contact Form & Endpoints */}
        <Contact profile={profile} />
      </main>

      {/* Footer */}
      <Footer
        profile={profile}
        onNavigateAdmin={navigateToAdmin}
        onNavigateHome={navigateToHome}
      />

      {/* Case Study / Project Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Printable / Downloadable Resume Modal */}
      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
        profile={profile}
        skills={skills}
        projects={projects}
      />
    </div>
  );
}
