/*
 * @Author: linbin
 * @Date: 2021-12-30 17:10:09
 * @LastEditTime: 2022-01-04 16:45:48
 * @LastEditors: linbin
 * @Description: 
 * @FilePath: /studyVue3/packages/reactivity/src/effect.ts
 */
import { isArray, isIntegerKey } from "@vue/share";
import { TriggerOpTypes } from './operators';

export function effect(fn, options: any = {}) {
    const effect = createReactiveEffect(fn, options)
    if (!options.lazy) {
        effect(); // 响应式的effect默认执行一次
    }

    return effect
}
let uid = 0
let activeEffect;
let effectStack = [] // 栈结构，存储当前的effect
function createReactiveEffect(fn, options) {
    const effect = function reactiveEffect() {
        if (!effectStack.includes(effect)) { // !防止死循环
            try {
                activeEffect = effect
                effectStack.push(effect)
                return fn() // 函数取值会执行get方法
            } finally {
                effectStack.pop()
                activeEffect = effectStack[effectStack.length - 1]
            }
        }
    }
    effect.id = uid++
    effect._isEffect = true // 标识是响应式的effect
    effect.raw = fn
    effect.options = options
    return effect
}
// 对象中的属性收集当前对应的effect函数
const targetMap = new WeakMap()
export function track(target, type, key) { // 可以拿当前的effect
    if (activeEffect) {
        // !targetMap  key => {name: xxx, age: xxx}  value (map) => {name => set, age => set}
        let depsMap = targetMap.get(target)
        if (!depsMap) {
            targetMap.set(target, depsMap = new Map())
        }
        let dep = depsMap.get(key)
        if (!dep) {
            depsMap.set(key, dep = new Set)
        }
        if (!dep.has(activeEffect)) {
            dep.add(activeEffect)
        }
    }
}

// ! 找属性对应的effect，并且执行
export function trigger(target, type, key?, newValue?, oldValue?) {
    // 如果没有这个属性，收集过effect，则不需要做任何操作
    const depsMap = targetMap.get(target)
    if (!depsMap) return
    // !存储effect任何执行，这边会自动去重
    const effects = new Set()
    function addEffect(deps) {
        if (deps) {
            deps.forEach(effect => {
                effects.add(effect)
            })
        }
    }
    // !看是不是修改数组长度
    if (isArray(target) && key === 'length') {
        // 如果对应的长度有依赖，则需要收集
        depsMap.forEach((dep, depKey) => {
            // !修改长度时，如果已使用的值大于修改后的长度值，则需要记录更新
            if (depKey === 'length' || depKey > newValue) {
                addEffect(dep)
            }
        })
    } else {
        // 可能是对象
        if (key !== undefined) {
            addEffect(depsMap.get(key))
        }
        switch (type) {
            case TriggerOpTypes.ADD:
                // !修改数组中的索引, 比如p = [1,2,3]  p[100] = 1
                if (isArray(target) && isIntegerKey(key)) {
                    addEffect(depsMap.get('length'))
                }
                break;
            default:
                break;
        }
    }
    effects.forEach((effect: any) => effect())
}