import { BadRequestException, Injectable } from '@nestjs/common'
import { FluoroStatus } from '@prisma/client'
import * as fs from 'fs'
import * as fsPromises from 'fs/promises'
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
		// Путь к директории для загрузки файлов
		const uploadsDirectory = './uploads'

		// Создаем имя нового файла, используя userId и текущее время
		const newFilename = `${userId}_${Date.now()}${path.extname(file.originalname)}`
		const newFilePath = path.join(uploadsDirectory, newFilename)

		// Проверяем, существует ли у пользователя старая картинка
		const oldFluorography = await this.prisma.fluorography.findFirst({
			where: {
				userId,
			},
		})

		// Если у пользователя есть старая картинка, удаляем её
		if (oldFluorography && oldFluorography.filePath)
			await this.delete(oldFluorography.id)

		// Записываем новую картинку на диск
		await fsPromises.writeFile(newFilePath, file.buffer)

		// Предположим, что dto.date содержит строку с датой
		let currentDate = new Date(dto.date)

		// Увеличиваем месяц на полгода
		currentDate.setMonth(currentDate.getMonth() + 6)

		// Преобразуем полученную дату в формат ISO-8601 DateTime
		const isoDate = currentDate.toISOString()

		return this.prisma.fluorography.create({
			data: {
				date: isoDate, // Преобразуем дату в формат ISO-8601 DateTime
				filePath: newFilename,
				description: dto.description,
				status: FluoroStatus.PENDING,
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
		const filePath = path.join('./uploads', fluorography.filePath)
		fs.unlinkSync(filePath)

		// Удаляем запись о флюорографии из базы данных
		return this.prisma.fluorography.delete({
			where: {
				id: fluorographyId,
			},
		})
	}

	async changeFluorographyStatus(userId: string, status: string) {
		const validStatuses = ['PENDING', 'ACCEPTED', 'REJECTED']

		if (!validStatuses.includes(status))
			throw new BadRequestException('Invalid status')

		const fluorography = await this.prisma.fluorography.findFirst({
			where: {
				userId: userId,
			},
		})

		if (!fluorography) throw new Error('Fluorography not found')

		return this.prisma.fluorography.update({
			where: {
				id: fluorography.id,
			},
			data: {
				status: status as FluoroStatus,
			},
		})
	}
}
