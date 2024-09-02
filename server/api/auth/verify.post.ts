import prisma from "@/lib/prisma"

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const userExists = await prisma.users.findFirst({
    where: { verificationCode: body.code }
  })

  if(userExists) {
    // verify user
    const user = await prisma.users.update({
      where: { id: userExists.id },
      data: { isVerified: true },
    })

    return user

  } else {
    throw createError({
      statusCode: 403,
      statusMessage: "User already exists",
    })
  }
  
})