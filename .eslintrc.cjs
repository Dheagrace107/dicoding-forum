module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true,
    cypress: true,
  },

  extends: ['airbnb', 'airbnb/hooks', 'plugin:prettier/recommended'],

  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },

  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx'],
      },
    },
    'import/core-modules': [
      'vitest',
      'vitest/config',
      '@testing-library/jest-dom',
      '@vitejs/plugin-react',
    ],
  },

  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': ['warn', { extensions: ['.jsx'] }],
    'linebreak-style': 'off',
    'react/forbid-prop-types': 'off',
    'react/jsx-no-bind': 'off',
    'no-alert': 'off',
    'no-underscore-dangle': 'off',
    'import/prefer-default-export': 'off',

    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          'vite.config.js',
          'vitest.config.js',
          '**/*.test.js',
          '**/*.spec.js',
          'src/tests/**',
        ],
      },
    ],

    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
      },
    ],

    'no-param-reassign': [
      'error',
      {
        props: true,
        ignorePropertyModificationsFor: ['state', 'draft'],
      },
    ],

    'jsx-a11y/label-has-associated-control': 'off',
  },
};
