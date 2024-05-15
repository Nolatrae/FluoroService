import { Role } from '@prisma/client'
import { IsEmail, IsOptional, IsString } from 'class-validator'

export class ChangeUserDto {
	@IsString()
	@IsOptional()
	firstName?: string

	@IsString()
	@IsOptional()
	middleName?: string

	@IsString()
	@IsOptional()
	lastName?: string

	@IsString()
	@IsOptional()
	role?: Role

	@IsEmail()
	email: string

	@IsString()
	@IsOptional()
	group?: string
}
