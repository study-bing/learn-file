/*
 * @Author: linbin
 * @Date: 2021-11-02 13:59:00
 * @LastEditTime: 2021-11-02 14:05:03
 * @LastEditors: linbin
 * @Description: setinterval 用来实现循环定时调用 可能会存在一定的问题 能用 settimeout 解决吗
 * @FilePath: /study/练习/my_setInterval.js
 */
// ? setinterval 用来实现循环定时调用 可能会存在一定的问题 能用 settimeout 解决吗
function my_setInterval(fn, delay) {
	let timer = null
	let next = function () {
		fn()
		timer = setTimeout(next, delay)
	}
	setTimeout(next, delay)
	return {
		cancel: () => {
			clearTimeout(timer)
		}
	}
}
const { cancel } = my_setInterval(() => console.log(888), 1000)
setTimeout(() => {
	cancel()
}, 4000)
