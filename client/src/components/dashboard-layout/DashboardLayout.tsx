import type { PropsWithChildren } from 'react'
import { Header } from './header/Header'
import { Sidebar } from './sidebar/Sidebar'

export default function DashboardLayout({
	children,
}: PropsWithChildren<unknown>) {
	return (
		<div className='min-h-screen flex relative' id='viewport'>
			<Sidebar />
			<div className='min-h-screen relative w-full'>
				<Header />
				<main className='p-8'>{children}</main>
			</div>
		</div>
	)
}
