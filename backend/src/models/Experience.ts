import mongoose, { Schema, Document } from 'mongoose';

export interface IExperience extends Document {
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  isCurrent: boolean;
  description: string;
  technologies: string[];
  displayOrder: number;
  type: string;
  createdAt: Date;
  updatedAt: Date;
}

const ExperienceSchema = new Schema<IExperience>(
  {
    company: {
      type: String,
      required: [true, 'Company / Context is required'],
      trim: true,
    },
    position: {
      type: String,
      required: [true, 'Position is required'],
      trim: true,
    },
    startDate: {
      type: String,
      required: true,
      trim: true,
    },
    endDate: {
      type: String,
      default: '',
      trim: true,
    },
    isCurrent: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      default: '',
    },
    technologies: [{ type: String }],
    displayOrder: {
      type: Number,
      default: 0,
      index: true,
    },
    type: {
      type: String,
      default: 'Independent Project / Continuous Learning',
    },
  },
  {
    timestamps: true,
  }
);

export const Experience = (mongoose.models.Experience || mongoose.model<IExperience>('Experience', ExperienceSchema)) as mongoose.Model<IExperience>;
