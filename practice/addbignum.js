/*
 * @Author: linbin
 * @Date: 2021-04-27 15:36:59
 * @LastEditTime: 2021-04-27 16:24:39
 * @LastEditors: linbin
 * @Description: 计算大数字
 * @FilePath: /study/function/addbignum.js
 */
function addbignum(num1, num2){
    let maxLength = Math.max(num1.length, num2.length)
    num1 = num1.padStart(maxLength, 0)
    num2 = num2.padStart(maxLength, 0)
    let [sum, f, t] = ['', 0, 0]
    for(let i = maxLength -1; i >= 0; i--){
        t = Number(num1[i]) + Number(num2[i]) + f
        f = Math.floor(t / 10)
        sum = t % 10 + sum
    }
    if(f === 1){
        sum = '1' + sum
    }
    return sum
}

console.log(addbignum('123','22'));