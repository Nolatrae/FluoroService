'use client'

import { sendFluoroService } from '@/services/fluoro.service'
import { IFormSendFluoro } from '@/types/types'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'

export default function SendForm() {
	const { register, handleSubmit, reset } = useForm<IFormSendFluoro>()

	const router = useRouter()

	const { mutate: mutateSendFluoro } = useMutation({
		mutationKey: ['sendFluoro'],
		mutationFn: (data: IFormSendFluoro) => sendFluoroService.sendFluoro(data),
		onSuccess() {
			reset()
			router.push('/')
		},
	})

	// function onSubmit(data: any) {
	// 	console.log(data)
	// }

	const onSubmit: SubmitHandler<IFormSendFluoro> = data => {
		// console.log(data)
		mutateSendFluoro(data)
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='w-full'>
			<div className='mb-4 flex-col items-center'>
				<input
					type='file'
					{...register('file', {
						required: true,
						validate: {
							isImage: value => value && value[0].type.includes('image'),
						},
					})}
					accept='image/*'
				/>
				<input type='date' {...register('date')} />
				<input type='text' {...register('desc')} />
				<button type='submit'>Submit</button>
			</div>
		</form>
	)
}
