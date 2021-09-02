import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import Joi from 'joi';
import ChatModule from './chat.module';
import AuthModule from './auth.module';
import MailModule from './mail.module';
import MariadbModule from '../config/database/mariadb.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('development', 'test', 'production').required(),
        DATABASE_NAME: Joi.string().required(),
        DATABASE_USER: Joi.string().required(),
        DATABASE_PASSWORD: Joi.string().required(),
        DATABASE_HOST: Joi.string().required(),
        DATABASE_PORT: Joi.number().required(),
        SERVER_PORT: Joi.number().required(),
        EMAIL_ADMIN: Joi.string().required(),
        EMAIL_PASSWORD: Joi.string().required(),
        EMAIL_SERVICE_NAME: Joi.string().required(),
        EMAIL_HOST: Joi.string().required(),
        EMAIL_SERVICE_PORT: Joi.string().required(),
        JWT_ACCESS_TOKEN_SECRET: Joi.string().required(),
        JWT_ACCESS_TOKEN_EXPIRATION_TIME: Joi.number().required(),
        JWT_REFRESH_TOKEN_SECRET: Joi.string().required(),
        JWT_REFRESH_TOKEN_EXPIRATION_TIME: Joi.number().required(),
        FRONTEND_PORT: Joi.number().required(),
        TYPEORM_LOGGING: Joi.boolean().required(),
      }),
    }),
    MariadbModule,
    AuthModule,
    MailModule,
    ChatModule,
  ],
  controllers: [],
  providers: [],
})
export default class AppModule {}
