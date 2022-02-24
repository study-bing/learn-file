/*
 * @Author: linbin
 * @Date: 2021-04-27 15:39:20
 * @LastEditTime: 2021-04-27 16:08:35
 * @LastEditors: linbin
 * @Description: 柯里化函数
 * @FilePath: /study/function/curry.js
 */
function curry(fn, ...arg) {
    if (fn.length > arg.length) {
        return (...arg2) => {
            return curry.call(this, fn, ...arg, ...arg2)
        }
    } else {
        return fn.apply(this, arg)
    }
}
function add(a, b, c) {
    return a + b + c
}
let add1 = curry(add)
console.log(add1(1)(2)(3))
