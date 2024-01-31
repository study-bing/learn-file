let hookIndex = 0 // ! 函数渲染的时候 hookIndex需要重置为0
let hookList = []
function useReducer(reducer, initState) {
    hookList[hookIndex] = hookList[hookIndex] || initState
    let currentIndex = hookIndex
    function dispatch(action) {
        hookList[currentIndex] = reducer(hookList[currentIndex], action)
        // 渲染dom
    }
    return [hookList[hookIndex++], dispatch]
}
