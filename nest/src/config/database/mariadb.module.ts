import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

@Module({
  imports: [
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
      entities: [join(__dirname, '../models/entities/*.entity{.ts,.js}')],
    }),
  ],
})
export default class MariadbModule {}
