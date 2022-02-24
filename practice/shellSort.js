/*
 * @Author: linbin
 * @Date: 2021-09-30 23:26:57
 * @LastEditTime: 2021-09-30 23:41:51
 * @LastEditors: linbin
 * @Description: 希尔排序
 * @FilePath: /study/test/shellSort.js
 */
function shellSort(list) {
    let gap = list.length >> 1
    while (gap >= 1) {
        for (let index = gap; index < list.length; index++) {
            j = index
            while (j >= 0 && list[j] < list[j - gap]) {
                swap(list, j, j - gap)
                j = j - gap
            }
        }
        gap = gap >> 1
    }
    return list
}
function swap(array, l, r) {
    ;[array[l], array[r]] = [array[r], array[l]]
}
let arry = [9,8,3,4,6,3,1,5,2]
shellSort(arry)
console.log(arry)