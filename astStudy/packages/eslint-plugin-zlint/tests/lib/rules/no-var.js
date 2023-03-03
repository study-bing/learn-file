/**
 * @fileoverview 测试 没有 var
 * @author linbin
 */
"use strict"

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/no-var"),
    RuleTester = require("eslint").RuleTester

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
    parserOptions: {
        ecmaVersion: "latest",
    },
})
ruleTester.run("no-var", rule, {
    valid: [
        { code: "let a = 1" },
    ],

    invalid: [
        {
            code: "var a = 1",
            errors: [{ message: "error var."}],
            output: "let a = 1",
        },
    ],
})
