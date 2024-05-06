import { IsNumber, IsOptional, IsString, MinLength } from 'class-validator'

export class UserDto {
	@IsString()
	email: string

	@IsString()
	firstName: string

	@IsString()
	@IsOptional()
	middleName: string

	@IsString()
	lastName: string

	@MinLength(6, {
		message: 'Password must be at least 6 characters long',
	})
	@IsString()
	password: string

	@IsNumber()
	@IsOptional()
	group: number
}
