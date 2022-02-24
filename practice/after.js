/*
 * @Author: linbin
 * @Date: 2021-01-11 13:19:34
 * @LastEditTime: 2021-01-11 14:16:03
 * @LastEditors: linbin
 * @Description:
 * @FilePath: /study/after.js
 */
function after(countVal, fn) {
    return function () {
        if (--countVal === 0) {
            fn()
        }
    }
}
let newFn = after(3, function () {
    console.log(123)
})
newFn()
newFn()
newFn()
