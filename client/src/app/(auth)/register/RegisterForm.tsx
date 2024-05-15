'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import authService from '@/services/auth.service'
import { IFormData, IRegisterData } from '@/types/types'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'

interface AuthFormProps {
	isLogin: boolean
}

export function RegisterForm() {
	const { register, handleSubmit, reset } = useForm<IRegisterData>()

	const router = useRouter()

	const { mutate: mutateLogin, isPending: isLoginPending } = useMutation({
		mutationKey: ['login'],
		mutationFn: (data: IFormData) => authService.main('login', data),
		onSuccess() {
			reset()
			router.push('/')
		},
	})

	const {
		error,
		mutate: mutateRegister,
		isPending: isRegisterPending,
	} = useMutation({
		mutationKey: ['register'],
		mutationFn: (data: IRegisterData) => authService.reg('register', data),
		onSuccess() {
			reset()
			router.push('/')
		},
	})

	const isPending = isLoginPending || isRegisterPending

	const onSubmit: SubmitHandler<IRegisterData> = data => {
		mutateRegister(data)
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='max-w-sm mx-auto '>
			<div className='grid w-full max-w-sm items-center gap-1.5 mb-4'>
				<Label className='text-gray-600 '>
					Фамилия
					<Input
						className='mt-2'
						type='text'
						placeholder='Введите фамилию: '
						{...register('lastName', { required: true })}
					/>
				</Label>
			</div>

			<div className='grid w-full max-w-sm items-center gap-1.5 mb-4'>
				<Label className='text-gray-600'>
					Имя
					<Input
						className='mt-2'
						type='text'
						placeholder='Введите фамилию: '
						{...register('firstName', { required: true })}
					/>
				</Label>
			</div>

			<div className='grid w-full max-w-sm items-center gap-1.5 mb-4'>
				<Label className='text-gray-600'>
					Отчество
					<Input
						className='mt-2'
						type='text'
						placeholder='Введите отчество: '
						{...register('middleName')}
					/>
				</Label>
			</div>

			<div className='grid w-full max-w-sm items-center gap-1.5 mb-4'>
				<Label className='text-gray-600'>
					Email
					<Input
						className='mt-2'
						type='email'
						placeholder='Enter email: '
						{...register('email', { required: true })}
					/>
				</Label>
			</div>

			<div className='grid w-full max-w-sm items-center gap-1.5 mb-4'>
				<Label className='text-gray-600'>
					Номер группы
					<Input
						className='mt-2'
						type='text'
						placeholder='Введите номер группы'
						{...register('group')}
					/>
				</Label>
			</div>

			{error && <p className='text-red-500'>{error.message}</p>}

			<div className='grid w-full max-w-sm items-center gap-1.5 mb-4'>
				<Label className='text-gray-600'>
					Пароль
					<Input
						className='mt-2'
						type='password'
						placeholder='Enter password: '
						{...register('password', { required: true })}
					/>
				</Label>
			</div>

			<div className='grid w-full max-w-sm items-center gap-1.5 mb-4'>
				<Button type='submit' disabled={isPending}>
					Зарегистрироваться'
				</Button>
			</div>
		</form>
	)
}
