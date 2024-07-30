import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";

export default [
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  // disabled since this plugin does not work on 8.x
  //  pluginReactHooks.configs.recommended,
  {
    rules: {
      "no-undef": "error",
      "no-undef-init": "warn",
      "object-shorthand": ["error", "properties"],
      "react/react-in-jsx-scope": "off",
      "react/jsx-filename-extension": [1, { "extensions": [".ts", ".tsx"] }],
    }
  },
];