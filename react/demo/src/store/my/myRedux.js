export const createStore = function createStore(reducer) {
    let state
    let cbs = []
    const dispatch = function (action) {
        state = reducer(state, action)
        cbs.forEach(el => {
            el()
        })
        return action
    }
    const getState = function () {
        return state
    }
    const subscribe = function (cb) {
        if (cbs.includes(cb)) {
            return
        } else {
            cbs.push(cb)
            return () => {
                const index = cbs.indexOf(cb)
                cbs.splice(index, 1)
            }
        }
    }
    // 默认执行一次  为state赋值
    dispatch({
        type: Symbol()
    })
    return {
        dispatch,
        getState,
        subscribe,
    }
}
