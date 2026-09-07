/**
 * Mongoose Schemas and Entity Models
 * Structured for production MongoDB Atlas persistence
 */

export interface IUserDocument {
  id: string;
  email: string;
  passwordHash: string;
  name: string;
  role: 'admin';
  createdAt: Date;
  updatedAt: Date;
}

export interface IProfileDocument {
  name: string;
  title: string;
  avatarUrl: string;
  shortBio: string;
  aboutText: string;
  philosophy: string;
  email: string;
  phone: string;
  location: string;
  isAvailable: boolean;
  socialLinks: {
    github?: string;
    linkedin?: string;
    whatsapp?: string;
    facebook?: string;
  };
  resumeUrl?: string;
  updatedAt: Date;
}

export interface IProjectDocument {
  id: string;
  title: string;
  slug: string;
  category: 'Full Stack' | 'E-Commerce' | 'SaaS' | 'Frontend';
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
  status: string;
  type: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ISkillDocument {
  id: string;
  name: string;
  category: 'Frontend' | 'Backend' | 'CMS' | 'Other';
  level: number;
  iconName: string;
  displayOrder: number;
  isActive: boolean;
}

export interface IServiceDocument {
  id: string;
  title: string;
  description: string;
  iconName: string;
  displayOrder: number;
  isActive: boolean;
  highlights: string[];
}

export interface IExperienceDocument {
  id: string;
  companyOrContext: string;
  position: string;
  period: string;
  isCurrent: boolean;
  description: string;
  technologies: string[];
  displayOrder: number;
  type: string;
}

export interface ITestimonialDocument {
  id: string;
  name: string;
  position: string;
  companyOrContext: string;
  avatarUrl: string;
  content: string;
  rating: number;
  isActive: boolean;
  isSample: boolean;
  createdAt: Date;
}

export interface IContactMessageDocument {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
  ipAddress?: string;
  userAgent?: string;
}

export interface ISiteSettingsDocument {
  siteTitle: string;
  metaDescription: string;
  keywords: string;
  ogImage: string;
  themeAccent: string;
  footerText: string;
  updatedAt: Date;
}
