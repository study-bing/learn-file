/*
 * @Author: linbin
 * @Date: 2021-11-02 14:11:17
 * @LastEditTime: 2021-12-07 09:46:28
 * @LastEditors: linbin
 * @Description: 模拟apply
 * @FilePath: /study/练习/my_apply.js
 */

Function.prototype.my_apply = function (context, args) {
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

testobj.testFn.my_apply(testobj2, [22,232]) // sunshine_lin22岁了
