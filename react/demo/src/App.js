import React from "react"
class Child1 extends React.PureComponent {
    static defaultProps = {
        num: 1,
    }
    state = {
        count: 0,
        x: 1,
    }
    render() {
        let { count } = this.state
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
                    add
                </button>
            </div>
        )
    }
    componentDidMount() {
        this.setState((pre) => {
            console.log(pre, 1)
            return {
                x: 2,
            }
        })
        this.setState((pre) => {
            console.log(pre, 2)
            return {
                count: 3,
            }
        })
        // render已经执行
        // console.log(this.abc)
    }
}
class parent extends React.PureComponent {
    static defaultProps = {
        num: 1,
    }
    state = {
        count: 0,
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
                    add
                </button>
                <Child1></Child1>
            </div>
        )
    }
    componentDidMount() {
        // render已经执行
        this.setState((pre) => {
            console.log(pre, 1)
            return {
                x: 2,
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
