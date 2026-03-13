import { AccessToken } from 'livekit-server-sdk';
import { env } from '../config/env';

export const generateLiveKitToken = async (
  roomName: string,
  participantIdentity: string,
  participantName: string,
  permissions?: {
    room?: string;
    roomJoin?: boolean;
    canPublish?: boolean;
    canSubscribe?: boolean;
    canPublishData?: boolean;
  }
): Promise<string> => {
  const token = new AccessToken(env.LIVEKIT_API_KEY, env.LIVEKIT_API_SECRET, {
    identity: participantIdentity,
    name: participantName,
    ttl: '6h',
  });

  if (permissions) {
    token.addGrant(permissions);
  } else {
    token.addGrant({
      room: roomName,
      roomJoin: true,
      canPublish: true,
      canSubscribe: true,
      canPublishData: true,
    });
  }

  return await token.toJwt();
};
