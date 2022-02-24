/*
 * @Author: linbin
 * @Date: 2021-10-22 10:58:12
 * @LastEditTime: 2021-10-22 13:17:42
 * @LastEditors: linbin
 * @Description: 前缀树
 * @FilePath: /study/test/preTree.js
 */
class TreeNode {
    constructor(val = 'root') {
        this.pass = 0
        this.end = 0
        this.val = val
        this.nexts = Array(26)
    }
}
class PreTree {
    constructor() {
        this.root = new TreeNode()
    }
    insert(str = '') {
        let index = 0
        let node = this.root
        node.pass++
        for (let i = 0; i < str.length; i++) {
            index = str.charCodeAt(i) - 97
            if (!node.nexts[index]) {
                node.nexts[index] = new TreeNode(str[i])
            }
            node = node.nexts[index]
            node.pass++
        }
        node.end++
    }
    delete(str = '') {
        if (this.search(str) > 0) {
            let index = 0
            let node = this.root
            node.pass--
            for (let i = 0; i < str.length; i++) {
                index = str.charCodeAt(i) - 97
                if (--node.nexts[index].pass === 0) {
                    node.nexts[index] = null
                    return false
                }
                node = node.nexts[index]
            }
            node.end--
            return true
        }
        return false
    }
    search(str = '') {
        let index = 0
        let node = this.root
        for (let i = 0; i < str.length; i++) {
            index = str.charCodeAt(i) - 97
            if (!node.nexts[index]) {
                return 0
            }
            node = node.nexts[index]
        }
        return node.end
    }
}
let preTree = new PreTree()
preTree.insert('abc')
preTree.insert('bbb')
preTree.insert('abc')
preTree.insert('abc')
preTree.delete('abc')
console.log(preTree.search('abc'))
