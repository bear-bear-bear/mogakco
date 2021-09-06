import { Config } from '@jest/types';
import { pathsToModuleNameMapper } from 'ts-jest/utils';

import { compilerOptions } from './tsconfig.json';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  moduleFileExtensions: ['ts', 'js', 'json'],
  rootDir: '.',
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
  transform: {
    '\\.ts$': 'ts-jest',
    '\\.js$': 'babel-jest',
  },
  testRegex: '.test.ts$',
};

export default config;
