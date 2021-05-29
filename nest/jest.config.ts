import { Config } from '@jest/types';

const config: Config.InitialOptions = {
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  moduleFileExtensions: ['ts', 'json', 'js', 'jsx'],
  rootDir: './',
  testEnvironment: 'node',
  collectCoverageFrom: ['**/*.(t|j)s'],
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
    '^.+\\.svg$': '<rootDir>/lib/svgTransform.js',
  },
};

export default config;

// TODO!: 아래 옵션기반으로 설정 보완 필요
// "jest": {
//   "moduleFileExtensions": [
//     "js",
//     "json",
//     "ts"
//   ],
//     "rootDir": "./",
//     "testRegex": ".*\\.spec\\.ts$",
//     "transform": {
//     "^.+\\.(t|j)s$": "ts-jest"
//   },
//   "collectCoverageFrom": [
//     "**/*.(t|j)s"
//   ],
//     "coverageDirectory": "../coverage",
//     "testEnvironment": "node"
// }
//
