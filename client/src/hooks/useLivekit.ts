"use client";

import { useState, useCallback } from "react";
import { getJoinToken } from "@/lib/api";

interface UseLivekitReturn {
  token: string | null;
  serverUrl: string;
  isConnecting: boolean;
  error: string | null;
  connect: (roomId: string, identity: string, name: string) => Promise<void>;
  disconnect: () => void;
}

export function useLivekit(): UseLivekitReturn {
  const [token, setToken] = useState<string | null>(null);
  const [serverUrl, setServerUrl] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const connect = useCallback(
    async (roomId: string, identity: string, name: string) => {
      setIsConnecting(true);
      setError(null);

      try {
        const result = await getJoinToken(roomId, identity, name);
        setToken(result.token);
        setServerUrl(result.url);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Connection failed");
      } finally {
        setIsConnecting(false);
      }
    },
    []
  );

  const disconnect = useCallback(() => {
    setToken(null);
    setServerUrl("");
  }, []);

  return {
    token,
    serverUrl,
    isConnecting,
    error,
    connect,
    disconnect,
  };
}
