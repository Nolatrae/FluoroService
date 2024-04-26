import { adminService } from '@/services/admin.service'
import { IUserData } from '@/types/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export function useUpdateSettings() {
	const QueryClient = useQueryClient()
	const { mutate, isPending } = useMutation({
		mutationKey: ['change_user_data'],
		mutationFn: (data: IUserData) => adminService.changeUserData(data),
		onSuccess() {
			toast.success('Successfully update profile!')
		},
	})
	return { mutate, isPending }
}
