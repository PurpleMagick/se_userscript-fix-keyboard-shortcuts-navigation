import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [...compat.extends(
    "eslint:recommended",
), {
	files: ["src/**.js", "dist/**.js"],
    languageOptions: {
        globals: {
            ...globals.browser,
            ...globals.jquery,
            StackExchange: "readonly",
            GM: "readonly",
            GM_addStyle: "readonly",
        },

        ecmaVersion: 2024,
        sourceType: "module",
    },

    rules: {
        indent: ["error", "tab", {
            SwitchCase: 1,
            VariableDeclarator: "first",

            FunctionDeclaration: {
                parameters: "first",
            },

            FunctionExpression: {
                parameters: "first",
            },

            CallExpression: {
                arguments: "first",
            },
        }],

        "no-mixed-spaces-and-tabs": ["warn", "smart-tabs"],
        "no-trailing-spaces": "warn",
        "linebreak-style": ["warn", "unix"],
        "eol-last": "warn",
        "unicode-bom": ["warn", "never"],
        quotes: ["warn", "double"],
        "dot-location": ["warn", "property"],

        "operator-linebreak": ["warn", "before", {
            overrides: {
                "?": "before",
                ":": "before",
            },
        }],

        "newline-per-chained-call": ["warn", {
            ignoreChainWithDepth: 2,
        }],

        "no-prototype-builtins": "off",
        "no-sparse-arrays": "off",
        "no-new-object": "error",
        "no-template-curly-in-string": "error",
        "require-atomic-updates": "error",
        "array-callback-return": "error",
        "default-case-last": "error",
        "default-param-last": ["error"],

        eqeqeq: ["error", "always", {
            null: "ignore",
        }],

        "grouped-accessor-pairs": "error",
        "symbol-description": "error",
        "no-alert": "error",
        "no-caller": "error",
        "no-fallthrough": "error",
        "no-constructor-return": "error",

        "no-else-return": ["error", {
            allowElseIf: false,
        }],

        "no-duplicate-imports": "error",
        "no-useless-computed-key": "warn",
        "no-var": "warn",
        "prefer-spread": "error",
        "prefer-template": "warn",

        "no-eval": "error",
        "no-implied-eval": "error",
        "no-new-func": "error",
        "no-extend-native": "error",
        "no-extra-bind": "error",
        "no-labels": "error",
        "no-floating-decimal": "warn",
        "no-implicit-coercion": "warn",
        "no-implicit-globals": "error",
        "no-undef": "error",
        "no-lone-blocks": "warn",
        "no-multi-spaces": "warn",
        "no-new": "error",
        "no-new-wrappers": "error",
        "no-octal-escape": "error",
        "no-proto": "error",
        "no-return-assign": "error",
        "no-return-await": "error",
        "no-self-compare": "error",
        "no-throw-literal": "error",
        "no-unmodified-loop-condition": "error",
        "no-unused-expressions": "error",
        "no-useless-concat": "error",
        "no-useless-escape": "warn",
        "prefer-regex-literals": "error",
        "wrap-iife": ["warn", "inside"],
        "no-use-before-define": "error",
        "no-debugger": "warn",

        "no-console": ["warn", {
            allow: ["warn", "error"],
        }],

        "no-promise-executor-return": "error",
        "no-unreachable-loop": "error",
        "block-spacing": "warn",
        "brace-style": "warn",
        "comma-spacing": "off",
        "func-call-spacing": ["error", "never"],
        "key-spacing": "warn",
        "function-call-argument-newline": ["warn", "consistent"],
        "function-paren-newline": ["warn", "consistent"],
        "keyword-spacing": "warn",
        "no-array-constructor": "error",
        "no-bitwise": "error",
        "no-lonely-if": "warn",
        "no-mixed-operators": "error",
        "no-multi-assign": "error",

        "no-multiple-empty-lines": ["warn", {
            max: 2,
            maxBOF: 0,
        }],

        "no-negated-condition": "error",
        "no-unneeded-ternary": "error",
        "no-whitespace-before-property": "warn",

        "array-bracket-newline": ["warn", {
            multiline: true,
        }],

        "object-property-newline": ["warn", {
            allowAllPropertiesOnSameLine: true,
        }],

        "padded-blocks": ["warn", "never"],
        "space-before-blocks": ["warn", "always"],

        "space-before-function-paren": ["warn", {
            anonymous: "never",
            named: "never",
            asyncArrow: "always",
        }],

        "rest-spread-spacing": ["warn", "never"],
        "arrow-spacing": "warn",

        "generator-star-spacing": ["warn", {
            before: false,
            after: true,
            anonymous: "neither",

            method: {
                before: true,
                after: false,
            },
        }],

        "yield-star-spacing": ["warn", "after"],
        "space-infix-ops": "warn",
        "switch-colon-spacing": "warn",

        "space-unary-ops": ["warn", {
            words: true,
            nonwords: false,
        }],

        "new-cap": "error",
        "comma-style": ["warn", "last"],
        "semi-style": ["warn", "last"],

        "semi-spacing": ["warn", {
            before: false,
            after: true,
        }],

        semi: ["warn", "always"],
    },
}];