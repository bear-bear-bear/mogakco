import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import AppModule from '@src/app.module';
import { setSwaggerModule, showListeningLog } from '@common/helpers/app.helper';

async function bootstrap() {
  const log = new Logger();
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  app.use(helmet());
  const mode = process.env.NODE_ENV as string;
  if (mode === 'development') {
    setSwaggerModule(app);
    app.enableCors({
      origin: true,
      credentials: true,
    });
  } else {
    app.enableCors({
      origin: 'galaxyhi4276.co',
      credentials: true,
    });
  }

  app.use(morgan('tiny'));
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const port = parseInt(process.env.SERVER_PORT as string, 10) || 8001;
  await app.listen(port);
  showListeningLog(port, log);
}

bootstrap();
