class SendFluoroService {
	private BASE_URL = '/fluorography/send'

	async sendFluoro(
		data: any
		// : IFormSendFluoro
	) {
		const formData = new FormData()
		formData.append('file', data.file)
		formData.append('date', data.date)
		formData.append('desc', data.desc)

		return formData
	}
}

export const sendFluoroService = new SendFluoroService()
