const { chdir } = require("process")

/*
 * @Author: linbin
 * @Date: 2021-01-11 17:32:07
 * @LastEditTime: 2021-01-11 17:58:12
 * @LastEditors: linbin
 * @Description:观察者模式
 * @FilePath: /study/observer.js
 */
class Child {
    constructor(state) {
        this.state = state
        this._arry = []
    }
    attach(o) {
        this._arry.push(o)
    }
    setState(newState) {
        this.state = newState
        this._arry.forEach((el) => {
            el.update(newState)
        })
    }
}
class Parent {
    constructor(name) {
        this.name = name
    }
    update(val) {
        console.log(`${this.name}：宝宝${val}`)
    }
}
let child = new Child("睡着")
let p1 = new Parent("我")
let p2 = new Parent("媳妇")
child.attach(p1)
child.attach(p2)
child.setState("醒了")
// https://www.cnblogs.com/lovesong/p/5272752.html 观察者和订阅者的区别。
