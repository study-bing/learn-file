/*
 * @Author: linbin
 * @Date: 2021-10-30 10:52:45
 * @LastEditTime: 2021-10-30 14:10:55
 * @LastEditors: linbin
 * @Description: 柯里化函数
 * @FilePath: /study/练习/currying.js
 */
function currying(fn, ...args) {
	if (fn.length <= args.length) {
		return fn.call(this, ...args)
	} else {
		return (...arg1) => {
			return currying.call(this, fn, ...arg1, ...args)
		}
	}
}
function add(a, b, c) {
	return a + b + c
}
// let add1 = currying(add)
// console.log(add1(1)(2)(3))

