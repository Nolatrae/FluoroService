import { instance } from '@/api/axios'
import { IChangeRole, IUserData } from '@/types/types'

class AdminService {
	private BASE_URL = '/admin'

	async changeUserData(data: IUserData) {
		console.log(data)
		const response = instance.put(this.BASE_URL, data)
		return response
	}

	async changeRole(data: IChangeRole) {
		console.log(2)
		const response = instance.patch('/user/list', data)
		return response
	}
}

export const adminService = new AdminService()
