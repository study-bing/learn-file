/*
 * @Author: linbin
 * @Date: 2021-12-02 15:25:56
 * @LastEditTime: 2022-12-23 13:58:18
 * @LastEditors: linBin
 * @Description: 数组的数据劫持
 * @FilePath: /learn-file/vue2/mvvm/array.js
 */

import { def } from './utils'
// !Vue 的变异数组从本质上是来说是一种装饰器模式，通过学习它的原理，我们在实际工作中可以轻松处理这类保持原有功能不变的前提下对其进行功能拓展的需求。
// 基础数组原型，创建新的对象，当做数组结构的数据原型
const arrayMethods = Object.create(Array.prototype)

// 数组的数据劫持 vue里面修改了 push pop unshift splice sort reverse shift 7个方法
const methodsChange = ['push', 'pop', 'unshift', 'splice', 'sort', 'reverse', 'shift']
// 遍历改写方法
methodsChange.forEach(methodName => {
	// 记录原来的方法
	const original = arrayMethods[methodName]
	// 定义新方法
	def(
		arrayMethods,
		methodName,
		function (...args) {
			let ob = this.__ob__
			let inserted = []
			switch (methodName) {
				case 'push':
				case 'unshift':
					inserted = args
					break
				case 'splice':
					inserted = args.slice(2)
					break
			}
			if (inserted) {
				// 让新项也变成响应的
				ob.observeArray(inserted)
			}
            ob.dep.notify()
			return original.apply(this, args)
		},
		false
	)
})
export default arrayMethods
