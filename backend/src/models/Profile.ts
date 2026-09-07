import mongoose, { Schema, Document } from 'mongoose';

export interface IProfile extends Document {
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
  updatedAt: Date;
}

const ProfileSchema = new Schema<IProfile>(
  {
    name: {
      type: String,
      required: true,
      default: 'Asif',
      trim: true,
    },
    title: {
      type: String,
      required: true,
      default: 'MERN Stack Web Developer',
      trim: true,
    },
    shortBio: {
      type: String,
      required: true,
      default: 'I build modern, responsive and scalable web applications using React, Node.js, Express and MongoDB.',
    },
    aboutText: {
      type: String,
      required: true,
    },
    philosophy: {
      type: String,
      default: 'Code should be readable, architectures scalable, and user experiences intuitive. I believe in continuous hands-on learning, transparent communication, and delivering real business value through clean engineering.',
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      default: '',
    },
    location: {
      type: String,
      default: 'Dhaka, Bangladesh (Available Worldwide)',
    },
    avatarUrl: {
      type: String,
      default: '/images/profile-placeholder.svg',
    },
    resumeUrl: {
      type: String,
      default: '',
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    socialLinks: {
      github: { type: String, default: '' },
      linkedin: { type: String, default: '' },
      whatsapp: { type: String, default: '' },
      facebook: { type: String, default: '' },
    },
    specializations: {
      frontend: [{ type: String }],
      backend: [{ type: String }],
      cms: [{ type: String }],
    },
  },
  {
    timestamps: true,
  }
);

export const Profile = (mongoose.models.Profile || mongoose.model<IProfile>('Profile', ProfileSchema)) as mongoose.Model<IProfile>;
