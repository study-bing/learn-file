function heapify(array, index, heapSize) {
    let left = index * 2 + 1
    while (left < heapSize) {
        let largest =
            left + 1 < heapSize && array[left + 1] > array[left]
                ? left + 1
                : left
        largest = array[largest] > array[index] ? largest : index
        if (largest === index) {
            break
        }
        swap(array, largest, index)
        index = largest
        left = index * 2 + 1
    }
}
function swap(array, l, r) {
    ;[array[l], array[r]] = [array[r], array[l]]
}

function heapSort(array) {
    if (Array.isArray(array)) {
        if (array.length < 2) {
            return
        }
        // O(N)
        // 数慢慢插入变成大根堆
        // for (let index = 0; index < array.length; index++) {
        //     hearInsert(array, index) // O(logN)
        // }
        // 换位变成大根堆
        for (let index = array.length - 1; index >= 0; index--) {
            heapify(array, index, array.length)
        }
        let heapSize = array.length
        swap(array, 0, --heapSize)
        // O(N)
        while (heapSize > 0) {
            heapify(array, 0, heapSize) // O(logN)
            swap(array, 0, --heapSize)
        }
    }
}
function hearInsert(array, index) {
    while (array[index] > array[parseInt((index - 1) / 2)]) {
        swap(array, index, parseInt((index - 1) / 2))
        index = parseInt((index - 1) / 2)
    }
}
let list = [2, 3, 4, 4, 6, 2, 2, 5, 9, 7, 1]
heapSort(list)
console.log(list)
