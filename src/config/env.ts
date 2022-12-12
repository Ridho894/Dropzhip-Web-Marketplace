export const GOOGLE_RECAPTCHA_KEY: string = process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_KEY || "";
export const API_DOMAIN: string = process.env.NEXT_PUBLIC_API_DOMAIN || "";

const env = {
  GOOGLE_RECAPTCHA_KEY,
  API_DOMAIN,
}

export default env
