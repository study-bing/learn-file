/*
 * @Author: linbin
 * @Date: 2021-09-17 15:02:02
 * @LastEditTime: 2021-09-20 13:47:44
 * @LastEditors: linbin
 * @Description: 哈希
 * @FilePath: /study/function/hashTable.js
 */
class HashTable {
    constructor(limit = 7) {
        this.storage = [] // [[[key, value]],[[key, value]],[[key, value]]]
        this.limit = limit
        this.length = 0
    }
    hashFunc(str, size = this.limit) {
        let hashCode = 0
        // 霍纳算法
        for (let index = 0; index < str.length; index++) {
            hashCode = hashCode * 37 + str.charCodeAt(index)
        }
        return hashCode % size
    }
    // 添加值
    put(key, value) {
        // 根据key获取索引值
        let index = this.hashFunc(key)
        let bucket = this.storage[index]
        // 如果索引下无桶，测创建桶
        if (!bucket) {
            bucket = []
            this.storage[index] = bucket
        }
        for (let index = 0; index < bucket.length; index++) {
            if (bucket[index][0] === key) {
                bucket[index][1] = value
                return
            }
        }
        bucket.push([key, value])
        this.length++
        if (this.limit * 0.75 < this.length) {
            let newSize = this.getPrime(this.limit * 2)
            this.resize(newSize)
        }

        return true
    }
    // 获取值
    get(key) {
        // 根据key获取索引值
        let index = this.hashFunc(key)
        let bucket = this.storage[index] || []
        for (let index = 0; index < bucket.length; index++) {
            if (bucket[index][0] === key) {
                return bucket[index][1]
            }
        }
        return null
    }
    // 删除
    remove(key) {
        // 根据key获取索引值
        let index = this.hashFunc(key)
        let bucket = this.storage[index] || []
        for (let index = 0; index < bucket.length; index++) {
            if (bucket[index][0] === key) {
                this.length--
                if (this.limit > 7 && this.limit * 0.25 > this.length) {
                    let newSize = this.getPrime(Math.floor(this.limit / 2))
                    this.resize(newSize)
                }
                return bucket[index][1]
            }
        }
        return false
    }
    // 是否为空
    isEmpty() {
        return this.length > 0
    }
    // 返回长度
    size() {
        return this.length
    }
    // 清空
    clear() {
        this.storage = []
        this.length = 0
    }
    // 判断是否是质数
    isPrime(num) {
        // num 因式分解 x * y   x和y中肯定有一个数比根号num小
        let temp = Math.floor(Math.sqrt(num))
        for (let index = 2; index < temp; index++) {
            if (index % 2 === 0) {
                return false
            }
        }
        return true
    }
    getPrime(num) {
        while (!this.isPrime(num)) {
            num++
        }
        return num
    }
    // 扩容，缩小容量
    resize(limit) {
        let oldStorage = this.storage
        // 重置
        this.limit = limit
        this.storage = []
        this.length = 0
        for (let index = 0; index < oldStorage.length; index++) {
            let bucket = this.storage[index]
            if (!bucket) {
                continue
            }
            for (let i = 0; i < bucket.length; i++) {
                this.put(bucket[i][0], bucket[i][1])
            }
        }
    }
}