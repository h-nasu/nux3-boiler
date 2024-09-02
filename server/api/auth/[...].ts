import CredentialsProvider from 'next-auth/providers/credentials'
import { NuxtAuthHandler } from '#auth'
import { compare } from "bcrypt"
import prisma from "@/lib/prisma"

export default NuxtAuthHandler({
  secret: 'supersecretsomthing',
  pages: {
    signIn: '/auth/login',
    signOut: '/auth/logout',
    error: '/auth/error',
  },
  providers: [
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    CredentialsProvider.default({
     
      async authorize (credentials: any) {

        const user = await prisma.users.findUnique({
          where: { email: credentials?.email },
        })

        if(!user?.isVerified) {
          throw createError({
            statusCode: 403,
            statusMessage: "User unverified",
          })

        }

        if(!user) {
          throw createError({
            statusCode: 403,
            statusMessage: "Credentials not working",
          })

        }

        const isPasswordValid = await compare(credentials?.password, user.password)

        if (!isPasswordValid) {
          throw createError({
            statusCode: 403,
            statusMessage: "Credentials not working",
          })

        }

        return user

      }
    })
  ],
  callbacks: {
    // Specify here the payload of your token and session
    async jwt({ token, user }: { token: any, user: any }) {
      if (user) { 
        token.id = user.id
        token.namae = user.name
        token.email = user.email
      }
      return token
    },
    async session({ session, token }: { session: any, token: any }) {
      session.user.id = token.id
      session.user.namae = token.name
      session.user.email = token.email
      return session
    },
  },
})