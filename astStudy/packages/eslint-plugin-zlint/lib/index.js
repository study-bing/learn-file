/**
 * @fileoverview test
 * @author linbin
 */
"use strict"

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const requireIndex = require("requireindex")

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------

// import all rules in lib/rules
module.exports.rules = requireIndex(__dirname + "/rules")

// 使用extend的时候
// module.exports.rules = {
//     rules: requireIndex(__dirname + "/rules"),
//     configs: {
//         recommended: {
//             plugins: ["zlint"],
//             rules: {
//                 "zlint/no-var": ["error"],
//             },
//         },
//     },
// }
