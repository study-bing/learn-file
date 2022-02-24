/*
 * @Author: linbin
 * @Date: 2021-11-02 14:06:52
 * @LastEditTime: 2021-11-02 14:10:39
 * @LastEditors: linbin
 * @Description: 数组every函数
 * @FilePath: /study/练习/my_every.js
 */
function my_every(list, fn) {
	let isError = true
	for (let index = 0; index < list.length; index++) {
		isError = fn(list[index])
		if (!isError) {
			return false
		}
	}
	return true
}
const players = [
	{ name: '科比', num: 24 },
	{ name: '詹姆斯', num: 23 },
	{ name: '保罗', num: 3 },
	{ name: '威少', num: 0 },
	{ name: '杜兰特', num: 35 }
]

console.log(my_every(players, item => item.num >= 0))
console.log(players.every(item => item.num >= 0))
