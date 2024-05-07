'use client'
import { adminService } from '@/services/admin.service'
import { IChangeRole } from '@/types/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export function useChangeRole() {
	const QueryClient = useQueryClient()
	const { mutate, isPending } = useMutation({
		mutationKey: ['change_role'],
		mutationFn: (data: IChangeRole) => adminService.changeRole(data),
		onSuccess() {
			console.log('3')
			toast.success('Successfully update role!')
		},
	})
	return { mutate, isPending }
}
