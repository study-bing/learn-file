/*
 * @Author: linbin
 * @Date: 2021-04-28 18:45:40
 * @LastEditTime: 2021-04-28 19:56:18
 * @LastEditors: linbin
 * @Description: 防抖
 * @FilePath: /study/function/debounce.js
 */
function debounce(func, wait) {
    var timeout
    return function () {
        clearTimeout(timeout)
        timeout = setTimeout((...arg) => {
            timeout = null
            func.apply(this, ...arg)
        }, wait)
    }
}
