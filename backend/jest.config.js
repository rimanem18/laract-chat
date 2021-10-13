module.exports = {
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'js', 'tsx', 'jsx'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  setupFiles: [
    "./setupTests.ts"
  ],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
}
