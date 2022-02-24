import { hasChange, isArray, isObject } from "@vue/share"
import { track, trigger } from "./effect"
import { TrackOpTypes, TriggerOpTypes } from "./operators"
import { reactive } from "./reactive"

/*
 * @Author: linbin
 * @Date: 2022-01-02 12:37:19
 * @LastEditTime: 2022-01-04 16:45:26
 * @LastEditors: linbin
 * @Description: ref
 * @FilePath: /studyVue3/packages/reactivity/src/ref.ts
 */
export const ref = function (val) {
    return createRef(val)
}
export const shallowRef = function (val) {
    return createRef(val, true)
}
// 是对象则进行深度监听
const toReactive = (value) => isObject(value) ? reactive(value) : value;
function isRef(r) {
    return Boolean(r && r.__v_isRef === true);
}
class RefImpl {
    private _value // 声明一个变量，但是没有赋值
    public __v_isRef = true // 表明是一个ref属性
    constructor(public rawValue, public isShallow) { // 声明了变量，并且标识在了实例上面
        this._value = isShallow ? rawValue : toReactive(rawValue)
    }
    // 类的属性访问器 set get
    get value() {
        track(this, TrackOpTypes.GET, 'value')
        return this._value
    }
    set value(newValue) {
        if (hasChange(this.rawValue, newValue)) {
            this.rawValue = newValue
            this._value = this.isShallow ? newValue : toReactive(newValue)
            trigger(this, TriggerOpTypes.SET, 'value', newValue)
        }
    }
}

function createRef(val, isShallow = false) {
    return new RefImpl(val, isShallow)
}

class ObjectRefImpl {
    public __v_isRef = true // 表明是一个ref属性
    constructor(public _object, public _key) {
        this._object = _object;
        this._key = _key;
        this.__v_isRef = true;
    }
    // 这里的set和get只是对原对象的代理
    get value() {
        return this._object[this._key];
    }
    set value(newVal) {
        this._object[this._key] = newVal;
    }
}

export function toRef(object, key) {
    const val = object[key];
    return isRef(val) ? val : new ObjectRefImpl(object, key);
}
export function toRefs(object) {
    // object可能是数组可能是对象
    const ret = isArray(object) ? new Array(object.length) : {};
    for (const key in object) {
        ret[key] = toRef(object, key);
    }
    return ret;
}