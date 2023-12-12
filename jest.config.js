const SRC_PATH = '<rootDir>'
module.exports = {
  transform: { '^.+\\.ts?$': 'ts-jest' },
  testEnvironment: 'node',
  testRegex: './tests/.*\\.(test|spec)?\\.(ts|ts)$',
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'jsx',
    'json',
    'node',
  ],
  roots: [
    '<rootDir>/src/tests',
    SRC_PATH,
  ],
}

