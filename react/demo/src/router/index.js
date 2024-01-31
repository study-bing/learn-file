import React from "react"
import { Route } from "react-router-dom"
function Element(props) {
    let { component: Component, meta = {} } = props
    document.title = meta.title || "测试"
    return <Component />
}

function createRoute(routes) {
    return routes.map((el) => {
        return (
            <Route
                path={el.path}
                key={el.name}
                element={<Element {...el} />}
            ></Route>
        )
    })
}
let routes = []
function RouterView() {
    return createRoute(routes)
}

export default RouterView
