"use client";

import {
  LiveKitRoom,
  RoomAudioRenderer,
  ControlBar,
  useTracks,
  GridLayout,
  ParticipantTile,
} from "@livekit/components-react";
import { Track } from "livekit-client";

interface VideoRoomProps {
  token: string;
  serverUrl: string;
  roomName: string;
  onLeave: () => void;
}

export default function VideoRoom({
  token,
  serverUrl,
  roomName,
  onLeave,
}: VideoRoomProps) {
  return (
    <div className="h-screen w-screen bg-[var(--background)]">
      <LiveKitRoom
        token={token}
        serverUrl={serverUrl}
        connect={true}
        video={true}
        audio={true}
        onDisconnected={onLeave}
        data-lk-theme="default"
        style={{ height: "100vh" }}
      >
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-6 py-3 bg-gradient-to-b from-black/60 to-transparent">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-sm font-medium text-white/80">
              Live Interview
            </span>
          </div>
          <span className="text-xs font-mono text-white/50">
            {roomName.slice(0, 8)}
          </span>
        </div>

        {/* Video Grid */}
        <VideoGrid />

        {/* Audio */}
        <RoomAudioRenderer />

        {/* Controls */}
        <ControlBar
          variation="minimal"
          controls={{
            camera: true,
            microphone: true,
            screenShare: true,
            leave: true,
          }}
        />
      </LiveKitRoom>
    </div>
  );
}

function VideoGrid() {
  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: true },
      { source: Track.Source.ScreenShare, withPlaceholder: false },
    ],
    { onlySubscribed: false }
  );

  return (
    <GridLayout
      tracks={tracks}
      style={{
        height: "calc(100vh - 80px)",
        padding: "1rem",
      }}
    >
      <ParticipantTile />
    </GridLayout>
  );
}
