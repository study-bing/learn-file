/*
 * @Author: linbin
 * @Date: 2021-04-28 18:00:40
 * @LastEditTime: 2021-06-22 11:19:22
 * @LastEditors: linbin
 * @Description: 节流
 * @FilePath: /study/function/throttle.js
 */
function throttle(fn, delay) {
    let timer = null
    return function () {
        if (timer) {
            return false
        }
        timer = setTimeout((...args) => {
            timer = null
            fn.apply(this, args)
        }, delay)
    }
}
