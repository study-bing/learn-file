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
const isIntegerKey = (key) => parseInt(key) + '' === key;
let hasOwnProperty = Object.prototype.hasOwnProperty;
const hasOwn = (target, key) => hasOwnProperty.call(target, key);
const hasChange = (val, oldValue) => val !== oldValue;

/*
 * @Author: linbin
 * @Date: 2021-12-30 17:10:09
 * @LastEditTime: 2022-01-04 16:45:48
 * @LastEditors: linbin
 * @Description:
 * @FilePath: /studyVue3/packages/reactivity/src/effect.ts
 */
function effect(fn, options = {}) {
    const effect = createReactiveEffect(fn, options);
    if (!options.lazy) {
        effect(); // 响应式的effect默认执行一次
    }
    return effect;
}
let uid = 0;
let activeEffect;
let effectStack = []; // 栈结构，存储当前的effect
function createReactiveEffect(fn, options) {
    const effect = function reactiveEffect() {
        if (!effectStack.includes(effect)) { // !防止死循环
            try {
                activeEffect = effect;
                effectStack.push(effect);
                return fn(); // 函数取值会执行get方法
            }
            finally {
                effectStack.pop();
                activeEffect = effectStack[effectStack.length - 1];
            }
        }
    };
    effect.id = uid++;
    effect._isEffect = true; // 标识是响应式的effect
    effect.raw = fn;
    effect.options = options;
    return effect;
}
// 对象中的属性收集当前对应的effect函数
const targetMap = new WeakMap();
function track(target, type, key) {
    if (activeEffect) {
        // !targetMap  key => {name: xxx, age: xxx}  value (map) => {name => set, age => set}
        let depsMap = targetMap.get(target);
        if (!depsMap) {
            targetMap.set(target, depsMap = new Map());
        }
        let dep = depsMap.get(key);
        if (!dep) {
            depsMap.set(key, dep = new Set);
        }
        if (!dep.has(activeEffect)) {
            dep.add(activeEffect);
        }
    }
}
// ! 找属性对应的effect，并且执行
function trigger(target, type, key, newValue, oldValue) {
    // 如果没有这个属性，收集过effect，则不需要做任何操作
    const depsMap = targetMap.get(target);
    if (!depsMap)
        return;
    // !存储effect任何执行，这边会自动去重
    const effects = new Set();
    function addEffect(deps) {
        if (deps) {
            deps.forEach(effect => {
                effects.add(effect);
            });
        }
    }
    // !看是不是修改数组长度
    if (isArray(target) && key === 'length') {
        // 如果对应的长度有依赖，则需要收集
        depsMap.forEach((dep, depKey) => {
            // !修改长度时，如果已使用的值大于修改后的长度值，则需要记录更新
            if (depKey === 'length' || depKey > newValue) {
                addEffect(dep);
            }
        });
    }
    else {
        // 可能是对象
        if (key !== undefined) {
            addEffect(depsMap.get(key));
        }
        switch (type) {
            case 0 /* TriggerOpTypes.ADD */:
                // !修改数组中的索引, 比如p = [1,2,3]  p[100] = 1
                if (isArray(target) && isIntegerKey(key)) {
                    addEffect(depsMap.get('length'));
                }
                break;
        }
    }
    effects.forEach((effect) => effect());
}

/*
 * @Author: linbin
 * @Date: 2021-12-29 17:03:00
 * @LastEditTime: 2022-02-17 17:59:29
 * @LastEditors: linbin
 * @Description: 代理的事件
 * @FilePath: /study/studyVue3/packages/reactivity/src/baseHandlers.ts
 */
// !考虑是否只读和深度
function createGetter(isReadonly = false, isShallow = false) {
    return function get(target, key, receiver) {
        const result = Reflect.get(target, key, receiver);
        if (!isReadonly) {
            // 收集依赖，等数据变化后更新视图
            track(target, 0 /* TrackOpTypes.GET */, key);
        }
        if (isShallow) {
            return result;
        }
        if (isObject(result)) { // *vue2一上来就递归遍历，vue3则是取值的时候进行代理
            return isReadonly ? readonly(result) : reactive(result);
        }
        return result;
    };
}
function createSetter(isShallow = false) {
    return function set(target, key, value, receiver) {
        console.log(123);
        target[key]; // 获取老的值
        const result = Reflect.set(target, key, value, receiver);
        // 判断新增还是更新
        // 数组情况下，数组key长度比数组原来长度大，则新增
        let hasKey = isArray(target) && isIntegerKey(key) ? Number(key) < target.length : hasOwn(target, key);
        if (hasKey) {
            trigger(target, 1 /* TriggerOpTypes.SET */, key, value);
        }
        else {
            trigger(target, 0 /* TriggerOpTypes.ADD */, key, value);
        }
        return result;
    };
}
const get = createGetter();
const shallowGet = createGetter(false, true);
const readOnlyGet = createGetter(true);
const shallowReadOnlyGet = createGetter(true, true);
const set = createSetter();
const shallowSet = createSetter(true);
const mutableHandlers = {
    get,
    set,
    deleteProperty: (target, key) => {
        console.log(11);
        const result = Reflect.deleteProperty(target, key);
        trigger(target, 1 /* TriggerOpTypes.SET */, key, '');
        return result;
    }
};
const shallowReactiveHandlers = {
    get: shallowGet,
    set: shallowSet
};
let readOnlyObj = {
    set: (target, key) => {
        console.warn(`set on key ${key} falied`);
    }
};
const readOnlyHandlers = extend({
    get: readOnlyGet
}, readOnlyObj);
const shallowReadOnlyHandlers = extend({
    get: shallowReadOnlyGet
}, readOnlyObj);

/*
 * @Author: linbin
 * @Date: 2021-12-29 16:47:09
 * @LastEditTime: 2021-12-29 17:04:17
 * @LastEditors: linbin
 * @Description: reactive
 * @FilePath: /studyVue3/packages/reactivity/src/reactive.ts
 */
function reactive(target) {
    return createReactiveObject(target, false, mutableHandlers);
}
function shallowReactive(target) {
    return createReactiveObject(target, false, shallowReactiveHandlers);
}
function readonly(target) {
    return createReactiveObject(target, true, readOnlyHandlers);
}
function shallowReadOnly(target) {
    return createReactiveObject(target, true, shallowReadOnlyHandlers);
}
// 创建WeakMap缓存已代理的数据
const reactiveMap = new WeakMap();
const readOnlyMap = new WeakMap();
function createReactiveObject(target, isReadonly, baseHandler) {
    // 不是对象则直接返回
    if (!isObject(target)) {
        return target;
    }
    const proxyMap = isReadonly ? readOnlyMap : reactiveMap;
    // 判断是否被缓存过
    const existProxy = proxyMap.get(target);
    if (existProxy) {
        return existProxy;
    }
    const proxy = new Proxy(target, baseHandler);
    // 缓存已代理的数据
    proxyMap.set(target, proxy);
    return proxy;
}

/*
 * @Author: linbin
 * @Date: 2022-01-02 12:37:19
 * @LastEditTime: 2022-01-04 16:45:26
 * @LastEditors: linbin
 * @Description: ref
 * @FilePath: /studyVue3/packages/reactivity/src/ref.ts
 */
const ref = function (val) {
    return createRef(val);
};
// 是对象则进行深度监听
const toReactive = (value) => isObject(value) ? reactive(value) : value;
class RefImpl {
    rawValue;
    isShallow;
    _value; // 声明一个变量，但是没有赋值
    __v_isRef = true; // 表明是一个ref属性
    constructor(rawValue, isShallow) {
        this.rawValue = rawValue;
        this.isShallow = isShallow;
        this._value = isShallow ? rawValue : toReactive(rawValue);
    }
    // 类的属性访问器 set get
    get value() {
        track(this, 0 /* TrackOpTypes.GET */, 'value');
        return this._value;
    }
    set value(newValue) {
        if (hasChange(this.rawValue, newValue)) {
            this.rawValue = newValue;
            this._value = this.isShallow ? newValue : toReactive(newValue);
            trigger(this, 1 /* TriggerOpTypes.SET */, 'value', newValue);
        }
    }
}
function createRef(val, isShallow = false) {
    return new RefImpl(val, isShallow);
}

/*
 * @Author: linbin
 * @Date: 2021-12-27 11:19:23
 * @LastEditTime: 2022-02-17 18:01:02
 * @LastEditors: linbin
 * @Description:
 * @FilePath: /study/studyVue3/packages/reactivity/src/index.ts
 */
const reactivity = {
    reactive, shallowReactive, readonly, shallowReadOnly, effect,
    ref
};

export { reactivity as default };
