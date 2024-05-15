'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { sendFluoroService } from '@/services/fluoro.service'
import { IFormSendFluoro } from '@/types/types'
import { getServerTokens } from '@/utils/server/get-server-auth'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'
export default function SendForm() {
	// const [selectedFile, setSelectedFile] = useState(null)
	// const [uploaded, setUploaded] = useState()

	const { register, handleSubmit, reset } = useForm<IFormSendFluoro>()

	const router = useRouter()

	const { mutate: mutateSendFluoro } = useMutation({
		mutationKey: ['sendFluoro'],
		mutationFn: data => sendFluoroService.sendFluoro(data),
		onSuccess() {
			reset()
			router.push('/')
		},
	})

	const onSubmit: SubmitHandler<IFormSendFluoro> = data => {
		mutateSendFluoro(data)
	}

	const [date, setDate] = useState<Date>()

	const [selectedFile, setSelectedFile] = useState(null)
	const [inputDate, setInputDate] = useState()
	const [inputText, setInputText] = useState()

	const handleChangeFile = event => {
		const file = event.target.files[0]
		setSelectedFile(file)
	}

	const handleChangeDate = event => {
		const date = event.target.valueAsDate
		const isoDate = date.toISOString().split('T')[0] // Получение даты в формате 'yyyy-MM-dd'
		setInputDate(isoDate)
	}

	const handleChangeText = event => {
		setInputText(event.target.value)
	}

	async function sendInfo() {
		try {
			const tokens = await getServerTokens()
			const accessToken = tokens.accessToken
			const refreshToken = tokens.refreshToken

			const formData = new FormData()
			if (selectedFile !== null) {
				formData.append('file', selectedFile)
			}
			if (inputDate !== undefined) {
				formData.append('date', inputDate)
			}
			if (inputText !== undefined) {
				formData.append('description', inputText)
			}

			await fetch('http://localhost:4200/api/fluorography/send', {
				method: 'POST',
				body: formData,
				headers: {
					Authorization: `Bearer ${accessToken}`,
					refreshToken: `Bearer ${refreshToken}`,
					accessToken: `Bearer ${accessToken}`,
				},
			})

			toast('Флюорография успешно отправлена')
		} catch (error) {
			console.error('Error occurred:', error)
			toast(`ой-ой ${error}`)
		}
	}

	return (
		<div className='overflow-hidden rounded-[0.5rem] border bg-background shadow grid w-full max-w-sm items-center gap-1.5 mb-4 m-auto mt-10'>
			<div className='mb-4 flex-col items-center w-full p-8'>
				<div className='grid w-full max-w-sm items-center gap-1.5 mb-4'>
					<Label>Файл</Label>
					<Input
						className='mt-1'
						type='file'
						onChange={handleChangeFile}
					></Input>
				</div>
				<div className='grid w-full max-w-sm items-center gap-1.5 mb-4'>
					<Label>Дата</Label>
					<Input
						className='mt-1'
						type='date'
						onChange={handleChangeDate}
					></Input>
				</div>
				<div className='grid w-full max-w-sm items-center gap-1.5 mb-4'>
					<Label>Дополнительная информация</Label>
					<Textarea className=' mt-1 resize-none' onChange={handleChangeText} />
				</div>

				<div className='grid w-full max-w-sm items-center gap-1.5 mb-4'>
					<Button onClick={sendInfo}>Отправить</Button>
				</div>
			</div>
		</div>
	)
}
