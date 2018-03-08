module.exports = {
  testMatch: ['**/__tests__/**/*.js?(x)'],
  globals: {
    localStorage: {
      setItem: (() => {}),
      clearItem: (() => {}),
      getItem: (() => ({ user: 'user' })),
      removeItem: (() => {})
    },
    JSON: {
      parse: (payload => payload),
      stringify: (payload => payload)
    }
  }
};

