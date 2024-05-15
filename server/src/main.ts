import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { useContainer } from 'class-validator'
import * as cookieParser from 'cookie-parser'
import * as express from 'express'
import * as path from 'path'
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

	useContainer(app.select(AppModule), { fallbackOnErrors: true })

	app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')))

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
