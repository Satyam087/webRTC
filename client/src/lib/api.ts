const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

interface CreateInterviewPayload {
  role: string;
  candidateEmail: string;
  duration: number;
}

interface CreateInterviewResponse {
  interviewId: string;
  interviewLink: string;
  roomId: string;
}

interface TokenResponse {
  token: string;
  room: string;
  url: string;
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: "Request failed" }));
    throw new Error(error.error || `HTTP ${response.status}`);
  }
  return response.json();
}

export async function createInterview(
  data: CreateInterviewPayload
): Promise<CreateInterviewResponse> {
  const response = await fetch(`${API_URL}/interviews`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.ADMIN_API_KEY}`
    },
    body: JSON.stringify(data),
  });
  return handleResponse<CreateInterviewResponse>(response);
}

export async function getJoinToken(
  roomId: string,
  identity: string,
  name: string
): Promise<TokenResponse> {
  const params = new URLSearchParams({ identity, name });
  const response = await fetch(
    `${API_URL}/interviews/${roomId}/token?${params}`
  );
  return handleResponse<TokenResponse>(response);
}
