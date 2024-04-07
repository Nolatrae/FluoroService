import { IsDate, IsString } from 'class-validator'

export class FluorographyDto {
	// @IsString()
	// @IsOptional()
	// id: string

	@IsString()
	fileUrl: string

	@IsDate()
	date: Date

	// @IsOptional()
	// userId: string
}
