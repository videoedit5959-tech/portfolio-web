import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
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
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, 'Project slug is required'],
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['Full Stack', 'E-Commerce', 'SaaS', 'Frontend'],
      default: 'Full Stack',
    },
    type: {
      type: String,
      default: 'Featured Personal Project',
      trim: true,
    },
    shortDescription: {
      type: String,
      required: true,
      trim: true,
    },
    detailedDescription: {
      type: String,
      required: true,
    },
    problem: {
      type: String,
      default: '',
    },
    solution: {
      type: String,
      default: '',
    },
    thumbnail: {
      type: String,
      required: true,
    },
    gallery: [{ type: String }],
    technologies: [{ type: String }],
    features: [{ type: String }],
    githubUrl: {
      type: String,
      default: '',
      trim: true,
    },
    liveUrl: {
      type: String,
      default: '',
      trim: true,
    },
    featured: {
      type: Boolean,
      default: false,
      index: true,
    },
    displayOrder: {
      type: Number,
      default: 0,
      index: true,
    },
    status: {
      type: String,
      enum: ['Completed', 'In Progress', 'Concept'],
      default: 'Completed',
    },
  },
  {
    timestamps: true,
  }
);

export const Project = (mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema)) as mongoose.Model<IProject>;
