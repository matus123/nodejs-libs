module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['@typescript-eslint', 'react'],
  settings: {
    "react": {
      "version": "detect"
    },
  },
  rules: {
    "indent": "off",
    "no-unused-vars": "off",
    "quotes": ["error", "single", { "allowTemplateLiterals": true }],
    "@typescript-eslint/explicit-function-return-type": [0, {
      "allowExpressions": true,
      "allowTypedFunctionExpressions": true
    }],
    "@typescript-eslint/no-empty-interface": "off",
    "@typescript-eslint/array-type": ["error", {
      "default": "array-simple"
    }],
    "@typescript-eslint/no-parameter-properties": "off",
    // "@typescript-eslint/no-object-literal-type-assertion": ["error", {
    //   "allowAsParameter": true
    // }],
    "@typescript-eslint/no-unused-vars": ["warn", {
      "vars": "all",
      "args": "after-used",
      "ignoreRestSiblings": false,
      "argsIgnorePattern": "^_"
    }]
  },
};
