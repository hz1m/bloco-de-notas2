module.exports = {
  testEnvironment: 'node',
  coverageDirectory: 'coverage',
  testPathIgnorePatterns: ['/node_modules/', '/coverage/'],
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/**/dbConfig.js' ]
};
