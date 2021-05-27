"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    transformIgnorePatterns: ['<rootDir>/node_modules/'],
    moduleFileExtensions: ['ts', 'json', 'js', 'jsx'],
    rootDir: './',
    testEnvironment: 'node',
    collectCoverageFrom: ['**/*.(t|j)s'],
    transform: {
        '^.+\\.(t|j)s$': 'ts-jest',
        '^.+\\.svg$': '<rootDir>/libs/svgTransform.js',
    },
};
exports.default = config;
//# sourceMappingURL=jest.config.js.map