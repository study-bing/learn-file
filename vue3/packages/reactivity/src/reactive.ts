/*
 * @Author: linbin
 * @Date: 2021-12-29 16:47:09
 * @LastEditTime: 2021-12-29 17:04:17
 * @LastEditors: linbin
 * @Description: reactive
 * @FilePath: /studyVue3/packages/reactivity/src/reactive.ts
 */

import { isObject } from "@vue/share"
import { mutableHandlers, shallowReactiveHandlers, readOnlyHandlers, shallowReadOnlyHandlers } from './baseHandlers'

export function reactive(target) {
    return createReactiveObject(target, false, mutableHandlers)
}
export function shallowReactive(target) {
    return createReactiveObject(target, false, shallowReactiveHandlers)
}
export function readonly(target) {
    return createReactiveObject(target, true, readOnlyHandlers)
}
export function shallowReadOnly(target) {
    return createReactiveObject(target, true, shallowReadOnlyHandlers)
}

// 创建WeakMap缓存已代理的数据
const reactiveMap = new WeakMap()
const readOnlyMap = new WeakMap()

export function createReactiveObject(target, isReadonly, baseHandler) {
    // 不是对象则直接返回
    if (!isObject(target)) {
        return target
    }
    const proxyMap = isReadonly ? readOnlyMap : reactiveMap
    // 判断是否被缓存过
    const existProxy = proxyMap.get(target)
    if (existProxy) {
        return existProxy
    }
    const proxy = new Proxy(target, baseHandler)
    // 缓存已代理的数据
    proxyMap.set(target, proxy)
    return proxy
}