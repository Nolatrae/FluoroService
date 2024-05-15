'use client'
import { useProfile } from '@/hooks/useProfile'
import { FluoroStatus } from '@/services/fluoro.types'
import { useRouter } from 'next/navigation'

export default function HeaderNew() {
	const { push } = useRouter()
	const { user, isLoading } = useProfile()

	const role = user?.fluorography?.status
	let fluoroStatus
	switch (role) {
		case FluoroStatus.Accepted:
			fluoroStatus = 'Принято'
			break
		case FluoroStatus.Rejected:
			fluoroStatus = 'Отклонено'
			break
		case FluoroStatus.Pending:
			fluoroStatus = 'На рассмотрении'
			break
		default:
			fluoroStatus = ''
	}

	return (
		<div className='overflow-hidden rounded-[0.5rem] bg-background max-w-[800px] items-center gap-1.5 mb-4 justify-start m-10'>
			<div className='p-4 rounded-md shadow-md border w-full mb-8'>
				<h2 className='text-lg font-semibold mb-2'>
					Информация о пользователе
				</h2>
				<p>Имя: {user?.firstName}</p>
				{user?.middleName && <p>Отчество: {user?.middleName}</p>}
				<p>Фамилия: {user?.lastName}</p>
				<p>Email: {user?.email}</p>
				{user?.group && <p>Группа: {user?.group}</p>}
			</div>

			{user.fluorography && (
				<div className='p-4 rounded-md shadow-md border w-full gap-2'>
					<h2 className='text-lg font-semibold mb-2'>
						Информация о флюорографии
					</h2>
					<p>Статус: {fluoroStatus}</p>
					<img
						className='w-full rounded-md'
						src={`http://localhost:4200/uploads/${user?.fluorography?.filePath}`}
					/>
				</div>
			)}
		</div>
	)
}
