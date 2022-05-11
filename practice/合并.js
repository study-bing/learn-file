/*
 * @Author: linBin
 * @Date: 2022-03-28 16:52:46
 * @LastEditTime: 2022-03-28 17:01:10
 * @LastEditors: linBin
 * @Description: file content
 * @FilePath: /learn-file/practice/合并.js
 */
// 例如：
const arr = [
    ["a", "b", "c"],
    ["a", "d"],
    ["d", "e"],
    ["f", "g"],
    ["h", "g"],
    ["i"],
]
// 运行后的返回结果是：
// [
//     ['a', 'b', 'c', 'd', 'e'],
//     ['f', 'g', 'h'],
//     ['i']
// ]
function transform(arr) {
    arr = arr.map((el) => el.sort()).sort()
    let result = []
    const item = arr.reduce((pre, cur) => {
        if (
            cur.some((el) => {
                return pre.includes(el)
            })
        ) {
            pre = pre.concat(cur)
        } else {
            result.push(pre)
            pre = cur
        }
        return [...new Set(pre)]
    })
    result.push(item)
    return result
}
transform(arr)
console.log(transform(arr));
