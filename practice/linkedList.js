/*
 * @Author: linbin
 * @Date: 2021-09-15 15:20:46
 * @LastEditTime: 2021-09-20 13:47:48
 * @LastEditors: linbin
 * @Description: 链表
 * @FilePath: /study/function/linkedList.js
 */
class Node {
    constructor(data) {
        this.data = data
        this.next = null
    }
}
class LinkedList {
    constructor() {
        this.length = 0
        this.head = null
    }
    // 在单链表的尾部添加元素
    append(data) {
        let nodeElement = new Node(data)
        if (this.head === null) {
            this.head = nodeElement
        } else {
            let current = this.head
            while (current.next) {
                current = current.next
            }
            current.next = nodeElement
        }
        this.length++
    }
    // 向单链表中插入元素
    insert(position, data) {
        // 下标不符合直接return false
        if (position > this.length || position < 0) {
            return false
        }
        let nodeElement = new Node(data)
        if (position === 0) {
            nodeElement.next = this.head
            this.head = nodeElement
        } else {
            let current = this.head
            let preElement = null
            let index = 0
            // a->b->c preElement记录a current记录c  b为插入的元素
            while (index < position) {
                preElement = current
                current = current.next
                index++
            }
            nodeElement.next = current
            preElement.next = nodeElement
        }
        this.length++
        return true
    }
    // 在单链表中寻找position位置的元素
    get(position) {
        // 下标不符合直接return null
        if (position >= this.length || position < 0) {
            return null
        }
        let current = this.head
        let index = 0
        while (index < position) {
            current = current.next
            index++
        }
        return current.data
    }
    // 单链表的遍历显示
    toString() {
        let current = this.head
        let list = []
        while (current) {
            list.push(current.data)
            current = current.next
        }
        return list.join('')
    }
    // 在单链表中寻找item元素
    find(data) {
        if (!data) {
            return -1
        }
        let current = this.head
        let index = 0
        while (current) {
            if (current.data === data) {
                return index
            }
            current = current.next
            index++
        }
        return -1
    }
    // 获取单链表的最后一个节点
    findLast() {
        let current = this.head
        let index = 0
        while (index < this.length - 1) {
            current = current.next
            index++
        }
        return current ? current.data : null
    }
    // 将单链表中position位置元素修改为data
    update(position, data) {
        // 下标不符合直接return false
        if (position >= this.length || position < 0) {
            return false
        }
        let current = this.head
        let index = 0
        while (index < position) {
            current = current.next
            index++
        }
        current.data = data
        return true
    }
    // 在单链表中删除position位置节点
    removeAt(position) {
        // 下标不符合直接return false
        if (position >= this.length || position < 0) {
            return false
        }
        let current = this.head
        if (position === 0) {
            this.head = current.next
        } else {
            let preElement = null
            let index = 0
            // a->b->c preElement记录a current记录c  b为删除的元素
            while (index < position) {
                preElement = current
                current = current.next
                index++
            }
            preElement.next = current.next
        }
        this.length--
        return current.data
    }
    // 在单链表中删除一个节点
    remove(data) {
        let position = this.find(data)
        return this.removeAt(position)
    }
    // 如果单链表里没有任何元素都返回true，否则返回false。
    isEmpty() {
        return this.length > 0
    }
    // 清空单链表
    clear() {
        this.head = null
        this.length = 0
    }
    // 返回单链表的元素个数，这个方法和数组的length属性很类似。
    size() {
        return this.length
    }
}

let linkList = new LinkedList()
linkList.append('a')
linkList.append('b')
linkList.update(1, 'c')
// console.log(linkList.removeAt(1));
console.log(linkList.findLast())
console.log(linkList)
