module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.spec.ts',
    '!src/main.ts',
    '!src/**/*.module.ts',
    '!src/**/*.dto.ts',
    '!src/**/interfaces/**',
    '!src/**/constants/**',
  ],
  coverageDirectory: './coverage',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
  },
  // coverageReporters: ['text', 'lcov', 'html'],
  // collectCoverage: true,
  // coverageThreshold: {
  //   global: {
  //     statements: 60,
  //     branches: 60,
  //     functions: 60,
  //     lines: 60,
  //   },
  // },
};
