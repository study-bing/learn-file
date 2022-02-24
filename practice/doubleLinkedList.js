/*
 * @Author: linbin
 * @Date: 2021-09-15 15:20:46
 * @LastEditTime: 2021-09-20 13:47:36
 * @LastEditors: linbin
 * @Description: 双向链表
 * @FilePath: /study/function/doubleLinkedList.js
 */
class Node {
    constructor(data) {
        this.data = data
        this.next = null
        this.prev = null
    }
}
class DoubleLinkedList {
    constructor() {
        this.length = 0
        this.head = null
        this.tail = null // 最后一个元素
    }
    // 在双向链表的尾部添加元素
    append(data) {
        let nodeElement = new Node(data)
        if (this.length === 0) {
            this.head = nodeElement
            this.tail = nodeElement
        } else {
            // a->b->c  tail为c  d要加入，先prev指向c  c的next指向d  最后d变为最后一个元素也就是tail
            nodeElement.prev = this.tail
            this.tail.next = nodeElement
            this.tail = nodeElement
        }
        this.length++
    }
    // 向双向链表中插入元素
    insert(position, data) {
        // 下标不符合直接return false
        if (position > this.length || position < 0) {
            return false
        }
        let nodeElement = new Node(data)
        if (this.length === 0) {
            this.head = nodeElement
            this.tail = nodeElement
        } else {
            if (position === 0) {
                nodeElement.next = this.head
                this.head.prev = nodeElement
                this.head = nodeElement
            } else if (position === this.length) {
                nodeElement.prev = this.tail
                this.tail.next = nodeElement
                this.tail = nodeElement
            } else {
                let current = this.head
                let index = 0
                while (index < position) {
                    current = current.next
                    index++
                }
                nodeElement.next = current
                nodeElement.prev = current.prev
                current.prev.next = nodeElement
                current.prev = nodeElement
            }
        }
        this.length++
        return true
    }
    // 在双向链表中寻找position位置的元素
    get(position) {
        // 下标不符合直接return null
        if (position >= this.length || position < 0) {
            return null
        }
        let current = {}
        // position大于总数的1/2时从后面遍历
        if (position > this.length >> 1) {
            current = this.tail
            let index = this.length - 1
            while (index > position) {
                current = current.prev
                index--
            }
        } else {
            current = this.head
            let index = 0
            while (index < position) {
                current = current.next
                index++
            }
        }
        return current.data
    }
    // 双向链表的遍历显示
    toString() {
        let current = this.head
        let list = []
        while (current) {
            list.push(current.data)
            current = current.next
        }
        return list.join('')
    }
    // 返回正向遍历节点字符串形式
    forwardString() {
        let current = this.tail
        let list = []
        while (current) {
            list.push(current.data)
            current = current.prev
        }
        return list.join('')
    }
    // 在双向链表中寻找item元素
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
    // 获取双向链表的最后一个节点
    findLast() {
        return this.tail
    }
    // 将双向链表中position位置元素修改为data
    update(position, data) {
        // 下标不符合直接return false
        if (position >= this.length || position < 0) {
            return false
        }
        let current = {}
        if (position > this.length >> 1) {
            current = this.tail
            let index = this.length - 1
            while (index > position) {
                current = current.prev
                index--
            }
        } else {
            current = this.head
            let index = 0
            while (index < position) {
                current = current.next
                index++
            }
        }
        current.data = data
        return true
    }
    // 在双向链表中删除position位置节点
    removeAt(position) {
        // 下标不符合直接return false
        if (position >= this.length || position < 0) {
            return false
        }
        let current = this.head
        if (this.length === 1) {
            this.head = null
            this.tail = null
        } else {
            if (position === 0) {
                current.prev = null
                this.head = this.head.next
            } else if (position === this.length - 1) {
                this.tail.prev.next = null
                this.tail = this.tail.prev
            } else {
                let index = 0
                while (index++ < position) {
                    current = current.next
                }
                current.next.prev = current.prev
                current.prev.next = current.next
            }
        }
        this.length--
        return current.data
    }
    // 在双向链表中删除一个节点
    remove(data) {
        let position = this.find(data)
        return this.removeAt(position)
    }
    // 如果双向链表里没有任何元素都返回true，否则返回false。
    isEmpty() {
        return this.length > 0
    }
    // 清空双向链表
    clear() {
        this.head = null
        this.tail = null
        this.length = 0
    }
    // 返回双向链表的元素个数，这个方法和数组的length属性很类似。
    size() {
        return this.length
    }
}

let linkList = new DoubleLinkedList()
linkList.append('a')
linkList.append('b')
linkList.append('c')
linkList.append('d')
linkList.append('e')
linkList.append('f')
linkList.append('g')
// console.log(linkList.removeAt(1));
console.log(linkList.get(5))
console.log(linkList.forwardString());
