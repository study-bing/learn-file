let arr = [
    { id: 1, name: "部门1", pid: 0 },
    { id: 2, name: "部门2", pid: 1 },
    { id: 3, name: "部门3", pid: 1 },
    { id: 4, name: "部门4", pid: 3 },
    { id: 5, name: "部门5", pid: 4 },
]
// [
//     {
//         "id": 1,
//         "name": "部门1",
//         "pid": 0,
//         "children": [
//             {
//                 "id": 2,
//                 "name": "部门2",
//                 "pid": 1,
//                 "children": []
//             },
//             {
//                 "id": 3,
//                 "name": "部门3",
//                 "pid": 1,
//                 "children": [
//                 ]
//             }
//         ]
//     }
// ]
function arrayToTree(list) {
    let itemMap = {}
    let result = []
    for (const item of list) {
        itemMap[item.id] = { ...item, children: [] }
    }
    for (const item of list) {
        let id = item.id
        let pid = item.pid
        let treeItem = itemMap[id]
        if (pid === 0) {
            result.push(treeItem)
        } else {
            if (!itemMap[pid]) {
                itemMap[pid] = {
                    children: [],
                }
            }
            itemMap[pid].children.push(treeItem)
        }
    }
    return result
}
console.log(JSON.stringify(arrayToTree(arr)))
;[
    {
        id: 1,
        name: "部门1",
        pid: 0,
        children: [
            { id: 2, name: "部门2", pid: 1, children: [] },
            {
                id: 3,
                name: "部门3",
                pid: 1,
                children: [
                    {
                        id: 4,
                        name: "部门4",
                        pid: 3,
                        children: [
                            { id: 5, name: "部门5", pid: 4, children: [] },
                        ],
                    },
                ],
            },
        ],
    },
]
