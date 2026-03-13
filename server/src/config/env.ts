import dotenv from 'dotenv';

dotenv.config();

interface EnvConfig {
  PORT: number;
  MONGODB_URI: string;
  LIVEKIT_API_KEY: string;
  LIVEKIT_API_SECRET: string;
  LIVEKIT_URL: string;
  CLIENT_URL: string;
  ADMIN_API_KEY: string;
}

const getEnvVar = (key: string, fallback?: string): string => {
  const value = process.env[key] ?? fallback;
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
};

export const env: EnvConfig = {
  PORT: parseInt(getEnvVar('PORT', '8000'), 10),
  MONGODB_URI: getEnvVar('MONGODB_URI'),
  LIVEKIT_API_KEY: getEnvVar('LIVEKIT_API_KEY'),
  LIVEKIT_API_SECRET: getEnvVar('LIVEKIT_API_SECRET'),
  LIVEKIT_URL: getEnvVar('LIVEKIT_URL'),
  CLIENT_URL: getEnvVar('CLIENT_URL', 'http://localhost:3000'),
  ADMIN_API_KEY: getEnvVar('ADMIN_API_KEY', 'default-admin-key'),
};
