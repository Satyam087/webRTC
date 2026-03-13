import mongoose, { Schema, Document } from 'mongoose';
import { InterviewStatus } from '../constants/interviewStatus';

export interface IInterview extends Document {
  roomId: string;
  hrId: string;
  candidateEmail: string;
  role: string;
  status: InterviewStatus;
  scheduledTime: Date;
  duration: number;
  createdAt: Date;
}

const InterviewSchema = new Schema<IInterview>(
  {
    roomId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    hrId: {
      type: String,
      required: true,
    },
    candidateEmail: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(InterviewStatus),
      default: InterviewStatus.CREATED,
    },
    scheduledTime: {
      type: Date,
      default: Date.now,
    },
    duration: {
      type: Number,
      required: true,
      default: 45,
    },
  },
  {
    timestamps: true,
  }
);

export const Interview = mongoose.model<IInterview>('Interview', InterviewSchema);
