import type { Metadata } from 'next'
// import { Fira_Mono } from 'next/font/google'
import { Inter as FontSans } from 'next/font/google'

import { cn } from '@/lib/utils'
import { Providers } from './Providers'
import './globals.css'

// const inter = Fira_Mono({ subsets: ['cyrillic', 'latin'], weight: '400' })

const fontSans = FontSans({
	subsets: ['latin'],
	variable: '--font-sans',
})

export const metadata: Metadata = {
	title: 'Fluoro Scan',
	description: 'Fluoro Scan',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='en'>
			<body
				className={cn(
					'min-h-screen bg-background font-sans antialiased',
					fontSans.variable
				)}
			>
				<Providers>{children}</Providers>
			</body>
		</html>
	)
}
