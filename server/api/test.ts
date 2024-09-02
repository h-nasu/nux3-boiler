export default defineEventHandler(() => {
  const { sendMail } = useNodeMailer()

  return sendMail({ subject: '3Nuxt + nodemailer', text: 'Hello from nuxt-nodemailer!', to: 'info@cyber-th.com' })
})
