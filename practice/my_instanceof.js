/*
 * @Author: linbin
 * @Date: 2021-12-08 10:25:47
 * @LastEditTime: 2021-12-08 10:35:32
 * @LastEditors: linbin
 * @Description: my_instanceof
 * @FilePath: /study/练习/my_instanceof.js
 */
function myInstanceof(obj, Fn) {
	let left = obj.__proto__
	let right = Fn.prototype
	while (left) {
		if (left === right) {
			return true
		}
		left = left.__proto__
	}
	return false
}

function Car(make, model, year) {
    this.make = make;
    this.model = model;
    this.year = year;
  }
  const auto = new Car('Honda', 'Accord', 1998);
  
  console.log(myInstanceof(auto, Car))
  // expected output: true
  
  console.log(myInstanceof(auto, Object))
  // expected output: true
  