/*
 * @Author: linbin
 * @Date: 2021-12-02 15:03:39
 * @LastEditTime: 2021-12-06 09:49:59
 * @LastEditors: linbin
 * @Description: defineReactive函数给对象进行数据劫持
 * @FilePath: /study/myVue/vue/mvvm/defineReactive.js
 */
import Dep from './dep'
import observe from './observe'
export default function defineReactive(obj, key, val) {
	const dep = new Dep()
	if (arguments.length === 2) {
		val = obj[key]
	}
	// 递归劫持，让内部属性也进行数据劫持
	let childOb = observe(val)
	Object.defineProperty(obj, key, {
		enumerable: true,
		configurable: true,
		get() {
			if (Dep.target) {
				dep.depend()
				if (childOb) {
                    // 孩子记录的作用是用于数据变化的时候实现dep.notify
					childOb.dep.depend()
				}
			}
			return val
		},
		set(newValue) {
			if (val === newValue) {
				return
			}
			// 让新属性也进行数据劫持
			childOb = observe(newValue)
			val = newValue
			// 发布订阅
			console.log(dep)
			dep.notify()
		}
	})
}
