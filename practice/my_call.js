/*
 * @Author: linbin
 * @Date: 2021-12-07 09:40:02
 * @LastEditTime: 2021-12-07 09:45:35
 * @LastEditors: linbin
 * @Description: 模拟call
 * @FilePath: /study/练习/my_call.js
 */
Function.prototype.myCall = function (context, ...args) {
    context = context || globalThis
	context.fn = this
	let result = context.fn(...args)
	Reflect.deleteProperty(context, 'fn')
	return result
}
const testobj = {
	name: 'aaa',
	testFn(age) {
		console.log(`${this.name}${age}岁了`)
	}
}
const testobj2 = {
	name: 'sunshine_lin'
}

testobj.testFn.myCall(testobj2, 22, 232) // sunshine_lin22岁了
