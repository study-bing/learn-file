module.exports = {
    env: {
        // 当前可以使用哪个环境的全局变量
        browser: true,
        es2021: true,
        node: true,
    },
    extends: "eslint:recommended",
    overrides: [],
    parserOptions: {
        // 描述语法的
        ecmaVersion: "latest",
    },
    plugins: ["zlint"],
    rules: {
        "zlint/no-var": ["error"],
    },
}
