import { IsString } from 'class-validator'

export class FluorographyDto {
	@IsString()
	fileUrl: string

	@IsString()
	date: string
}
