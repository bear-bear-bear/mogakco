import { Config } from "@jest/types";

const config: Config.InitialOptions = {
  moduleFileExtensions: ['ts', 'json', 'js'],
  rootDir: './',
  testEnvironment: 'node',
  collectCoverageFrom: ['**/*.(t|j)s'],
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
