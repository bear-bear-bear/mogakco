module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: ['airbnb-typescript/base', 'plugin:prettier/recommended'],
  env: {
    node: true,
  },
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    'class-methods-use-this': 'off',
    'no-useless-constructor': 'off',
    'import/no-unresolved': 'off',
    'no-console': 'warn',
    'no-shadow': 'warn',
    '@typescript-eslint/no-shadow': 'warn',
    'no-unused-vars': 'error',
    'max-classes-per-file': ['off'],
    'import/no-cycle': 'off',
    'no-param-reassign': 'warn',
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
  },
  ignorePatterns: ['dist', 'node_modules'],
};
