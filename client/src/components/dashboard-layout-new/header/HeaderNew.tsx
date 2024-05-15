'use client'
import { PUBLIC_PAGES } from '@/config/pages/public.config'
import { useProfile } from '@/hooks/useProfile'
import authService from '@/services/auth.service'
import { useMutation } from '@tanstack/react-query'
import { LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'
import FullScreen from './components/FullScreen'
import HeaderProfile from './components/HeaderProfile'
import Notifications from './components/Notifications'
import Search from './components/Search'

export default function HeaderNew() {
	const { push } = useRouter()
	const { user, isLoading } = useProfile()

	const { mutate: mutateLogout, isPending: isLogoutPending } = useMutation({
		mutationKey: ['logout'],
		mutationFn: () => authService.logout(),
		onSuccess() {
			push(PUBLIC_PAGES.LOGIN)
		},
	})

	return (
		<div className='py-2 px-6 bg-background flex items-center shadow-md shadow-black/5 sticky top-0 left-0 z-30'>
			<ul className='ml-auto flex items-center'>
				<Search />
				<Notifications />
				<FullScreen />
				<HeaderProfile />
				{user && (
					<button onClick={() => mutateLogout()} disabled={isLogoutPending}>
						<LogOut className='font-bold ml-4 w-8 h-8 stroke-1 text-gray-500' />
					</button>
				)}
			</ul>
		</div>
	)
}
