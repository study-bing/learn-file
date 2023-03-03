const esprima = require("esprima") // 编译成ast
const estraverse = require("estraverse") // 递归
const escodegen = require("escodegen") // ast转换

const code = `function a() {}`

// 转化成ast语法树
const ast = esprima.parseScript(code)
console.log(ast)

estraverse.traverse(ast, {
    enter(node) {
        console.log("enter", node.type)
        if(node.type === 'FunctionDeclaration'){
            node.id.name = 'ast'
        }
    },
    leave(node) {
        console.log("leave", node)
    },
})
console.log(escodegen.generate(ast));