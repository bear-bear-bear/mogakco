import { Config } from '@jest/types';

const config: Config.InitialOptions = {
  rootDir: './',
  moduleFileExtensions: ['ts', 'js', 'json'],
  testEnvironment: 'node',
  testRegex: '.test.ts$',
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  moduleNameMapper: {
    '^@controllers/(./*)$': '<rootDir>/controllers/$1',
    '^@lib/(./*)$': '<rootDir>/lib$1',
    '^@models/(./*)$': '<rootDir>/models$1',
    '^@modules/(./*)$': '<rootDir>/modules$1',
    '^@services/(./*)$': '<rootDir>/services$1',
    '^@test/(./*)$': '<rootDir>/test$1',
  },
};

export default config;
