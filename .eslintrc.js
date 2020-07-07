module.exports = {
    env: {
        amd: true,
        node: true,
        browser: true,
        es6: true,
    },
    extends: [
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:jest/recommended',
        'eslint:recommended',
    ],
    plugins: [
        '@typescript-eslint', 'eslint-plugin-tsdoc', 'jest', 'react',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion:  2018,
        sourceType: 'module',
    },
    rules: {
        'dot-notation': 0,
        'tsdoc/syntax': 1,
        '@typescript-eslint/semi': 1,
        '@typescript-eslint/brace-style': [1, 'allman', { allowSingleLine: true }],
        '@typescript-eslint/comma-spacing': [1, { before: false, after: true }],
        '@typescript-eslint/indent': [1, 4, { SwitchCase: 1, VariableDeclarator: { var: 1, let: 1, const: 1 } }],
        '@typescript-eslint/quotes': [1, 'single', { allowTemplateLiterals: true }],
        '@typescript-eslint/space-before-function-paren': [1, { anonymous: 'always', named: 'never' }],
        '@typescript-eslint/no-explicit-any': 0,
        '@typescript-eslint/ban-ts-ignore': 0,
        '@typescript-eslint/member-delimiter-style': 1,

        'react/no-unknown-property': ['error', { ignore: ['class'] }],

        // Possible Errors
        'comma-dangle': [1, 'always-multiline'],
        'no-cond-assign': [1, 'except-parens'],
        'no-console': [1, { allow: ['warn', 'error'] }],

        // Best Practices
        'accessor-pairs': 1,
        'array-callback-return': 1,
        'block-scoped-var': 1,
        'consistent-return': 1,
        curly: [1, 'multi-line'],
        'dot-location': [1, 'property'],
        eqeqeq: 1,
        'no-alert': 1,
        'no-caller': 1,
        'no-div-regex': 1,
        'no-else-return': 1,
        'no-empty-function': 1,
        'no-eq-null': 1,
        'no-eval': 1,
        'no-extend-native': 1,
        'no-extra-bind': 1,
        'no-extra-label': 1,
        'no-floating-decimal': 1,
        'no-implicit-coercion': [1, { boolean: false, number: true, string: true, allow: [] }],
        'no-implicit-globals': 1,
        'no-implied-eval': 1,
        'no-iterator': 1,
        'no-labels': 1,
        'no-lone-blocks': 1,
        'no-loop-func': 1,
        'no-multi-spaces': [1, { exceptions: { VariableDeclarator: true, ImportDeclaration: true, Property: true } }],
        'no-multi-str': 1,
        'no-native-reassign': 1,
        'no-new': 1,
        'no-new-func': 1,
        'no-new-wrappers': 1,
        'no-octal-escape': 1,
        'no-proto': 1,
        'no-return-assign': 1,
        'no-script-url': 1,
        'no-self-compare': 1,
        'no-sequences': 1,
        'no-throw-literal': 1,
        'no-unmodified-loop-condition': 1,
        'no-unused-expressions': 0,
        'no-useless-call': 1,
        'no-useless-catch': 1,
        'no-useless-concat': 1,
        'no-useless-escape': 0,
        'no-void': 1,
        radix: 1,
        'wrap-iife': [1, 'inside'],
        yoda: 1,

        // Strict Mode
        strict: [1, 'global'],

        // Variables
        'no-catch-shadow': 1,
        'no-label-var': 1,
        'no-restricted-globals': 1,
        'no-undef-init': 1,
        'no-use-before-define': [1, 'nofunc'],

        // Node.js and CommonJS
        'global-require': 1,
        'handle-callback-err': 1,
        'no-mixed-requires': 1,
        'no-new-require': 1,
        'no-path-concat': 1,

        // Stylistic Issues
        'array-bracket-spacing': [1, 'never'],
        'block-spacing': [1, 'always'],
        'brace-style': [1, 'allman', { allowSingleLine: true }],
        camelcase: [1, { properties: 'always' }],
        'comma-spacing': [1, { before: false, after: true }],
        'comma-style': [1, 'last'],
        'computed-property-spacing': [1, 'never'],
        'eol-last': [1, 'unix'],
        'func-names': [1, 'always'],
        'func-style': [1, 'declaration', { allowArrowFunctions: true }],
        indent: [1, 4, { SwitchCase: 1, VariableDeclarator: { var: 1, let: 1, const: 1 } }],
        'jsx-quotes': [1, 'prefer-double'],
        'key-spacing': [1, { beforeColon: false, afterColon: true, mode: 'minimum' }],
        'keyword-spacing': [1, { before: true, after: true }],
        'linebreak-style': [1, 'unix'],
        'max-depth': [1, 6],
        'max-len': [1, { code: 125, tabWidth: 4, comments: 200 }],
        'max-nested-callbacks': [1, { max: 5 }],
        'max-params': [1, { max: 10 }],
        'max-statements-per-line': [1, { max: 2 }],
        'new-cap': [1, { newIsCap: true, capIsNew: false, properties: false }],
        'new-parens': 1,
        'newline-after-var': [1, 'always'],
        'newline-before-return': 1,
        'newline-per-chained-call': [1, { ignoreChainWithDepth: 4 }],
        'no-array-constructor': 1,
        'no-lonely-if': 1,
        'no-mixed-operators': 1,
        'no-multiple-empty-lines': [1, { max: 1, maxEOF: 1, maxBOF: 0 }],
        'no-nested-ternary': 1,
        'no-new-object': 1,
        'no-restricted-syntax': [1, 'DebuggerStatement', 'EmptyStatement', 'LabeledStatement', 'WithStatement'],
        'no-spaced-func': 1,
        'no-trailing-spaces': 1,
        'no-unneeded-ternary': 1,
        'no-whitespace-before-property': 1,
        'object-curly-spacing': [1, 'always'],
        'one-var': [1, 'never'],
        'one-var-declaration-per-line': [1, 'always'],
        'operator-linebreak': [1, 'before'],
        'padded-blocks': [1, 'never'],
        'quote-props': [1, 'as-needed'],
        quotes: [1, 'single', { allowTemplateLiterals: true }],
        semi: [1, 'always'],
        'semi-spacing': [1, { before: false, after: true }],
        'space-before-blocks': [1, 'always'],
        'space-before-function-paren': [1, { anonymous: 'always', named: 'never' }],
        'space-in-parens': [1, 'never'],
        'space-infix-ops': 1,
        'space-unary-ops': [1, { words: true, nonwords: false }],
        'spaced-comment': [1, 'always'],
        'unicode-bom': [1, 'never'],
        'wrap-regex': 1,

        // ECMAScript 6
        'arrow-body-style': [1, 'as-needed'],
        'arrow-parens': 1,
        'arrow-spacing': [1, { before: true, after: true }],
        'generator-star-spacing': [1, { before: true, after: false }],
        'no-confusing-arrow': [1, { allowParens: true }],
        'no-duplicate-imports': 1,
        'no-useless-computed-key': 1,
        'no-useless-rename': 1,
        'no-var': 1,
        'object-shorthand': 1,
        'prefer-const': 1,
        'prefer-template': 1,
        'rest-spread-spacing': [1, 'never'],
        'template-curly-spacing': [1, 'never'],
        'yield-star-spacing': [1, 'before'],
    },
    overrides: [
        {
            files: ['*.spec.ts'],
            rules: {
                'no-unused-expressions': 'off',
                'jest/no-disabled-tests': 'warn',
                'jest/no-focused-tests': 'error',
                'jest/no-identical-title': 'error',
                'jest/prefer-to-have-length': 'warn',
                'jest/valid-expect': 'off',
                '@typescript-eslint/ban-ts-comment': 'off',
                'dot-notation': 'off',
                'jest/no-commented-out-tests': 'off',
            },
        },
        {
            files: ['*.js'],
            rules: {
                '@typescript-eslint/explicit-function-return-type': 'off',
                '@typescript-eslint/no-var-requires': 'off',
            },
        },
    ],
};
