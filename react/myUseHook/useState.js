let hookIndex = 0 // ! 函数渲染的时候 hookIndex需要重置为0
let hookList = []
function useState(val) {
    hookList[hookIndex] = hookList[hookIndex] || val
    // 先保留索引，让函数执行的时候拿到的是正确的值
    let currentIndex = hookIndex
    function setState(newValue) {
        hookList[currentIndex] = newValue
        // 渲染函數
    }
    return [hookList[hookIndex++], setState]
}
