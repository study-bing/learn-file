function quickSort(arr, left = 0, right = arr.length - 1) {
    if (!Array.isArray(arr)) {
        return
    }
    if (arr.length <= 1) {
        return arr
    }
    if (left >= right) {
        return
    }
    let mid = getMid(left, right, arr)
    quickSort(arr, left, mid[0] - 1)
    quickSort(arr, mid[1] + 1, right)
    return arr
}
function getMid(l, r, arr) {
    let end = r
    let start = l
    while (l < end) {
        if (arr[l] < arr[r]) {
            ;[arr[start], arr[l]] = [arr[l], arr[start]]
            l++
            start++
        } else if (arr[l] > arr[r]) {
            end--
            ;[arr[l], arr[end]] = [arr[end], arr[l]]
        } else {
            l++
        }
    }
    ;[arr[end], arr[r]] = [arr[r], arr[end]]
    return [start, end]
}
let arr = [3, 4, 5, 2, 1, 4, 5, 6, 7]
quickSort(arr, 0, arr.length - 1)
console.log(quickSort(arr, 0, arr.length - 1))
