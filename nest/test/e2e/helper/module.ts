import { Test } from '@nestjs/testing';
import AppModule from '@modules/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';

/**
 * @isValid Validation 사용
 * @isCookieAble CookieParser 사용
 */
interface Options {
  isValid?: boolean;
  isCookieAble: boolean;
}

export default async function getTestAppModule(opts?: Options): Promise<INestApplication> {
  const moduleRef = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();
  const app: INestApplication = moduleRef.createNestApplication();
  app.setGlobalPrefix('api');
  if (opts?.isValid) {
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
  }
  if (opts?.isCookieAble) {
    app.use(cookieParser());
  }
  await app.init();
  return app;
}
