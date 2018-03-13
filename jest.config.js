module.exports = {
  testMatch: ['**/__tests__/**/*.js?(x)'],
  setupTestFrameworkScriptFile: './setupTest.js',
  coverageDirectory: '<rootDir>/coverage',
  coveragePathIgnorePatterns:
    [
      '<rootDir>/client/src/components/postRecipe/*.jsx ',
    ],
};

