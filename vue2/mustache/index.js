/*
 * @Author: linbin
 * @Date: 2021-11-30 17:36:49
 * @LastEditTime: 2021-12-06 09:51:10
 * @LastEditors: linbin
 * @Description:
 * @FilePath: /study/myVue/vue/mustache/index.js
 */
import parseTemplateToTokens from './parseTemplateToTokens'
import renderTemplate from './renderTemplate'
window.templateSet = {
	render(templateSrc, data) {
		let tokens = parseTemplateToTokens(templateSrc)
		let domStr = renderTemplate(tokens, data)
		return domStr
	}
}
