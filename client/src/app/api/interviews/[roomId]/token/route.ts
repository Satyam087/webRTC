import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ roomId: string }> }
) {
  try {
    const { roomId } = await params;
    const { searchParams } = new URL(request.url);
    const identity = searchParams.get("identity") || "";
    const name = searchParams.get("name") || "";

    const queryParams = new URLSearchParams({ identity, name });
    const response = await fetch(
      `${API_URL}/interviews/${roomId}/token?${queryParams}`
    );

    const data = await response.json().catch(() => ({ error: "Request failed" }));

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("API proxy error (get token):", error);
    return NextResponse.json(
      { error: "Failed to connect to interview server" },
      { status: 502 }
    );
  }
}
