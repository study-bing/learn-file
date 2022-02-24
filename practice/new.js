/*
 * @Author: linbin
 * @Date: 2021-11-02 10:18:33
 * @LastEditTime: 2021-11-02 13:33:31
 * @LastEditors: linbin
 * @Description: 手写 new 的过程
 * @FilePath: /study/练习/new.js
 */
function newTest(context, args) {
	let obj = Object.create(context.prototype)
	let result = context.apply(obj, args)
	return typeof result === 'object' ? obj || result : obj
}
