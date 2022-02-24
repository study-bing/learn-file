function copyParse(json) {
	return eval('(' + json + ')')
}
let abc = JSON.stringify({ a: 123 })
console.log(copyParse(abc))
