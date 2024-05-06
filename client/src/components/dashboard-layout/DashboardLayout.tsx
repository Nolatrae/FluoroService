import type { PropsWithChildren } from 'react'
import HeaderNew from '../dashboard-layout-new/header/HeaderNew'
import { Sidebar } from './sidebar/Sidebar'

export default function DashboardLayout({
	children,
}: PropsWithChildren<unknown>) {
	return (
		<div className='min-h-screen flex relative' id='viewport'>
			<Sidebar />
			<div className='min-h-screen relative w-full'>
				<HeaderNew />

				<main className='p-8'>{children}</main>
			</div>
		</div>
	)
}
