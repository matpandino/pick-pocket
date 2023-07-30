import { DataTable } from '@/components/transactions/data-table'
import { columns } from '@/components/transactions/table-columns'

async function getData(): Promise<any> {
  const res = await fetch('http://localhost:3000/api/transactions')

  const data = await res.json()
  return data.data
}

export default async function Home() {
  const data = await getData()
  return (
    <main className="container dark mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </main>
  )
}
