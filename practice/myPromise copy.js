/*
 * @Author: linbin
 * @Date: 2021-01-11 19:38:37
 * @LastEditTime: 2021-01-12 14:43:58
 * @LastEditors: linbin
 * @Description: 实现promise基础方法
 * @FilePath: /study/promise/myPromise.js
 */
// ! 1.三个状态，等待，成功，失败，一旦成功不能失败
// ! 2.每个promise能实现then方法
// ! 3.抛出异常执行失败方法

const PENDING = "PENDING"
const FULFILLED = "FULFILLED"
const REJECTED = "REJECTED"
class Mypromise {
    constructor(executor) {
        let resolve = (value) => {
            if (this.status === PENDING) {
                this.status = FULFILLED
                this.value = value
                this.fulfillCallback.forEach((fn) => {
                    // 发布
                    fn()
                })
            }
        }
        let reject = (reason) => {
            if (this.status === PENDING) {
                this.status = REJECTED
                this.reason = reason
                this.rejectCallback.forEach((fn) => {
                    // 发布
                    fn()
                })
            }
        }
        this.status = PENDING // 初始状态值
        this.value = undefined // 成功值
        this.reason = undefined // 失败原因
        this.fulfillCallback = [] // 成功数组
        this.rejectCallback = [] // 失败数组
        try {
            executor(resolve, reject)
        } catch (error) {
            reject(error)
        }
    }
    then(onfulfilled, onrejected) {
        if (this.status === FULFILLED) {
            onfulfilled(this.value)
        } else if (this.status === REJECTED) {
            onrejected(this.reason)
        } else {
            this.fulfillCallback.push(() => {
                // 订阅
                onfulfilled(this.value)
            })
            this.rejectCallback.push(() => {
                // 订阅
                onrejected(this.reason)
            })
        }
    }
}
module.exports = Mypromise
