import mongoose, { Schema, Document } from 'mongoose';

export interface ISiteSettings extends Document {
  siteTitle: string;
  metaDescription: string;
  keywords: string;
  ogImage: string;
  themeAccent: string;
  footerText: string;
  updatedAt: Date;
}

const SiteSettingsSchema = new Schema<ISiteSettings>(
  {
    siteTitle: {
      type: String,
      default: 'Asif | MERN Stack Web Developer',
      trim: true,
    },
    metaDescription: {
      type: String,
      default: 'Portfolio of Asif, a MERN Stack Web Developer specializing in React, Node.js, Express, MongoDB and modern responsive web development.',
      trim: true,
    },
    keywords: {
      type: String,
      default: 'MERN Stack, React, Node.js, Express, MongoDB, Tailwind CSS, Web Developer, Asif',
      trim: true,
    },
    ogImage: {
      type: String,
      default: '/images/profile-placeholder.svg',
    },
    themeAccent: {
      type: String,
      default: '#2563eb',
    },
    footerText: {
      type: String,
      default: 'Built with React, Node.js, Express & MongoDB. Crafted with clean minimalism.',
    },
  },
  {
    timestamps: true,
  }
);

export const SiteSettings = (mongoose.models.SiteSettings || mongoose.model<ISiteSettings>('SiteSettings', SiteSettingsSchema)) as mongoose.Model<ISiteSettings>;
