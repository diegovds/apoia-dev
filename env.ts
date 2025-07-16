import { z } from 'zod'

const envSchema = z.object({
  AUTH_GITHUB_ID: z.string(),
  AUTH_SECRET: z.string(),
  AUTH_GITHUB_SECRET: z.string(),
  DATABASE_URL: z.string(),
  NEXT_PUBLIC_HOST_URL: z.string(),
  HOST_URL: z.string(),
  NEXT_PUBLIC_STRIPE_PUBLIC_KEY: z.string(),
  STRIPE_SECRET_KEY: z.string(),
  STRIPE_WEBHOOK_SECRET: z.string(),
})

export const env = envSchema.parse(process.env)
