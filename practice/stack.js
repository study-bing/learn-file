/*
 * @Author: linbin
 * @Date: 2021-09-15 10:06:14
 * @LastEditTime: 2021-09-15 10:50:25
 * @LastEditors: linbin
 * @Description: 栈
 * @FilePath: /study/function/stack.js
 */
class Stack {
    constructor() {
        this.items = []
    }
    // 添加一个新元素到栈顶。
    push(val) {
        this.items.push(val)
    }
    // 移除栈顶的元素，同时返回被移除的元素
    pop() {
        return this.items.pop()
    }
    // 返回栈顶的元素，不对栈做任何的修改（这个方法不会移除栈顶的元素，仅仅是返回它）
    peek() {
        return this.items[this.items.length - 1]
    }
    // 如果栈里没有任何元素都返回true，否则返回false。
    isEmpty() {
        return this.items.length > 0
    }
    // 移除栈里的所有元素
    clear() {
        this.items.length = 0
    }
    // 返回栈里的元素个数，这个方法和数组的length属性很类似。
    size() {
        return this.items.length
    }
}
// 十进制转换二进制
function dec2bin(decNum) {
    let stack = new Stack()
    while (decNum > 0) {
        stack.push(decNum % 2)
        decNum = Number.parseInt(decNum / 2)
    }
    let decShow = []
    while (stack.size() > 0) {
        decShow.push(stack.pop())
    }
    return decShow.join('')
}
console.log(dec2bin(100))
