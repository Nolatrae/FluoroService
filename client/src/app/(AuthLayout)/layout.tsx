import DashboardLayoutNew from '@/components/dashboard-layout-new/DashboardLayoutNew'
import { Toaster } from '@/components/ui/sonner'

export default function AuthLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<DashboardLayoutNew>
			{children}
			<Toaster />
		</DashboardLayoutNew>
	)
}
