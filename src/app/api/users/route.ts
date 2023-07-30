import { prisma } from '@/lib/prisma'
import { NextResponse, type NextRequest } from 'next/server'
import { z } from 'zod'

export const UserCreateInput = z.object({
    username: z.string(),
    email: z.string(),
    password: z.string(),
  })
  

export async function POST(request: NextRequest) {
  try {
    const body: typeof UserCreateInput = await request.json()

    const data = UserCreateInput.parse(body)
    const createdUser = await prisma.user.create({
      data,
    })

    return NextResponse.json({id: createdUser.id}, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to create user', details: error },
      { status: 404 },
    )
  }
}