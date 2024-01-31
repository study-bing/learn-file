import { useState, useCallback } from "react"
import Child1 from "./Child1"
import Child2 from "./Child2"
import sty from "./demo.module.css"
import { UlCom, DivCom } from "./common"
import "./test.css"
import ThemeContent from "../ThemeContent"
import store from "../store"
console.log(sty)
export default function Demo2() {
    const [count, setCount] = useState(0)
    const change = useCallback(
        (val = 1) => {
            setCount(count + val)
        },
        [count]
    )
    console.log("parent")
    console.log(store.getState().aaa);
    return (
        <ThemeContent.Provider value={{ store }}>
            <DivCom>
                <div className={sty.box}>
                    <p className={sty.test}>父组件{count}</p>
                    <Child1 count={count}></Child1>
                    <Child2 change={change}></Child2>
                    <UlCom>
                        <li>abc</li>
                    </UlCom>
                </div>
            </DivCom>

            <div className="bbb">
                <div className="abc">
                    <div className="cc">123123</div>
                </div>
            </div>
        </ThemeContent.Provider>
    )
}
