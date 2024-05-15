import { instance } from '@/api/axios'
import { IChangeRole, IUserData } from '@/types/types'
import { FluoroStatus } from './fluoro.types'

class AdminService {
	private BASE_URL = '/admin'

	async changeUserData(data: IUserData) {
		const response = instance.patch(this.BASE_URL + '/list', data)
		return response
	}

	async changeRole(data: IChangeRole) {
		const response = instance.patch('/user/list', data)
		return response
	}

	async otherProfile(id: string) {
		const response = instance.post(`/auth/other-profile`, id)
		return response
	}

	async changeFluoroStatus(id: string, status: FluoroStatus) {
		const data = { id, status }
		const response = instance.patch('/fluorography', data)
		return response
	}

	async getCountUsersWithFluoro() {
		return instance.get<number>('/auth/count-users-with-fluoro')
	}
}

export const adminService = new AdminService()
