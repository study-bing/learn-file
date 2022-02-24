/*
 * @Author: linbin
 * @Date: 2021-12-01 13:41:21
 * @LastEditTime: 2022-02-16 11:43:07
 * @LastEditors: linbin
 * @Description: 将token转变为dom
 * @FilePath: /study/myVue/vue/mustache/renderTemplate.js
 */
import lookup from './lookup'
export default function renderTemplate(tokens, data) {
	let resultStr = ''
	for (let i = 0; i < tokens.length; i++) {
		const token = tokens[i]
		if (token[0] === 'text') {
			resultStr += token[1]
		} else if (token[0] === 'name') {
			resultStr += lookup(data, token[1])
		} else if (token[0] === '#') {
			resultStr += parseArray(token, data)
		}
	}
	return resultStr
}
/**
 * @author: linbin
 * @Date: 2021-12-01 15:46:05
 * @description: 处理数组，结合renderTemplate实现递归
 * @param {*} token
 * @param {*} data
 * @return {*}
 */
function parseArray(token, data) {
	let list = lookup(data, token[1])
	let resultStr = ''
	// 返回的结果根据data中对应的数组长度，因为是根据数据的生成的
	for (let i = 0; i < list.length; i++) {
		const element = list[i]
        // 添加一个.属性来处理数据为[1，2，3]的时候 渲染模板处写的是{{.}}
		resultStr += renderTemplate(token[2], { ...element, '.': element })
	}
	return resultStr
}
