'use client'

import { PropsWithChildren } from 'react'
import HeaderNew from './header/HeaderNew'
import SidebarNew from './sidebar/SidebarNew'

export default function DashboardLayoutNew({
	children,
}: PropsWithChildren<unknown>) {
	// const { user } = useProfile()

	return (
		<>
			<SidebarNew />
			<main className='w-full md:w-[calc(100%-256px)] md:ml-64 bg-background min-h-screen transition-all main'>
				<HeaderNew />
				{children}
			</main>
		</>
	)
}
