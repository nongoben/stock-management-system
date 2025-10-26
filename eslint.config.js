import js from "@eslint/js";
import reactRecommended from "eslint-plugin-react/configs/recommended.js";
import reactJsxRuntime from "eslint-plugin-react/configs/jsx-runtime.js";
import globals from "globals";
import hooksPlugin from "eslint-plugin-react-hooks";
import sonarjs from "eslint-plugin-sonarjs";

export default [
  js.configs.recommended,
  sonarjs.configs.recommended,
  reactRecommended,
  reactJsxRuntime,
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ...reactRecommended.languageOptions,
      globals: {
        ...globals.browser,
      },

      ecmaVersion: "latest",
      sourceType: "module",

      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      react: {
        version: "18.3",
      },
    },
    plugins: {
      "react-hooks": hooksPlugin,
      "sonar-js": sonarjs,
    },
    rules: {
      ...hooksPlugin.configs.recommended.rules,
      camelcase: "off",
      eqeqeq: "error",
      "react-hooks/rules-of-hooks": "off",
      "max-params": [
        "error",
        {
          max: 7,
        },
      ],

      "react/jsx-uses-react": "error",
      "react/jsx-uses-vars": "error",

      "react/jsx-sort-props": [
        2,
        {
          callbacksLast: false,
          ignoreCase: true,
          noSortAlphabetically: true,
        },
      ],
      "no-inline-comments": "error",
      "no-duplicate-imports": "error",
      "no-console": "error",
      "no-const-assign": "error",
      "no-unreachable": "error",
      "no-self-compare": "error",
      "no-self-assign": "error",
      "no-cond-assign": "error",
      "no-use-before-define": "error",
      "prefer-const": "error",
      "require-await": "error",
      "no-useless-return": "error",
      "no-debugger": "error",
      "max-len": "off",
      "no-unused-vars": "error",
      "react/require-default-props": "off",
      "react-refresh/only-export-components": "off",
      "linebreak-style": "off",
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react/jsx-props-no-spreading": "off",
      "react/jsx-no-useless-fragment": ["error", { allowExpressions: true }],
      "react-hooks/exhaustive-deps": "off",
      "import/prefer-default-export": "off",
      "import/no-unresolved": "off",
      "no-param-reassign": "off",
      "guard-for-in": "off",
      "no-restricted-syntax": "off",
      "global-require": "off",
      "capitalized-comments": [
        "error",
        "always",
        { ignoreConsecutiveComments: true },
      ],
    },
  },
];
