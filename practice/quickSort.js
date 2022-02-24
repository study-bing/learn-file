/*
 * @Author: linbin
 * @Date: 2021-09-13 09:57:24
 * @LastEditTime: 2021-10-01 15:33:04
 * @LastEditors: linbin
 * @Description: 快速排序
 * @FilePath: /study/test/quickSort.js
 */
function quickSort(array = [], l, r) {
    if (l < r) {
        swap(array, l + parseInt(Math.random() * (r - l + 1)), r)
        let p = partition(array, l, r)
        quickSort(array, l, p[0] - 1)
        quickSort(array, p[1] + 1, r)
    }
}
function partition(array, l, r) {
    let start = l // <区边界
    let end = r // >区边界
    while (l < end) {
        if (array[l] < array[r]) {
            swap(array, start++, l++)
        } else if (array[l] > array[r]) {
            swap(array, --end, l)
        } else {
            l++
        }
    }
    swap(array, end, r)
    return [start, end]
}
function swap(array, l, r) {
    ;[array[l], array[r]] = [array[r], array[l]]
}
let arry = [3, 4, 5, 2, 1, 4, 5, 6, 7]
quickSort(arry, 0, arry.length - 1)
console.log(arry)
