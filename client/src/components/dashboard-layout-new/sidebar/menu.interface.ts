import { UserRole } from '@/services/auth.types'
import type { LucideIcon } from 'lucide-react'

export interface IMenuItem {
	link: string
	name: string
	icon: LucideIcon
	role: UserRole[]
}
