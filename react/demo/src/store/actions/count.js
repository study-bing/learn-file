import * as type from "../action-types"
let countHandle = {
    addCount() {
        return {
            type: type.ADD_COUNT,
        }
    },
}
export default countHandle
