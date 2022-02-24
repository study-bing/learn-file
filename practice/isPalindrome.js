/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function(s) {
    let list = []
    for(let i = 0; i < s.length; i++){
        if(/([a-z]|[0-9])/.test(s[i])&& s[i] !== '_'){
            list.push(s[i].toLowerCase())
        }
    }
    console.log(list.join(''));
    console.log(list.reverse().join(''));
    return list.join('') === list.reverse().join('')
};
console.log(isPalindrome("Marge, let's \"[went].\" I await {news} telegram."));