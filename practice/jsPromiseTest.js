/*
 * @Author: linbin
 * @Date: 2021-01-12 16:33:02
 * @LastEditTime: 2021-01-13 09:42:13
 * @LastEditors: linbin
 * @Description: 测试原生的promise
 * @FilePath: /study/promise/jsPromiseTest.js
 */
let promise = new Promise((resolve, reject) => {
    resolve(1)
    // setTimeout(() => {
    //     new Promise((resolve, reject) => {
    //         resolve(promise)
    //     })
    // }, 0)
})
let p2 = promise
    .then((res) => {
        console.log(res)
        return p2
    })
    .then((res) => {
        console.log(res)
    })
    .catch((el) => {
        console.log(el)
    })
