/*
 * @Author: linbin
 * @Date: 2021-09-14 18:08:15
 * @LastEditTime: 2021-09-14 18:09:28
 * @LastEditors: linbin
 * @Description:
 * @FilePath: /study/test/copy.js
 */
let a = 1
let b = a
let objA = {abc : 1}
let objB = objA
let objC = JSON.parse(JSON.stringify(objA))
console.log('objB', objB)
objA.abc = 222
console.log('objB 改变后',objB);
console.log('objC 改变后',objC);