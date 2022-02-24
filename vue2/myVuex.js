/*
 * @Author: linbin
 * @Date: 2021-11-19 16:40:01
 * @LastEditTime: 2021-11-22 13:44:09
 * @LastEditors: linbin
 * @Description: myVuex
 * @FilePath: /study/myVue/myVuex.js
 */

// 1.全局能用$store
// 2.能use 代表有install
let Vue
class Store {
	constructor(options) {
		// state响应式
		this._vm = new Vue({
			data: {
				$$state: options.state
			}
		})
		this._mutations = {}
		this.handelMutation(options.mutations)
		this._actions = {}
		this.handelAction(options.actions)
		this.getters = {}
		// 实现store.getters.xxx
		this.handelGetters(options.getters)
		// 绑定this指向
		this.commit = this.commit.bind(this)
		this.dispatch = this.dispatch.bind(this)
	}
	get state() {
		return this._vm._data.$$state
	}
	commit(name, data) {
		// 获取事件
		let eventList = this._mutations[name] || []
		if (!eventList.length) {
			console.log('unknown mutation type')
			return
		}
		// 执行事件
		eventList.forEach(event => {
			event(this.state, data)
		})
	}
	dispatch(name, data) {
		// 获取事件
		let eventList = this._actions[name] || []
		if (!eventList.length) {
			console.log('unknown actions type')
			return
		}
		// 执行事件
		eventList.forEach(event => {
			event(this, data)
		})
	}
	handelGetters(getters) {
		// this.getters添加options.getters的属性
		Object.keys(getters).forEach(el => {
			Object.defineProperty(this.getters, el, {
				get: () => {
					return getters[el](this.state)
				}
			})
		})
	}
	handelMutation(mutations) {
		forEach(mutations, (mutationName, mutationFn) => {
			this._mutations[mutationName] = () => {
				mutationFn.call(this, this.state)
			}
		})
	}
	handelAction(actions) {
		forEach(actions, (actionName, actionFn) => {
			this._actions[actionName] = () => {
				actionFn.call(this, this)
			}
		})
	}
}

const install = _Vue => {
	Vue = _Vue
	Vue.mixin({
		beforeCreate() {
			// if (this.$options.store) {
			// 	// 如果有store，挂在到原型上可以全局使用
			// 	Vue.prototype.$store = this.$options.store
			// }
			if (this.$options && this.$options.store) {
				// 根组件
				this.$store = this.$options.store
			} else {
				// 子组件 父->子
				this.$store = this.$parent && this.$parent.$store
			}
		}
	})
}
function forEach(obj, callback) {
	Object.keys(obj).forEach(item => callback(item, obj[item]))
}
export default {
	Store,
	install
}
