function arrayToTree(list) {
    let result = []
    let itemMap = {}
    list.forEach((el) => {
        itemMap[el.id] = {
            ...el,
            children: [],
        }
    })
    list.forEach((el) => {
        if (el.pid === 0) {
            result.push(itemMap[el.id])
        } else {
            if (itemMap[el.pid]) {
                itemMap[el.pid].children.push(itemMap[el.id])
            }
        }
    })
    return result
}
let arr = [
    { id: 1, name: "部门1", pid: 0 },
    { id: 2, name: "部门2", pid: 1 },
    { id: 3, name: "部门3", pid: 1 },
    { id: 4, name: "部门4", pid: 3 },
    { id: 5, name: "部门5", pid: 4 },
]
console.log(arrayToTree(arr))
