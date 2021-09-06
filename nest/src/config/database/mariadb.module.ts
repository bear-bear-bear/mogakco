import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

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
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: process.env.DATABASE_HOST as string,
      port: parseInt(process.env.DATABASE_PORT as string, 10),
      username: process.env.DATABASE_USER as string,
      password: process.env.DATABASE_PASSWORD as string,
      database: process.env.DATABASE_NAME as string,
      synchronize: isSync(),
      logging: isLogging(),
      migrationsTableName: 'migrations',
      migrations: ['migrations/*.ts'],
      cli: { migrationsDir: 'migration' },
      entities: [join(__dirname, '../../models/**/*.entity{.ts,.js}')],
    }),
  ],
})
export default class MariadbModule {}
