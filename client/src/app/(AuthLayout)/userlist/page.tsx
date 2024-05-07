import { DataTable } from './data-table'

// import { fetchUser } from '@/hooks/fetchUser'
import { columns } from './columns'

import { API_URL } from '@/constants'
import { EnumTokens } from '@/services/auth.service'
import { IUser } from '@/types/types'
import { cookies } from 'next/headers'

const fetchUser = async (withFluorography: boolean) => {
	'use server'

	const cookie = cookies()
	const accessToken = cookie.get(EnumTokens.ACCESS_TOKEN)?.value

	const url = withFluorography
		? `${API_URL}/auth/users?fluorography=true`
		: `${API_URL}/auth/users?fluorography=false`

	return fetch(url, {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	}).then(res => res.json()) as Promise<IUser[]>
}

// async function getData(): Promise<Payment[]> {
// 	// Fetch data from your API here.
// 	return [
// 		{
// 			id: '728ed52f',
// 			amount: 100,
// 			status: 'pending',
// 			email: 'm@example.com',
// 		},
// 		// ...
// 	]
// }

export default async function DemoPage() {
	const users = await fetchUser(false)
	console.log(users)
	const data = await fetchUser(false)

	return (
		<div className='overflow-hidden rounded-[0.5rem] border bg-background shadow m-10'>
			<div className='container mx-auto py-10'>
				<DataTable columns={columns} data={data} />
			</div>
		</div>
	)
}
