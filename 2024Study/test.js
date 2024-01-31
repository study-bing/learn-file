function abc() {
    console.log(this.name)
    return () => {
        console.log(this.name)
    }
}
let obj = {
    name: 123,
}
let cc = abc.call(obj)
cc()
