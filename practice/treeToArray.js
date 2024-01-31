const listTree = [
    {
        id: 1,
        name: "部门1",
        pid: 0,
        children: [
            {
                id: 2,
                name: "部门1-1",
                pid: 1,
                children: [
                    {
                        id: 4,
                        name: "部门1-1-1",
                        pid: 2,
                        children: [],
                    },
                ],
            },
            {
                id: 3,
                name: "部门1-2",
                pid: 1,
                children: [
                    {
                        id: 5,
                        name: "部门1-2-1",
                        pid: 3,
                        children: [],
                    },
                ],
            },
        ],
    },
    {
        id: 6,
        name: "部门2",
        pid: 0,
        children: [
            {
                id: 7,
                name: "部门2-1",
                pid: 6,
                children: [],
            },
        ],
    },
    {
        id: 8,
        name: "部门3",
        pid: 0,
        children: [],
    },
]
let treeToArray = (tree) => {
    let arr = []
    tree.forEach((item) => {
        let { children, ...rest } = item
        arr.push(rest)
        if (children.length) {
            arr = arr.concat(treeToArray(children))
        }
    })
    return arr
}

console.log(treeToArray(listTree));