/*
 * @Author: linbin
 * @Date: 2021-10-28 10:41:48
 * @LastEditTime: 2021-10-28 13:44:55
 * @LastEditors: linbin
 * @Description: kmp
 * @FilePath: /study/test/KMP.js
 */
function getIndexOf(s, m) {
    if (!s || !s || m.length < 1 || s.length < m.length) {
        return -1
    }
    let str1 = s.split('')
    let str2 = m.split('')
    let [i1, i2] = [0, 0]
    let next = getNextArray(str2)
    while (i1 < str1.length && i2 < str2.length) {
        if (str2[i2] === str1[i1]) {
            i1++
            i2++
        } else if (i2 === 0) {
            i1++
        } else {
            i2 = next[i2]
        }
    }
    return i2 === str2.length ? i1 - i2 : -1
}
function getNextArray(strList = []) {
    if (strList.length === 1) {
        return [-1]
    }
    let next = Array(strList.length)
    next[0] = -1
    next[1] = 0
    let [i, cn] = [2, 0]
    while (i < next.length) {
        if (strList[i - 1] === strList[cn]) {
            next[i++] = ++cn
        } else if (cn > 0) {
            cn = next[cn]
        } else {
            next[i++] = 0
        }
    }
    return next
}

console.log(getIndexOf('abc', 'b'));