const timeout = (time) =>
    new Promise((resolve) => {
        setTimeout(resolve, time)
    })

class Scheduler {
    constructor() {
        this.fnList = []
    }
    add(cb) {
        this.fnList.push(cb)
    }
    async play() {
        if (this.fnList.length > 0) {
            const fn = this.fnList.shift()
            await fn()
            this.play()
        }
    }
}
const scheduler = new Scheduler()
const addTask = (time, order) => {
    scheduler.add(() => timeout(time).then(() => console.log(order)))
}
// 限制同一时刻只能执行2个task
addTask(4000, "1")
addTask(3500, "2")
addTask(4000, "3")
addTask(3000, "4")

scheduler.play()
