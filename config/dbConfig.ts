type dbType = {
  type: 'mysql';
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  entities?: any[];
  synchronize?: boolean;
  autoLoadEntities?: boolean;
};

const dbConfig: dbType = {
  type: 'mysql',
  host: (process.env.DATABASE_HOST as string) || '데이터베이스_호스트',
  port: parseInt(process.env.DATABASE_PORT as string, 10) || 3306,
  username: (process.env.DATABASE_USER as string) || '데이터베이스 유저',
  password:
    (process.env.DATABASE_PASSWORD as string) || '데이터베이스 비밀번호',
  database: (process.env.DATABASE_NAME as string) || '데이터베이스 이름',
  synchronize: process.env.NODE_ENV === 'development' || true,
  autoLoadEntities: true,
};

export default dbConfig;
