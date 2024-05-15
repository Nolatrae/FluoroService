import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { ChangeUserDto } from './dto/admin.dto'

@Injectable()
export class AdminService {
	constructor(private prisma: PrismaService) {}

	async updateOtherUser(dto: ChangeUserDto) {
		const data = dto
		return this.prisma.user.update({
			where: {
				email: dto.email,
			},
			data,
		})
	}
}
