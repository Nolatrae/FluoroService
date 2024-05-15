'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useOtherProfile } from '@/hooks/useOtherProfile'
import { adminService } from '@/services/admin.service'
import { UserRole } from '@/services/auth.types'
import { IUserData } from '@/types/types'
import { useMutation } from '@tanstack/react-query'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

export default function ChangeUserForm(id: string) {
	const { register, handleSubmit, reset } = useForm()
	const stateProfile = useOtherProfile(id)
	const profile = stateProfile.profile

	// TODO: Исправить сохранение данных, почему то надо все сначала прожать и только после этого у них смогут записаться данные, надо фиксить...

	// TODO: Сделать отображение статистики в диаграммах, сдавших документы по группам

	const { mutate: mutateChangeUserForm } = useMutation({
		mutationKey: ['changeUserForm'],
		mutationFn: (data: IUserData) => adminService.changeUserData(data),
		onSuccess() {
			toast('Обновление данных пользователя прошло успешно')
		},
	})

	const onSubmit: SubmitHandler<any> = data => {
		mutateChangeUserForm(data)
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className='grid w-full max-w-sm items-center gap-1.5 mb-4'>
				<Label htmlFor='email'>Фамилия</Label>
				<Input
					type='text'
					id='lastName'
					placeholder='Введите фамилию'
					defaultValue={profile?.lastName}
					{...register('lastName')}
				/>
			</div>
			<div className='grid w-full max-w-sm items-center gap-1.5 mb-4'>
				<Label htmlFor='email'>Имя</Label>
				<Input
					type='text'
					id='firstName'
					placeholder='Введите имя'
					defaultValue={profile?.firstName}
					{...register('firstName')}
				/>
			</div>
			<div className='grid w-full max-w-sm items-center gap-1.5 mb-4'>
				<Label htmlFor='email'>Отчество</Label>
				<Input
					type='text'
					id='lastName'
					placeholder='Введите отчество'
					defaultValue={profile?.middleName}
					{...register('middleName')}
				/>
			</div>
			<div className='grid w-full max-w-sm items-center gap-1.5 mb-4'>
				<Label htmlFor='email'>Email</Label>
				<Input
					type='email'
					id='email'
					placeholder='Введите email'
					value={profile?.email}
					{...register('email', { required: true })}
				/>
			</div>
			{/* <div className='grid w-full max-w-sm items-center gap-1.5 mb-4'>
				<Label htmlFor='password'>Группа</Label>
				<Input
					type='text'
					id='group'
					placeholder='Введите группу'
					defaultValue={profile?.group}
					{...register('group')}
				/>
			</div> */}
			<div className='grid w-full max-w-sm items-center gap-1.5 mb-4'>
				<Label htmlFor='email'>Роль</Label>
				<select
					className='flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1'
					defaultValue={profile?.role}
					{...register('role')}
				>
					<option>{UserRole.Admin}</option>
					<option>{UserRole.Curator}</option>
					<option>{UserRole.Student}</option>
				</select>
			</div>
			<Button type='submit'>Сохранить</Button>
		</form>
	)
}
