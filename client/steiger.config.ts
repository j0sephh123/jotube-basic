// steiger.config.ts
import { defineConfig } from "steiger";
import fsd from "@feature-sliced/steiger-plugin";

export default defineConfig([
  ...fsd.configs.recommended,
  {
    files: ["./src/**"],
    ignores: ["**/generated/**", "**/*.d.ts", "**/(dist|build)/**"],
    rules: {
      // you already enforce these via ESLint:
      "fsd/public-api": "off",
      "fsd/forbidden-imports": "off",
      // if you actually use `processes/`:
      "fsd/no-processes": "off",
      // keep structure checks ON (do not disable):
      // e.g. fsd/slice-segments, fsd/slice-name, fsd/layer-name, etc.
    },
  },
]);
