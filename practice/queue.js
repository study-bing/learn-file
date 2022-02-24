/*
 * @Author: linbin
 * @Date: 2021-09-15 10:46:07
 * @LastEditTime: 2021-09-20 13:48:46
 * @LastEditors: linbin
 * @Description: 队列
 * @FilePath: /study/function/queue.js
 */
class Queue {
    constructor() {
        this.items = []
    }
    // 添加一个新元素到队列顶。
    enqueue(val) {
        this.items.push(val)
    }
    // 移除队列尾部的元素，同时返回被移除的元素
    dequeue() {
        return this.items.shift()
    }
    // 返回队列顶的元素，不对队列做任何的修改（这个方法不会移除队列顶的元素，仅仅是返回它）
    front() {
        return this.items[0]
    }
    // 如果队列里没有任何元素都返回true，否则返回false。
    isEmpty() {
        return this.items.length > 0
    }
    // 移除队列里的所有元素
    clear() {
        this.items.length = 0
    }
    // 返回队列里的元素个数，这个方法和数组的length属性很类似。
    size() {
        return this.items.length
    }
}
// 给一组玩家数组以及一位数字，数到数字的玩家退出，返回最后剩下的玩家名称
function demo(nameList, num) {
    let queue = new Queue()
    for (let index = 0; index < nameList.length; index++) {
        queue.enqueue(nameList[index])
    }
    let count = 1 // 从1开始数
    while (queue.size() > 1) {
        if (count === num) {
            queue.dequeue()
            count = 1
        } else {
            queue.enqueue(queue.dequeue())
            count++
        }
    }
    return queue.front()
}
function demo1(nameList, num) {
    let queue = new Queue()
    for (let index = 0; index < nameList.length; index++) {
        queue.enqueue(nameList[index])
    }
    while (queue.size() > 1) {
        for (let index = 0; index < num; index++) {
            queue.enqueue(queue.dequeue())
        }
        queue.dequeue()
    }
    return queue.front()
}
console.log(demo([1, 2, 3, 4, 5, 6, 7, 8, 9], 11))
console.log(demo([1, 2, 3, 4, 5, 6, 7, 8, 9], 11))

// 优先级列表，根据传入的优先级进行排序
class PriorityQueue extends Queue {
    constructor() {
        super()
        this.items = []
    }
    enqueue(val, priority) {
        let queueElement = {
            val,
            priority,
        }
        let added = false
        for (let index = 0; index < this.items.length; index++) {
            const element = this.items[index]
            if (queueElement.priority < element.priority) {
                this.items.splice(index, 0, queueElement)
                added = true
                break
            }
        }
        if (!added) {
            this.items.push(queueElement)
        }
    }
}
let priority = new PriorityQueue()
priority.enqueue('a', 1)
priority.enqueue('ba', 3)
priority.enqueue('c', 2)
priority.enqueue('44',4)
console.log(priority);
console.log(priority.front());