import Table from '@/components/ui/table/Table'
import { API_URL } from '@/constants'
import { EnumTokens } from '@/services/auth.service'
import { IUser } from '@/types/types'

import type { Metadata } from 'next'

import { cookies } from 'next/headers'

export const metadata: Metadata = {
	title: 'Admin SSR',
}

const fetchUser = async () => {
	'use server'

	const cookie = cookies()
	const accessToken = cookie.get(EnumTokens.ACCESS_TOKEN)?.value

	return fetch(`${API_URL}/auth/users`, {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	}).then(res => res.json()) as Promise<IUser[]>
}

export default async function AdminPage() {
	const users = await fetchUser()
	console.log(users)

	return (
		<>
			<div className='overflow-auto'>
				<Table data={users} adminMenu={true} />
			</div>
			{/* <div className='flex justify-between w-full'>
				<div className=''>Egor</div>
				<div className=''>Egor</div>
				<div className=''>Egor</div>
			</div> */}
		</>
	)
}
