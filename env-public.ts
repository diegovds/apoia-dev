import { z } from 'zod'

const clientEnvSchema = z.object({
  NEXT_PUBLIC_HOST_URL: z.string(),
  NEXT_PUBLIC_STRIPE_PUBLIC_KEY: z.string(),
})

const clientEnv = {
  NEXT_PUBLIC_HOST_URL: process.env.NEXT_PUBLIC_HOST_URL,
  NEXT_PUBLIC_STRIPE_PUBLIC_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY,
}

// Valida as variáveis
export const env = clientEnvSchema.parse(clientEnv)
