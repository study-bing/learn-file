/*
 * @Author: linbin
 * @Date: 2021-11-11 11:10:12
 * @LastEditTime: 2021-11-11 11:20:41
 * @LastEditors: linbin
 * @Description:
 * @FilePath: /study/test/demo.js
 */

function timeout(ms) {
	return new Promise((resolve, reject) => {
		setTimeout(resolve, ms, 'done')
	})
}

timeout(100).then(value => {
	console.log(value)
})

const p1 = new Promise((resolve, reject) => {
	resolve('hello')
})
	.then(result => console.log(result, 1))
	.catch(e => e)

const p2 = new Promise((resolve, reject) => {
	resolve('world')
})
	.then(result => result)
	.catch(e => e)

Promise.all([p1, p2])
	.then(result => console.log(result))
	.catch(e => console.log(e))
// ["hello", "world"]
