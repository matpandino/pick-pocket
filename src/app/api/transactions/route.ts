import { prisma } from '@/lib/prisma'
import { NextResponse, type NextRequest } from 'next/server'
import { z } from 'zod'

export const TransactionCreateInput = z.object({
    description: z.string(),
    amount: z.number(),
    date: z.coerce.string(),
    userId: z.string(),
    categoryId: z.string().optional(),
  })

//   export const TransactionGetAllInput = z.object({
//     userId: z.string(),
//   })
  

export async function POST(request: NextRequest) {
  try {
    const body: typeof TransactionCreateInput = await request.json()

    const data = TransactionCreateInput.parse(body)
    const createdTransaction = await prisma.transaction.create({
      data
    })

    return NextResponse.json({id: createdTransaction.id}, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to create transaction', details: error },
      { status: 404 },
    )
  }
}

export async function GET(request: NextRequest, ) {
    try {
    //   const userId = await request.nextUrl.searchParams.get('userId')
  
    //   const data = TransactionGetAllInput.parse({userId})
      const transactions = await prisma.transaction.findMany({
        select: {
            id: true,
            description: true,
            date: true,
            category: true,
            userId: true,
            amount: true,
        },
        orderBy: {
            date: 'desc'
        },
        where: {
            // userId: data.userId,
        }
      })
  
      return NextResponse.json({data: transactions}, { status: 200 })
    } catch (error) {
      return NextResponse.json(
        { message: 'Failed to get transactions', details: error },
        { status: 404 },
      )
    }
  }