import { RoomServiceClient } from 'livekit-server-sdk';
import { env } from '../config/env';

export const roomService = new RoomServiceClient(
  env.LIVEKIT_URL,
  env.LIVEKIT_API_KEY,
  env.LIVEKIT_API_SECRET
);
