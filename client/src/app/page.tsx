"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-8">
      <div className="text-center max-w-2xl">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--primary-glow)] border border-[var(--primary)]/20 text-sm text-[var(--primary)] mb-6">
            <span className="w-2 h-2 rounded-full bg-[var(--primary)] animate-pulse" />
            Live Interview Platform
          </div>
          <h1 className="text-5xl font-bold tracking-tight mb-4 bg-gradient-to-r from-white via-[var(--foreground)] to-[var(--muted)] bg-clip-text text-transparent">
            Interview Platform
          </h1>
          <p className="text-lg text-[var(--muted)] leading-relaxed">
            Create and manage video interviews with LiveKit-powered real-time
            video calls. Seamless experience for HR and candidates.
          </p>
        </div>

        <div className="flex gap-4 justify-center">
          <Link
            href="/dashboard/create-interview"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white font-medium transition-all duration-200 shadow-lg shadow-[var(--primary)]/25 hover:shadow-[var(--primary)]/40 hover:-translate-y-0.5"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Create Interview
          </Link>
        </div>
      </div>
    </main>
  );
}
