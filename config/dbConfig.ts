type dbType = {
  type: 'mysql';
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  entities?: any[];
  synchronize?: boolean;
};

const dbConfig: dbType = {
  type: 'mysql',
  host: process.env.DATABASE_HOST as string,
  port: parseInt(process.env.DATABASE_PORT as string, 10),
  username: process.env.DATABASE_USER as string,
  password: process.env.DATABASE_PASSWORD as string,
  database: process.env.DATABASE_NAME as string,
  synchronize: process.env.NODE_ENV === 'development',
};

export default dbConfig;
