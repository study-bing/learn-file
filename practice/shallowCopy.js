/*
 * @Author: linbin
 * @Date: 2021-12-08 11:19:05
 * @LastEditTime: 2021-12-08 11:21:34
 * @LastEditors: linbin
 * @Description: 浅拷贝
 * @FilePath: /study/练习/shallowCopy.js
 */
function shallowCopy(target) {
	if (typeof target === 'object' && target !== null) {
		if (Array.isArray(target)) {
			return [...target]
		} else {
			return { ...target }
		}
	} else {
		return target
	}
}
function shallowCopy2(target) {
	if (typeof target === 'object' && target !== null) {
		let result = Array.isArray(target) ? [] : {}
		for (const key in target) {
			if (Object.hasOwnProperty.call(target, key)) {
				result[key] = target[key]
			}
		}
	} else {
		return target
	}
}
