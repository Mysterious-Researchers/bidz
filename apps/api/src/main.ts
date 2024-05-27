import { NestFactory } from '@nestjs/core';
import { AppModule } from './api/app.module';
import * as process from 'process';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join, resolve } from 'path';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const port = process.env.PORT ?? 3000;

async function bootstrap () {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  app.useStaticAssets(join(resolve(), '/static/'));
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Bidz API')
    .setDescription('Swagger documentation for the Bidz API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(port, () => {
    console.log(`Server started on 127.0.0.1:${port}`);
  });
}

bootstrap();
