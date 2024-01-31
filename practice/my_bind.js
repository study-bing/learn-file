/*
 * @Author: linbin
 * @Date: 2021-12-07 09:46:45
 * @LastEditTime: 2024-01-26 09:32:08
 * @LastEditors: linBin
 * @Description:
 * @FilePath: /learn-file/practice/my_bind.js
 */
Function.prototype.my_apply = function (context, args) {
	context = context || globalThis
	context.fn = this
	let result = context.fn(...args)
	Reflect.deleteProperty(context, 'fn')
	return result
}
Function.prototype.myBind = function (context, ...args) {
	let fn = this
    if(new.target){
        return new fn(...args, ...arg2)
    }
	return function (...arg2) {
		return fn.my_apply(context, [...args, ...arg2])
	}
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

let fn = testobj.testFn.myBind(testobj2, 22, 232) // sunshine_lin22岁了
