const list = [
    { id: 1, name: "部门1", pid: 0 },
    { id: 2, name: "部门1-1", pid: 1 },
    { id: 3, name: "部门1-2", pid: 1 },
    { id: 4, name: "部门1-1-1", pid: 2 },
    { id: 5, name: "部门1-2-1", pid: 3 },
    { id: 6, name: "部门2", pid: 0 },
    { id: 7, name: "部门2-1", pid: 6 },
    { id: 8, name: "部门3", pid: 0 },
]
let arrayToTree = (arr) => {
    let obj = {}
    arr.forEach((item) => {
        obj[item.id] = item
    })
    let tree = []
    arr.forEach((item) => {
        if (item.pid === 0) {
            tree.push(item)
            return
        }
        if (obj[item.pid].children) {
            obj[item.pid].children.push(obj[item.id])
        } else {
            obj[item.pid].children = [obj[item.id]]
        }
    })
    return tree
}
console.log(arrayToTree(list))
