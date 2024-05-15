import { fetchUserWithFluoro } from '@/hooks/fetchUserWithFluoro'
import { Metadata } from 'next'
import { columnsFluoro } from './columns'
import { DataFluoroTable } from './data-fluoro-table'

export const metadata: Metadata = {
	title: 'Fluorography list',
}

export default async function FluorographyPage() {
	const data = await fetchUserWithFluoro()

	return (
		<div className='overflow-hidden rounded-[0.5rem] border bg-background shadow m-10'>
			<div className='container mx-auto py-10'>
				<DataFluoroTable columns={columnsFluoro} data={data} />
			</div>
		</div>
	)
}
