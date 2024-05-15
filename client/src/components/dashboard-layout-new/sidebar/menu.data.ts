import { LayoutList, Mail, Shield, SquareUser } from 'lucide-react'

import { UserRole } from '@/services/auth.types'
import { IMenuItem } from './menu.interface'

export const MENU: IMenuItem[] = [
	{
		icon: LayoutList,
		link: '/userlist',
		name: 'Список',
		role: [UserRole.Admin, UserRole.Curator],
	},
	{
		icon: Mail,
		link: '/send',
		name: 'Отправить флюрку',
		role: [UserRole.Student],
	},
	{
		icon: SquareUser,
		link: '/profile',
		name: 'Профиль',
		role: [UserRole.Admin, UserRole.Student, UserRole.Curator],
	},
	{
		icon: Shield,
		link: '/admin',
		name: 'Админ панель',
		role: [UserRole.Admin],
	},
]
