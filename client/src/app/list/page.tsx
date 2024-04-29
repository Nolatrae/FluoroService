import Table from '@/components/ui/table/Table'
import { API_URL } from '@/constants'
import { EnumTokens } from '@/services/auth.service'
import { IUser } from '@/types/types'
import { Metadata } from 'next'
import { cookies } from 'next/headers'

export const metadata: Metadata = {
	title: 'List users',
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

export default async function Page() {
	const users = await fetchUser()
	// const usersWithoutFluoro = users.map(user => {
	// 	const { fluorography, ...rest } = user
	// 	return rest
	// })

	// const filteredUsers = users.filter(user => user.role)

	return (
		<>
			<Table data={users} />
		</>
	)
}
