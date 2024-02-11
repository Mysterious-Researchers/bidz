import { NestFactory } from '@nestjs/core';
import { AppModule } from './api/app.module';
import * as process from 'process';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
const port = process.env.PORT ?? 3000;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  // app.useStaticAssets(join(__dirname, '/static/'));
  app.useStaticAssets(
    join(__dirname, '..', 'dist', 'config', 'static', 'photos'),
    {
      prefix: '/photos/',
    },
  );
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port, () =>
    console.log(`Server started on 127.0.0.1:${port}`),
  );
}
bootstrap();
