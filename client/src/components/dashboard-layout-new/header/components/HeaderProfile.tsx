import { useProfile } from '@/hooks/useProfile'
import { UserRole } from '@/services/auth.types'

export default function HeaderProfile() {
	const { user, isLoading } = useProfile()

	const role = user?.role
	let roleStatus
	switch (role) {
		case UserRole.Admin:
			roleStatus = 'Администратор'
			break
		case UserRole.Curator:
			roleStatus = 'Куратор'
			break
		case UserRole.Student:
			roleStatus = 'Студент'
			break
		default:
			roleStatus = ''
	}

	return (
		<li className='dropdown ml-3'>
			<button
				type='button'
				disabled
				className='dropdown-toggle flex items-center'
			>
				{user && (
					<div className='w-10 h-10 flex justify-center items-center text-2xl text-black border rounded uppercase'>
						{user.firstName?.charAt(0) || 'E'}
						{user.lastName?.charAt(0) || 'E'}
					</div>
				)}
				<div className='p-2 md:block text-left'>
					<h2 className='text-sm font-semibold text-gray-800'>
						{user?.firstName} {user?.lastName}
					</h2>
					<p className='text-xs text-gray-500'>{roleStatus}</p>
				</div>
			</button>
		</li>
	)
}
