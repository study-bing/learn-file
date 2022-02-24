/*
 * @Author: linbin
 * @Date: 2021-12-27 11:19:23
 * @LastEditTime: 2022-01-01 19:30:47
 * @LastEditors: linbin
 * @Description: 
 * @FilePath: /studyVue3/packages/share/src/index.ts
 */
export const isObject = (val) => typeof val === 'object' && val !== null
export const extend = Object.assign
export const isArray = Array.isArray
export const isFunction = (val) => typeof val === 'function'
export const isNumber = (val) => typeof val === 'number'
export const isString = (val) => typeof val === 'string'
export const isIntegerKey = (key) => parseInt(key) + '' === key

let hasOwnProperty = Object.prototype.hasOwnProperty
export const hasOwn = (target, key) => hasOwnProperty.call(target, key)

export const hasChange = (val, oldValue) => val !== oldValue