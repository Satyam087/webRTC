import { v4 as uuidv4 } from 'uuid';
import { Interview, IInterview } from '../models/Interview';
import { Participant } from '../models/Participant';
import { generateLiveKitToken } from '../utils/token';
import { env } from '../config/env';
import { InterviewStatus, ParticipantRole } from '../constants/interviewStatus';
import {
  CreateInterviewInput,
  CreateInterviewResponse,
  GenerateTokenResponse,
} from '../types/interview.types';

export class InterviewService {
  async createInterview(data: CreateInterviewInput): Promise<CreateInterviewResponse> {
    const roomId = uuidv4();

    const interview = await Interview.create({
      roomId,
      hrId: 'default-hr', // Will be replaced with auth
      candidateEmail: data.candidateEmail,
      role: data.role,
      status: InterviewStatus.CREATED,
      scheduledTime: data.scheduledTime ? new Date(data.scheduledTime) : new Date(),
      duration: data.duration,
    });

    return {
      interviewId: interview._id.toString(),
      interviewLink: `/interview/${roomId}`,
      roomId,
    };
  }

  async getInterviewByRoomId(roomId: string): Promise<IInterview | null> {
    return Interview.findOne({ roomId });
  }

  async generateJoinToken(
    roomId: string,
    identity: string,
    name: string
  ): Promise<GenerateTokenResponse> {
    const interview = await this.getInterviewByRoomId(roomId);
    if (!interview) {
      throw new Error('Interview not found');
    }

    // Update status to live if currently created
    if (interview.status === InterviewStatus.CREATED) {
      interview.status = InterviewStatus.LIVE;
      await interview.save();
    }

    const isCandidate = identity === interview.candidateEmail;
    const role = isCandidate ? ParticipantRole.CANDIDATE : ParticipantRole.HR;

    // Record participant
    await Participant.create({
      interviewId: interview._id,
      name,
      email: identity,
      role,
      joinedAt: new Date(),
    });

    // Grant permissions based on role
    // HR can do everything, Candidate has restricted permissions
    const permissions = {
      room: roomId,
      roomJoin: true,
      canPublish: true,
      canSubscribe: true,
      canPublishData: true,
      // Future: add more granular control if needed
    };

    const token = await generateLiveKitToken(roomId, identity, name, permissions);

    return {
      token,
      room: roomId,
      url: env.LIVEKIT_URL,
    };
  }

  async getAllInterviews(): Promise<IInterview[]> {
    return Interview.find().sort({ createdAt: -1 });
  }

  async updateInterviewStatus(
    roomId: string,
    status: InterviewStatus
  ): Promise<IInterview | null> {
    return Interview.findOneAndUpdate({ roomId }, { status }, { new: true });
  }
}

export const interviewService = new InterviewService();
