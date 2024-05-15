export enum UserRole {
	Student = 'STUDENT',
	Curator = 'CURATOR',
	Admin = 'ADMIN',
}

export interface ITokenInside {
	id: number
	role: UserRole
	iat: number
	exp: number
}

export type TProtectUserData = Omit<ITokenInside, 'iat' | 'exp'>
