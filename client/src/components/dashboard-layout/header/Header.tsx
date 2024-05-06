'use client'

import { PUBLIC_PAGES } from '@/config/pages/public.config'
import { useProfile } from '@/hooks/useProfile'
import authService from '@/services/auth.service'
import { useMutation } from '@tanstack/react-query'
import { LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function Header() {
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
		<header className='w-full flex justify-end border-b p-6 h-20'>
			<div className='flex items-center'>
				<div className='text-right mr-3'>
					<p className='font-bold -mb-1'>{user?.firstName}</p>
					<p className='text-sm opacity-40'>{user?.email}</p>
				</div>

				<div className='w-10 h-10 flex justify-center items-center text-2xl text-white bg-white/20 rounded uppercase'>
					{user?.firstName?.charAt(0) || 'E'}
					{user?.lastName?.charAt(0) || 'E'}
				</div>
			</div>
			<div className='flex items-center'>
				{user && (
					<button onClick={() => mutateLogout()} disabled={isLogoutPending}>
						<LogOut className='font-bold ml-4 w-8 h-8' />
					</button>
				)}
			</div>
		</header>
	)
}
