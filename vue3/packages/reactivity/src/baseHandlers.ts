
/*
 * @Author: linbin
 * @Date: 2021-12-29 17:03:00
 * @LastEditTime: 2022-02-17 17:59:29
 * @LastEditors: linbin
 * @Description: 代理的事件
 * @FilePath: /study/studyVue3/packages/reactivity/src/baseHandlers.ts
 */
// 实现new Proxy(target, handler)
import { isObject, isArray, extend, isIntegerKey, hasOwn } from '@vue/share';
import { track, trigger } from './effect';
import { TrackOpTypes, TriggerOpTypes } from './operators';
import { reactive, readonly } from './reactive';

// !考虑是否只读和深度
function createGetter(isReadonly = false, isShallow = false) {
    return function get(target, key, receiver) {
        const result = Reflect.get(target, key, receiver)
        if (!isReadonly) {
            // 收集依赖，等数据变化后更新视图
            track(target, TrackOpTypes.GET, key)
        }
        if (isShallow) {
            return result
        }
        if (isObject(result)) { // *vue2一上来就递归遍历，vue3则是取值的时候进行代理
            return isReadonly ? readonly(result) : reactive(result)
        }
        return result
    }

}
function createSetter(isShallow = false) {
    return function set(target, key, value, receiver) {
        console.log(123)
        const oldValue = target[key] // 获取老的值
        const result = Reflect.set(target, key, value, receiver)
        // 判断新增还是更新
        // 数组情况下，数组key长度比数组原来长度大，则新增
        let hasKey = isArray(target) && isIntegerKey(key) ? Number(key) < target.length : hasOwn(target, key)
        if(hasKey){
            trigger(target, TriggerOpTypes.SET, key, value, oldValue)
        }else{
            trigger(target, TriggerOpTypes.ADD, key, value)
        }
        return result
    }
}

const get = createGetter();
const shallowGet = createGetter(false, true);
const readOnlyGet = createGetter(true);
const shallowReadOnlyGet = createGetter(true, true);
const set = createSetter()
const shallowSet = createSetter(true)

export const mutableHandlers = {
    get,
    set,
    deleteProperty:(target, key) =>{
        console.log(11)
        const result = Reflect.deleteProperty(target, key)
        trigger(target, TriggerOpTypes.SET, key, '')
        return result
    }
}
export const shallowReactiveHandlers = {
    get: shallowGet,
    set: shallowSet
}
let readOnlyObj = {
    set: (target, key) => {
        console.warn(`set on key ${key} falied`)
    }
}
export const readOnlyHandlers = extend({
    get: readOnlyGet
}, readOnlyObj)
export const shallowReadOnlyHandlers = extend({
    get: shallowReadOnlyGet
}, readOnlyObj)