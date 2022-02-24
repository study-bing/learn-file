/*
 * @Author: linbin
 * @Date: 2021-11-30 17:58:26
 * @LastEditTime: 2022-02-16 10:37:19
 * @LastEditors: linbin
 * @Description: 扫描类
 * @FilePath: /study/myVue/vue/mustache/Scanner.js
 */
class Scanner {
	constructor(templateStr) {
		this.templateStr = templateStr
		this.pos = 0 // 指针
		this.tail = '' // 尾巴字符串
	}
	// 让指针进行扫描，知道遇见指定的内容结束，并且返回结束之前的文字
	scanUtil(stopTag) {
		// 记录执行时pos的值
		const posBackUp = this.pos
		while (this.tail.indexOf(stopTag) !== 0 && !this.eos()) {
			this.pos++
			// 改变尾巴为从当前指针这个字符串开始，到最后的全部字符
			this.tail = this.templateStr.substr(this.pos)
		}
		return this.templateStr.substring(posBackUp, this.pos)
	}
	// 功能弱，就是走过指定的内容，没有返回值
	scan(tag) {
		if (this.tail.indexOf(tag) === 0) {
			this.pos += tag.length
			this.tail = this.templateStr.substr(this.pos)
		}
	}
	// 判断指针是否到头
	eos() {
		return this.pos >= this.templateStr.length
	}
}

export default Scanner