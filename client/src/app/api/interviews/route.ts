import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const response = await fetch(`${API_URL}/interviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.ADMIN_API_KEY}`,
      },
      body: JSON.stringify(body),
    });

    const data = await response.json().catch(() => ({ error: "Request failed" }));

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("API proxy error (create interview):", error);
    return NextResponse.json(
      { error: "Failed to connect to interview server" },
      { status: 502 }
    );
  }
}
