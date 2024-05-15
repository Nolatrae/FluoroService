export function exportToText() {
	// Получение всех строк таблицы
	const rows = document.querySelectorAll('tr')

	// Получение заголовков столбцов
	const headersRow = rows[0]
	const headers = Array.from(headersRow.querySelectorAll('th')).map(header =>
		header.textContent.trim()
	)

	// Подготовка данных
	let data = [headers.join('\t')]
	for (let i = 1; i < rows.length; i++) {
		const cells = rows[i].querySelectorAll('td')
		const rowData = Array.from(cells).map(cell => {
			const cellText = cell.textContent.trim()
			// Пометка пустых ячеек *
			return cellText === '' ? '*' : cellText
		})
		data.push(rowData.join('\t'))
	}

	// Преобразование данных в текстовый формат
	const textData = data.join('\n')

	// Создание текстового файла
	const blob = new Blob([textData], { type: 'text/plain' })
	const url = URL.createObjectURL(blob)

	// Создание ссылки для скачивания файла
	const link = document.createElement('a')
	link.href = url
	link.download = 'table_data.txt'
	document.body.appendChild(link)
	link.click()

	// Очистка ссылки и объекта URL
	document.body.removeChild(link)
	URL.revokeObjectURL(url)
}
