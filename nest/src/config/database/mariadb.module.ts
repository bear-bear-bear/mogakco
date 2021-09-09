import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';

function isLogging(): boolean {
  const mode = process.env.NODE_ENV;
  return mode === 'development';
}

function isSync(): boolean {
  const mode = process.env.NODE_ENV;
  return mode === ('development' || 'test');
}

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
        synchronize: isSync(),
        logging: isLogging(),
        migrationsTableName: 'migrations',
        migrations: ['migrations/*.ts'],
        cli: { migrationsDir: 'migration' },
        entities: [join(__dirname, '../../models/**/*.entity{.ts,.js}')],
      }),
    }),
  ],
})
export default class MariadbModule {}
