// *es6 => es5 箭头函数转换成普通函数  @babel/core（可以放入对应的babel插件，默认转化的时候可以调用这些插件）

const babel = require("@babel/core")
const types = require("@babel/types")
// const transformFunction = require('babel-plugin-transform-es2015-arrow-functions')

const transformFunction = {
    // 监控到对应的函数的时候，执行；ArrowFunctionExpression 代表是箭头函数
    visitor: {
        ArrowFunctionExpression(path) {
            // path就是访问的路径
            let { node } = path
            hoistFunctionEvn(path)
            node.type = "FunctionExpression"
            let body = node.body // 老节点中的a+b
            // 判断箭头函数是都已经被{}包裹
            if (!types.isBlockStatement(body)) {
                node.body = types.blockStatement([types.returnStatement(body)])
            }
        },
    },
}
function getThisPath(path) {
    let arr = []
    path.traverse({
        ThisExpression(path) {
            arr.push(path)
        },
    })
    return arr
}
function hoistFunctionEvn(path) {
    const thisEnv = path.findParent(
        (parent) =>
            (parent.isFunction() && !parent.isArrowFunctionExpression()) ||
            parent.isProgram() // 是函数并且不是箭头函数或者是全局
    ) // 查找父作用域
    const thisPaths = getThisPath(path)
    if (thisPaths.length > 0) {
        const bindingThis = "_this" // var _this = this
        // 修改当前路径中的this 变为_this
        thisPaths.forEach((path) => {
            path.replaceWith(types.identifier(bindingThis))
        })
        // 添加 var _this = this
        thisEnv.scope.push({
            id: types.identifier(bindingThis),
            init: types.thisExpression(),
        })
    }
}
const code = `const sum = () => console.log(this)`

const result = babel.transform(code, {
    plugins: [transformFunction],
})
console.log(result.code)
