/*
 * @Author: linbin
 * @Date: 2021-12-06 09:54:45
 * @LastEditTime: 2021-12-06 10:42:42
 * @LastEditors: linbin
 * @Description:
 * @FilePath: /study/myVue/vue/ast/parseAttribute.js
 */
export default function parseAttribute(attrs) {
	let result = []
	let isMatchQuot = false // 是否遇到引号
	let breakpoint = 0
	if (attrs) {
		for (let i = 0; i < attrs.length; i++) {
			const element = attrs.charAt(i)
			if (element === '"') {
				isMatchQuot = !isMatchQuot
			}
			if (!isMatchQuot && element === ' ') {
				const target = attrs.substring(breakpoint, i).trim()
				target && result.push(target)
				breakpoint = i
			}
		}
		// 循环结束，还剩下最后一项属性
		result.push(attrs.substring(breakpoint).trim())
		// filter过滤空字符
		result = result
			.filter(item => item)
			.map(item => {
				const res = item.match(/^(.+)="(.+)"$/)
				return {
					name: res[1],
					value: res[2]
				}
			})
	}

	return result
}
