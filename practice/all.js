/*
 * @Author: linbin
 * @Date: 2021-01-11 15:34:42
 * @LastEditTime: 2021-01-11 15:56:24
 * @LastEditors: linbin
 * @Description:模仿promiseAll 回调函数
 * @FilePath: /study/all.js
 */
let fs = require("fs")
fs.readFile("./1.txt", "utf-8", (err, data) => {
    out("name1", data)
})
fs.readFile("./2.txt", "utf-8", (err, data) => {
    out("name2", data)
})
let out = after(2, (result) => {
    console.log(result)
})
function after(count, callback) {
    let data = {}
    return function (key, value) {
        data[key] = value
        if (--count === 0) {
            callback(data)
        }
    }
}
