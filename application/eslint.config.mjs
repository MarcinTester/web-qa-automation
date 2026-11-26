import js from '@eslint/js';
import globals from 'globals';
import prettier from 'eslint-config-prettier';
import tseslint from 'typescript-eslint';
export default tseslint.config({ ignores: ['dist/', 'node_modules/', 'generated/', 'postcss.config.js', 'tailwind.config.js'] }, js.configs.recommended, ...tseslint.configs.recommended, { files: ['**/*.{ts,tsx}'], languageOptions: { globals: { ...globals.browser, ...globals.node } }, rules: { '@typescript-eslint/no-unused-expressions': 'off' } }, prettier);
