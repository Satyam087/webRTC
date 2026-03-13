"use client";

import { useState } from "react";
import { createInterview } from "@/lib/api";

export default function CreateInterviewPage() {
  const [role, setRole] = useState("");
  const [candidateEmail, setCandidateEmail] = useState("");
  const [duration, setDuration] = useState(45);
  const [loading, setLoading] = useState(false);
  const [interviewLink, setInterviewLink] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setInterviewLink(null);

    try {
      const result = await createInterview({ role, candidateEmail, duration });
      setInterviewLink(
        `${window.location.origin}${result.interviewLink}`
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    if (interviewLink) {
      await navigator.clipboard.writeText(interviewLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-8">
      <div className="w-full max-w-lg">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            Create Interview
          </h1>
          <p className="text-[var(--muted)]">
            Set up a new interview session and generate a meeting link.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 p-8 rounded-2xl bg-[var(--card)] border border-[var(--card-border)]"
        >
          {/* Role Field */}
          <div className="space-y-2">
            <label
              htmlFor="role"
              className="block text-sm font-medium text-[var(--foreground)]"
            >
              Role
            </label>
            <input
              id="role"
              type="text"
              required
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g. Software Engineer"
              className="w-full px-4 py-3 rounded-xl bg-[var(--input-bg)] border border-[var(--input-border)] text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all duration-200"
            />
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <label
              htmlFor="candidateEmail"
              className="block text-sm font-medium text-[var(--foreground)]"
            >
              Candidate Email
            </label>
            <input
              id="candidateEmail"
              type="email"
              required
              value={candidateEmail}
              onChange={(e) => setCandidateEmail(e.target.value)}
              placeholder="candidate@email.com"
              className="w-full px-4 py-3 rounded-xl bg-[var(--input-bg)] border border-[var(--input-border)] text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all duration-200"
            />
          </div>

          {/* Duration Field */}
          <div className="space-y-2">
            <label
              htmlFor="duration"
              className="block text-sm font-medium text-[var(--foreground)]"
            >
              Duration (minutes)
            </label>
            <input
              id="duration"
              type="number"
              required
              min={15}
              max={180}
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-xl bg-[var(--input-bg)] border border-[var(--input-border)] text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all duration-200"
            />
          </div>

          {/* Error */}
          {error && (
            <div className="p-4 rounded-xl bg-[var(--danger)]/10 border border-[var(--danger)]/20 text-[var(--danger)] text-sm">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-6 rounded-xl bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[var(--primary)]/25 hover:shadow-[var(--primary)]/40 hover:-translate-y-0.5"
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
                Creating...
              </span>
            ) : (
              "Create Interview"
            )}
          </button>
        </form>

        {/* Generated Link */}
        {interviewLink && (
          <div className="mt-6 p-6 rounded-2xl bg-[var(--card)] border border-[var(--success)]/30">
            <div className="flex items-center gap-2 mb-3">
              <svg
                className="w-5 h-5 text-[var(--success)]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <h3 className="font-semibold text-[var(--success)]">
                Interview Created!
              </h3>
            </div>
            <p className="text-sm text-[var(--muted)] mb-3">
              Share this link with the candidate:
            </p>
            <div className="flex gap-2">
              <input
                readOnly
                value={interviewLink}
                className="flex-1 px-4 py-2.5 rounded-xl bg-[var(--input-bg)] border border-[var(--input-border)] text-sm text-[var(--foreground)] font-mono"
              />
              <button
                onClick={copyToClipboard}
                className="px-4 py-2.5 rounded-xl bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white text-sm font-medium transition-all duration-200 whitespace-nowrap"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
