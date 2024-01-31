import { useState, useEffect } from "react"
function Demo() {
    let [num, setNum] = useState(0)
    let [param, setParam] = useState({ abc: 1 })
    useEffect(() => {
        console.log(123)
    }, [param])
    return (
        <div>
            {num}
            <span id="a">x</span>
            <button
                onClick={() => {
                    setNum(num + 10)
                }}
            >
                add
            </button>
            <button
                onClick={() => {
                    setParam({
                        abc: 2,
                    })
                }}
            >
                show
            </button>
        </div>
    )
}
export default Demo
