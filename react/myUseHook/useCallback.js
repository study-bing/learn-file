let hookIndex = 0 // ! 函数渲染的时候 hookIndex需要重置为0
let hookList = []
function useCallback(fn, dependencies) {
    if (hookList[hookIndex]) {
        // 缓存过
        let [lastVal, lastDependencies] = hookList[hookIndex]
        // 判断依赖是否一样
        let isSame = lastDependencies.every((el, index) => {
            return el === dependencies[index]
        })
        if (isSame) {
            hookIndex++
            return lastVal
        } else {
            hookList[hookIndex++] = [fn, dependencies]
            return fn
        }
    } else {
        hookList[hookIndex++] = [fn, dependencies]
        return fn
    }
}
