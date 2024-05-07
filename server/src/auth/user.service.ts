import { Injectable } from '@nestjs/common'
import { hash } from 'argon2'

import { PrismaService } from 'src/prisma.service'
import { AuthDto } from './dto/auth.dto'

@Injectable()
export class UserService {
	constructor(private prisma: PrismaService) {}

	async getUsers(withFluorography: boolean = true) {
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

		if (withFluorography) {
			select['Fluorography'] = true
		} else {
			select['Fluorography'] = false
		}

		return this.prisma.user.findMany({
			select,
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
			// role: Role.STUDENT,
			group: dto.group,
		}

		return this.prisma.user.create({
			data: user,
		})
	}
}
