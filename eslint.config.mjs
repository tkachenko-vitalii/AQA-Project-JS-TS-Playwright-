import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import playwright from 'eslint-plugin-playwright'


export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
        parserOptions:{
            projectService: {
                allowDefaultProject: ["eslint.config.mjs"],
            },
            tsconfigRootDir: import.meta.dirname,
        }
    }
  },
  {
    rules: {
        "@typescript-eslint/no-floating-promises": "error"
      }
  },

    {
      ...playwright.configs['flat/recommended'],
      files: ['tests/**', 'pages/**', 'pageFragments/**', 'utils/**', 'tools.ts'],
      rules: {
        ...playwright.configs['flat/recommended'].rules,
        // Customize Playwright rules
        // ...
      },
    },
  
);