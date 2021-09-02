import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import Joi from 'joi';
import { join } from 'path';
import ChatModule from '@modules/chat.module';
import MailModule from '@modules/mail.module';
import AuthModule from './authentication/auth.module';

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
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: process.env.DATABASE_HOST as string,
      port: parseInt(process.env.DATABASE_PORT as string, 10),
      username: process.env.DATABASE_USER as string,
      password: process.env.DATABASE_PASSWORD as string,
      database: process.env.DATABASE_NAME as string,
      synchronize: process.env.NODE_ENV === 'development',
      logging: Boolean(process.env.TYPEORM_LOGGING),
      migrationsTableName: 'migrations',
      migrations: ['migrations/*.ts'],
      cli: { migrationsDir: 'migration' },
      entities: [join(__dirname, './models/entities/*.entity{.ts,.js}')],
    }),
    AuthModule,
    MailModule,
    ChatModule,
  ],
  controllers: [],
  providers: [],
})
export default class AppModule {}
