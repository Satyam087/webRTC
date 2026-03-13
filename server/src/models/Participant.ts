import mongoose, { Schema, Document } from 'mongoose';
import { ParticipantRole } from '../constants/interviewStatus';

export interface IParticipant extends Document {
  interviewId: mongoose.Types.ObjectId;
  name: string;
  email: string;
  role: ParticipantRole;
  joinedAt: Date;
  leftAt?: Date;
}

const ParticipantSchema = new Schema<IParticipant>(
  {
    interviewId: {
      type: Schema.Types.ObjectId,
      ref: 'Interview',
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: Object.values(ParticipantRole),
      required: true,
    },
    joinedAt: {
      type: Date,
      default: Date.now,
    },
    leftAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

export const Participant = mongoose.model<IParticipant>('Participant', ParticipantSchema);
