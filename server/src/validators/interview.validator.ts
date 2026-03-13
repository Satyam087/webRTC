import { z } from 'zod';

export const createInterviewSchema = z.object({
  role: z.string().min(1, 'Role is required'),
  candidateEmail: z.string().email('Valid email is required'),
  duration: z.number().int().min(15).max(180).default(45),
  scheduledTime: z.string().datetime().optional(),
});

export const tokenQuerySchema = z.object({
  identity: z.string().min(1, 'Identity is required'),
  name: z.string().min(1, 'Name is required'),
});
