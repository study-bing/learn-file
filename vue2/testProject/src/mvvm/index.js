/*
 * @Author: linbin
 * @Date: 2021-12-02 15:01:14
 * @LastEditTime: 2022-12-23 17:30:45
 * @LastEditors: linBin
 * @Description: 双向绑定
 * @FilePath: /learn-file/vue2/testProject/src/mvvm/index.js
 */

// !递归思想： observe(obj) => 看看obj有没有__ob__属性 => 没有情况下 new Observer()产生实例，并添加到__ob__上 => 遍历下一层属性逐个defineReactive => observe(obj)
// 每一个Observer中都有一个Dep
import observe from './observe'
import Watcher from './watcher'
let obj = {
	a: {
		b: {
			c: 123
		}
	}
}
observe(obj)
// console.log(obj);
new Watcher(obj, 'a.b.c', val => {
})
// obj.a.b.c = 222
// let obj = {
// 	arr: [1, 2, 3]
// }
// observe(obj)
// // obj.arr.splice(0, 1, 4, 5)
// obj.arr.push({ aaa: 123 })
// console.log(obj)
// obj.arr[3].aaa = 222
