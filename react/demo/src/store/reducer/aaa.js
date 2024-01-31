
const init = {
    a: 1,
}

export default function abc(state = init, action) {
    state = { ...state }
    switch (action.type) {
        case "abc":
            console.log(123)
            state.a = 123
            break
        default:
    }
    return state
}
