import { createContext, useContext, useEffect, useMemo, useState } from "react"
import { bindActionCreators } from "redux"
const ThemeContent = createContext()
export function Provide(props) {
    return (
        <ThemeContent.Provider
            value={{
                store: props.store,
            }}
        >
            {props.children}
        </ThemeContent.Provider>
    )
}

export function concert(mapStateToProps, mapActionToProps) {
    if (!mapStateToProps) {
        mapStateToProps = () => {}
    }
    if (!mapActionToProps) {
        mapActionToProps = (dispatch) => {
            return { dispatch }
        }
    }
    return function curry(Component) {
        return function Hoc(props) {
            let { store } = useContext(ThemeContent),
                { getState, subscribe, dispatch } = store

            let [, forceUpdate] = useState(0)
            useEffect(() => {
                const unCb = subscribe(() => forceUpdate(+new Date()))
                return () => {
                    unCb()
                }
            }, [subscribe])
            let state = getState()
            let nextState = useMemo(() => {
                return mapStateToProps(state)
            }, [state])
            let dispatchAction = {}
            if (typeof mapActionToProps === "function") {
                dispatchAction = mapActionToProps(dispatch)
            } else {
                dispatchAction = bindActionCreators(mapActionToProps, dispatch)
            }

            return <Component {...props} {...nextState} {...dispatchAction} />
        }
    }
}
