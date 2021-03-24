import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import AppController from '../controllers/app.controller';
import AppService from '../services/app.service';
import dbConfig from '../config/dbConfig';
import UserModule from './user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(dbConfig),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export default class AppModule {}
