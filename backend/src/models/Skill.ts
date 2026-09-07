import mongoose, { Schema, Document } from 'mongoose';

export interface ISkill extends Document {
  name: string;
  category: 'Frontend' | 'Backend' | 'CMS' | 'Other';
  level: number;
  iconName: string;
  displayOrder: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const SkillSchema = new Schema<ISkill>(
  {
    name: {
      type: String,
      required: [true, 'Skill name is required'],
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['Frontend', 'Backend', 'CMS', 'Other'],
      default: 'Frontend',
      index: true,
    },
    level: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
      default: 80,
    },
    iconName: {
      type: String,
      default: 'Code',
    },
    displayOrder: {
      type: Number,
      default: 0,
      index: true,
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Skill = (mongoose.models.Skill || mongoose.model<ISkill>('Skill', SkillSchema)) as mongoose.Model<ISkill>;
