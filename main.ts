import { NestFactory } from '@nestjs/core';
import AppModule from './modules/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  await app.listen(parseInt(process.env.SERVER_PORT as string, 10) || 8001);
}

bootstrap();
