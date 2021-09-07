import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication, Logger } from '@nestjs/common';

export function setSwaggerModule(app: INestApplication): void {
  const swaggerConfig = new DocumentBuilder()
    .setTitle('모각코 APIs')
    .setDescription('모각코 Api 문서 리스트입니다.')
    .setVersion('1.0')
    .addBearerAuth({ description: 'accessToken 키', type: 'http' })
    .addCookieAuth('refreshToken', { description: 'refreshToken 쿠키', type: 'http' })
    .addTag('인증 API', '회원가입, 로그인 등 인증에 관련된 APIs')
    .addTag('유저 API', '유저와 관련된 APIs')
    .addTag('채팅 API', '채팅과 관련된 APIs')
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/', app, swaggerDocument);
}

export function showListeningLog(port: number, logger: Logger) {
  const mode = process.env.NODE_ENV;
  if (mode === ('development' || 'test')) {
    logger.log(`http://localhost:${port} listening...`);
  }
  // TODO: Need Production Domain
}
