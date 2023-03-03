#!/usr/bin/env node
// https://zhuanlan.zhihu.com/p/519588763
const yargs = require("yargs/yargs")
const { hideBin } = require("yargs/helpers")
// hideBin参数解析：（相当于process.argv.slice(2)）
const argvs = hideBin(process.argv)
console.log(argvs)
const cli = yargs(argvs)
cli.usage("usage:$0 <command>[options]") // usage(<message|command>, [desc], [builder], [handler]) 显示消息
    .strict()
    .demandCommand(1, "至少输入一个参数")
    .alias("h", "help")
    .options({ test: { describe: "测试", type: "string" } })
    // cmd：命令和参数的字符或命令及别名的数组
    // desc：对命令描述
    // builder：命令执行前调用的函数
    // handler：执行命令的函数
    .command(
        "init [name]",
        "初始化项目",
        (res) => {
            // 设置默认参数
            res.positional("name", {
                describe: "默认",
                default: "demo",
            })
            res.option("name", {
                type: "string",
                describe: "项目名称",
            })
        },
        (argv) => {
            console.log("argv", argv)
        }
    )
    .parse() // 严格模式
