const antfu = require('@antfu/eslint-config').default

module.exports = antfu(
  {},
  {
    rules: {
      '@typescript-eslint/consistent-type-imports': 'off',
      'ts/consistent-type-imports': 'off',
      'node/prefer-global/process': ['error', 'always'],
      'node/no-path-concat': 'off',
    },
  },
)
