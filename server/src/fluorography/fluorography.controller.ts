import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Patch,
	Post,
	UploadedFile,
	UseInterceptors,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { FluoroStatus } from '@prisma/client'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CurrentUser } from 'src/auth/decorators/user.decorator'
import { FluorographyService } from './fluorography.service'

@Controller('fluorography')
export class FluorographyController {
	constructor(private readonly fluorographyService: FluorographyService) {}

	@Post('send')
	@UseInterceptors(FileInterceptor('file'))
	// @UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth()
	async send(
		@CurrentUser('id') id: string,
		@UploadedFile() file: Express.Multer.File,
		@Body() dto
	) {
		console.log('============', id, dto)
		return this.fluorographyService.createUserFluorography(id, file, dto)
	}

	@Get()
	@Auth()
	async getById(id: string) {
		return this.fluorographyService.getById(id)
	}

	@HttpCode(200)
	@Delete(':id')
	async deleteById(@Param('id') id: string) {
		return this.fluorographyService.delete(id)
	}

	@HttpCode(200)
	@Patch()
	@Auth(['ADMIN'])
	@UsePipes(new ValidationPipe())
	async changeFluorographyStatus(
		@Body('id') id: string,
		@Body('status') status: FluoroStatus
	) {
		return this.fluorographyService.changeFluorographyStatus(id, status)
	}
}
