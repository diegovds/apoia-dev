import { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface User {
    id: string
    name?: string
    email?: string
    username?: string
    bio?: string
    connectedStripeAccountId?: string
  }

  interface Session {
    user: User & DefaultSession['user']
  }
}
