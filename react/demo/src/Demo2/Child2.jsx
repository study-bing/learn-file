import React, { useState } from "react"
export default React.memo(function Demo2(props) {
    console.log("child2")
    let [aa, setAa] = useState(0)
    return (
        <>
            child2组件
            <p>{aa}</p>
            <div onClick={props.change.bind(null, 12)}>change</div>
            <div
                onClick={() => {
                    setAa(123)
                }}
            >
                changeAa
            </div>
        </>
    )
})
