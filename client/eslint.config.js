// eslint.config.js
import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

import importPlugin from "eslint-plugin-import";
import boundaries from "eslint-plugin-boundaries";
import unusedImports from "eslint-plugin-unused-imports";

export default tseslint.config(
  { ignores: ["dist", "build", "coverage", "node_modules"] },

  // Main rules for src/*
  {
    files: ["src/**/*.{ts,tsx}"],
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    languageOptions: { ecmaVersion: 2020, globals: globals.browser },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      import: importPlugin,
      boundaries,
      "unused-imports": unusedImports,
    },
    settings: {
      "import/resolver": {
        typescript: { project: ["./tsconfig.json"], alwaysTryTypes: true },
      },
      // Map filesystem paths and per-layer aliases (no "@/...")
      "boundaries/elements": [
        // filesystem
        { type: "app", pattern: "src/app/**" },
        { type: "processes", pattern: "src/processes/**" },
        { type: "pages", pattern: "src/pages/**" },
        { type: "widgets", pattern: "src/widgets/**" },
        { type: "features", pattern: "src/features/**" },
        { type: "entities", pattern: "src/entities/**" },
        { type: "shared", pattern: "src/shared/**" },
        // aliases
        { type: "app", pattern: "@app/**" },
        { type: "processes", pattern: "@processes/**" },
        { type: "pages", pattern: "@pages/**" },
        { type: "widgets", pattern: "@widgets/**" },
        { type: "features", pattern: "@features/**" },
        { type: "entities", pattern: "@entities/**" },
        { type: "shared", pattern: "@shared/**" },
      ],
    },
    rules: {
      // React
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],

      // FSD layer direction
      "boundaries/element-types": [
        "error",
        {
          default: "disallow",
          rules: [
            {
              from: "app",
              allow: [
                "processes",
                "pages",
                "widgets",
                "features",
                "entities",
                "shared",
              ],
            },
            { from: "processes", allow: ["features", "entities", "shared"] },
            {
              from: "pages",
              allow: ["widgets", "features", "entities", "shared"],
            },
            { from: "widgets", allow: ["features", "entities", "shared"] },
            { from: "features", allow: ["entities", "shared"] },
            { from: "entities", allow: ["shared"] },
            { from: "shared", allow: [] },
          ],
        },
      ],

      // Public API only (barrels): allow exactly one segment after alias
      "import/no-internal-modules": [
        "error",
        {
          allow: [
            "@app/*",
            "@pages/*",
            "@widgets/*",
            "@features/*",
            "@entities/*",
            "@shared/*",
            // explicit deep exceptions:
            "src/shared/api/generated/**",
            "@shared/api/generated/**",
            "src/shared/api/rest/**",
            "@shared/api/rest/**",
          ],
        },
      ],

      // Ban "@/..." imports entirely (we standardized on per-layer aliases)
      "no-restricted-imports": ["error", { patterns: ["@/*"] }],

      // Basic cycles
      "import/no-cycle": ["error", { ignoreExternal: true, maxDepth: 1 }],

      // Hygiene
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/consistent-type-imports": [
        "warn",
        { prefer: "type-imports" },
      ],
    },
  },

  // Allow deep re-exports inside slice barrels only
  {
    files: ["src/**/index.ts"],
    rules: {
      "import/no-internal-modules": "off",
    },
  },

  // Looser rules for tests/stories (optional)
  {
    files: ["**/*.{test,spec,stories}.{ts,tsx}"],
    rules: {
      "import/no-internal-modules": "off",
      "boundaries/element-types": "off",
      "import/no-cycle": "off",
    },
  }
);
