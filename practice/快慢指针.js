/*
 * @Author: linbin
 * @Date: 2021-10-13 16:19:34
 * @LastEditTime: 2021-10-14 10:11:33
 * @LastEditors: linbin
 * @Description:
 * @FilePath: /study/test/快慢指针.js
 */
function arrow(str) {
    let s = 0
    let f = 2
    while (f < str.length) {
        s++
        f += 2
    }

    return [str[s], f]
}
console.log(arrow('abcdef')) // c 6
