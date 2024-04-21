import {
	Body,
	Controller,
	Get,
	HttpCode,
	Param,
	Patch,
	Put,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common'
import { Role } from '@prisma/client'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CurrentUser } from 'src/auth/decorators/user.decorator'
import { UserDto } from './dto/user.dto'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get('profile')
	@Auth()
	async profile(@CurrentUser('id') id: string) {
		return this.userService.getProfile(id)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Put('user/profile')
	@Auth()
	async updateProfile(@CurrentUser('id') id: string, @Body() dto: UserDto) {
		return this.userService.update(id, dto)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Patch('list/:id')
	@Auth('ADMIN')
	async changeRole(@Param('id') id: string, @Body('role') newRole: Role) {
		return this.userService.changeRole(id, newRole)
	}
}
