'use client'
import { EllipsisVertical } from 'lucide-react'
import { useState } from 'react'
import ModalUI from '../modal/Modal'

export default function Table({ data, adminMenu = false }: any) {
	if (!data || data.length === 0) {
		return <p>No data</p>
	}

	const columns = Object.keys(data[0])

	if (adminMenu) {
		columns.unshift('')
	}

	const [selectedItem, setSelectedItem] = useState(null) // Для хранения выбранного элемента
	const [modalIsOpen, setModalIsOpen] = useState(false) // Для управления открытием и закрытием модального окна

	const handleAdminAction = (item: any) => {
		setSelectedItem(item) // Устанавливаем выбранный элемент перед открытием модального окна
		setModalIsOpen(true) // Открываем модальное окно
	}

	const closeModal = () => {
		setModalIsOpen(false) // Закрываем модальное окно
	}

	return (
		<div className='overflow-x-auto'>
			<table className='w-full table-auto'>
				<thead>
					<tr>
						{columns.map((column, index) => (
							<th key={index} className='px-4 py-2'>
								{column}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{data.map((item: any, rowIndex: any) => (
						<tr key={rowIndex}>
							{columns.map((column, colIndex) => (
								<td key={colIndex} className='border px-4 py-2'>
									{adminMenu && colIndex === 0 ? (
										<button onClick={() => handleAdminAction(item)}>
											<EllipsisVertical />
										</button>
									) : (
										item[column]
									)}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
			<ModalUI
				isOpen={modalIsOpen}
				onRequestClose={closeModal}
				userData={selectedItem ? selectedItem : { id: 'not stated' }}
			/>
			{/* Передаем информацию о пользователе в компонент модального окна */}
		</div>
	)
}
