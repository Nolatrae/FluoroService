import Table from '@/components/ui/table/Table'
import { API_URL } from '@/constants'
import { EnumTokens } from '@/services/auth.service'
import { IUser } from '@/types/types'

import type { Metadata } from 'next'

import { cookies } from 'next/headers'

export const metadata: Metadata = {
	title: 'Admin SSR',
}

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

export default async function AdminPage() {
	const users = await fetchUser(false)

	return (
		<>
			<div className='overflow-auto'>
				<Table data={users} adminMenu={true} />
			</div>
		</>
	)
}
