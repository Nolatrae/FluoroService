import { Injectable } from '@nestjs/common'
import { hash } from 'argon2'

import { PrismaService } from 'src/prisma.service'
import { AuthDto } from './dto/auth.dto'

@Injectable()
export class UserService {
	constructor(private prisma: PrismaService) {}

	async getUsers() {
		return this.prisma.user.findMany({
			select: {
				id: true,
				firstName: true,
				middleName: true,
				lastName: true,
				email: true,
				role: true,
				// fluorography: true,
				password: false,
			},
		})
	}

	async getById(id: string) {
		return this.prisma.user.findUnique({
			where: {
				id,
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
			role: dto.role,
		}

		return this.prisma.user.create({
			data: user,
		})
	}
}
