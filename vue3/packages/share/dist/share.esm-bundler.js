/*
 * @Author: linbin
 * @Date: 2021-12-27 11:19:23
 * @LastEditTime: 2022-01-01 19:30:47
 * @LastEditors: linbin
 * @Description:
 * @FilePath: /studyVue3/packages/share/src/index.ts
 */
const isObject = (val) => typeof val === 'object' && val !== null;
const extend = Object.assign;
const isArray = Array.isArray;
const isFunction = (val) => typeof val === 'function';
const isNumber = (val) => typeof val === 'number';
const isString = (val) => typeof val === 'string';
const isIntegerKey = (key) => parseInt(key) + '' === key;
let hasOwnProperty = Object.prototype.hasOwnProperty;
const hasOwn = (target, key) => hasOwnProperty.call(target, key);
const hasChange = (val, oldValue) => val !== oldValue;

export { extend, hasChange, hasOwn, isArray, isFunction, isIntegerKey, isNumber, isObject, isString };
