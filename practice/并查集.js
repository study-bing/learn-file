/*
 * @Author: linbin
 * @Date: 2021-10-28 09:38:39
 * @LastEditTime: 2021-10-28 10:40:52
 * @LastEditors: linbin
 * @Description:
 * @FilePath: /study/test/并查集.js
 */
class Element {
    constructor(val) {
        this.val = val
    }
}
class UnionFindSet {
    constructor(list = []) {
        this.elementMap = new Map()
        this.fatherMap = new WeakMap()
        this.sizeMap = new WeakMap()
        for (let index = 0; index < list.length; index++) {
            const val = list[index]
            const element = new Element(val)
            this.elementMap.set(val, element)
            this.fatherMap.set(element, element)
            this.sizeMap.set(element, 1)
        }
    }
    /**
     * @author: linbin
     * @Date: 2021-10-28 09:45:15
     * @description: 判断是否在一个集合
     * @param {*} a
     * @param {*} b
     * @return {*}
     */
    isSameSet(a, b) {
        if (this.elementMap.has(a) && this.elementMap.has(b)) {
            return (
                this.findHead(this.elementMap.get(a)) ===
                this.findHead(this.elementMap.get(b))
            )
        }
        return false
    }
    /**
     * @author: linbin
     * @Date: 2021-10-28 09:46:07
     * @description: 查找最顶端的值
     * @param {*} val
     * @return {*}
     */
    findHead(val) {
        let array = []
        while (this.fatherMap.get(val) !== val) {
            array.push(val)
            val = this.fatherMap.get(val)
        }
        while (array.length > 0) {
            this.fatherMap.set(array.pop(), val)
        }
        return val
    }
    /**
     * @author: linbin
     * @Date: 2021-10-28 10:19:22
     * @description: 将2个值并集
     * @param {*}
     * @return {*}
     */
    union(a, b) {
        if (this.elementMap.has(a) && this.elementMap.has(b)) {
            let aF = this.findHead(this.elementMap.get(a))
            let bF = this.findHead(this.elementMap.get(b))
            if (aF !== bF) {
                let big = this.sizeMap.get(aF) >= this.sizeMap.get(bF) ? aF : bF
                let small = big === aF ? bF : aF
                this.fatherMap.set(small, big)
                this.sizeMap.set(
                    big,
                    this.sizeMap.get(aF) + this.sizeMap.get(bF)
                )
                this.sizeMap.delete(small)
            }
        }
    }
}
let u = new UnionFindSet([1, 2, 3, 4])
u.union(1, 2)
console.log(u.isSameSet(1, 2))
