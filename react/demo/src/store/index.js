import { createStore, applyMiddleware } from "redux"
import reduxLog from "redux-logger"
import reducer from "./reducer"
export default createStore(reducer, applyMiddleware(reduxLog))
