import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { FluorographyDto } from './dto/fluorography.dto'

@Injectable()
export class FluorographyService {
	constructor(private prisma: PrismaService) {}

	async createUserFluorography(dto: FluorographyDto, userId: string) {
		return this.prisma.fluorography.create({
			data: {
				...dto,
				user: {
					connect: {
						id: userId,
					},
				},
			},
		})
	}

	async getAll(userId: string) {
		return this.prisma.fluorography.findMany({
			where: {
				userId: userId,
			},
		})
	}
}
