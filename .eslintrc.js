module.exports = {
    root: true,
    env: {
        node: true,
        es6: true,
    },
    extends: ['eslint:recommended'],
    parserOptions: {
        sourceType: 'module',
        parser: 'babel-eslint',
    },
    rules: {
        'no-console': 'off',
        'no-debugger': 'off',
        semi: [2, 'always'],
        'generator-star-spacing': 'off',
        'no-multi-spaces': 0,
        'comma-dangle': [0, 'ignore'],
        'dot-location': 0,
        'space-before-function-paren': [0, 'always'],
        'newline-after-var': 0,
        'object-shorthand': 0,
        indent: [2, 4],
        quotes: [2, 'single'],
    },
    overrides: [
        {
            files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
            env: {
                jest: true,
            },
        },
    ],
};
