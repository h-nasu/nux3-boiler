import { hash } from "bcrypt"
import prisma from "@/lib/prisma"

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const userExists = await prisma.users.findFirst({
    where: { email: body.email }
  })

  if(userExists) {
    throw createError({
      statusCode: 403,
      statusMessage: "User already exists",
    })
  }

  const verificationCode = randomToken(24)

  await prisma.users.create({
    data: {
      email: body.email,
      username: body.username,
      password: await hash(body.password, 12),
      verificationCode: verificationCode
    },
  })

  // send verification email
  const { sendMail } = useNodeMailer()
  const url = getRequestURL(event)
  const siteUrl = url.protocol + url.host + '/auth/verify/' + verificationCode
  const mailParams = {
    subject: 'Verify Your Account',
    text: siteUrl,
    to: body.email
  }

  const mailResponse = await sendMail(mailParams)

  if (mailResponse.accepted.length > 0) {
    setResponseStatus(event, 201)
    return { message: "User created" }
  } else {
    throw createError({
      statusCode: 403,
      statusMessage: "Could not send email",
    })
  }
  
})