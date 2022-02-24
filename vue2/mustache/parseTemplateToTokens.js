/*
 * @Author: linbin
 * @Date: 2021-12-01 10:08:41
 * @LastEditTime: 2022-02-16 10:56:00
 * @LastEditors: linbin
 * @Description: 模板转tokens
 * @FilePath: /study/myVue/vue/mustache/parseTemplateToTokens.js
 */
import Scanner from './Scanner'
import nestTokens from './nestTokens'
export default function parseTemplateToTokens(templateStr) {
	let scanner = new Scanner(templateStr)
	let word
	let tokens = []
	// '我买了{{thing}}, {{date}}' 变成
	// ['text', '我买了'], ['name', 'thing'], ['text', ', '], ['name', 'date']
	while (!scanner.eos()) {
		word = scanner.scanUtil('{{')
		if (word !== '') {
			tokens.push(['text', handleSpace(word)])
		}
		scanner.scan('{{')
		word = scanner.scanUtil('}}')
		if (word !== '') {
			if (['#', '/'].includes(word[0])) {
				tokens.push([word[0], word.substring(1)])
			} else {
				tokens.push(['name', word])
			}
		}
		scanner.scan('}}')
	}
	return nestTokens(tokens)
}
/**
 * @author: linbin
 * @Date: 2021-12-01 18:13:26
 * @description: 处理模板的空格
 * @param {*} word
 * @return {*}
 */
function handleSpace(word) {
	let isInLabel = false // 判断是否在标签内部
	let _resultStr = ''
	for (let i = 0; i < word.length; i++) {
		const element = word[i]
		if (element === '<') {
			isInLabel = true
		} else if (element === '>') {
			isInLabel = false
		}
		if (!/\s/.test(word[i])) {
			_resultStr += word[i]
		} else {
			if (isInLabel) {
				_resultStr += ' '
			}
		}
	}
	return _resultStr
}
