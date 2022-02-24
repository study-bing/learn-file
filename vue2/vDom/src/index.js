/*
 * @Author: linbin
 * @Date: 2021-08-23 11:46:14
 * @LastEditTime: 2021-09-03 17:13:37
 * @LastEditors: linbin
 * @Description:
 * @FilePath: /vDom/src/index.js
 */
// 测试代码
import h from "./mysnabbdom/h"
import patch from "./mysnabbdom/patch"

const myVnode1 = h("ul", {}, [
    h("li", { key: "A" }, "A"),
    h("li", { key: "B" }, "B"),
])
const container = document.getElementById("container")
patch(container, myVnode1)

const btn = document.getElementById("btn")
const myVnode2 = h("ul", {}, [
    h("li", { key: "C" }, "C"),
    h("li", { key: "B" }, "B"),
    h("li", { key: "A" }, "A"),
    h("li", { key: "D" }, "D"),
])

btn.onclick = function () {
    console.log(myVnode1)
    console.log(myVnode2)
    patch(myVnode1, myVnode2)
}
