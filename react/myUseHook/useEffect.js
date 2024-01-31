let hookIndex = 0 // ! 函数渲染的时候 hookIndex需要重置为0
let hookList = []
function useEffect(fn, dependencies) {
    if (hookList[hookIndex]) {
        let isSame = false
        // 缓存过
        let [lastVal, lastDependencies] = hookList[hookIndex]
        if (dependencies) {
            // 判断依赖是否一样
            isSame = lastDependencies.every((el, index) => {
                return el === dependencies[index]
            })
        }
        if (isSame) {
            hookIndex++
        } else {
            lastVal && lastVal()
            let arr = [, dependencies]
            setTimeout(() => {
                arr[0] = fn()
            }, 0)
            hookList[hookIndex++] = arr
        }
    } else {
        let arr = [, dependencies]
        setTimeout(() => {
            arr[0] = fn()
        }, 0)
        hookList[hookIndex++] = arr
    }
}
