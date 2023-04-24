import { NuxtAuthHandler } from '#auth'
import Auth0Provider from 'next-auth/providers/auth0'

export default NuxtAuthHandler({
  secret: process.env.AUTH_SECRET,
  callbacks: {
    session: async ({ session, token }) => {
      session.user_id = token.sub
      return Promise.resolve(session)
    },
  },
  providers: [
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    Auth0Provider.default({
      clientId: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      issuer: 'https://utama.au.auth0.com/'
    })
  ]
})