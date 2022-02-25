/*
 * @Author: linbin
 * @Date: 2021-01-28 17:24:03
 * @LastEditTime: 2021-11-02 10:17:22
 * @LastEditors: linbin
 * @Description:
 * @FilePath: /study/promise/generator.js
 */
let fs = require('fs').promises
function* read() {
	let content = yield fs.readFile('../1.txt', 'utf-8')
	return content
}
function co(it) {
	return new Promise((resolve, reject) => {
		function next(data) {
			let { value, done } = it.next(data)
			if (done) {
				resolve(value)
			} else {
				Promise.resolve(value).then(res => {
					next(res)
				}, reject)
			}
		}
		next()
	})
}
function fn(nums) {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve(nums * 2)
		}, 1000)
	})
}
// co(read()).then((res) => {
//     console.log(res)
// })
function* gen() {
	const num1 = yield fn(1)
	const num2 = yield fn(num1)
	const num3 = yield fn(num2)
	return num3
}
async function asyncFn() {
	const num1 = await fn(1)
	const num2 = await fn(num1)
	const num3 = await fn(num2)
	return num3
}
asyncFn().then(res => console.log(res)) // 3秒后输出 8
co(gen()).then(res => {
	console.log(res)
})
