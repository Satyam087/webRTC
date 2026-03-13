"use client";

import {
  useTracks,
  GridLayout,
  ParticipantTile,
} from "@livekit/components-react";
import { Track } from "livekit-client";

interface VideoGridProps {
  className?: string;
}

export default function VideoGrid({ className }: VideoGridProps) {
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
      style={{ height: "calc(100vh - 80px)" }}
      className={className}
    >
      <ParticipantTile />
    </GridLayout>
  );
}
