'use client'

import { IUserFluoro } from '@/types/types'
import { ColumnDef } from '@tanstack/react-table'

import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { FluoroStatus } from '@/services/fluoro.types'
import {
	ArrowUpDown,
	Clock4,
	FileImage,
	ThumbsDown,
	ThumbsUp,
} from 'lucide-react'
import DisplayFluoro from './DisplayFLuoro'

export const columnsFluoro: ColumnDef<IUserFluoro>[] = [
	{
		accessorKey: 'lastName',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Фамилия
					<ArrowUpDown className='ml-2 h-4 w-4' />
				</Button>
			)
		},
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
		accessorKey: 'fluorography.status',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Статус
					<ArrowUpDown className='ml-2 h-4 w-4' />
				</Button>
			)
		},
		cell: ({ row }) => {
			const user = row.original
			const fluoroStatus = user.fluorography.status
			switch (fluoroStatus) {
				case FluoroStatus.Pending:
					return (
						<div className='whitespace-nowrap flex items-center gap-1'>
							<Clock4 className='text-yellow-600' />
							На рассмотрении
						</div>
					)
				case FluoroStatus.Accepted:
					return (
						<div className='whitespace-nowrap flex items-center gap-1'>
							<ThumbsUp className='text-green-600' />
							Одобрено
						</div>
					)
				case FluoroStatus.Rejected:
					return (
						<div className='whitespace-nowrap flex items-center gap-1'>
							<ThumbsDown className='text-red-600' />
							Отклонено
						</div>
					)
				default:
					return <>Неизвестный статус</>
			}
			return <>{fluoroStatus}</>
		},
	},

	{
		accessorKey: 'fluorography.date',
		header: 'Дата актуальности',
	},
	{
		header: () => <div className='text-center'>Отображение</div>,
		id: 'Show_fluorography',
		cell: ({ row }) => {
			const user = row.original

			return (
				<Dialog>
					<div className='text-center'>
						<DialogTrigger key={user.id}>
							<FileImage className='stroke-1' />
						</DialogTrigger>
					</div>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Проверка Флюорографии</DialogTitle>
							<DialogDescription>
								<DisplayFluoro UserId={user.id} Data={user.fluorography} />
							</DialogDescription>
						</DialogHeader>
					</DialogContent>
				</Dialog>
			)
		},
	},
]
