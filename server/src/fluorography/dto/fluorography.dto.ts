import { IsOptional, IsString } from 'class-validator'

export class FluorographyDto {
	@IsString()
	filePath: string

	@IsString()
	date: string

	@IsOptional()
	@IsString()
	description: string
}
