/*
 * @Author: linbin
 * @Date: 2021-12-01 10:44:59
 * @LastEditTime: 2022-02-16 10:55:19
 * @LastEditors: linbin
 * @Description: 折叠tokens，将#和/之间的tokens整合起来变成子项
 * @FilePath: /study/myVue/vue/mustache/nestTokens.js
 */
export default function nestTokens(tokens) {
	// 结果数组
	let nestedTokens = []
	// 栈结构，存放tokens
	let sections = []
	// 收集器，当遇见#时，收集器会指向这个token的下标为2的新数组
	let collector = nestedTokens

	for (let i = 0; i < tokens.length; i++) {
		let token = tokens[i]
		// 利用引用数据类型的特性去添加数据
		switch (token[0]) {
			case '#':
				sections.push(token)
				collector.push(token)
				collector = token[2] = []
				break
			case '/':
				sections.pop()
				collector = sections.length > 0 ? sections[sections.length - 1][2] : nestedTokens
				break

			default:
				collector.push(token)
				break
		}
	}
	return nestedTokens
}
// [
// 	['text', '<div><ol>'],
// 	[
// 		'#',
// 		'students',
// 		[
// 			['text', '<li class="123">学生'],
// 			['name', 'name'],
// 			['text', '的爱好<ol>'],
// 			[
// 				'#',
// 				'hobbies',
// 				[
// 					['text', '<li>'],
// 					['name', '.'],
// 					['text', '</li>']
// 				]
// 			],
// 			['text', '</ol></li>']
// 		]
// 	],
// 	['text', '</ol></div>']
// ]
