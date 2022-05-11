/*
 * @Author: linbin
 * @Date: 2021-12-10 13:32:43
 * @LastEditTime: 2022-03-29 13:40:05
 * @LastEditors: linBin
 * @Description: Promise
 * @FilePath: /learn-file/practice/myPromise.js
 */
// promise的三个状态
const PENDING = 'PENDING' //等待
const FULFILLED = 'FULFILLED' //成功
const REJECTED = 'REJECTED' //失败
class Promise {
	constructor(executor) {
		this.promiseState = PENDING // 初始化状态
		this.promiseResult = '' // 结果值
		this.resolvedCallback = [] // 记录异步执行时成功函数
		this.rejectedCallback = [] // 记录异步执行失败函数
		let resolve = data => {
			// 成功时执行的函数
			this.promiseResult = data
			this.promiseState = FULFILLED
			// 发布订阅模式
			this.resolvedCallback.forEach(fn => {
				fn()
			})
		}
		let reject = reason => {
			this.promiseResult = reason
			this.promiseState = REJECTED
			this.rejectedCallback.forEach(fn => {
				fn()
			})
		}
		try {
			// 执行传入的函数
			executor(resolve, reject)
		} catch (error) {
			reject(this.promiseResult)
		}
	}
	then(resolved, rejected) {
		// 默认添加成功以及失败函数
		resolved = typeof resolved === 'function' ? resolved : data => data
		rejected =
			typeof rejected === 'function'
				? rejected
				: error => {
						throw error
				  }
		// 链式调用，所以返回一个promise
		let promise2 = new Promise((resolve, reject) => {
			// 根据三种状态进行不同的操作
			// PENDING时记录需要执行的函数
			// FULFILLED和REJECTED时 执行函数
			// !以下函数使用setTimeout是因为promise的then是异步的
			if (this.promiseState === PENDING) {
				// !记录函数，不是执行函数
				this.resolvedCallback.push(() => {
					setTimeout(() => {
						try {
							let result = resolved(this.promiseResult)
							resolvePromise(result, promise2, resolve, reject)
						} catch (error) {
							reject(error)
						}
					}, 0)
				})
				this.rejectedCallback.push(() => {
					setTimeout(() => {
						try {
							let result = rejected(this.promiseResult)
							resolvePromise(result, promise2, resolve, reject)
						} catch (error) {
							reject(error)
						}
					}, 0)
				})
			} else if (this.promiseState === FULFILLED) {
				setTimeout(() => {
					try {
						let result = resolved(this.promiseResult)
						resolvePromise(result, promise2, resolve, reject)
					} catch (error) {
						reject(error)
					}
				}, 0)
			} else if (this.promiseState === REJECTED) {
				setTimeout(() => {
					try {
						let result = rejected(this.promiseResult)
						resolvePromise(result, promise2, resolve, reject)
					} catch (error) {
						reject(error)
					}
				}, 0)
			}
		})
		return promise2
	}
	catch(rejected) {
		this.then(undefined, rejected)
	}
	// !注意
	finally(fn) {
		return this.then(
			value => {
				return Promise.resolve(fn()).then(() => value)
			},
			reason => {
				return Promise.resolve(fn()).then(() => {
					throw reason
				})
			}
		)
	}
	static resolve(val) {
		if (val instanceof Promise) {
			return val
		} else {
			return new Promise(resolve => {
				resolve(val)
			})
		}
	}
	static reject(val) {
		return new Promise((resolve, reject) => {
			reject(val)
		})
	}
	  //静态方法
      static all(promiseArr) {
        let result = [];
        //声明一个计数器 每一个promise返回就加一
        let count = 0;
        return new Promise((resolve, reject) => {
          for (let i = 0; i < promiseArr.length; i++) {
          //这里用 Promise.resolve包装一下 防止不是Promise类型传进来
            Promise.resolve(promiseArr[i]).then(
              (res) => {
                //这里不能直接push数组  因为要控制顺序一一对应(感谢评论区指正)
                result[i] = res;
                count++;
                //只有全部的promise执行成功之后才resolve出去
                if (count === promiseArr.length) {
                  resolve(result);
                }
              },
              (err) => {
                reject(err);
              }
            );
          }
        });
      }
      //静态方法
      static race(promiseArr) {
        return new Promise((resolve, reject) => {
          for (let i = 0; i < promiseArr.length; i++) {
            Promise.resolve(promiseArr[i]).then(
              (res) => {
                //promise数组只要有任何一个promise 状态变更  就可以返回
                resolve(res);
              },
              (err) => {
                reject(err);
              }
            );
          }
        });
      }
    }
    
}
function isPromise(val) {
    if (
        (typeof val === "object" && val !== null) ||
        typeof val === "function"
    ) {
        if (typeof val.then === "function") {
            return true
        } else {
            return false
        }
    } else {
        return false
    }
}
const resolvePromise = (x, promise2, resolve, reject) => {
	// 判断是否返回值和自身是否一致，一致则报错，会出现死循环
	if (promise2 === x) {
		return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
	}
	// 根据A+的文档提示，null以为的对象和方法为promise
	if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
		let called = false
		try {
			let then = x.then
			if (typeof then === 'function') {
				// call 对象转换
				then.call(
					x,
					val => {
						if (called) {
							return
						}
						called = true
						resolvePromise(val, promise2, resolve, reject)
					},
					e => {
						if (called) {
							return
						}
						called = true
						reject(e)
					}
				)
			} else {
				if (called) {
					return
				}
				called = true
				resolve(x)
			}
		} catch (error) {
			if (called) {
				return
			}
			called = true
			reject(error)
		}
	} else {
		resolve(x)
	}
}

Promise.defer = Promise.deferred = function () {
	let dfd = {}
	dfd.promise = new Promise((resolve, reject) => {
		dfd.resolve = resolve
		dfd.reject = reject
	})
	return dfd
}
module.exports = Promise
