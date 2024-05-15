import { DataTable } from '../admin/data-table'

// import { fetchUser } from '@/hooks/fetchUser'
import { columns } from '../admin/columns'

import { fetchUser } from '@/hooks/fetchUser'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Admin panel',
	description: 'Admin panel for administration',
}

export default async function AdminPage() {
	const data = await fetchUser()

	return (
		<div className='overflow-hidden rounded-[0.5rem] border bg-background shadow m-10'>
			<div className='container mx-auto py-10'>
				<DataTable columns={columns} data={data} />
			</div>
		</div>
	)
}
