function strSet(str) {
    let map = new Map()

    for (let index = 0; index < str.length; index++) {
        const element = str[index]
        let mapCount = map.get(element) || 0
        map.set(element, mapCount ? mapCount + 1 : 1)
    }
    const minValue = Math.min(...map.values())
    for (const [key, value] of map.entries()) {
        if (value !== minValue) {
            map.delete(key)
        }
    }
    let result = ""
    for (let index = 0; index < str.length; index++) {
        const element = str[index]
        if (!map.get(element)) {
            result += element
        }
    }
    return result
}
// “ababac” —— “ababa”
// “aaabbbcceeff” —— “aaabbb”
console.log(strSet("aaabbbcceeff"))
