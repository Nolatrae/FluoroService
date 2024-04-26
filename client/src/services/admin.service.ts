import { instance } from '@/api/axios'
import { IUserData } from '@/types/types'

class AdminService {
	private BASE_URL = '/admin'

	async changeUserData(data: IUserData) {
		console.log(data)
		const response = instance.put(this.BASE_URL, data)
		return response
	}
}

export const adminService = new AdminService()
