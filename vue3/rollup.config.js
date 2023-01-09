/*
 * @Author: linbin
 * @Date: 2021-12-27 13:42:49
 * @LastEditTime: 2023-01-05 17:48:26
 * @LastEditors: linBin
 * @Description: rollup 配置
 * @FilePath: /learn-file/vue3/rollup.config.js
 */
import path from "path"
import json from "@rollup/plugin-json"
import nodeResolve from "@rollup/plugin-node-resolve"
import ts from "rollup-plugin-typescript2"

// !根据环境变量中的target属性 获取对应模块的package.json
const packagesDir = path.resolve(__dirname, "packages")

// !打包的基准目录
const packageDir = path.resolve(packagesDir, process.env.TARGET)

const resolve = (p) => path.resolve(packageDir, p)

const pkg = require(resolve("package.json"))
const name = path.basename(packageDir) // 获取文件名

// !对打包类型做一个映射表，根据提供的formats来格式化需要打包的内容
const outputConfig = {
    "esm-bundler": {
        file: resolve(`dist/${name}.esm-bundler.js`),
        format: "es",
    },
    cjs: {
        file: resolve(`dist/${name}.cjs.js`),
        format: "cjs",
    },
    global: {
        file: resolve(`dist/${name}.global.js`),
        format: "iife", // 立即执行函数
    },
}

const options = pkg.buildOptions // 自己在package.json中定义的选项
function createConfig(format, output) {
    output.name = options.name
    return {
        input: resolve("src/index.ts"),
        output,
        plugins: [
            json(),
            ts({
                tsconfig: path.resolve(__dirname, "tsconfig.json"),
            }),
            nodeResolve(),
        ],
    }
}

// rollup 最终需要导出配置
export default options.formats.map((format) => {
    return createConfig(format, outputConfig[format])
})
