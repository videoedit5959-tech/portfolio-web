export interface ProfileData {
  _id?: string;
  name: string;
  title: string;
  shortBio: string;
  aboutText: string;
  philosophy: string;
  email: string;
  phone: string;
  location: string;
  avatarUrl: string;
  resumeUrl?: string;
  isAvailable: boolean;
  socialLinks: {
    github: string;
    linkedin: string;
    whatsapp?: string;
    facebook?: string;
  };
  specializations: {
    frontend: string[];
    backend: string[];
    cms: string[];
  };
  updatedAt?: string;
}

export interface ProjectData {
  _id?: string;
  title: string;
  slug: string;
  category: 'Full Stack' | 'E-Commerce' | 'SaaS' | 'Frontend';
  type: string;
  shortDescription: string;
  detailedDescription: string;
  problem: string;
  solution: string;
  thumbnail: string;
  gallery: string[];
  technologies: string[];
  features: string[];
  githubUrl: string;
  liveUrl: string;
  featured: boolean;
  displayOrder: number;
  status: 'Completed' | 'In Progress' | 'Concept';
  createdAt?: string;
  updatedAt?: string;
}

export interface SkillData {
  _id?: string;
  name: string;
  category: 'Frontend' | 'Backend' | 'CMS' | 'Other';
  level: number;
  iconName: string;
  displayOrder: number;
  isActive: boolean;
}

export interface ServiceData {
  _id?: string;
  title: string;
  description: string;
  iconName: string;
  highlights: string[];
  displayOrder: number;
  isActive: boolean;
}

export interface ExperienceData {
  _id?: string;
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  isCurrent: boolean;
  description: string;
  technologies: string[];
  displayOrder: number;
  type: string;
}

export interface TestimonialData {
  _id?: string;
  name: string;
  position: string;
  company: string;
  avatarUrl: string;
  content: string;
  rating: number;
  isActive: boolean;
}

export interface ContactMessageData {
  _id?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export interface SiteSettingsData {
  _id?: string;
  siteTitle: string;
  metaDescription: string;
  keywords: string;
  ogImage: string;
  themeAccent: string;
  footerText: string;
}

export interface PortfolioResponse {
  profile: ProfileData | null;
  projects: ProjectData[];
  skills: SkillData[];
  services: ServiceData[];
  experience: ExperienceData[];
  testimonials: TestimonialData[];
  settings: SiteSettingsData | null;
}
