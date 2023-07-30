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
    await prisma.user.create({
      data,
    })

    return NextResponse.json({}, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to create product', details: error },
      { status: 404 },
    )
  }
}