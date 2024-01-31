import { Provider } from "react-redux"
import Count from "./Count"
import store from "../store"
function ReduxDemo() {
    return (
        <Provider store={store}>
            count页面
            <Count />
        </Provider>
    )
}
export default ReduxDemo
