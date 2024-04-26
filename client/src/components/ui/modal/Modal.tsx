import { IUserData } from '@/types/types'
import { SquareX } from 'lucide-react'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import Modal from 'react-modal'
import { Field } from '../field/Field'
import styles from './Modal.module.scss'
import { useUpdateSettings } from './useUpdateSettings'

Modal.setAppElement('#viewport') // Указываем корневой элемент вашего приложения для модального окна

interface UserModalProps {
	isOpen: boolean
	onRequestClose: () => void
	userData: IUserData
}

const ModalUI: React.FC<UserModalProps> = ({
	isOpen,
	onRequestClose,
	userData,
}) => {
	const { register, handleSubmit, reset } = useForm<IUserData>({
		mode: 'onChange',
	})

	// useInitialData(userData, reset)

	console.log(userData)

	const { isPending, mutate } = useUpdateSettings()

	const onSubmit: SubmitHandler<IUserData> = data => {
		console.log(data)
		mutate(data)
	}

	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={onRequestClose}
			className={styles.cont}
		>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className={styles.header}>
					<p className={styles.title}>Редактирование пользователя</p>
				</div>
				<div className={styles.body}>
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
											<Field
												id={key}
												label={key}
												placeholder={key}
												type='text'
												{...register(key as keyof IUserData, {
													required: 'required',
												})}
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
				</div>
				<div className={styles.footer}>
					<button className={styles.save} type='submit'>
						Сохранить
					</button>
				</div>
			</form>
		</Modal>
	)
}

export default ModalUI
