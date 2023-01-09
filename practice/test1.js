/*
 * @Author: linbin
 * @Date: 2021-01-15 16:56:00
 * @LastEditTime: 2022-12-05 18:09:16
 * @LastEditors: linBin
 * @Description:
 * @FilePath: /learn-file/practice/test1.js
 */
// let MyPromise = require("./then")
// let fs = require("fs")
// let p1 = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve(123)
//         reject(222)
//     }, 1000)
// })
// p1.then(
//     (res) => {
//         console.log(res)
//     },
//     (err) => {
//         console.log(err)
//     }
// )
// const mp1 = MyPromise.resolve(1)

// const mp2 = MyPromise.resolve(2)

// const mp3 = MyPromise.resolve(3)

// const mp4 = MyPromise.reject(4)

// MyPromise.all([mp1, mp2, mp3]).then(
//     (x) => {
//         console.log(x)
//     },
//     (err) => {
//         console.log("err1", err)
//     }
// )

// MyPromise.race([mp1, mp4, mp2, mp3]).then(
//     (x) => {
//         console.log(x)
//     },
//     (err) => {
//         console.log("err2", err)
//     }
// )
const Promise = require('./then')

// var mp = new Promise((resolve, reject) => {
//     resolve(22222)
// })

// mp.finally(() => {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve()
//         }, 2000)
//     })
// }).then(
//     (x) => {
//         console.log(x)
//     },
//     (err) => {
//         console.log("err2", err)
//     }
// )
// Promise.resolve(
//     new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve("3333")
//         }, 3000)
//     })
// ).then((data) => {
//     console.log(data)
// })
let p1 = Promise.reject(
	new Promise(resolve => {
		resolve('ok')
	})
)
p1.then(res => {
	console.log(res, 11)
})
	.then(el => {
		console.log(el, 222)
	})
	.catch(e => {
		console.log(333)
	})
