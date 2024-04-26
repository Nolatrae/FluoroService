import { instance } from '@/api/axios'
import { IFormSendFluoro } from '@/types/types'

class SendFluoroService {
	private BASE_URL = '/fluorography/send'

	async sendFluoro(data: IFormSendFluoro) {
		console.log(data)
		const response = instance.post(this.BASE_URL, data)
		return response
	}
}

export const sendFluoroService = new SendFluoroService()
