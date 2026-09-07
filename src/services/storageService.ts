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

const KEYS = {
  PROFILE: 'asif_portfolio_profile',
  PROJECTS: 'asif_portfolio_projects',
  SKILLS: 'asif_portfolio_skills',
  SERVICES: 'asif_portfolio_services',
  EXPERIENCE: 'asif_portfolio_experience',
  TESTIMONIALS: 'asif_portfolio_testimonials',
  MESSAGES: 'asif_portfolio_messages',
  SETTINGS: 'asif_portfolio_settings',
  LAST_CONTACT_TIMESTAMP: 'asif_portfolio_last_contact',
};

// Safe storage access helper
function getStoredItem<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(key);
    if (!item) return fallback;
    return JSON.parse(item) as T;
  } catch (error) {
    console.error(`Error reading ${key} from storage:`, error);
    return fallback;
  }
}

function setStoredItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving ${key} to storage:`, error);
  }
}

export const StorageService = {
  // Profile
  getProfile(): ProfileData {
    return getStoredItem<ProfileData>(KEYS.PROFILE, initialProfile);
  },
  updateProfile(profile: ProfileData): ProfileData {
    setStoredItem(KEYS.PROFILE, profile);
    return profile;
  },

  // Projects
  getProjects(): ProjectData[] {
    const projects = getStoredItem<ProjectData[]>(KEYS.PROJECTS, initialProjects);
    return projects.sort((a, b) => a.displayOrder - b.displayOrder);
  },
  getProjectBySlug(slug: string): ProjectData | undefined {
    const projects = this.getProjects();
    return projects.find((p) => p.slug === slug);
  },
  saveProject(project: ProjectData): ProjectData[] {
    const projects = this.getProjects();
    const index = projects.findIndex((p) => p.id === project.id);
    if (index >= 0) {
      projects[index] = project;
    } else {
      projects.push(project);
    }
    setStoredItem(KEYS.PROJECTS, projects);
    return this.getProjects();
  },
  deleteProject(id: string): ProjectData[] {
    const projects = this.getProjects();
    const filtered = projects.filter((p) => p.id !== id);
    setStoredItem(KEYS.PROJECTS, filtered);
    return filtered;
  },

  // Skills
  getSkills(): SkillData[] {
    const skills = getStoredItem<SkillData[]>(KEYS.SKILLS, initialSkills);
    return skills.sort((a, b) => a.displayOrder - b.displayOrder);
  },
  saveSkill(skill: SkillData): SkillData[] {
    const skills = this.getSkills();
    const index = skills.findIndex((s) => s.id === skill.id);
    if (index >= 0) {
      skills[index] = skill;
    } else {
      skills.push(skill);
    }
    setStoredItem(KEYS.SKILLS, skills);
    return this.getSkills();
  },
  deleteSkill(id: string): SkillData[] {
    const skills = this.getSkills();
    const filtered = skills.filter((s) => s.id !== id);
    setStoredItem(KEYS.SKILLS, filtered);
    return filtered;
  },

  // Services
  getServices(): ServiceData[] {
    const services = getStoredItem<ServiceData[]>(KEYS.SERVICES, initialServices);
    return services.sort((a, b) => a.displayOrder - b.displayOrder);
  },
  saveService(service: ServiceData): ServiceData[] {
    const services = this.getServices();
    const index = services.findIndex((s) => s.id === service.id);
    if (index >= 0) {
      services[index] = service;
    } else {
      services.push(service);
    }
    setStoredItem(KEYS.SERVICES, services);
    return this.getServices();
  },
  deleteService(id: string): ServiceData[] {
    const services = this.getServices();
    const filtered = services.filter((s) => s.id !== id);
    setStoredItem(KEYS.SERVICES, filtered);
    return filtered;
  },

  // Experience
  getExperience(): ExperienceData[] {
    const exp = getStoredItem<ExperienceData[]>(KEYS.EXPERIENCE, initialExperience);
    return exp.sort((a, b) => a.displayOrder - b.displayOrder);
  },
  saveExperience(item: ExperienceData): ExperienceData[] {
    const list = this.getExperience();
    const index = list.findIndex((e) => e.id === item.id);
    if (index >= 0) {
      list[index] = item;
    } else {
      list.push(item);
    }
    setStoredItem(KEYS.EXPERIENCE, list);
    return this.getExperience();
  },
  deleteExperience(id: string): ExperienceData[] {
    const list = this.getExperience();
    const filtered = list.filter((e) => e.id !== id);
    setStoredItem(KEYS.EXPERIENCE, filtered);
    return filtered;
  },

  // Testimonials
  getTestimonials(): TestimonialData[] {
    const list = getStoredItem<TestimonialData[]>(KEYS.TESTIMONIALS, initialTestimonials);
    return list.sort((a, b) => a.displayOrder - b.displayOrder);
  },
  saveTestimonial(item: TestimonialData): TestimonialData[] {
    const list = this.getTestimonials();
    const index = list.findIndex((t) => t.id === item.id);
    if (index >= 0) {
      list[index] = item;
    } else {
      list.push(item);
    }
    setStoredItem(KEYS.TESTIMONIALS, list);
    return this.getTestimonials();
  },
  deleteTestimonial(id: string): TestimonialData[] {
    const list = this.getTestimonials();
    const filtered = list.filter((t) => t.id !== id);
    setStoredItem(KEYS.TESTIMONIALS, filtered);
    return filtered;
  },

  // Messages (Contact)
  getMessages(): ContactMessageData[] {
    const initialMsgs: ContactMessageData[] = [
      {
        id: 'msg-sample-1',
        name: 'Technical Recruiter',
        email: 'recruiter@techinnovations.io',
        subject: 'MERN Stack Developer Role Inquiry',
        message: 'Hello Asif, I reviewed your Featured Personal Projects, especially the Project Management SaaS and E-Commerce platform. Impressive code structure! Are you available for a remote full-stack role?',
        createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
        isRead: false,
        status: 'new',
      },
    ];
    return getStoredItem<ContactMessageData[]>(KEYS.MESSAGES, initialMsgs);
  },
  submitMessage(message: Omit<ContactMessageData, 'id' | 'createdAt' | 'isRead' | 'status'>): { success: boolean; error?: string } {
    const lastTimestamp = parseInt(localStorage.getItem(KEYS.LAST_CONTACT_TIMESTAMP) || '0', 10);
    const now = Date.now();
    if (now - lastTimestamp < 20000) {
      const waitSec = Math.ceil((20000 - (now - lastTimestamp)) / 1000);
      return { success: false, error: `Please wait ${waitSec}s before sending another message to prevent spam.` };
    }

    const messages = this.getMessages();
    const newMessage: ContactMessageData = {
      ...message,
      id: `msg-${Date.now()}`,
      createdAt: new Date().toISOString(),
      isRead: false,
      status: 'new',
    };
    messages.unshift(newMessage);
    setStoredItem(KEYS.MESSAGES, messages);
    localStorage.setItem(KEYS.LAST_CONTACT_TIMESTAMP, now.toString());
    return { success: true };
  },
  markMessageRead(id: string, isRead: boolean = true): ContactMessageData[] {
    const messages = this.getMessages();
    const index = messages.findIndex((m) => m.id === id);
    if (index !== -1) {
      messages[index].isRead = isRead;
      messages[index].status = isRead ? 'read' : 'new';
      setStoredItem(KEYS.MESSAGES, messages);
    }
    return this.getMessages();
  },
  deleteMessage(id: string): ContactMessageData[] {
    const messages = this.getMessages();
    const filtered = messages.filter((m) => m.id !== id);
    setStoredItem(KEYS.MESSAGES, filtered);
    return filtered;
  },

  // Site Settings
  getSiteSettings(): SiteSettingsData {
    return getStoredItem<SiteSettingsData>(KEYS.SETTINGS, initialSiteSettings);
  },
  getSettings(): SiteSettingsData {
    return this.getSiteSettings();
  },
  updateSiteSettings(settings: SiteSettingsData): SiteSettingsData {
    setStoredItem(KEYS.SETTINGS, settings);
    return settings;
  },
  updateSettings(settings: SiteSettingsData): SiteSettingsData {
    return this.updateSiteSettings(settings);
  },

  // Reset to factory defaults
  resetToDefaults(): void {
    setStoredItem(KEYS.PROFILE, initialProfile);
    setStoredItem(KEYS.PROJECTS, initialProjects);
    setStoredItem(KEYS.SKILLS, initialSkills);
    setStoredItem(KEYS.SERVICES, initialServices);
    setStoredItem(KEYS.EXPERIENCE, initialExperience);
    setStoredItem(KEYS.TESTIMONIALS, initialTestimonials);
    setStoredItem(KEYS.SETTINGS, initialSiteSettings);
  },
};
