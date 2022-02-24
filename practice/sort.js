/*
 * @Author: linbin
 * @Date: 2021-09-10 16:38:22
 * @LastEditTime: 2021-09-30 23:42:53
 * @LastEditors: linbin
 * @Description: 插入排序
 * @FilePath: /study/test/sort.js
 */
function sortArray(array) {
    for (let index = 1; index < array.length; index++) {
        for (let j = index; array[j - 1] > array[j] && j > 0; j--) {
            array[j - 1] = array[j - 1] ^ array[j]
            array[j] = array[j - 1] ^ array[j]
            array[j - 1] = array[j - 1] ^ array[j]
        }
    }
}
let array = [9, 4, 3, 2, 8, 7, 6, 5]
process(array, 0 , array.length - 1)
console.log(array);
function process(array, l, r) {
    //采用自上而下的递归方法
    if (l === r) {
        return 0
    }
    let middle = l + ((r - l) >> 1) // 等于l+(r-l)/2

    process(array, l, middle)
    process(array, middle + 1, r)
    merge(array, l, middle, r)
}

function merge(array, l, m, r) {
    let result = []
    let i = 0
    let p1 = l
    let p2 = m + 1
    while (p1 <= m && p2 <= r) {
        result[i++] = array[p1] <= array[p2] ? array[p1++] : array[p2++]
    }
    while (p1 <= m) {
        result[i++] = array[p1++]
    }
    while (p2 <= r) {
        result[i++] = array[p2++]
    }
    for (let index = 0; index < result.length; index++) {
        array[l + index] = result[index]
    }
}