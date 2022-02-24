/*
 * @Author: linbin
 * @Date: 2021-11-02 13:34:51
 * @LastEditTime: 2021-12-08 09:38:19
 * @LastEditors: linbin
 * @Description: 实现一个发布订阅模式拥有on emit off方法
 * @FilePath: /study/练习/eventEmitter.js
 */
class EventEmitter {
	constructor() {
		this.eventMap = {}
	}
	on(name, fn) {
		if (this.eventMap[name]) {
			this.eventMap[name].push(fn)
		} else {
			this.eventMap[name] = [fn]
		}
	}
	off(name, fn) {
		if (this.eventMap[name]) {
			if (fn) {
				let findIndex = this.eventMap[name].findIndex(el => {
					return el === fn
				})
				findIndex > -1 && this.eventMap[name].splice(findIndex, 1)
			} else {
				this.eventMap[name] = []
			}
		}
	}
	emit(name, ...args) {
		if (this.eventMap[name]) {
			this.eventMap[name].forEach(fn => {
				fn(...args)
			})
		}
	}
}
let bbb = function () {
	console.log('bbb')
}
let eventEmitter = new EventEmitter()
eventEmitter.on('aaa', function () {
	console.log('aaa')
})
eventEmitter.on('aaa', bbb)
eventEmitter.on('ccc', function () {
	console.log('ccc')
})
// eventEmitter.emit('aaa')
eventEmitter.off('aaa')
eventEmitter.emit('aaa')
