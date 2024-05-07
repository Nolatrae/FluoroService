import {
	Body,
	Controller,
	Get,
	HttpCode,
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
	@Put('profile')
	@Auth()
	async updateProfile(@CurrentUser('id') id: string, @Body() dto: UserDto) {
		return this.userService.update(id, dto)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Patch('list')
	@Auth(['ADMIN'])
	async changeRole(@Body('id') id: string, @Body('role') newRole: Role) {
		return this.userService.changeRole(id, newRole)
	}
}
