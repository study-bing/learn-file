/*
 * @Author: linbin
 * @Date: 2021-12-02 15:01:42
 * @LastEditTime: 2021-12-02 15:25:43
 * @LastEditors: linbin
 * @Description:
 * @FilePath: /study/myVue/mustache/mvvm/observe.js
 */
import Observer from './Observer'
export default function observe(val) {
	if (typeof val !== 'object') {
		return
	}
	if (typeof val.__ob__ !== 'undefined') {
		return val.__ob__
	} else {
		return new Observer(val)
	}
}
