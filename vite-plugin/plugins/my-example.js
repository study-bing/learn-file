export default function myExample() {
    // 返回插件对象
    return {
        name: "my-example", // 用户告警和错误的展示
        resolveId(source) {
            if (source === "virtual-module") {
                console.log("source", source)
                return source
            }
            return null
        },
        load(id) {
            if (id === "virtual-module") {
                console.log("id", id)
                return 'export default "myExample1"' // !导出显示的值
            }
            return null
        },
    }
}
