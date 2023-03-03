/**
 * @fileoverview 测试 没有 var
 * @author linbin
 */
"use strict"

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
    meta: {
        type: "problem", // `problem`, `suggestion`, or `layout`
        docs: {
            description: "测试 没有 var",
        },
        fixable: "code", // Or `code` or `whitespace`
        schema: [], // Add a schema if the rule has options
        messages: {
            unexpected: "不能用{{type}}",
        },
    },

    create(context) {
        const sourceCode = context.getSourceCode()
        return {
            VariableDeclaration(node) {
                if (node.kind === "var") {
                    context.report({
                        node,
                        data: { type: "var" },
                        messageId: "unexpected",
                        fix(fixer) {
                            const varToken = sourceCode.getFirstToken(node, {
                                filter: (t) => t.value === "var",
                            })
                            return fixer.replaceText(varToken, "let")
                        },
                    })
                }
            },
            // visitor functions for different types of nodes
        }
    },
}
