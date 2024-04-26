'use client'

import { useRouter } from 'next/navigation'

export function Home() {
	const { push } = useRouter()

	// const { user } = useProfile()

	// const { mutate: mutateLogout, isPending: isLogoutPending } = useMutation({
	// 	mutationKey: ['logout'],
	// 	mutationFn: () => authService.logout(),
	// 	onSuccess() {
	// 		push(PUBLIC_PAGES.LOGIN)
	// 	},
	// })

	return (
		<>
			{/* {' '}
			{user && (
				<div>
					<h2 className='text-2xl font-bold'>Привет, {user.firstName}</h2>
					<p className='text-lg'>Ваш email: {user.email}</p>
				</div>
			)} */}
		</>
	)
}
