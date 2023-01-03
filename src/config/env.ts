export const GOOGLE_RECAPTCHA_KEY: string = process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_KEY || "";
export const API_DOMAIN: string = process.env.NEXT_PUBLIC_API_DOMAIN || "";
export const HOST: string = process.env.HOST || "";
export const STRIPE_SECRET_KEY: string = process.env.STRIPE_SECRET_KEY || ""
export const STRIPE_PUBLIC_KEY: string = process.env.STRIPE_PUBLIC_KEY || ""
export const STRIPE_SIGNING_SECRET: string = process.env.STRIPE_SIGNING_SECRET || ""

const env = {
  GOOGLE_RECAPTCHA_KEY,
  API_DOMAIN,
  HOST,
  STRIPE_SECRET_KEY,
  STRIPE_PUBLIC_KEY,
  STRIPE_SIGNING_SECRET
}

export default env
