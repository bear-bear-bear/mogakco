import { Config } from '@jest/types';

const config: Config.InitialOptions = {
  rootDir: './',
  moduleFileExtensions: ['js', 'json', 'ts'],
  testEnvironment: 'node',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  testRegex: '.e2e-spec.ts$',
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  moduleNameMapper: {
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
