import { IsOptional, IsString } from 'class-validator'

export class FluorographyDto {
	@IsString()
	filePath: string

	@IsString()
	@IsOptional()
	date: Date

	@IsOptional()
	@IsString()
	description: string
}
