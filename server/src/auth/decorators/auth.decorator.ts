import { applyDecorators, UseGuards } from '@nestjs/common'
import { Role } from '@prisma/client'
import { OnlyAdminGuard } from '../guards/admin.guard'
import { OnlyCuratorGuard } from '../guards/curator.guard'
import { JwtAuthGuard } from '../guards/jwt.guard'

export const Auth = (roles: Role[] = [Role.STUDENT]) => {
	const guards: any[] = []

	roles.forEach(role => {
		if (role === Role.ADMIN) guards.push(OnlyAdminGuard)
		else if (role === Role.CURATOR) guards.push(OnlyCuratorGuard)
		else if (role === Role.STUDENT)
			return applyDecorators(UseGuards(JwtAuthGuard))
	})
	return applyDecorators(UseGuards(JwtAuthGuard, ...guards))
}
