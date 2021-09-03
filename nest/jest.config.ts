import { Config } from '@jest/types';

const config: Config.InitialOptions = {
  rootDir: './',
  moduleDirectories: ['node_modules'],
  moduleFileExtensions: ['js', 'json', 'ts'],
  testRegex: '.test.ts$',
  testEnvironment: 'node',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  moduleNameMapper: {
    '^@src/(.*)$': '<rootDir>/src/$1',
    '^@common/(.*)$': '<rootDir>/src/common/$1',
    '^@authentication/(.*)$': '<rootDir>/src/authentication/$1',
    '^@controllers/(.*)$': '<rootDir>/src/controllers/$1',
    '^@lib/(.*)$': '<rootDir>/src/lib/$1',
    '^@models/(.*)$': '<rootDir>/src/models/$1',
    '^@modules/(.*)$': '<rootDir>/src/modules/$1',
    '^@services/(.*)$': '<rootDir>/src/services/$1',
    '^@test/(.*)$': '<rootDir>/test/$1',
    '^@guard/(.*)$': '<rootDir>/src/guard/$1',
    '^@typing/(.*)$': '<rootDir>/typing/$1',
  },
};

export default config;
