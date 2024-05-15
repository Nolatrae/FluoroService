'use client'

import { adminService } from '@/services/admin.service'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { IMenuItem } from './menu.interface'

export function MenuItem({ item }: { item: IMenuItem }) {
	const [countUsers, setCountUsers] = useState(null) // Используем useState для хранения значения countUsers

	useEffect(() => {
		if (item.name === 'Список') {
			;(async () => {
				try {
					const response = await adminService.getCountUsersWithFluoro()
					setCountUsers(response.data)
				} catch (error) {
					console.error(
						'Error while getting count of users with fluoro:',
						error
					)
				}
			})()
		}
	}, [item.name])

	return (
		<li className='mb-4 group'>
			<Link
				href={item.link}
				className='flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100 sidebar-dropdown-toggle'
			>
				<i className='bx bxl-blogger mr-3 text-lg'></i>
				<item.icon className='mr-3' />
				<span className='text-sm'>{item.name}</span>
				{item.name === 'Список' && countUsers !== null && countUsers !== 0 && (
					<span className='md:block px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-red-600 bg-red-200 rounded-full'>
						{countUsers}
					</span>
				)}
			</Link>
		</li>
	)
}
