let hookIndex = 0 // ! 函数渲染的时候 hookIndex需要重置为0
let hookList = []
// 主要是通过ref={}获取到
function useRef(initState) {
    hookList[hookIndex] = hookList[hookIndex] || { current: initState }
    return hookList[hookIndex++]
}

function useImperativeHandle(ref, callback) {
    ref.current = callback()
    return ref
}
