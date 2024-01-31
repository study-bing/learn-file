import { connect } from "react-redux"
import actionObj from "../store/actions/index"
import { useMemo } from "react"
function ReduxDemo(props) {
    let { count } = props
    let aaa = useMemo(() => {
        return count.count + 1
    }, [count])
    return (
        <>
            <div>{count.count}</div>
            <div onClick={props.addCount}>add</div>
            <img src={require("./最长递增子序列.jpg")} alt="" />
            <p>{aaa}</p>
        </>
    )
}
export default connect((state) => {
    return { count: state.count }
}, actionObj.count)(ReduxDemo)
