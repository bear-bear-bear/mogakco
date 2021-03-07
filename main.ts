import { NestFactory } from '@nestjs/core';
import { AppModule } from "./modules/app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(parseInt(process.env.SERVER_PORT as string));
}

bootstrap();
