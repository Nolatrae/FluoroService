import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import * as cookieParser from 'cookie-parser'
import { AppModule } from './app.module'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	app.setGlobalPrefix('api')
	app.use(cookieParser())
	app.enableCors({
		origin: ['http://localhost:3000'],
		credentials: true,
		exposedHeaders: 'set-cookie',
	})

	const options = new DocumentBuilder()
		.setTitle('Fluorography API')
		.setDescription('API for managing fluorography data')
		.setVersion('1.0')
		.addTag('fluorography')
		.build()
	const document = SwaggerModule.createDocument(app, options)
	SwaggerModule.setup('docs', app, document)

	await app.listen(4200)
}
bootstrap()
