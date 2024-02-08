import { NestFactory } from '@nestjs/core';
import { AppModule } from './api/app.module';
import * as process from 'process';

const port = process.env.PORT ?? 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(port, () =>
    console.log(`Server started on 127.0.0.1:${port}`),
  );
}
bootstrap();
