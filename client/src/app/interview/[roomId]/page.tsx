"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { getJoinToken } from "@/lib/api";
import VideoRoom from "@/components/VideoRoom";

export default function InterviewRoomPage() {
  const params = useParams();
  const roomId = params.roomId as string;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [serverUrl, setServerUrl] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await getJoinToken(roomId, email, name);
      setToken(result.token);
      setServerUrl(result.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to join");
    } finally {
      setLoading(false);
    }
  };

  if (token && serverUrl) {
    return (
      <VideoRoom
        token={token}
        serverUrl={serverUrl}
        roomName={roomId}
        onLeave={() => {
          setToken(null);
          setServerUrl("");
        }}
      />
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-8">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--primary-glow)] border border-[var(--primary)]/20 text-sm text-[var(--primary)] mb-6">
            <span className="w-2 h-2 rounded-full bg-[var(--success)] animate-pulse" />
            Ready to Join
          </div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            Join Interview
          </h1>
          <p className="text-[var(--muted)] text-sm">
            Room: <span className="font-mono text-[var(--accent)]">{roomId.slice(0, 8)}...</span>
          </p>
        </div>

        <form
          onSubmit={handleJoin}
          className="space-y-5 p-8 rounded-2xl bg-[var(--card)] border border-[var(--card-border)]"
        >
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-[var(--foreground)]"
            >
              Your Name
            </label>
            <input
              id="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              className="w-full px-4 py-3 rounded-xl bg-[var(--input-bg)] border border-[var(--input-border)] text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all duration-200"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[var(--foreground)]"
            >
              Your Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              className="w-full px-4 py-3 rounded-xl bg-[var(--input-bg)] border border-[var(--input-border)] text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all duration-200"
            />
          </div>

          {error && (
            <div className="p-4 rounded-xl bg-[var(--danger)]/10 border border-[var(--danger)]/20 text-[var(--danger)] text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-6 rounded-xl bg-[var(--success)] hover:brightness-110 text-white font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[var(--success)]/25 hover:shadow-[var(--success)]/40 hover:-translate-y-0.5"
          >
            {loading ? (
              <span className="inline-flex items-center gap-2">
                <svg
                  className="animate-spin w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                Joining...
              </span>
            ) : (
              "Join Interview"
            )}
          </button>
        </form>
      </div>
    </main>
  );
}
