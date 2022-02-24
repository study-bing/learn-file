/*
 * @Author: linbin
 * @Date: 2021-11-26 15:27:35
 * @LastEditTime: 2021-12-08 14:43:39
 * @LastEditors: linbin
 * @Description:
 * @FilePath: /study/限制并发数量.js
 */
class LimitPromise {
	constructor(urls = [], max) {
		this.urls = urls
		this.max = max
		this.count = 1
	}
	start() {
		if (!this.max) {
			return
		}
		while (this.count <= this.max && this.urls.length > 0) {
			this.count++
			this.testPromise(this.urls.shift())
		}
	}
	testPromise(url) {
		setTimeout(() => {
			console.log(url)
			this.count--
			this.start()
		}, url * 1000)
	}
}
let urls = [6, 3, 2, 1, 2]
let limit = new LimitPromise(urls, 2)
limit.start()

