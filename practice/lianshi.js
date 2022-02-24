/*
 * @Author: linbin
 * @Date: 2021-03-26 10:18:33
 * @LastEditTime: 2021-11-01 14:30:18
 * @LastEditors: linbin
 * @Description:  链式调用
 * @FilePath: /study/lianshi.js
 */
function Test(name) {
    this.task = []
    let fn = () => {
        console.log(name)
        this.next()
    }
    this.task.push(fn)
    setTimeout(() => {
        this.next()
    }, 0)
    return this
}

Test.prototype.firstSleep = function (timer) {
    console.time("firstSleep")
    let that = this
    let fn = () => {
        setTimeout(() => {
            console.timeEnd("firstSleep")
            that.next()
        }, timer * 1000)
    }
    this.task.unshift(fn)
    return this
}

Test.prototype.sleep = function (timer) {
    console.time("sleep")
    let that = this
    let fn = () => {
        setTimeout(() => {
            console.timeEnd("sleep")
            that.next()
        }, timer * 1000)
    }
    this.task.push(fn)
    return this
}

Test.prototype.eat = function (dinner) {
    let that = this
    let fn = () => {
        console.log(dinner)
        that.next()
    }
    this.task.push(fn)
    return this
}

Test.prototype.next = function (dinner) {
    let fn = this.task.shift()
    fn && fn()
}

new Test("test").firstSleep(3).sleep(1).eat("dinner")
