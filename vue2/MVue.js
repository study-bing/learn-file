/*
 * @Author: linbin
 * @Date: 2021-12-04 15:46:19
 * @LastEditTime: 2022-12-26 17:11:49
 * @LastEditors: linBin
 * @Description:
 * @FilePath: /learn-file/vue2/MVue.js
 */
// import Compile from './compile'
class MVue {
    constructor(options) {
        this.$el = options.el
        this.$data = options.data
        this._data = options.data
        //保存 options参数,后面处理数据要用到
        this.$options = options
        // 如果这个根元素存在则开始编译模板
        if (this.$el) {
            this.proxyData()
            // 1.实现一个指令解析器compile
            new Compile(this.$el, this)
        }
    }
    proxyData() {
        let self = this
        Object.keys(this._data).forEach((key) => {
            Object.defineProperty(self, key, {
                get() {
                    return self._data[key]
                },
                set(newValue) {
                    self._data[key] = newValue
                },
            })
        })
    }
    initWatch() {
        let self = this
        let watch = this.$options.watch || {}
        Object.keys(watch).forEach((key) => {
            new Watcher(self, key, watch[key])
        })
    }
}

let compileUtil = {
    // 获取值的方法
    getVal(expr, vm) {
        return expr.split(".").reduce((pre, current) => {
            return pre[current]
        }, vm.$data)
    },
    //设置值
    setVal(vm, expr, val) {
        let list = expr.split(".")
        let newValue = vm.$data
        list.forEach((el, index) => {
            if (index === list.length - 1) {
                newValue[el] = val
            }
            newValue = newValue[el]
        })
    },
    //获取新值 对{{a}}--{{b}} 这种格式进行处理
    getContentVal(expr, vm) {
        return expr.replace(/\{\{(.+?)\}\}/g, (...args) => {
            return this.getVal(args[1], vm)
        })
    },
    text(node, expr, vm) {
        //expr 可能是 {{obj.name}}--{{obj.age}}
        let val
        if (expr.indexOf("{{") !== -1) {
            //
            val = expr.replace(/\{\{(.+?)\}\}/g, (...args) => {
                //绑定watcher从而更新视图
                new Watcher(vm, args[1], () => {
                    this.updater.textUpdater(node, this.getContentVal(expr, vm))
                })
                return this.getVal(args[1], vm)
            })
        } else {
            //也可能是v-text='obj.name' v-text='msg'
            val = this.getVal(expr, vm)
        }
        this.updater.textUpdater(node, val)
    },
    html(node, expr, vm) {
        // html处理 非常简单 直接取值 然后调用更新函数即可
        let val = this.getVal(expr, vm)
        // 订阅数据变化时 绑定watcher,从而更新函数
        new Watcher(vm, expr, (newVal) => {
            this.updater.htmlUpdater(node, newVal)
        })
        this.updater.htmlUpdater(node, val)
    },
    model(node, expr, vm) {
        const val = this.getVal(expr, vm)
        // 订阅数据变化时 绑定更新函数 更新视图的变化

        // 数据==>视图
        new Watcher(vm, expr, (newVal) => {
            this.updater.modelUpdater(node, newVal)
        })
        // 视图==>数据
        node.addEventListener(
            "input",
            (e) => {
                // 设置值
                this.setVal(vm, expr, e.target.value)
            },
            false
        )
        this.updater.modelUpdater(node, val)
    },
    // 对事件进行处理
    on(node, expr, vm, eventName) {
        // 获取事件函数
        let fn = vm.$options.methods && vm.$options.methods[expr]
        // 添加事件 因为我们使用vue时 都不需要关心this的指向问题,这是因为源码的内部帮咱们处理了this的指向
        node.addEventListener(eventName, fn.bind(vm), false)
    },
    // 绑定属性 简单的属性 已经处理 类名样式的绑定有点复杂 因为对应的值可能是对象 也可能是数组 大家根据个人能力尝试写一下
    bind(node, expr, vm, attrName) {
        let attrVal = this.getVal(expr, vm)
        this.updater.attrUpdater(node, attrName, attrVal)
    },
    updater: {
        attrUpdater(node, attrName, attrVal) {
            node.setAttribute(attrName, attrVal)
        },
        modelUpdater(node, value) {
            node.value = value
        },
        textUpdater(node, value) {
            node.textContent = value
        },
        htmlUpdater(node, value) {
            node.innerHTML = value
        },
    },
}
class Compile {
    constructor(el, vm) {
        // 判断el参数是否是一个元素节点,如果是直接赋值,如果不是 则获取赋值
        this.el = this.isElementNode(el) ? el : document.querySelector(el)
        this.vm = vm
        // 因为每次匹配到进行替换时,会导致页面的回流和重绘,影响页面的性能
        // 所以需要创建文档碎片来进行缓存,减少页面的回流和重绘
        // 1.获取文档碎片对象
        const fragment = this.node2Fragment(this.el)
        console.log(fragment)
        // 2.编译模板
        this.compile(fragment)
        // 3.把子元素的所有内容添加到根元素中
        this.el.appendChild(fragment)
    }
    isElementNode(node) {
        // 判断是否是元素节点
        return node.nodeType === 1
    }
    node2Fragment(el) {
        const fragment = document.createDocumentFragment()
        let firstChild
        while ((firstChild = el.firstChild)) {
            fragment.appendChild(firstChild)
        }
        return fragment
    }
    compile(fragment) {
        // 1.获取子节点
        const childNodes = fragment.childNodes
        // 2.遍历子节点
        ;[...childNodes].forEach((child) => {
            // 3.对子节点的类型进行不同的处理
            if (this.isElementNode(child)) {
                // 是元素节点
                // 编译元素节点
                // console.log('我是元素节点',child);
                this.compileElement(child)
            } else {
                // console.log('我是文本节点',child);
                this.compileText(child)
                // 剩下的就是文本节点
                // 编译文本节点
            }
            // 4.一定要记得,递归遍历子元素
            if (child.childNodes && child.childNodes.length) {
                this.compile(child)
            }
        })
    }
    compileElement(node) {
        // 获取该节点的所有属性
        const attributes = Array.from(node.attributes)
        // 对属性进行遍历
        attributes.forEach((attr) => {
            const { name, value } = attr //v-text v-model   v-on:click  @click
            // 看当前name是否是一个指令
            if (this.isDirective(name)) {
                //对v-text进行操作
                const [, directive] = name.split("-") //text model html
                // v-bind:src
                const [dirName, eventName] = directive.split(":") //对v-on:click 进行处理
                // 更新数据
                compileUtil[dirName] &&
                    compileUtil[dirName](node, value, this.vm, eventName)
                // 移除当前元素中的属性
                node.removeAttribute(`v-${directive}`)
            } else if (this.isEventName(name)) {
                // 对事件进行处理 在这里处理的是@click
                let [, eventName] = name.split("@")
                compileUtil["on"](node, value, this.vm, eventName)
            }
        })
    }
    // 编译文本的方法
    compileText(node) {
        const content = node.textContent
        // 匹配{{xxx}}的内容
        if (/\{\{(.+?)\}\}/.test(content)) {
            // 处理文本节点
            compileUtil["text"](node, content, this.vm)
        }
    }
    // 是否是@click这样事件名字
    isEventName(attrName) {
        return attrName.startsWith("@")
    }
    //判断是否是一个指令
    isDirective(attrName) {
        return attrName.startsWith("v-")
    }
}
class Watcher {
    constructor(vm, expr, cb) {
        // 观察新值和旧值的变化,如果有变化 更新视图
        this.vm = vm
        this.expr = expr
        this.cb = cb
        // 先把旧值存起来
        this.oldVal = this.getOldVal()
    }
    getOldVal() {
        Dep.target = this
        let oldVal = compileUtil.getVal(this.expr, this.vm)
        Dep.target = null
        return oldVal
    }
    update() {
        // 更新操作 数据变化后 Dep会发生通知 告诉观察者更新视图
        let newVal = compileUtil.getVal(this.expr, this.vm)
        if (newVal !== this.oldVal) {
            this.cb(newVal)
        }
    }
}

class Dep {
    constructor() {
        this.subs = []
    }
    // 添加订阅者
    addSub(watcher) {
        this.subs.push(watcher)
    }
    // 通知变化
    notify() {
        // 观察者中有个update方法 来更新视图
        this.subs.forEach((w) => w.update())
    }
}
// 创建一个数据监听者  劫持并监听所有数据的变化
class Observer {
    constructor(data) {
        this.observe(data)
    }
    observe(data) {
        // 如果当前data是一个对象才劫持并监听
        if (data && typeof data === "object") {
            // 遍历对象的属性做监听
            Object.keys(data).forEach((key) => {
                this.defineReactive(data, key, data[key])
            })
        }
    }
    defineReactive(obj, key, value) {
        const dep = new Dep()
        // 递归劫持，让内部属性也进行数据劫持
        let childOb = observe(value)
        Object.defineProperty(obj, key, {
            enumerable: true,
            configurable: true,
            get() {
                if (Dep.target) {
                    dep.depend()
                    if (childOb) {
                        // 孩子记录的作用是用于数据变化的时候实现dep.notify
                        childOb.dep.depend()
                    }
                }
                return val
            },
            set(newValue) {
                if (val === newValue) {
                    return
                }
                // 让新属性也进行数据劫持
                childOb = observe(newValue)
                val = newValue
                // 发布订阅
                dep.notify()
            },
        })
    }
}
