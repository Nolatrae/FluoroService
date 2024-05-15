import { API_URL } from '@/constants'
import { EnumTokens } from '@/services/auth.service'
import { IUser } from '@/types/types'
import { cookies } from 'next/headers'

export const fetchUser = async () => {
	'use server'

	const cookie = cookies()
	const accessToken = cookie.get(EnumTokens.ACCESS_TOKEN)?.value

	return fetch(`${API_URL}/auth/users`, {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	}).then(res => res.json()) as Promise<IUser[]>
}
