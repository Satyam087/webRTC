# Interview video layer (LiveKit)

The video-conferencing layer for AI-Interviewer, so a one-to-one interview can run in the product instead of on Google Meet. A Next.js client on `@livekit/components-react`, an Express server that creates interview rooms and issues short-lived LiveKit access tokens, MongoDB for interviews and participants. March 2026, built alone.

Live: https://web-rtc-pied.vercel.app · part of https://satyamkumarsingh.com/work/playground

## How it works

```
dashboard/create-interview  --POST /api/interviews (admin key)-->  Interview + room id in MongoDB
interview/[roomId]          --GET  /api/interviews/:roomId/token-->  LiveKit AccessToken (identity, room grant, TTL)
                            --LiveKit cloud (LIVEKIT_URL)-------->  audio, video, screen share via @livekit/components-react
```

- `server/src/utils/token.ts`: `AccessToken` from `livekit-server-sdk` with a room-scoped grant; the API key and secret never reach the browser.
- `server/src/lib/livekit.ts`: `RoomServiceClient` for room lifecycle.
- `server/src/routes/interview.routes.ts`: create and list interviews behind `authenticate` (admin API key); fetch an interview and mint a participant token by room id.
- `client/src/app/interview/[roomId]`: the room UI on LiveKit's React components; `dashboard/create-interview`: the admin form.
- `render.yaml`: the API on Render (listens before the DB connects so health checks pass during cold starts); the client on Vercel.

## Run locally

```bash
npm run install:all
# server/.env: MONGODB_URI, LIVEKIT_API_KEY, LIVEKIT_API_SECRET, LIVEKIT_URL, CLIENT_URL, ADMIN_API_KEY
npm run dev:server   # :4000
npm run dev:client   # :3000
```

## Status

Working demo on free tiers (Render cold starts apply). The AI-Interviewer product it plugs into lives in a teammate's repository; this repository is the video layer only.
