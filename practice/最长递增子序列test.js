// ! https://juejin.cn/post/7198506378432184377
function test() {
    let arr = [2, 4, 5, 3, 1, 9, 7, 8]
    let list = [0] // 存放位置,主要是用来计算长度的
    let record = [] // 存放上一个比当前值小的数所在的位置(可以理解为存放list中比当前值小的上一位数，因为list记录的是位置)
    for (let i = 0; i < arr.length; i++) {
        const element = arr[i]
        if (element !== 0) {
            const last = list[list.length - 1]
            if (arr[last] < element) {
                record[i] = last
                list.push(i)
                continue
            }
            let left = 0,
                right = list.length - 1
            while (left < right) {
                const mid = (left + right) >> 1
                if (arr[list[mid]] < arr[i]) {
                    left = mid + 1
                } else {
                    right = mid
                }
            }
            if (element < arr[list[left]]) {
                if (left > 0) {
                    record[i] = list[left - 1]
                }
                list[left] = i
            }
        }
    }
    console.log(record, list)
    // 已经计算出长度，然后根据最大值回溯，p中记录了比当前值小的上一位，所以依次往前查找
    let i = list.length
    let last = list[i - 1]
    while (i-- > 0) {
        list[i] = last
        last = record[last]
    }
    console.log(list)
    let result = list.map((el) => {
        return arr[el]
    })

    console.log(result)
}
test()
