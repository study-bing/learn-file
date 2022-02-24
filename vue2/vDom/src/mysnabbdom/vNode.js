/*
 * @Author: linbin
 * @Date: 2021-08-23 11:45:57
 * @LastEditTime: 2021-08-23 17:54:48
 * @LastEditors: linbin
 * @Description:
 * @FilePath: /study/vDom/src/mysnabbdom/vNode.js
 */
/** src/mysnabbdom/vnode.js */
// 函数的功能非常简单，就是把传入的5个参数组合成对象返回
export default function (sel, data, children, text, elm) {
    return {
        sel,
        data,
        children,
        text,
        elm,
        key: data.key,
    }
}
