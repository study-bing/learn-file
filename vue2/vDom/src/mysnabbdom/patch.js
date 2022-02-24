/*
 * @Author: linbin
 * @Date: 2021-08-23 11:46:53
 * @LastEditTime: 2021-09-02 14:59:44
 * @LastEditors: linbin
 * @Description:
 * @FilePath: /vDom/src/mysnabbdom/patch.js
 */
// patch 函数
import vnode from "./vnode"
import createElement from "./createElement"
import patchVnode from './patchVnode'
export default function patch(oldVnode, newVnode) {
    // 判断传入的第一个参数，是DOM节点还是虚拟节点？
    if (oldVnode.sel === "" || oldVnode.sel === undefined) {
        // 传入的第一个参数是DOM节点，此时要包装为虚拟节点
        oldVnode = vnode(
            oldVnode.tagName.toLowerCase(),
            {},
            [],
            undefined,
            oldVnode
        )
    }
    // 判断 oldVnode和newVnode 是不是同一个节点
    if (oldVnode.key === newVnode.key && oldVnode.sel === newVnode.sel) {
        patchVnode(oldVnode, newVnode)
    } else {
        console.log("不是同一个节点，暴力插入新的，删除旧的")
        let newVnodeElm = createElement(newVnode)
        if (oldVnode.elm && newVnodeElm) {
            // 插入到老节点之前
            console.log('newVnodeElm', newVnodeElm);
            oldVnode.elm.parentNode.insertBefore(newVnodeElm, oldVnode.elm)
        }
        // 删除老节点
        oldVnode.elm.parentNode.removeChild(oldVnode.elm)
    }
}
