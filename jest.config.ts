import { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  setupFiles: ['<rootDir>/.jest/setup.ts'],
};

export default config;
