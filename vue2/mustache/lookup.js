/*
 * @Author: linbin
 * @Date: 2021-12-01 13:56:01
 * @LastEditTime: 2021-12-01 16:02:03
 * @LastEditors: linbin
 * @Description: 处理数据对象，寻找连续用点符号的keyName属性
 * @FilePath: /study/myVue/mustache/src/lookup.js
 */
// data = {a:{b:{c:100}}}
// lookup(data, 'a.b.c') => 100
export default function lookup(data, keyName) {
    // .本身不能，因为传入的数组[1，2，3]的时候 渲染模板处写的是{{.}}
	if (keyName.indexOf('.') > -1 && keyName !== '.') {
		let keys = keyName.split('.')
		let temp = data
		for (let i = 0; i < keys.length; i++) {
			const element = keys[i]
			temp = temp[element]
		}
		return temp
	}
	return data[keyName]
}
