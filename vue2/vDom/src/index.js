/*
 * @Author: linbin
 * @Date: 2021-08-23 11:46:14
 * @LastEditTime: 2023-01-04 14:13:37
 * @LastEditors: linBin
 * @Description:
 * @FilePath: /learn-file/vue2/vDom/src/index.js
 */
// 测试代码
import h from "./mysnabbdom/h"
import patch from "./mysnabbdom/patch"

const myVnode1 = h("ul", {}, [
    h("li", { key: "A" }, "A"),
    h("li", { key: "B" }, "B"),
    h("li", { key: "D" }, "D"),
    h("li", { key: "E" }, "E"),
])
const container = document.getElementById("container")
patch(container, myVnode1)

const btn = document.getElementById("btn")
const myVnode2 = h("ul", {}, [
    h("li", { key: "B" }, "B"),
    h("li", { key: "C" }, "C"),
    h("li", { key: "A" }, "A"),
   
])

btn.onclick = function () {
    console.log(myVnode1)
    console.log(myVnode2)
    patch(myVnode1, myVnode2)
}
