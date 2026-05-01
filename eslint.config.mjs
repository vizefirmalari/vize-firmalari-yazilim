import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    /** Next 16 + React Compiler eklentisi: çok agresif; geçerli kalıpları (props senkronu, ref callback, SSR tarihi) yanlış pozitif işaretliyor. */
    rules: {
      "react-hooks/set-state-in-effect": "off",
      "react-hooks/refs": "off",
      "react-hooks/purity": "off",
      "react-hooks/immutability": "off",
      "react-hooks/preserve-manual-memoization": "off",
      "react-hooks/use-memo": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      /** Harici / dinamik URL ve bayrak görselleri için bilinçli `<img>` kullanımı */
      "@next/next/no-img-element": "off",
      /** Bağımlılık dizileri çoğu yerde bilinçli sınırlandı; uyarı taşması IDE’yi dolduruyor */
      "react-hooks/exhaustive-deps": "off",
    },
  },
]);

export default eslintConfig;
