const model = computed({
    get(){
        let proxy = new Proxy(props.xxxx,{
            get(target, key){
                return Reflect.get(target, key)
            },
            set(target, key, val){
                target[key] = val
                emit('update:modelValue', {
                    ...target
                })
            }
        })
        return proxy
    },
    set(val){
        emit('update:modelValue', val)
    }
})