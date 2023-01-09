/*
 * @Author: linbin
 * @Date: 2021-11-02 10:18:33
 * @LastEditTime: 2022-12-05 17:18:34
 * @LastEditors: linBin
 * @Description: 手写 new 的过程
 * @FilePath: /learn-file/practice/new.js
 */
function newTest(fn, ...args) {
    // 判断参数是否是一个函数
    if (typeof fn !== "function") {
        return console.error("type error")
    }
    // 创建一个对象，并将对象的原型绑定到构造函数的原型上
    const obj = Object.create(fn.prototype)
    const value = fn.apply(obj, args) // 调用构造函数，并且this绑定到obj上
    // 如果构造函数有返回值，并且返回的是对象，就返回value ;否则返回obj
    return value instanceof Object ? value : obj
}
