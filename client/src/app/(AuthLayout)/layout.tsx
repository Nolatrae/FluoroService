import DashboardLayoutNew from '@/components/dashboard-layout-new/DashboardLayoutNew'

export default function AuthLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return <DashboardLayoutNew>{children}</DashboardLayoutNew>
}
