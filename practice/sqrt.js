/*
 * @Author: linbin
 * @Date: 2021-09-28 10:43:32
 * @LastEditTime: 2021-09-28 11:15:54
 * @LastEditors: linbin
 * @Description: 
 * @FilePath: /study/function/sqrt.js
 */
var mySqrt = function(x) {
    //采用二分法
    let left = 0
    let right = x
    let mid = 0
    let result = 0
    while(left <= right){
        mid = left + ((right - left) >> 1)
        console.log('mid', mid);
        console.log('left', left);
        console.log('right', right);
        if(mid * mid <= x){
            left = mid + 1
            result = mid
        }else{
            right = mid - 1
        }
    }
    return result
};
console.log(mySqrt(12));