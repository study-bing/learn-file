/*
 * @Author: linbin
 * @Date: 2021-12-27 11:19:23
 * @LastEditTime: 2022-02-17 18:01:02
 * @LastEditors: linbin
 * @Description: 
 * @FilePath: /study/studyVue3/packages/reactivity/src/index.ts
 */
// !1.ref 和 reactive 区别在于 ref使用Object.defineProperty reactive使用proxy
// !2.vue2一上来就递归遍历，vue3则是取值的时候进行代理
import {
    reactive, shallowReactive, readonly, shallowReadOnly
} from './reactive'
import { effect } from './effect'
import { ref } from './ref'
const reactivity = {
    reactive, shallowReactive, readonly, shallowReadOnly, effect,
    ref
}

export default reactivity