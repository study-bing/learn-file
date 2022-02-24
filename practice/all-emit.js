/*
 * @Author: linbin
 * @Date: 2021-01-11 15:34:42
 * @LastEditTime: 2021-04-28 19:05:30
 * @LastEditors: linbin
 * @Description:模仿promiseAll 发布订阅
 * @FilePath: /study/all-emit.js
 */
let fs = require("fs")
let params = {}
let event = {
    _arr: [],
    on(fn) {
        this._arr.push(fn)
    },
    emit() {
        this._arr.forEach((el) => {
            el()
        })
    },
}
fs.readFile("./1.txt", "utf-8", (err, data) => {
    params.name1 = data
    event.emit()
})
fs.readFile("./2.txt", "utf-8", (err, data) => {
    params.name2 = data
    event.emit()
})

event.on(() => {
    console.log("执行一次")
})
event.on(() => {
    if (Object.keys(params).length === 2) {
        console.log(params)
    }
})
