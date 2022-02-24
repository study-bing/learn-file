/*
 * @Author: linbin
 * @Date: 2021-01-11 11:00:58
 * @LastEditTime: 2021-01-11 11:09:43
 * @LastEditors: linbin
 * @Description: call方法
 * @FilePath: /study/call.js
 */
let oldPush = Array.prototype.push;
function push(...arg) {
  oldPush.call(this, ...arg);
}
let array = [1, 2, 3];
push.call(array, 4, 5);
console.log(array);
