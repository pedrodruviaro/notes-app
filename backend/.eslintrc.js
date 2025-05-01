export default {
  globals: {
    NodeJS: true,
  },
  env: {
    node: true,
    es2022: true,
    browser: true,
    es6: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:node/recommended",
    "prettier", // Se usar prettier
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "no-console": "off",
    "node/no-unsupported-features/es-syntax": "off", // permite import/export
    "node/no-missing-import": "off", // ignora falsos positivos com ESModules
  },
};
