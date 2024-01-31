import * as type from "../action-types"
const init = {
    count: 1,
}

export default function count(state = init, action) {
    state = { ...state }
    switch (action.type) {
        case type.ADD_COUNT:
            state.count = state.count + 1
            break
        default:
    }
    return state
}
