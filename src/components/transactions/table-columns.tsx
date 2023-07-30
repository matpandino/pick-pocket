"use client"

import { Transaction } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "date",
    header: "Date",
    accessorFn: ({date}) => format(new Date(date), 'dd/MM/yyyy'),
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "amount",
    header: "Amount",
    accessorFn: ({amount}) => amount.toLocaleString('en-US', {
        style: 'currency',
        currency: 'BRL',
      })
  },
]
