// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@sidebase/nuxt-auth", "@prisma/nuxt", "nuxt-nodemailer"],
  compatibilityDate: "2024-08-22",
  auth: {
    provider: {
      type: 'authjs',
    },
    globalAppMiddleware: true
  },
  nodemailer: {
    from: '',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: '',
      pass: '',
    },
  },
})