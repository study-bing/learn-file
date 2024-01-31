export function combineReducers(reducers) {
    let keys = Reflect.ownKeys(reducers)
    return function (state = {}, action) {
        let nextState = {}
        keys.forEach((key) => {
            nextState[key] = reducers[key](state[key], action)
        })
        return nextState
    }
}
