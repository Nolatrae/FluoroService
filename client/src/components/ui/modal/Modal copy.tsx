import { adminService } from '@/services/admin.service'
import { IPopupData, IUserData } from '@/types/types'
import { useMutation } from '@tanstack/react-query'
import { SquareX } from 'lucide-react'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import Modal from 'react-modal'
import styles from './Modal.module.scss'

Modal.setAppElement('#viewport') // Указываем корневой элемент вашего приложения для модального окна

interface UserModalProps {
	isOpen: boolean
	onRequestClose: () => void
	userData: IPopupData
}

const ModalUI: React.FC<UserModalProps> = ({
	isOpen,
	onRequestClose,
	userData,
}) => {
	const {
		register,
		handleSubmit,
		reset,
		setValue,
		formState: { errors },
	} = useForm<IUserData>({
		defaultValues: userData, // Устанавливаем начальные значения формы из userData
	})

	// Функция для установки значения поля формы
	const setFormValue = (key: keyof IUserData, value: any) => {
		setValue(key, value)
	}

	const { mutate: mutateUserData } = useMutation({
		mutationKey: ['sendUserData'],
		mutationFn: (data: IUserData) => adminService.changeUserData(data),
		onSuccess() {
			reset()
		},
	})

	const onSubmit: SubmitHandler<IUserData> = data => {
		mutateUserData(data)
	}

	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={onRequestClose}
			className={styles.cont}
		>
			<p className={styles.title}>Редактирование пользователя</p>
			<form onSubmit={handleSubmit(onSubmit)}>
				{userData && (
					<div>
						{Object.entries(userData).map(([key, value]) => (
							<div key={key}>
								{key === 'role' ? (
									<div className={styles.lookup}>
										<label htmlFor={key}>{key}</label>
										<select
											id={key}
											value={value}
											// onChange={e =>
											// 	setFormValue(key as keyof IUserData, e.target.value)
											// }
											{...register(key as keyof IUserData)}
										>
											<option value='USER'>USER</option>
											<option value='ADMIN'>ADMIN</option>
											<option value='CURATOR'>CURATOR</option>
										</select>
									</div>
								) : (
									<div className={styles.lookup}>
										<label htmlFor={key}>{key}</label>
										<input
											type='text'
											id={key}
											value={value}
											// onChange={e =>
											// 	setFormValue(key as keyof IUserData, e.target.value)
											// }
											{...register(key as keyof IUserData)}
										/>
									</div>
								)}
							</div>
						))}
					</div>
				)}
				<button className={styles.close} onClick={onRequestClose}>
					<SquareX />
				</button>
				<button className={styles.save} type='submit'>
					Сохранить
				</button>
			</form>
		</Modal>
	)
}

export default ModalUI
