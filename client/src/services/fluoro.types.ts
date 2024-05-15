export enum UserRole {
	User = '',
	Admin = 'ADMIN',
}

export enum FluoroStatus {
	Pending = 'PENDING',
	Accepted = 'ACCEPTED',
	Rejected = 'REJECTED',
}

export interface IChangeFluoroStatus {
	id: string
	status: FluoroStatus
}
