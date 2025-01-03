import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

// Get __dirname for compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create the ESLint compatibility instance
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// ESLint configuration extending Next.js rules
const eslintConfig = {
  extends: [
    // Extend Next.js rules and TypeScript rules
    ...compat.extends("next/core-web-vitals", "next/typescript"),
  ],
  rules: {
    // Disable the 'no-unused-vars' rule
    "no-unused-vars": "off",
  },
};

export default eslintConfig;
