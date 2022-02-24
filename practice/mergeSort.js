/*
 * @Author: linbin
 * @Date: 2021-09-13 14:19:48
 * @LastEditTime: 2021-10-01 15:39:27
 * @LastEditors: linbin
 * @Description: 归并排序
 * @FilePath: /study/test/mergeSort.js
 */
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
