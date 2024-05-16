import { Injectable } from '@nestjs/common'
import { Role, User } from '@prisma/client'
import { hash } from 'argon2'
import { PrismaService } from 'src/prisma.service'
import { UserDto } from './dto/user.dto'

@Injectable()
export class UserService {
	constructor(private prisma: PrismaService) {}

	getById(id: string): Promise<User> {
		return this.prisma.user.findUnique({
			where: {
				id,
			},
			include: {
				fluorography: true,
			},
		})
	}

	getByEmail(email: string): Promise<User> {
		return this.prisma.user.findUnique({
			where: {
				email,
			},
		})
	}

	getAll(): Promise<User[]> {
		return this.prisma.user.findMany({
			include: {
				fluorography: true,
			},
		})
	}

	async getProfile(id: string) {
		const profile = await this.getById(id)

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { password, ...rest } = profile

		return {
			user: rest,
		}
	}

	async create(dto: UserDto) {
		const user = {
			email: dto.email,
			password: await hash(dto.password),
			firstName: dto.firstName,
			middleName: dto.middleName,
			lastName: dto.lastName,
			group: dto.group
		}

		return this.prisma.user.create({
			data: user,
		})
	}

	async update(id: string, dto: UserDto) {
		let data = dto

		if (dto.password) {
			data = { ...dto, password: await hash(dto.password) }
		}

		return this.prisma.user.update({
			where: {
				id,
			},
			data,
			select: {
				firstName: true,
				middleName: true,
				lastName: true,
				email: true,
			},
		})
	}

	async changeRole(id: string, newRole: Role) {
		const existingUser = await this.prisma.user.findUnique({
			where: { id: id },
		})

		if (!existingUser) {
			throw new Error('Пользователь не найден')
		}

		return this.prisma.user.update({
			where: {
				id,
			},
			data: {
				role: newRole,
			},
		})
	}
}
