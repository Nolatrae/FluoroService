'use client'

import { useProfile } from '@/hooks/useProfile'
import { MenuItem } from './MenuUtem'
import { MENU } from './menu.data'

export default function SidebarNew() {
	const { user, isLoading } = useProfile()

	const filteredMenu = MENU.filter(
		item => user?.role !== undefined && item.role.includes(user.role)
	)

	return (
		<div className='fixed left-0 top-0 w-64 h-full bg-background p-4 z-50 sidebar-menu transition-transform shadow-md'>
			<a href='/' className='flex items-center pb-4'>
				<h2 className='font-bold text-2xl'>
					FLUORO
					<span className='bg-black text-white px-2 rounded-md'>Scan</span>
				</h2>
			</a>
			<ul className='mt-4'>
				{filteredMenu.map(item => (
					<MenuItem item={item} key={item.link} />
				))}
			</ul>
		</div>
	)
}
