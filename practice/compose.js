function a(a) {
    return a
}
function b(a) {
    return a + "b"
}
function c(b) {
    return b + "c"
}

// function compose(fns = []) {
//     return (...args) => {
//         if (fns.length === 0) return args
//         if (fns.length === 1) return fns[1](...args)
//         return fns.reduceRight((pre, cur) => {
//             return cur(typeof pre === "function" ? pre(...args) : pre)
//         })
//     }
// }
function compose(fns) {
    // reduceRight方法使输入函数从右往左执行,从左往右的话可以使用数组的reduce方法
    return function (x) {
        return fns.reduceRight(
            (accumulator, currentValue) => currentValue(accumulator),
            x
        )
    }
}

let abc = compose([c, b, a])("a")

console.log(abc) // 'abc'
