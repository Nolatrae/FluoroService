import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './auth/auth.module'
import { FluorographyModule } from './fluorography/fluorography.module'
import { UserModule } from './user/user.module'

@Module({
	imports: [ConfigModule.forRoot(), AuthModule, UserModule, FluorographyModule],
})
export class AppModule {}
