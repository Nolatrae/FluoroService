// 'use client'

// import { adminService } from '@/services/admin.service'
// import { FluoroStatus, IChangeFluoroStatus } from '@/services/fluoro.types'
// import { useMutation } from '@tanstack/react-query'
// import { toast } from 'sonner'

// export function useChangeFluoroStatus(userId, status: FluoroStatus) {
// 	const { mutate, isPending } = useMutation({
// 		mutationKey: ['change_fluoro_status'],
// 		mutationFn: (data: IChangeFluoroStatus) =>
// 			adminService.changeFluoroStatus(userId, data),
// 		onSuccess() {
// 			toast.success('Обновление статуса флюорографии прошло успешно')
// 		},
// 	})
// 	return { mutate, isPending }
// }
