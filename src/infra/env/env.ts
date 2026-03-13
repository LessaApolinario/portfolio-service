import { z } from 'zod';

export const envSchema = z.object({
  DATABASE_URL: z.url(),
  POSTGRES_USER: z.string(),
  POSTGRES_PASSWORD: z.string(),
  POSTGRES_DB: z.string(),
  POSTGRES_HOST_PORT: z.coerce.number(),
  REDIS_HOST: z.string().optional().default('127.0.0.1'),
  REDIS_HOST_PORT: z.coerce.number().optional().default(6379),
  REDIS_DB: z.coerce.number().optional().default(0),
  PORT: z.coerce.number().optional().default(3333),
});

export type Env = z.infer<typeof envSchema>;
