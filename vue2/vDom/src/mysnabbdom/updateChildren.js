/*
 * @Author: linbin
 * @Date: 2021-08-24 10:38:12
 * @LastEditTime: 2021-09-02 15:50:54
 * @LastEditors: linbin
 * @Description: updateChildren
 * @FilePath: /vDom/src/mysnabbdom/updateChildren.js
 */
import createElement from "./createElement"
import patchVnode from "./patchVnode"

// 判断是否是同一个虚拟节点
function checkSameVnode(a, b) {
    return a.sel === b.sel && a.key === b.key
}
function isUndef(val) {
    return val === undefined
}
export default function updateChildren(parentElm, oldCh, newCh) {
    let oldStartIdx = 0 // 旧前
    let newStartIdx = 0 // 新前
    let oldEndIdx = oldCh.length - 1 // 旧后
    let newEndIdx = newCh.length - 1 // 新后
    let oldStartVnode = oldCh[oldStartIdx] // 旧前节点
    let oldEndVnode = oldCh[oldEndIdx] // 旧后节点
    let newStartVnode = newCh[newStartIdx] // 新前节点
    let newEndVnode = newCh[newEndIdx] // 新后节点
    let keyMap = null
    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
        if (isUndef(oldStartVnode)) {
            oldStartVnode = oldCh[++oldStartIdx]
        } else if (isUndef(oldEndVnode)) {
            oldEndVnode = oldCh[--oldEndIdx]
        } else if (isUndef(newStartVnode)) {
            newStartVnode = newCh[++newStartIdx]
        } else if (isUndef(newEndVnode)) {
            newEndVnode = newCh[--newEndIdx]
        } else if (checkSameVnode(oldStartVnode, newStartVnode)) {
            // 新前和旧前
            console.log("① 新前和旧前命中")
            patchVnode(oldStartVnode, newStartVnode)
            oldStartVnode = oldCh[++oldStartIdx]
            newStartVnode = newCh[++newStartIdx]
        } else if (checkSameVnode(oldEndVnode, newEndVnode)) {
            // 新后和旧后
            console.log("② 新后和旧后命中")
            patchVnode(oldEndVnode, newEndVnode)
            oldEndVnode = oldCh[--oldEndIdx]
            newEndVnode = newCh[--newEndIdx]
        } else if (checkSameVnode(oldStartVnode, newEndVnode)) {
            // 新后和旧前
            console.log("③ 新后和旧前命中")
            patchVnode(oldStartVnode, newEndVnode)
            // nextSibling取节点后一位dom，没有则为null
            parentElm.insertBefore(
                oldStartVnode.elm,
                oldEndVnode.elm.nextSibling
            )
            oldStartVnode = oldCh[++oldStartIdx]
            newEndVnode = newCh[--newEndIdx]
        } else if (checkSameVnode(oldEndVnode, newStartVnode)) {
            // 新前和旧后
            console.log("④ 新前和旧后命中")
            patchVnode(oldEndVnode, newStartVnode)
            parentElm.insertBefore(
                oldEndVnode.elm,
                oldStartVnode.elm
            )
            oldEndVnode = oldCh[--oldEndIdx]
            newStartVnode = newCh[++newStartIdx]
        } else {
            console.log("四种命中都没有找到")
            // 四种命中都没有找到
            // 制作keyMap，缓存
            if (!keyMap) {
                keyMap = Object.create(null)
                for (let index = 0; index < oldCh.length; index++) {
                    if (!isUndef(oldCh[index].key)) {
                        keyMap[oldCh[index].key] = index
                    }
                }
            }
            let idxInOld = keyMap[newStartVnode.key]
            if (!isUndef(idxInOld)) {
                // 判断，如果idxInOld不是undefined 表示它不是全新的项，需要移动
                const elmToMove = oldCh[idxInOld]
                patchVnode(elmToMove, newStartVnode)
                // 把这项设置为undefined，表示已经处理完了
                oldCh[idxInOld] = undefined
                // 移动，调用insertBefore
                parentElm.insertBefore(elmToMove.elm, oldStartVnode.elm)
            } else {
                // 判断，如果keyMap[newStartVnode]是undefined 表示它是全新的项
                // 被加入的项（就是newStartVnode这项）现在不是真实的DOM
                parentElm.insertBefore(
                    createElement(newStartVnode),
                    oldStartVnode.elm
                )
            }
            // 指针下移，只移动新的头
            newStartVnode = newCh[++newStartIdx]
        }
    }
    if (oldStartIdx <= oldEndIdx || newStartIdx <= newEndIdx) {
        if (oldStartIdx > oldEndIdx) {
            for (let i = newStartIdx; i <= newEndIdx; i++) {
                // insertBefore 可以自动识别 null，如果是 null 就会自动排到队尾去。和appendChild是一致的
                // newCh[i] 还不是真正的DOM，所以需要此处需要调用createElement
                console.log(oldCh[oldStartIdx]);
                let  before = oldCh[oldStartIdx + 1] == null ? null : oldCh[oldStartIdx + 1].elm
                parentElm.insertBefore(
                    createElement(newCh[i]),
                    before
                )
            }
        } else {
            for (let i = oldStartIdx; i <= oldEndIdx; i++) {
                if (oldCh[i]) {
                    parentElm.removeChild(oldCh[i].elm)
                }
            }
        }
      }
}
