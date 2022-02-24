/*
 * @Author: linbin
 * @Date: 2021-12-02 15:08:21
 * @LastEditTime: 2021-12-02 15:09:31
 * @LastEditors: linbin
 * @Description:
 * @FilePath: /study/myVue/mustache/mvvm/utils.js
 */
export const def = function (obj, key, value, enumerable) {
	Object.defineProperty(obj, key, {
		writable: true,
		configurable: true,
		enumerable,
		value
	})
}
