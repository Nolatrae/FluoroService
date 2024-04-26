import { LayoutList, Mail, Shield, SquareUser } from 'lucide-react'

import { UserRole } from '@/services/auth.types'
import { IMenuItem } from './menu.interface'

export const MENU: IMenuItem[] = [
	{
		icon: LayoutList,
		link: '/list',
		name: 'List',
		role: [UserRole.Admin],
	},
	{
		icon: Mail,
		link: '/send',
		name: 'Send fluoro',
		role: [UserRole.Admin],
	},
	{
		icon: SquareUser,
		link: '/profile',
		name: 'Profile',
		role: [UserRole.Admin, UserRole.User],
	},
	{
		icon: Shield,
		link: '/admin',
		name: 'Admin panel',
		role: [UserRole.Admin],
	},
]
