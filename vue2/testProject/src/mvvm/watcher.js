/*
 * @Author: linbin
 * @Date: 2021-12-03 10:18:39
 * @LastEditTime: 2022-02-17 15:50:28
 * @LastEditors: linbin
 * @Description:
 * @FilePath: /study/myVue/vue/mvvm/watcher.js
 */
import Dep from './dep'
let uid = 0
export default class Watcher {
	constructor(target, expression, callback) {
		this.target = target
		this.callback = callback
		this.id = uid++
		this.getter = parsePath(expression)
		this.value = this.get()
	}
	update() {
		this.run()
	}
	get() {
        let target = this.target
		// 依赖收集
		Dep.target = this
		let value
		try {
			value = this.getter(target)
		} finally {
			Dep.target = null
		}
		return value
	}
	run() {
		this.getAndInvoke(this.callback)
	}
	getAndInvoke(callback) {
		let val = this.get()
        // 值为对象或者数据的时候，可能值还是一样，但是内部已经改了
		if (val !== this.value || typeof val === 'object') {
            let oldValue = this.value
			this.value = val
			callback(this.target, val, oldValue)
		}
	}
}
function parsePath(str) {
	let array = str.split('.')
	return obj => {
		for (let i = 0; i < array.length; i++) {
			const element = array[i]
			if (!obj[element]) {
				return
			}
			obj = obj[element]
		}
		return obj
	}
}
