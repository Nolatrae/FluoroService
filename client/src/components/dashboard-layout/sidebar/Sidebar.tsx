'use client'

import { useProfile } from '@/hooks/useProfile'
import { BriefcaseMedical } from 'lucide-react'
import Link from 'next/link'
import { MenuItem } from './MenuItem'
import { MENU } from './menu.data'

export function Sidebar() {
	const { user, isLoading } = useProfile()

	const filteredMenu = MENU.filter(
		item => user?.role !== undefined && item.role.includes(user.role)
	)

	return (
		<aside className='h-full min-h-screen border-r border-r-black flex flex-col justify-between w-60 '>
			<div>
				<Link
					href='/'
					className='flex items-center gap-2.5 p-layout border-b border-b-black p-6 h-20'
				>
					<BriefcaseMedical color='black' size={38} />
					<span className='text-2xl font-bold relative'>
						FluoroScan
						<span className='absolute -top-1 -right-6 text-xs opacity-40 rotate-[18deg] font-normal'>
							ИГУ
						</span>
					</span>
				</Link>
				{isLoading ? (
					<>Загрузка</>
				) : (
					<div className='p-3 relative'>
						{filteredMenu.map(item => (
							<MenuItem item={item} key={item.link} />
						))}
					</div>
				)}
			</div>
			<footer className='text-xs opacity-40 font-normal text-center p-6'>
				2024 &copy; With love from{' '}
				<a
					href='https://www.youtube.com/c/redgroup/?sub_confirmation=1'
					target='_blank'
					rel='noreferrer'
					className='hover:text-primary text-brand-300 transition-colors'
				>
					Nola
				</a>
				. <br /> All rights reserved.
			</footer>
		</aside>
	)
}
