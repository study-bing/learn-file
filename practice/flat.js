/*
 * @Author: linbin
 * @Date: 2021-04-28 14:08:58
 * @LastEditTime: 2021-04-28 14:21:10
 * @LastEditors: linbin
 * @Description: 数组平铺
 * @FilePath: /study/function/flat.js
 */
function flat(array = [], num = 1) {
    return num > 0
        ? array.reduce((pre, current) => {
              return Array.isArray(current)
                  ? pre.concat(flat(current, num - 1))
                  : [...pre, current]
          }, [])
        : array
}
const arr = [1, 2, 3, 4, [1, 2, 3, [1, 2, 3, [1, 2, 3]]], 5, "string", { name: "弹铁蛋同学" }]

console.log(flat(arr, 4))
