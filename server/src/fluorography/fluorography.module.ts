import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { FluorographyController } from './fluorography.controller'
import { FluorographyService } from './fluorography.service'

@Module({
	controllers: [FluorographyController],
	providers: [FluorographyService, PrismaService],
	exports: [FluorographyService],
})
export class FluorographyModule {}
