import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import UserRepository from '@models/user/repositories/user.repository';
import UserJobRepository from '@models/user/repositories/ user-job.reposity';
import UserFieldRepository from '@models/user/repositories/user-field.repository';
import RoomRepository from '@models/chat/repositories/room.repository';
import RoomUserRepository from '@models/chat/repositories/room-user.repository';
import ChatRepository from '@models/chat/repositories/chat.repository';
import UserVerifyRepository from '@models/user/repositories/user-verify.repository';
import AnonymousRoomUserRepository from '@models/chat/repositories/anonymous-room-user.repository';
import ChatFileRepository from '@models/chat/repositories/chat-file.repository';
import UserRolesRepository from '@src/models/user/repositories/user-roles.repository';
import RolesRepository from '@models/user/repositories/roles.repository';

function isLogging(): boolean {
  const mode = process.env.NODE_ENV;
  return mode === 'development';
}

function isSync(): boolean {
  const mode = process.env.NODE_ENV;
  return mode === ('development' || 'test');
}

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mariadb',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USER'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        synchronize: false,
        logging: isLogging(),
        migrationsTableName: 'migrations',
        migrations: ['migrations/*.ts'],
        cli: { migrationsDir: 'migration' },
        entities: [join(__dirname, '../../models/**/*.entity{.ts,.js}')],
      }),
    }),
    TypeOrmModule.forFeature([
      UserRepository,
      UserJobRepository,
      UserFieldRepository,
      UserVerifyRepository,
      RoomRepository,
      RoomUserRepository,
      ChatRepository,
      AnonymousRoomUserRepository,
      ChatFileRepository,
      UserRolesRepository,
      RolesRepository,
    ]),
  ],
  exports: [TypeOrmModule],
})
export default class MariadbModule {}
