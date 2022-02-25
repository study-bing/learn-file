/*
 * @Author: linbin
 * @Date: 2021-01-11 20:33:04
 * @LastEditTime: 2021-06-22 13:18:38
 * @LastEditors: linbin
 * @Description:
 * @FilePath: /study/promise/test.js
 */
let Mypromise = require("./then")
// let testPromise = new Mypromise((resolve, reject) => {
//     setTimeout(() => {
//         resolve(123)
//     }, 1000)
// })
// testPromise.then((res) => {
//     console.log(res)
// })
// testPromise.then((res) => {
//     setTimeout(() => {
//         console.log(res)
//     }, 1000)
// })
let promise = new Mypromise((resolve, reject) => {
    resolve(1)
    // setTimeout(() => {
    //     new Promise((resolve1, reject2) => {
    //         resolve(123)
    //     })
    // }, 0)
})
let p3 = promise
    .then(
        (res) => {
            return {
                then: function(){
                    console.log('then');
                }
            }
        },
        (err) => {
            console.log(err)
        }
    )
    .then(
        (res) => {
            console.log('res', res);
            return 333333
        },
        (err) => {
            console.log(err)
        }
    )
let p2 = promise.then(
    (res) => {
        return p3
    },
    (err) => {
        console.log(err)
    }
)
// .then(
//     (res) => {
//         console.log(231)
//         console.log(res)
//         return 1
//     },
//     (err) => {
//         console.log(555)
//         console.log(err)
//     }
// )
// p2.then(
//     (res) => {
//         console.log("res", res)
//     },
//     (err) => {
//         console.log(err)
//     }
// )
setTimeout(() => {
    console.log("setTimeout")
}, 0)
Mypromise.resolve().then(() => {
    console.log("Promise")
})
