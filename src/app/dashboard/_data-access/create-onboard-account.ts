'use server'

import { stripe } from '@/lib/stripe'
import { env } from '../../../../env-public'

export async function getLoginOnboardAccount(accountId: string | undefined) {
  if (!accountId) {
    return null
  }

  try {
    const accountLink = await stripe.accountLinks.create({
      account: accountId,
      refresh_url: `${env.NEXT_PUBLIC_HOST_URL}/dashboard`,
      return_url: `${env.NEXT_PUBLIC_HOST_URL}/dashboard`,
      type: 'account_onboarding',
    })

    return accountLink.url
  } catch (error) {
    console.error('Error creating account link:', error)

    return null
  }
}
