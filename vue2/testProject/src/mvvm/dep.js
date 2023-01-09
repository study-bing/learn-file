/*
 * @Author: linbin
 * @Date: 2021-12-03 10:18:21
 * @LastEditTime: 2021-12-03 15:14:43
 * @LastEditors: linbin
 * @Description:
 * @FilePath: /study/myVue/mustache/mvvm/dep.js
 */
// 每一个Observer中都有一个Dep
let uid = 0
export default class Dep {
	constructor() {
		// 创建数组存储自己的订阅者（Watcher的实例）
		this.id = uid++
		this.subs = []
	}
	// 添加订阅
	addSub(sub) {
		this.subs.push(sub)
	}
	// 添加依赖
	depend() {
		// Dep.target是自己定义的全局位置
		if (Dep.target) {
			this.addSub(Dep.target)
		}
	}
	// 通知更新
	notify() {
		// 浅克隆一份
		const subs = this.subs.slice()
		for (let i = 0; i < subs.length; i++) {
			const element = subs[i]
			element.update()
		}
	}
}
