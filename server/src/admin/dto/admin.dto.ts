import { Role } from '@prisma/client'
import { IsEmail, IsOptional, IsString } from 'class-validator'

export class ChangeUserDto {
	@IsString()
	id: string

	@IsString()
	firstName: string

	@IsString()
	@IsOptional()
	middleName: string

	@IsString()
	lastName: string

	@IsString()
	role: Role

	@IsEmail()
	email: string
}
