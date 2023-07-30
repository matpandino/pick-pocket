import { prisma } from '@/lib/prisma'
import { NextResponse, type NextRequest } from 'next/server'
import { z } from 'zod'

export const TransactionCreateInput = z.object({
    description: z.string(),
    amount: z.number(),
    date: z.date(),
    categoryId: z.string(),
    userId: z.string(),
  })
  

export async function POST(request: NextRequest) {
  try {
    const body: typeof TransactionCreateInput = await request.json()

    const data = TransactionCreateInput.parse(body)
    const createdTransaction = await prisma.transaction.create({
      data,
    })

    return NextResponse.json({id: createdTransaction.id}, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to create transaction', details: error },
      { status: 404 },
    )
  }
}