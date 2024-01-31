import React from "react"
class parent extends React.PureComponent {
    static defaultProps = {
        num: 1,
    }
    state = {
        count: 0,
        xx: 0
    }
    render() {
        let { count } = this.state
        console.log("render")
        return (
            <div>
                <p ref={(x) => (this.abc = x)}> {count}</p>
                <p> {this.props.num}</p>
                <button
                    onClick={() => {
                        this.setState({
                            count: count + 1,
                        })
                    }}
                >
                    add{this.state.xxxx}
                </button>
                <p>{this.state.xx}</p>
            </div>
        )
    }
    componentDidMount() {
        // render已经执行
        this.setState((pre) => {
            console.log(pre, 1)
            return {
                xx: 2,
                xxxx: 333
            }
        })
        this.setState((pre) => {
            console.log(pre, 2)
            return {
                count: 3,
            }
        })
    }
}

export default parent
