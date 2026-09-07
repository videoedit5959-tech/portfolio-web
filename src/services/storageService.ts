import {
  ProfileData,
  ProjectData,
  SkillData,
  ServiceData,
  ExperienceData,
  TestimonialData,
  ContactMessageData,
  SiteSettingsData,
} from '../types/portfolio';
import {
  initialProfile,
  initialProjects,
  initialSkills,
  initialServices,
  initialExperience,
  initialTestimonials,
  initialSiteSettings,
} from '../data/defaultData';

// In-memory runtime state populated from real MongoDB API
let liveProfile: ProfileData = initialProfile;
let liveProjects: ProjectData[] = initialProjects;
let liveSkills: SkillData[] = initialSkills;
let liveServices: ServiceData[] = initialServices;
let liveExperience: ExperienceData[] = initialExperience;
let liveTestimonials: TestimonialData[] = initialTestimonials;
let liveSettings: SiteSettingsData = initialSiteSettings;
let liveMessages: ContactMessageData[] = [];

// Helper to get auth header if token exists
const getAuthHeaders = (): HeadersInit => {
  const token = localStorage.getItem('asif_portfolio_jwt');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export const StorageService = {
  // Sync with MongoDB backend
  async initializeFromDatabase(): Promise<void> {
    try {
      const res = await fetch('/api/portfolio');
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          if (json.data.profile) {
            liveProfile = {
              ...json.data.profile,
              id: json.data.profile._id || json.data.profile.id,
            };
          }
          if (Array.isArray(json.data.projects) && json.data.projects.length > 0) {
            liveProjects = json.data.projects.map((p: any) => ({
              ...p,
              id: p._id || p.id,
            }));
          }
          if (Array.isArray(json.data.skills) && json.data.skills.length > 0) {
            liveSkills = json.data.skills.map((s: any) => ({
              ...s,
              id: s._id || s.id,
            }));
          }
          if (Array.isArray(json.data.services) && json.data.services.length > 0) {
            liveServices = json.data.services.map((s: any) => ({
              ...s,
              id: s._id || s.id,
            }));
          }
          if (Array.isArray(json.data.experience)) {
            liveExperience = json.data.experience.map((e: any) => ({
              ...e,
              id: e._id || e.id,
              companyOrContext: e.company || e.companyOrContext,
              period: e.startDate ? `${e.startDate} - ${e.isCurrent ? 'Present' : e.endDate || ''}` : e.period,
            }));
          }
          if (Array.isArray(json.data.testimonials)) {
            liveTestimonials = json.data.testimonials.map((t: any) => ({
              ...t,
              id: t._id || t.id,
              companyOrContext: t.company || t.companyOrContext,
            }));
          }
          if (json.data.settings) {
            liveSettings = {
              ...json.data.settings,
              primaryColor: json.data.settings.themeAccent || json.data.settings.primaryColor,
              ogImageUrl: json.data.settings.ogImage || json.data.settings.ogImageUrl,
            };
          }
        }
      }
    } catch (err) {
      console.warn('Database offline or unreachable; using initialized dataset:', err);
    }
  },

  // Profile (MongoDB backed)
  getProfile(): ProfileData {
    return liveProfile;
  },
  async updateProfile(profile: ProfileData): Promise<ProfileData> {
    liveProfile = profile;
    try {
      await fetch('/api/profile', {
        method: 'PUT',
        headers: getAuthHeaders(),
        credentials: 'include',
        body: JSON.stringify(profile),
      });
    } catch (e) {
      console.error('Failed to persist profile to MongoDB:', e);
    }
    return profile;
  },

  // Projects (MongoDB backed)
  getProjects(): ProjectData[] {
    return [...liveProjects].sort((a, b) => a.displayOrder - b.displayOrder);
  },
  getProjectBySlug(slug: string): ProjectData | undefined {
    return liveProjects.find((p) => p.slug === slug);
  },
  async saveProject(project: ProjectData): Promise<ProjectData[]> {
    const index = liveProjects.findIndex((p) => p.id === project.id || (p as any)._id === project.id);
    if (index >= 0) {
      liveProjects[index] = project;
      try {
        const id = (project as any)._id || project.id;
        await fetch(`/api/projects/${id}`, {
          method: 'PUT',
          headers: getAuthHeaders(),
          credentials: 'include',
          body: JSON.stringify(project),
        });
      } catch (e) {
        console.error('Failed to update project in MongoDB:', e);
      }
    } else {
      liveProjects.push(project);
      try {
        const res = await fetch('/api/projects', {
          method: 'POST',
          headers: getAuthHeaders(),
          credentials: 'include',
          body: JSON.stringify(project),
        });
        if (res.ok) {
          const created = await res.json();
          if (created.data?._id) {
            project.id = created.data._id;
          }
        }
      } catch (e) {
        console.error('Failed to create project in MongoDB:', e);
      }
    }
    return this.getProjects();
  },
  async deleteProject(id: string): Promise<ProjectData[]> {
    liveProjects = liveProjects.filter((p) => p.id !== id && (p as any)._id !== id);
    try {
      await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
        credentials: 'include',
      });
    } catch (e) {
      console.error('Failed to delete project from MongoDB:', e);
    }
    return liveProjects;
  },

  // Skills (MongoDB backed)
  getSkills(): SkillData[] {
    return [...liveSkills].sort((a, b) => a.displayOrder - b.displayOrder);
  },
  async saveSkill(skill: SkillData): Promise<SkillData[]> {
    const index = liveSkills.findIndex((s) => s.id === skill.id || (s as any)._id === skill.id);
    if (index >= 0) {
      liveSkills[index] = skill;
      try {
        const id = (skill as any)._id || skill.id;
        await fetch(`/api/skills/${id}`, {
          method: 'PUT',
          headers: getAuthHeaders(),
          credentials: 'include',
          body: JSON.stringify(skill),
        });
      } catch (e) {
        console.error('Failed to update skill in MongoDB:', e);
      }
    } else {
      liveSkills.push(skill);
      try {
        const res = await fetch('/api/skills', {
          method: 'POST',
          headers: getAuthHeaders(),
          credentials: 'include',
          body: JSON.stringify(skill),
        });
        if (res.ok) {
          const created = await res.json();
          if (created.data?._id) {
            skill.id = created.data._id;
          }
        }
      } catch (e) {
        console.error('Failed to create skill in MongoDB:', e);
      }
    }
    return this.getSkills();
  },
  async deleteSkill(id: string): Promise<SkillData[]> {
    liveSkills = liveSkills.filter((s) => s.id !== id && (s as any)._id !== id);
    try {
      await fetch(`/api/skills/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
        credentials: 'include',
      });
    } catch (e) {
      console.error('Failed to delete skill from MongoDB:', e);
    }
    return liveSkills;
  },

  // Services (MongoDB backed)
  getServices(): ServiceData[] {
    return [...liveServices].sort((a, b) => a.displayOrder - b.displayOrder);
  },
  async saveService(service: ServiceData): Promise<ServiceData[]> {
    const index = liveServices.findIndex((s) => s.id === service.id || (s as any)._id === service.id);
    if (index >= 0) {
      liveServices[index] = service;
      try {
        const id = (service as any)._id || service.id;
        await fetch(`/api/services/${id}`, {
          method: 'PUT',
          headers: getAuthHeaders(),
          credentials: 'include',
          body: JSON.stringify(service),
        });
      } catch (e) {
        console.error('Failed to update service in MongoDB:', e);
      }
    } else {
      liveServices.push(service);
      try {
        const res = await fetch('/api/services', {
          method: 'POST',
          headers: getAuthHeaders(),
          credentials: 'include',
          body: JSON.stringify(service),
        });
        if (res.ok) {
          const created = await res.json();
          if (created.data?._id) {
            service.id = created.data._id;
          }
        }
      } catch (e) {
        console.error('Failed to create service in MongoDB:', e);
      }
    }
    return this.getServices();
  },
  async deleteService(id: string): Promise<ServiceData[]> {
    liveServices = liveServices.filter((s) => s.id !== id && (s as any)._id !== id);
    try {
      await fetch(`/api/services/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
        credentials: 'include',
      });
    } catch (e) {
      console.error('Failed to delete service from MongoDB:', e);
    }
    return liveServices;
  },

  // Experience (MongoDB backed)
  getExperience(): ExperienceData[] {
    return [...liveExperience].sort((a, b) => a.displayOrder - b.displayOrder);
  },
  async saveExperience(item: ExperienceData): Promise<ExperienceData[]> {
    const index = liveExperience.findIndex((e) => e.id === item.id || (e as any)._id === item.id);
    const payload = {
      company: item.companyOrContext,
      position: item.position,
      startDate: item.period || '2024',
      isCurrent: item.isCurrent,
      description: item.description,
      technologies: item.technologies,
      displayOrder: item.displayOrder,
      type: item.type,
    };

    if (index >= 0) {
      liveExperience[index] = item;
      try {
        const id = (item as any)._id || item.id;
        await fetch(`/api/experience/${id}`, {
          method: 'PUT',
          headers: getAuthHeaders(),
          credentials: 'include',
          body: JSON.stringify(payload),
        });
      } catch (e) {
        console.error('Failed to update experience in MongoDB:', e);
      }
    } else {
      liveExperience.push(item);
      try {
        const res = await fetch('/api/experience', {
          method: 'POST',
          headers: getAuthHeaders(),
          credentials: 'include',
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          const created = await res.json();
          if (created.data?._id) {
            item.id = created.data._id;
          }
        }
      } catch (e) {
        console.error('Failed to create experience in MongoDB:', e);
      }
    }
    return this.getExperience();
  },
  async deleteExperience(id: string): Promise<ExperienceData[]> {
    liveExperience = liveExperience.filter((e) => e.id !== id && (e as any)._id !== id);
    try {
      await fetch(`/api/experience/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
        credentials: 'include',
      });
    } catch (e) {
      console.error('Failed to delete experience from MongoDB:', e);
    }
    return liveExperience;
  },

  // Testimonials (MongoDB backed)
  getTestimonials(): TestimonialData[] {
    return [...liveTestimonials].sort((a, b) => a.displayOrder - b.displayOrder);
  },
  async saveTestimonial(item: TestimonialData): Promise<TestimonialData[]> {
    const index = liveTestimonials.findIndex((t) => t.id === item.id || (t as any)._id === item.id);
    const payload = {
      name: item.name,
      position: item.position,
      company: item.companyOrContext,
      avatarUrl: item.avatarUrl,
      content: item.content,
      rating: 5,
      isActive: item.isActive,
    };

    if (index >= 0) {
      liveTestimonials[index] = item;
      try {
        const id = (item as any)._id || item.id;
        await fetch(`/api/testimonials/${id}`, {
          method: 'PUT',
          headers: getAuthHeaders(),
          credentials: 'include',
          body: JSON.stringify(payload),
        });
      } catch (e) {
        console.error('Failed to update testimonial in MongoDB:', e);
      }
    } else {
      liveTestimonials.push(item);
      try {
        const res = await fetch('/api/testimonials', {
          method: 'POST',
          headers: getAuthHeaders(),
          credentials: 'include',
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          const created = await res.json();
          if (created.data?._id) {
            item.id = created.data._id;
          }
        }
      } catch (e) {
        console.error('Failed to create testimonial in MongoDB:', e);
      }
    }
    return this.getTestimonials();
  },
  async deleteTestimonial(id: string): Promise<TestimonialData[]> {
    liveTestimonials = liveTestimonials.filter((t) => t.id !== id && (t as any)._id !== id);
    try {
      await fetch(`/api/testimonials/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
        credentials: 'include',
      });
    } catch (e) {
      console.error('Failed to delete testimonial from MongoDB:', e);
    }
    return liveTestimonials;
  },

  // Messages (Contact)
  async fetchMessages(): Promise<ContactMessageData[]> {
    try {
      const res = await fetch('/api/contact', {
        headers: getAuthHeaders(),
        credentials: 'include',
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.data)) {
          liveMessages = data.data.map((m: any) => ({
            id: m._id || m.id,
            name: m.name,
            email: m.email,
            subject: m.subject,
            message: m.message,
            createdAt: m.createdAt,
            isRead: m.isRead,
            status: m.isRead ? 'read' : 'new',
          }));
        }
      }
    } catch (err) {
      console.error('Failed to fetch messages from MongoDB:', err);
    }
    return liveMessages;
  },
  getMessages(): ContactMessageData[] {
    return liveMessages;
  },
  async submitMessage(message: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }): Promise<{ success: boolean; error?: string }> {
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(message),
      });

      const data = await res.json();
      if (!res.ok) {
        return { success: false, error: data.error || 'Failed to send message.' };
      }

      return { success: true };
    } catch (err) {
      return {
        success: false,
        error: err instanceof Error ? err.message : 'Network communication error.',
      };
    }
  },
  async markMessageRead(id: string, isRead: boolean = true): Promise<ContactMessageData[]> {
    try {
      await fetch(`/api/contact/${id}`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
        credentials: 'include',
        body: JSON.stringify({ isRead }),
      });
    } catch (e) {
      console.error('Failed to mark message read in MongoDB:', e);
    }
    const idx = liveMessages.findIndex((m) => m.id === id);
    if (idx !== -1) {
      liveMessages[idx].isRead = isRead;
      liveMessages[idx].status = isRead ? 'read' : 'new';
    }
    return liveMessages;
  },
  async deleteMessage(id: string): Promise<ContactMessageData[]> {
    try {
      await fetch(`/api/contact/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
        credentials: 'include',
      });
    } catch (e) {
      console.error('Failed to delete message from MongoDB:', e);
    }
    liveMessages = liveMessages.filter((m) => m.id !== id);
    return liveMessages;
  },

  // Site Settings
  getSiteSettings(): SiteSettingsData {
    return liveSettings;
  },
  getSettings(): SiteSettingsData {
    return this.getSiteSettings();
  },
  async updateSiteSettings(settings: SiteSettingsData): Promise<SiteSettingsData> {
    liveSettings = settings;
    try {
      await fetch('/api/settings', {
        method: 'PUT',
        headers: getAuthHeaders(),
        credentials: 'include',
        body: JSON.stringify({
          siteTitle: settings.siteTitle,
          metaDescription: settings.metaDescription,
          keywords: settings.keywords,
          ogImage: settings.ogImageUrl,
          themeAccent: settings.primaryColor,
          footerText: settings.footerText,
        }),
      });
    } catch (e) {
      console.error('Failed to update site settings in MongoDB:', e);
    }
    return settings;
  },
  async updateSettings(settings: SiteSettingsData): Promise<SiteSettingsData> {
    return this.updateSiteSettings(settings);
  },

  // Reset to initial state
  resetToDefaults(): void {
    liveProfile = initialProfile;
    liveProjects = initialProjects;
    liveSkills = initialSkills;
    liveServices = initialServices;
    liveExperience = initialExperience;
    liveTestimonials = initialTestimonials;
    liveSettings = initialSiteSettings;
  },
};

// Initialize from backend on load
if (typeof window !== 'undefined') {
  StorageService.initializeFromDatabase().catch((e) =>
    console.warn('Initial storage bootstrap caught error:', e)
  );
}
