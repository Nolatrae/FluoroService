'use client'

import { ColumnDef } from '@tanstack/react-table'
import {
	ArrowUpDown,
	Baby,
	Meh,
	MoreHorizontal,
	Settings,
	Shield,
	Users,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuPortal,
	DropdownMenuSeparator,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { adminService } from '@/services/admin.service'
import { UserRole } from '@/services/auth.types'
import { IUser } from '@/types/types'

// const { mutate } = useChangeRole()

export const columns: ColumnDef<IUser>[] = [
	{
		id: 'actions',
		cell: ({ row }) => {
			const user = row.original

			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant='ghost' className='h-8 w-8 p-0'>
							<span className='sr-only'>Open menu</span>
							<MoreHorizontal className='h-4 w-4' />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align='start'>
						<DropdownMenuLabel>Действия</DropdownMenuLabel>
						<DropdownMenuItem
							onClick={() => navigator.clipboard.writeText(user.id)}
						>
							Копировать айди
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						{/* <DropdownMenuItem>Сменить роль</DropdownMenuItem> */}
						<DropdownMenuSub>
							<DropdownMenuSubTrigger>
								<Users className='mr-2 h-4 w-4' />
								<span>Поменять роль</span>
							</DropdownMenuSubTrigger>
							<DropdownMenuPortal>
								<DropdownMenuSubContent>
									<DropdownMenuItem
										onClick={e => {
											adminService.changeRole({
												id: user.id,
												role: UserRole.Admin,
											})
										}}
									>
										<Shield className='mr-2 h-4 w-4' />
										<span>Администратор</span>
									</DropdownMenuItem>
									<DropdownMenuItem
										onClick={e => {
											adminService.changeRole({
												id: user.id,
												role: UserRole.Curator,
											})
										}}
									>
										<Meh className='mr-2 h-4 w-4' />
										<span>Куратор</span>
									</DropdownMenuItem>
									<DropdownMenuItem
										onClick={e => {
											adminService.changeRole({
												id: user.id,
												role: UserRole.User,
											})
										}}
									>
										<Baby className='mr-2 h-4 w-4' />
										<span>Студент</span>
									</DropdownMenuItem>
								</DropdownMenuSubContent>
							</DropdownMenuPortal>
						</DropdownMenuSub>
						<DropdownMenuItem>
							<Settings className='mr-2 h-4 w-4' />
							<span>Поменять данные</span>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			)
		},
	},
	{
		accessorKey: 'lastName',
		header: 'Фамилия',
	},
	{
		accessorKey: 'firstName',
		header: 'Имя',
	},
	{
		accessorKey: 'middleName',
		header: 'Отчество',
	},
	{
		accessorKey: 'group',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Группа
					<ArrowUpDown className='ml-2 h-4 w-4' />
				</Button>
			)
		},
	},
	{
		accessorKey: 'email',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Email
					<ArrowUpDown className='ml-2 h-4 w-4' />
				</Button>
			)
		},
	},
	{
		accessorKey: 'role',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Роль
					<ArrowUpDown className='ml-2 h-4 w-4' />
				</Button>
			)
		},
	},
]
