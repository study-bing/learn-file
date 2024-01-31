function co(fn, ...params) {
    let iIor = fn(params)
    function next(val) {
        let { value, done } = iIor.next(val)
        if (done) return
        Promise.resolve(value).then((data) => {
            next(data)
        })
    }
    next()
}

function* test() {
    let xx = yield 100
    console.log(123, xx)
    yield delay()
    console.log(345)
    yield 200
}
function delay() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, 2000)
    })
}
co(test)

