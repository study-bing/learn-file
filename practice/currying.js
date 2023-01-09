/*
 * @Author: linbin
 * @Date: 2021-10-30 10:52:45
 * @LastEditTime: 2022-12-09 11:24:30
 * @LastEditors: linBin
 * @Description: 柯里化函数
 * @FilePath: /learn-file/practice/currying.js
 */
function currying(fn, ...args) {
    if (fn.length <= args.length) {
        return fn.call(this, ...args)
    } else {
        return (...args1) => {
            return currying.call(this, fn, ...args, ...args1)
        }
    }
}
function add(a, b, c) {
    return a + b + c
}
let add1 = currying(add)
console.log(add1(1)(2))
