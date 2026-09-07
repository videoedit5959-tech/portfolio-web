export interface ProfileData {
  id: string;
  name: string;
  title: string;
  shortBio: string;
  aboutText: string;
  email: string;
  phone: string;
  location: string;
  avatarUrl: string;
  resumeUrl: string;
  isAvailable: boolean;
  socialLinks: {
    github: string;
    linkedin: string;
    whatsapp: string;
    facebook: string;
  };
  specializations: {
    frontend: string[];
    backend: string[];
    cms: string[];
  };
  philosophy: string;
}

export interface ProjectData {
  id: string;
  title: string;
  slug: string;
  category: 'Full Stack' | 'Frontend' | 'MERN' | 'E-Commerce' | 'SaaS';
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
  status: 'Completed' | 'In Progress' | 'Continuous Updates';
  type: 'Featured Personal Project' | 'Demo Project';
}

export type SkillCategory = 'Frontend' | 'Backend' | 'CMS' | 'Other';

export interface SkillData {
  id: string;
  name: string;
  category: SkillCategory;
  level: number; // 0-100
  iconName: string;
  displayOrder: number;
  isActive: boolean;
}

export interface ServiceData {
  id: string;
  title: string;
  description: string;
  iconName: string;
  displayOrder: number;
  isActive: boolean;
  highlights: string[];
}

export interface ExperienceData {
  id: string;
  companyOrContext: string;
  position: string;
  period: string;
  isCurrent: boolean;
  description: string;
  technologies: string[];
  displayOrder: number;
  type: 'Hands-on Project Development' | 'Continuous Learning' | 'Freelance / Collaboration';
}

export interface TestimonialData {
  id: string;
  name: string;
  position: string;
  companyOrContext: string;
  avatarUrl: string;
  content: string;
  displayOrder: number;
  isActive: boolean;
  isSample: boolean;
}

export interface ContactMessageData {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  isRead: boolean;
  status: 'new' | 'read' | 'replied';
}

export interface SiteSettingsData {
  siteTitle: string;
  metaDescription: string;
  keywords: string;
  ogImageUrl: string;
  primaryColor: string;
  footerText: string;
  enableHireBadge: boolean;
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'admin';
}
