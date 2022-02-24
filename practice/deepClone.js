/*
 * @Author: linbin
 * @Date: 2021-12-08 14:46:26
 * @LastEditTime: 2021-12-08 14:52:08
 * @LastEditors: linbin
 * @Description: 深拷贝
 * @FilePath: /study/练习/deepClone.js
 */
function deepClone1(target) {
	// 无法拷贝函数，内部环引用会报错
	return JSON.parse(JSON.stringify(target))
}

function deepClone2(target, map = new Map()) {
	if (typeof target === 'object' && target !== null) {
		let isArray = Array.isArray(target)
		// 解决环引用
		let cache = map.get(target)
		if (cache) {
			return cache
		}
		let result = isArray ? [] : {}
		map.set(target, result)
		if (isArray) {
			target.forEach(key => {
				result[key] = deepClone2(target[key], map)
			})
		} else {
			for (const key of Object.keys(target)) {
				result[key] = deepClone2(target[key], map)
			}
		}
		return result
	} else {
		return target
	}
}
