import Table from '@/components/ui/table/Table'
import { API_URL } from '@/constants'
import { EnumTokens } from '@/services/auth.service'
import { IUserCheckFluoro } from '@/types/types'
import { Metadata } from 'next'
import { cookies } from 'next/headers'

export const metadata: Metadata = {
	title: 'List users',
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
	}).then(res => res.json()) as Promise<IUserCheckFluoro[]>
}

export default async function Page() {
	const users = await fetchUser(true)
	return (
		<>
			<Table data={users} />
		</>
	)
}
