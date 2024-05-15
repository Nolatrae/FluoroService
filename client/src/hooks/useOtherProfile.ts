import { adminService } from '@/services/admin.service'
import { useQuery } from '@tanstack/react-query'

export function useOtherProfile(id: string) {
	const { data, isLoading } = useQuery({
		queryKey: ['profile'],
		queryFn: () => adminService.otherProfile(id),
		refetchInterval: 1800000, // 30 minutes in milliseconds
	})

	const profile = data?.data


	return { profile }
}
