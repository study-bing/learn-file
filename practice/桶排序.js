/*
 * @Author: linbin
 * @Date: 2021-10-13 14:42:49
 * @LastEditTime: 2021-10-13 15:25:54
 * @LastEditors: linbin
 * @Description:
 * @FilePath: /study/test/桶排序.js
 */

// 获取个十百千位的数字 x数字，d第几位
function getDigit(x, d) {
    return parseInt(x / Math.pow(10, d - 1)) % 10
}
// 算出最长位数
function maxbits(array) {
    let max = 0
    for (let index = 0; index < array.length; index++) {
        max = Math.max(max, array[index])
    }
    let res = 0
    while (max !== 0) {
        res++
        max = parseInt(max / 10)
    }
    return res
}
function radixSort(arr) {
    if (Array.isArray(arr) && arr.length > 1) {
        radixSortHandle(arr, 0, arr.length - 1, maxbits(arr))
    } else {
        return false
    }
}
function radixSortHandle(arr, left, right, digit) {
    let radix = 10
    let j = 0
    let bucket = Array(right - left + 1).fill(0)
    for (let index = 0; index <= digit; index++) {
        let count = Array(radix).fill(0)
        for (let i = left; i <= right; i++) {
            j = getDigit(arr[i], index)
            count[j]++
        }
        for (let i = 1; i < radix; i++) {
            count[i] = count[i] + count[i - 1]
        }
        let num = 0
        for (let i = right; i >= left; i--) {
            num = getDigit(arr[i], index)
            bucket[count[num] - 1] = arr[i]
            count[num]--
        }
        for (let i = left, j = 0; i <= right; i++, j++) {
            arr[i] = bucket[j]
        }
    }
}
let arry = [23, 34, 102, 32, 54, 32]
radixSort(arry)
console.log(arry)
