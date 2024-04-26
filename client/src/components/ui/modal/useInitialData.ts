import { IUserData } from '@/types/types'
import { useEffect } from 'react'
import { UseFormReset } from 'react-hook-form'

export function useInitialData(
	userData: IUserData,
	reset: UseFormReset<IUserData>
) {
	useEffect(() => {
		if (userData) {
			reset({
				id: userData.id,
				email: userData.email,
				firstName: userData.firstName,
				middleName: userData.middleName,
				lastName: userData.lastName,
				role: userData.role,
			})
		}
	}, [])

	return {}
}
