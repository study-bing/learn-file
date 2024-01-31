function createdId(val) {
    let key = "abc" + val
    let id = +localStorage.getItem(key)
    if (!id) {
        id = 0
    }
    localStorage.setItem(key, ++id)
    return id
}
function sendMsg(val, channel) {
    channel.postMessage({
        msg: val,
        id: channel.id,
    })
}

function createChannel(name) {
    let channel = new BroadcastChannel(name)
    channel.id = createdId(name)
    channel.listeners = new Set()
    sendMsg("hi", channel)
    window.addEventListener("unload", () => {
        sendMsg("bye", channel)
    })
    channel.addEventListener("message", (e) => {
        if (e.data.msg === "hi") {
            // 相互通信，微信存储id
            sendMsg("ha", channel)
            channel.listeners.add(e.data.id)
        } else if (e.data.msg === "bye") {
            channel.listeners.delete(e.data.id)
        } else if (e.data.msg === "ha") {
            channel.listeners.add(e.data.id)
        }
    })

    return channel
}
