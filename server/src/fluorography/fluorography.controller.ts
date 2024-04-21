import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	UploadedFile,
	UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CurrentUser } from 'src/auth/decorators/user.decorator'
import { FluorographyDto } from './dto/fluorography.dto'
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
		@Body() dto: FluorographyDto
	) {
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
}
