export interface CreateInterviewInput {
  role: string;
  candidateEmail: string;
  duration: number;
  scheduledTime?: string;
}

export interface CreateInterviewResponse {
  interviewId: string;
  interviewLink: string;
  roomId: string;
}

export interface GenerateTokenInput {
  identity: string;
  name: string;
}

export interface GenerateTokenResponse {
  token: string;
  room: string;
  url: string;
}
