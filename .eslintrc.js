module.exports = {
    root: true,
    env: {
        browser: true,
        node: true
    },
    parserOptions: {
        parser: '@babel/eslint-parser',
        requireConfigFile: false
    },
    extends: [
        '@nuxtjs',
        'plugin:nuxt/recommended'
        // 'prettier'
    ],
    plugins: [],
    // add your custom rules here
    rules: {
        'no-console': 'off',
        'selector-anb-no-unmatchable': 'off',
        'no-globals-in-created': 0,
        'declaration-block-no-duplicate-properties': [
            0,
            {
                ignore: ['consecutive-duplicates']
            }
        ],
        curly: 'off',
        'nuxt/no-cjs-in-config': 'off',
        'space-before-function-paren': 'off',
        'comma-dangle': 'off',
        'arrow-parens': 'off',
        'no-trailing-spaces': 'off',
        'no-warning-comments': 'off',
        indent: ['off', 4],
        'no-multiple-empty-lines': 'off',
        'vue/html-indent': 'off',
        'vue/max-attributes-per-line': 'off',
        'vue/singleline-html-element-content-newline': 'off',
        'vue/html-closing-bracket-spacing': 'off',
        'vue/html-self-closing': 'off',
        'vue/html-closing-bracket-newline': 'off',
        'import/no-named-as-default-member': 'off',
        'operator-linebreak': 'off',
        'multiline-ternary': 'off',
        semi: 'off',
        'no-unexpected-multiline': 'off',
        'vue/multiline-html-element-content-newline': 'off',
        'no-unused-vars': 'off',
        'vue/first-attribute-linebreak': 'off',
        'vue/require-prop-types': 'off',
        quotes: 'off',
    }
}
