/*
 * @Author: linbin
 * @Date: 2021-09-24 10:53:40
 * @LastEditTime: 2021-09-24 11:28:17
 * @LastEditors: linbin
 * @Description:
 * @FilePath: /study/function/insertSearch.js
 */
let searchInsert = function (nums, target) {
    return searchSplit(nums, 0, nums.length - 1, 0, target)
}
let searchSplit = function (nums, l, r, count, target) {
    if (l === r) {
        return nums[l] === target ? count : 0
    }
    let middle = l + ((r - l) >> 1) // 等于l+(r-l)/2
    if (nums[middle] >= target) {
        searchSplit(nums, l, middle, count, target)
    } else {
        count = middle + 1
        searchSplit(nums, middle + 1, r, count, target)
    }
}
searchInsert([1, 3, 5, 6], 5)
console.log(searchInsert([1, 3, 5, 6], 5));
