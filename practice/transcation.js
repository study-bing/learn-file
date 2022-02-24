/*
 * @Author: linbin
 * @Date: 2021-01-11 13:09:47
 * @LastEditTime: 2021-01-11 15:22:09
 * @LastEditors: linbin
 * @Description: 实现业务代码之前之后执行其他函数
 * @FilePath: /study/transcation.js
 */
function perform(anyMethods, initials) {
    return function () {
        initials.forEach((el) => {
            el.init()
        })
        anyMethods()
        initials.forEach((el) => {
            el.close()
        })
    }
}
let newFn = perform(
    function () {
        console.log("methods")
    },
    [
        {
            init() {
                console.log("init")
            },
            close() {
                console.log("close")
            },
        },
    ]
)
newFn()
