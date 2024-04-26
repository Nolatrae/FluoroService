import { BadRequestException, Injectable } from '@nestjs/common'
import * as fs from 'fs'
import * as path from 'path'
import { PrismaService } from 'src/prisma.service'
import { FluorographyDto } from './dto/fluorography.dto'

@Injectable()
export class FluorographyService {
	constructor(private prisma: PrismaService) {}

	async createUserFluorography(
		userId: string,
		file: Express.Multer.File,
		dto: FluorographyDto
	) {
		if (!file.mimetype.startsWith('image')) {
			// console.log(file.size)
			throw new BadRequestException('Only images are allowed')
		}
		// console.log(file)

		const filename = `${userId}_${new Date().getTime()}${path.extname(file.originalname)}`

		const uploadsDirectory = './uploads'
		const filePath = path.join(uploadsDirectory, filename)

		await fs.promises.writeFile(filePath, file.buffer)

		return this.prisma.fluorography.create({
			data: {
				date: new Date(dto.date),
				fileUrl: filename, // Сохраняем имя файла в базе данных
				user: {
					connect: {
						id: userId,
					},
				},
			},
		})
	}

	async getById(userId: string) {
		return this.prisma.fluorography.findMany({
			where: {
				userId: userId,
			},
		})
	}

	async getAll() {
		return this.prisma.fluorography.findMany()
	}

	async delete(fluorographyId: string) {
		// Получаем информацию о флюорографии
		const fluorography = await this.prisma.fluorography.findUnique({
			where: {
				id: fluorographyId,
			},
		})

		if (!fluorography) {
			throw new Error('Fluorography not found')
		}

		// Удаляем файл из папки uploads
		const filePath = path.join('./uploads', fluorography.fileUrl)
		fs.unlinkSync(filePath)

		// Удаляем запись о флюорографии из базы данных
		return this.prisma.fluorography.delete({
			where: {
				id: fluorographyId,
			},
		})
	}
}
