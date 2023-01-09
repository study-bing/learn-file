/*
 * @Author: linbin
 * @Date: 2021-12-02 15:02:46
 * @LastEditTime: 2021-12-17 09:38:12
 * @LastEditors: linbin
 * @Description: Observer对象 将一个正常的对象转换成每个层级都是响应式的对象
 * @FilePath: /study/myVue/vue/mvvm/Observer.js
 */
import { def } from './utils'
import defineReactive from './defineReactive'
import arrayMethods from './array'
import observe from './observe'
import Dep from './dep'
export default class Observer {
	constructor(val) {
		// !每一个Observer中都有一个Dep
		this.dep = new Dep()
		// 将对象赋值到传入的值中
        // !直接 val.__ob__ = this会导致死循环
		def(val, '__ob__', this, false)
		// 将一个正常的对象转换成每个层级都是响应式的对象
		// 数组情况下，改变原型中的七个数组方法
		if (Array.isArray(val)) {
			// 改变原型的指向
			Object.setPrototypeOf(val, arrayMethods)
			this.observeArray(val)
		} else {
			this.walk(val)
		}
	} 
	/**
	 * @author: linbin
	 * @Date: 2021-12-02 15:22:57
	 * @description: 遍历属性进行数据劫持
	 * @param {*} val
	 * @return {*}
	 */
	walk(val) {
		for (const key in val) {
			defineReactive(val, key)
		}
	}
	/**
	 * @author: linbin
	 * @Date: 2021-12-02 17:18:04
	 * @description: 遍历数组进行数据劫持
	 * @param {*} val
	 * @return {*}
	 */
	observeArray(val) {
		for (let i = 0; (length = val.length), i < length; i++) {
			observe(val[i])
		}
	}
}
