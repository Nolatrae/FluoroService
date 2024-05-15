'use client'

import { useProfile } from '@/hooks/useProfile'
import { adminService } from '@/services/admin.service'
import { UserRole } from '@/services/auth.types'
import { FluoroStatus } from '@/services/fluoro.types'
import { toast } from 'sonner'

async function handleChangeFluoroStatus(userId, status) {
	try {
		await adminService.changeFluoroStatus(userId, status)
		toast('Обновление данных пользователя прошло успешно')
		const popupCloseButton = document.querySelector('.popup-close')
		if (popupCloseButton) {
			popupCloseButton.click()
		}
	} catch (error) {
		// Обработка ошибок
		console.error('Ошибка при обновлении данных пользователя:', error)
		// Возможно, также можно показать пользователю уведомление об ошибке
		toast('Произошла ошибка при обновлении данных пользователя')
	}
}

export default function DisplayFluoro(UserId: string, Data) {
	function getDateWithoutTime(dateString) {
		const dateObject = new Date(dateString)
		const dateWithoutTime = dateObject.toISOString().split('T')[0]
		return dateWithoutTime
	}

	const { user } = useProfile()

	return (
		<div className='max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl'>
			<img
				className='w-full'
				src={`http://localhost:4200/uploads/${UserId?.Data?.filePath}`}
			/>

			<div className='p-6'>
				<div className='font-semibold text-xl mb-2'>
					Актуальна до {getDateWithoutTime(UserId?.Data?.date)}
				</div>
				<p className='text-gray-700 text-base'>{UserId?.Data?.description}</p>
			</div>

			{user?.role === UserRole.Admin && (
				<div className='flex justify-center space-x-4 p-6'>
					<button
						className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
						onClick={() =>
							handleChangeFluoroStatus(UserId.UserId, FluoroStatus.Rejected)
						}
					>
						Отклонить
					</button>
					<button
						className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
						onClick={() =>
							handleChangeFluoroStatus(UserId.UserId, FluoroStatus.Accepted)
						}
					>
						Одобрить
					</button>
				</div>
			)}
		</div>
	)
}
