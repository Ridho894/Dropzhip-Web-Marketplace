import { NextApiRequest, NextApiResponse } from 'next'
import NextAuth, { NextAuthOptions } from 'next-auth'
import ProvidersCredentials from 'next-auth/providers/credentials'
import fetchSignin from '@/services/auth/signin.service'

const options = {
    providers: [
        ProvidersCredentials({
            name: 'Credentials',
            credentials: {
                email: { label: 'email', type: 'text' },
                password: { label: 'password', type: 'password' },
                gRecaptchaToken: { label: 'g-recaptcha-token', type: 'text' },
            },
            async authorize(credentials) {
                if (!credentials) throw new Error('No credentials provided')

                const data = await fetchSignin({
                    email: credentials.email,
                    password: credentials.password,
                    'g-recaptcha-response': credentials.gRecaptchaToken,
                })

                return {
                    user: data.user,
                    token: data.token,
                }
            },
        }),
    ],
    session: {
        strategy: 'jwt',
        maxAge: 60 * 60 * 24, // 24 hour
    },
    jwt: {
        maxAge: 60 * 60 * 24, // 24 hour
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.accessToken = user.token
                token.user = user.user
            }
            return token
        },
        async session({ session, token }) {
            session.accessToken = token.accessToken
            session.user = token.user

            return session
        },
        async redirect({ url, baseUrl }) {
            return url.startsWith(baseUrl) ? url : baseUrl
        },
    },
    pages: {
        signIn: '/login',
        error: '/error',
    },
}

const nextAuth = (req, res) => NextAuth(req, res, options)

export default nextAuth
