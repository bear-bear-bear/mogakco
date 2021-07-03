import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import AppModule from './modules/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.use(helmet());
  app.enableCors({
    origin: true,
    credentials: true,
  });
  app.use(morgan('tiny'));
  app.use(cookieParser());
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  await app.listen(parseInt(process.env.SERVER_PORT as string, 10) || 8001);
}

bootstrap();
