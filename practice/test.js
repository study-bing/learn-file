/*
 * @Author: linbin
 * @Date: 2021-02-27 16:47:43
 * @LastEditTime: 2022-02-24 15:59:27
 * @LastEditors: linbin
 * @Description:
 * @FilePath: /study/test.js
 */
// let a;
// const b = new Promise((resolve, reject) => {
// console.log('promise1');
// resolve();
// console.log('promise2');
// }).then(() => {
// console.log('promise3');
// }).then(() => {
// console.log('promise4');
// })
// a = new Promise(async(resolve, reject) => {
// console.log(a);
// await b;
// console.log(a);
// });
// let c = new Promise((resolve, reject) => {
// console.log('promise5');
// resolve();
// }).then(() => {
// console.log('promise6');
// })
// console.log('end');

// let abc = {
//     name: '123',
//     c: function () {
//         console.log(this.name)
//         return function () {
//             console.log(this)
//         }
//     },
// }
// let name = '12332'
// let bbb = abc.c()
// console.log(abc.c()())
// const gcd = (a, b) => {
//     if (b === 0) {
//         return a;
//     }
//     return gcd(b, a % b);
// }
// var simplifiedFractions = function (n) {
// 	if (n === 1) {
// 		return []
// 	}
// 	let result = []
// 	let i = 1
// 	let j
// 	while (i < n) {
// 		j = i + 1
// 		while (j <= n) {
// 			if (gcd(i,j) === 1) {
// 				result.push(i/j)
// 			}
// 			j++
// 		}
// 		i++
// 	}
// 	return result
// }

// console.log(simplifiedFractions(4))
let arr = [
	{ id: 1, name: '部门1', pid: 0 },
	{ id: 2, name: '部门2', pid: 1 },
	{ id: 3, name: '部门3', pid: 1 },
	{ id: 4, name: '部门4', pid: 3 },
	{ id: 5, name: '部门5', pid: 4 }
]
/**
 * 递归查找，获取children
 */
const getChildren = (data, result, pid) => {
	for (const item of data) {
		if (item.pid === pid) {
			const newItem = { ...item, children: [] }
			result.push(newItem)
			getChildren(data, newItem.children, item.id)
		}
	}
}

/**
 * 转换方法
 */
const arrayToTree = (data, pid) => {
	const result = []
	getChildren(data, result, pid)
	return result
}
console.dir(arrayToTree(arr, 0))
