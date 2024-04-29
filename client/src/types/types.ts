import { UserRole } from '@/services/auth.types'

export interface IUser {
	id: string
	email: string
	firstName: string
	middleName: string
	lastName: string
	fluorography: string[]
	role: UserRole
}

export interface IFormSendFluoro {
	file: any
	date: Date
	desc: string
}

export interface IFormData extends Pick<IUser, 'email'> {
	password: string
}

export interface IPopupData {
	id?: string
	email?: string
	firstName?: string
	middleName?: string
	lastName?: string
	role?: UserRole
}

export interface IUserData {
	id: string
	email: string
	firstName: string
	middleName: string
	lastName: string
	role?: UserRole
}
