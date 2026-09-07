import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { StorageService } from '../../services/storageService';
import {
  ProfileData,
  ProjectData,
  SkillData,
  ServiceData,
  ExperienceData,
  TestimonialData,
  ContactMessageData,
  SiteSettingsData,
} from '../../types/portfolio';
import { AdminSidebar, AdminTab } from './AdminSidebar';
import { AdminHeader } from './AdminHeader';
import { AdminOverviewTab } from './tabs/AdminOverviewTab';
import { AdminProfileTab } from './tabs/AdminProfileTab';
import { AdminProjectsTab } from './tabs/AdminProjectsTab';
import { AdminSkillsTab } from './tabs/AdminSkillsTab';
import { AdminServicesTab } from './tabs/AdminServicesTab';
import { AdminExperienceTab } from './tabs/AdminExperienceTab';
import { AdminTestimonialsTab } from './tabs/AdminTestimonialsTab';
import { AdminMessagesTab } from './tabs/AdminMessagesTab';
import { AdminSettingsTab } from './tabs/AdminSettingsTab';
import { X, CheckCircle2 } from 'lucide-react';

interface AdminDashboardProps {
  onNavigateHome: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigateHome }) => {
  const { logout } = useAuth();
  const [currentTab, setCurrentTab] = useState<AdminTab>('overview');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Live state from storage
  const [profile, setProfile] = useState<ProfileData>(StorageService.getProfile());
  const [projects, setProjects] = useState<ProjectData[]>(StorageService.getProjects());
  const [skills, setSkills] = useState<SkillData[]>(StorageService.getSkills());
  const [services, setServices] = useState<ServiceData[]>(StorageService.getServices());
  const [experience, setExperience] = useState<ExperienceData[]>(StorageService.getExperience());
  const [testimonials, setTestimonials] = useState<TestimonialData[]>(StorageService.getTestimonials());
  const [messages, setMessages] = useState<ContactMessageData[]>(StorageService.getMessages());
  const [settings, setSettings] = useState<SiteSettingsData>(StorageService.getSettings());

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSaveProfile = (updated: ProfileData) => {
    const res = StorageService.updateProfile(updated);
    setProfile(res);
    showToast('Profile details updated successfully.');
  };

  const handleSaveProject = (project: ProjectData) => {
    const res = StorageService.saveProject(project);
    setProjects(res);
    showToast('Project saved successfully.');
  };

  const handleDeleteProject = (id: string) => {
    const res = StorageService.deleteProject(id);
    setProjects(res);
    showToast('Project removed successfully.');
  };

  const handleSaveSkill = (skill: SkillData) => {
    const res = StorageService.saveSkill(skill);
    setSkills(res);
    showToast('Skill updated successfully.');
  };

  const handleDeleteSkill = (id: string) => {
    const res = StorageService.deleteSkill(id);
    setSkills(res);
    showToast('Skill removed successfully.');
  };

  const handleSaveService = (service: ServiceData) => {
    const res = StorageService.saveService(service);
    setServices(res);
    showToast('Service updated successfully.');
  };

  const handleDeleteService = (id: string) => {
    const res = StorageService.deleteService(id);
    setServices(res);
    showToast('Service removed successfully.');
  };

  const handleSaveExperience = (item: ExperienceData) => {
    const res = StorageService.saveExperience(item);
    setExperience(res);
    showToast('Milestone saved successfully.');
  };

  const handleDeleteExperience = (id: string) => {
    const res = StorageService.deleteExperience(id);
    setExperience(res);
    showToast('Milestone removed successfully.');
  };

  const handleSaveTestimonial = (item: TestimonialData) => {
    const res = StorageService.saveTestimonial(item);
    setTestimonials(res);
    showToast('Testimonial saved successfully.');
  };

  const handleDeleteTestimonial = (id: string) => {
    const res = StorageService.deleteTestimonial(id);
    setTestimonials(res);
    showToast('Testimonial removed successfully.');
  };

  const handleMarkMessageRead = (id: string) => {
    const res = StorageService.markMessageRead(id);
    setMessages(res);
  };

  const handleDeleteMessage = (id: string) => {
    const res = StorageService.deleteMessage(id);
    setMessages(res);
    showToast('Message deleted.');
  };

  const handleSaveSettings = (updated: SiteSettingsData) => {
    const res = StorageService.updateSettings(updated);
    setSettings(res);
    showToast('Site settings updated.');
  };

  const handleResetDefaults = () => {
    if (window.confirm('Reset all portfolio content back to initial default values?')) {
      StorageService.resetToDefaults();
      setProfile(StorageService.getProfile());
      setProjects(StorageService.getProjects());
      setSkills(StorageService.getSkills());
      setServices(StorageService.getServices());
      setExperience(StorageService.getExperience());
      setTestimonials(StorageService.getTestimonials());
      setMessages(StorageService.getMessages());
      setSettings(StorageService.getSettings());
      showToast('Reset portfolio to initial state.');
    }
  };

  const unreadMessagesCount = messages.filter((m) => !m.isRead).length;

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex transition-colors">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <AdminSidebar
          currentTab={currentTab}
          onSelectTab={(tab) => setCurrentTab(tab)}
          onLogout={logout}
          onViewSite={onNavigateHome}
          unreadMessagesCount={unreadMessagesCount}
        />
      </div>

      {/* Mobile Drawer Sidebar */}
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden bg-black/70 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-72 max-w-full">
            <AdminSidebar
              currentTab={currentTab}
              onSelectTab={(tab) => {
                setCurrentTab(tab);
                setIsMobileSidebarOpen(false);
              }}
              onLogout={() => {
                logout();
                setIsMobileSidebarOpen(false);
              }}
              onViewSite={() => {
                onNavigateHome();
                setIsMobileSidebarOpen(false);
              }}
              unreadMessagesCount={unreadMessagesCount}
            />
            <button
              onClick={() => setIsMobileSidebarOpen(false)}
              className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        <AdminHeader
          currentTabName={currentTab}
          onViewSite={onNavigateHome}
          onResetDefaults={handleResetDefaults}
          onToggleMobileSidebar={() => setIsMobileSidebarOpen(true)}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {/* Notification Toast */}
          {toastMessage && (
            <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-2xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 shadow-2xl text-xs font-semibold animate-in slide-in-from-bottom-3 duration-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>{toastMessage}</span>
            </div>
          )}

          {currentTab === 'overview' && (
            <AdminOverviewTab
              profile={profile}
              projects={projects}
              skills={skills}
              services={services}
              messages={messages}
              onNavigateTab={(tab) => setCurrentTab(tab)}
              onMarkMessageRead={handleMarkMessageRead}
            />
          )}

          {currentTab === 'profile' && (
            <AdminProfileTab profile={profile} onSaveProfile={handleSaveProfile} />
          )}

          {currentTab === 'projects' && (
            <AdminProjectsTab
              projects={projects}
              onSaveProject={handleSaveProject}
              onDeleteProject={handleDeleteProject}
            />
          )}

          {currentTab === 'skills' && (
            <AdminSkillsTab
              skills={skills}
              onSaveSkill={handleSaveSkill}
              onDeleteSkill={handleDeleteSkill}
            />
          )}

          {currentTab === 'services' && (
            <AdminServicesTab
              services={services}
              onSaveService={handleSaveService}
              onDeleteService={handleDeleteService}
            />
          )}

          {currentTab === 'experience' && (
            <AdminExperienceTab
              experience={experience}
              onSaveExperience={handleSaveExperience}
              onDeleteExperience={handleDeleteExperience}
            />
          )}

          {currentTab === 'testimonials' && (
            <AdminTestimonialsTab
              testimonials={testimonials}
              onSaveTestimonial={handleSaveTestimonial}
              onDeleteTestimonial={handleDeleteTestimonial}
            />
          )}

          {currentTab === 'messages' && (
            <AdminMessagesTab
              messages={messages}
              onMarkRead={handleMarkMessageRead}
              onDeleteMessage={handleDeleteMessage}
            />
          )}

          {currentTab === 'settings' && (
            <AdminSettingsTab settings={settings} onSaveSettings={handleSaveSettings} />
          )}
        </main>
      </div>
    </div>
  );
};
