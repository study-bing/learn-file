class MyVue {
    constructor(option) {
        // 赋值对象
        this.option = option
        this.$data = option.data
        this.$el = option.el
        if (option.el) {
            // 对象进行递归，处理成defineProperty对象
            observe(this.$data)
            // 编译，解析v-model v-text {{}}
            new Compile(option.el, this)
            this.proxyData(this.$data)
        }
    }
    // 代理
    proxyData(data) {
        for (const key of Object.keys(data)) {
            Object.defineProperty(this, key, {
                get() {
                    return data[key]
                },
                set(newValue) {
                    data[key] = newValue
                },
            })
        }
    }
}
// 判断对象
function observe(data) {
    if (!data || typeof data !== "object") {
        return
    }
    // __ob__就是Observer对象
    if (data.__ob__) {
        return data.__ob__
    } else {
        new Observer(data)
    }
}
class Observer {
    constructor(data) {
        // 订阅者记录
        this.dep = new Dep()
        // 对象赋值到传入的值中，以后要用，并且observe中需要判断
        def(data, "__ob__", this, false)
        // 将一个正常的对象转换成每个层级都是响应式的对象
        // 数组情况下，改变原型中的七个数组方法
        if (isArray(data)) {
            // 改变内部的7分函数，自定义通知视图更新
            // 改变原型链
            Object.setPrototypeOf(data, arrayMethods)
            // 对数组中每一个对象进行监听
            this.observeArray(data)
        } else {
            // 对象
            this.walk(data)
        }
    }
    walk(data) {
        for (const [key, value] of Object.entries(data)) {
            this.defineReactive(data, key, value)
        }
    }
    observeArray(data) {
        data.forEach((el) => {
            observe(el)
        })
    }
    defineReactive(data, key, value) {
        const dep = new Dep()
        // 递归劫持，让内部属性也进行数据劫持
        const child = observe(value)
        Object.defineProperty(data, key, {
            get() {
                if (Dep.target) {
                    dep.depend()
                    if (child) {
                        child.dep.depend()
                    }
                }
                return value
            },
            set(newValue) {
                if (newValue !== value) {
                    observe(newValue)
                    value = newValue
                    dep.notify()
                }
            },
        })
    }
}
// 判断是否是数组
function isArray(value) {
    return Array.isArray(value)
}
function def(obj, key, value, enumerable) {
    Object.defineProperty(obj, key, {
        configurable: true,
        writeable: true,
        enumerable,
        value,
    })
}
// 数组装饰器，原生数组函数添加事件
// !Vue 的变异数组从本质上是来说是一种装饰器模式，通过学习它的原理，我们在实际工作中可以轻松处理这类保持原有功能不变的前提下对其进行功能拓展的需求。
// 基础数组原型，创建新的对象，当做数组结构的数据原型
function arrayMethods() {
    let arrayMethod = Object.create(Array.prototype)
    const setFn = [
        "push",
        "pop",
        "shift",
        "unshift",
        "splice",
        "sort",
        "reverse",
    ]
    setFn.forEach((el) => {
        // 难道原函数
        const origin = arrayMethod[el]
        // 对7个函数进行变化操作
        def(
            arrayMethod,
            el,
            function (...args) {
                const ob = this.__ob__
                let insert = []
                switch (el) {
                    case "unshift":
                    case "push":
                        insert = args
                        break
                    case "splice":
                        insert = args.slice(2)
                        break
                    default:
                        break
                }
                // 新对象进行监听
                if (insert) {
                    ob.observeArray(insert)
                }
                // 派发更新
                ob.dep.notify()
                return origin.apply(this, args)
            },
            false
        )
    })
}
class Dep {
    constructor() {
        this.list = []
    }
    // 记录watch
    addSub(sub) {
        this.list.push(sub)
    }
    // 添加依赖
    depend() {
        if (Dep.target) {
            this.addSub(Dep.target)
        }
    }
    // 执行更新函数
    notify() {
        // 浅克隆一份
        const subs = this.list.slice()
        subs.forEach((el) => {
            el.update()
        })
    }
}
let compileUtil = {
    // 处理'a.b.c'
    getVal(vm, expr) {
        return expr.split(".").reduce((pre, cur) => {
            return pre[cur]
        }, vm.$data)
    },
    //设置值
    setVal(vm, expr, val) {
        let list = expr.split(".")
        let newValue = vm.$data
        list.forEach((el, index) => {
            if (index === list.length - 1) {
                newValue[el] = val
            } else {
                newValue = newValue[el]
            }
        })
    },
    on(node, expr, vm, eventName) {
        // 获取事件函数
        let fn = vm.option.methods && vm.option.methods[expr]
        if (fn) {
            // !fn.bind(vm)
            // !添加事件 因为我们使用vue时 都不需要关心this的指向问题,这是因为源码的内部帮咱们处理了this的指向
            node.addEventListener(eventName, fn.bind(vm), false)
        }
    },
    bind(node, expr, vm, eventName) {
        let attrVal = this.getVal(vm, expr)
        node.setAttribute(eventName, attrVal)
    },
    //获取新值 对{{a}}--{{b}} 这种格式进行处理
    getContentVal(expr, vm) {
        return expr.replace(/\{\{(.+?)\}\}/g, (...args) => {
            return this.getVal(vm, args[1])
        })
    },
    text(node, expr, vm) {
        let val
        if (/\{\{(.+?)\}\}/.test(expr)) {
            val = expr.replace(/\{\{(.+?)\}\}/g, (...args) => {
                new Watcher(vm, args[1], () => {
                    node.textContent = this.getContentVal(expr, vm)
                })
                return this.getVal(vm, args[1])
            })
        } else {
            new Watcher(vm, expr, (vvm, val) => {
                node.textContent = val
            })
            val = this.getVal(vm, expr)
        }
        node.textContent = val
    },
    html(node, expr, vm) {
        const val = this.getVal(vm, expr)
        new Watcher(vm, expr, (vvm, val) => {
            node.innerHTML = val
        })
        node.innerHTML = val
    },
    model(node, expr, vm) {
        node.value = this.getVal(vm, expr)
        // 订阅数据变化时 绑定更新函数 更新视图的变化
        // 视图==>数据
        node.addEventListener("input", (e) => {
            this.setVal(vm, expr, e.target.value)
        })
        // 数据==>视图
        new Watcher(vm, expr, (vvm, newVal) => {
            node.value = newVal
        })
    },
}
class Compile {
    constructor(el, vm) {
        if (el) {
            // 判断el参数是否是一个元素节点,如果是直接赋值,如果不是 则获取赋值
            this.el = this.isElementNode(el) ? el : document.querySelector(el)
            this.vm = vm
            // 因为每次匹配到进行替换时,会导致页面的回流和重绘,影响页面的性能
            // 所以需要创建文档碎片来进行缓存,减少页面的回流和重绘
            // 1.获取文档碎片对象
            const frameContent = this.setFrame(this.el)
            // 2.编译模板
            this.compileHandle(frameContent)
            // 3.把子元素的所有内容添加到根元素中
            this.el.appendChild(frameContent)
        }
    }
    setFrame(el) {
        const fragment = document.createDocumentFragment()
        let firstChild
        while ((firstChild = el.firstChild)) {
            fragment.appendChild(firstChild)
        }
        return fragment
    }
    isElementNode(node) {
        // 判断是否是元素节点
        return node.nodeType === 1
    }
    compileHandle(node) {
        // 1.获取子节点
        const nodeChild = node.childNodes
        // 2.遍历子节点
        nodeChild.forEach((el) => {
            // 3.对子节点的类型进行不同的处理
            if (this.isElementNode(el)) {
                // 获取该节点的所有属性
                // !Array.from(node.attributes)
                const attrs = Array.from(el.attributes)
                // 对属性进行遍历
                attrs.forEach((attr) => {
                    const { name, value } = attr
                    if (this.isDirective(name)) {
                        const [, directive] = name.split("-")
                        const [dirName, eventName] = directive.split(":")
                        // v-text="aaa" directive =text  dirName="text" value="aaa"
                        // v-bind:text="aaa"  directive="bind:text"  dirName="bind"  eventName="text" value="aaa"
                        compileUtil[dirName] &&
                            compileUtil[dirName](el, value, this.vm, eventName)
                        // !移除当前元素中的属性
                        el.removeAttribute(`v-${directive}`)
                    } else if (this.isEventName(name)) {
                        const [, eventName] = name.split("@")
                        compileUtil["on"](el, value, this.vm, eventName)
                    }
                })
            } else {
                // 剩下的就是文本节点
                const content = el.textContent
                if (/\{\{(.+?)\}\}/.test(content)) {
                    compileUtil["text"](el, content, this.vm)
                }
            }
            if (el.childNodes) {
                this.compileHandle(el)
            }
        })
    }
    //判断是否是一个指令
    isDirective(attrName) {
        // !startsWith
        return attrName.startsWith("v-")
    }
    // 是否是@click这样事件名字
    isEventName(attrName) {
        return attrName.startsWith("@")
    }
}
class Watcher {
    constructor(vm, expr, cb) {
        this.vm = vm
        this.expr = expr
        this.cb = cb
        this.value = this.get(vm, expr)
    }
    get() {
        Dep.target = this
        let val
        try {
            val = compileUtil.getVal(this.vm, this.expr)
        } finally {
            Dep.target = null
        }
        return val
    }
    update() {
        const oldValue = this.value
        this.value = this.get()
        if (oldValue !== this.value) {
            this.cb(this.vm, this.value, oldValue)
        }
    }
}
