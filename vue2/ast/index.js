/*
 * @Author: linbin
 * @Date: 2021-12-06 09:36:05
 * @LastEditTime: 2021-12-06 10:51:44
 * @LastEditors: linbin
 * @Description:
 * @FilePath: /study/myVue/vue/ast/index.js
 */
{
	/* <div>
  <h3 class="box" title="标题" data-type="3">你好</h3>
  <ul>
    <li>A</li>
    <li>B</li>
    <li>C</li>
  </ul>
</div>
转换成
{
    tag: "div",
    attrs: [],
    children: [
        {
            tag: "h3",
            attrs: [
                { name: "name", value: "box" },
                { name: "title", value: "标题" },
                { name: "data-type", value: "3" }
            ],
            children: [
                {
                    text: "你好",
                    type: "3"
                }
            ]
        },
        {
            tag: "ul",
            attrs: [],
            children: [
                { tag: 'li', children: [{ text: "A", type: "3" }], attrs: [] },
                { tag: 'li', children: [{ text: "B", type: "3" }], attrs: [] },
                { tag: 'li', children: [{ text: "C", type: "3" }], attrs: [] }
            ]
        }
} */
}
import parse from './parse'

const templateString = `
<div>
    <h3 class="box" title="标题" data-type="3">你好</h3>
    <ul>
        <li>A</li>
        <li>B</li>
        <li>C</li>
    </ul>
</div>
`
// console.log('输入的模板字符串', templateString)
const ast = parse(templateString)
// console.log('生成的AST\n', ast)
