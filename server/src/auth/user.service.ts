import { Injectable } from '@nestjs/common'
import { hash } from 'argon2'

import { PrismaService } from 'src/prisma.service'
import { AuthDto } from './dto/auth.dto'

@Injectable()
export class UserService {
	constructor(private prisma: PrismaService) {}

	async getUsers() {
		const select = {
			id: true,
			firstName: true,
			middleName: true,
			lastName: true,
			email: true,
			role: true,
			group: true,
			password: false,
		}

		return this.prisma.user.findMany({
			select,
		})
	}

	async getUsersWithFluoro() {
		return this.prisma.user.findMany({
			where: {
				NOT: {
					fluorography: null,
				},
			},
			select: {
				id: true,
				firstName: true,
				middleName: true,
				lastName: true,
				group: true,
				fluorography: {
					select: {
						id: true,
						date: true,
						filePath: true,
						description: true,
						status: true,
					},
				},
			},
		})
	}

	async getCountUsersWithFluoro(): Promise<number> {
		const pendingFluorographies = await this.prisma.fluorography.findMany({
			where: {
				status: 'PENDING',
			},
			select: {
				userId: true,
			},
		})

		const uniqueUserIds = new Set(pendingFluorographies.map(fl => fl.userId))
		return uniqueUserIds.size
	}

	async getById(id: string) {
		return this.prisma.user.findUnique({
			where: {
				id,
			},
			include: {
				fluorography: true,
			},
		})
	}

	async getByEmail(email: string) {
		return this.prisma.user.findUnique({
			where: {
				email,
			},
		})
	}

	async create(dto: AuthDto) {
		const user = {
			email: dto.email,
			password: await hash(dto.password),
			firstName: dto.firstName,
			middleName: dto.middleName,
			lastName: dto.lastName,
			// role: Role.STUDENT,
			group: dto.group,
		}

		return this.prisma.user.create({
			data: user,
		})
	}
}
