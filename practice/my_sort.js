/*
 * @Author: linbin
 * @Date: 2022-01-19 15:40:34
 * @LastEditTime: 2022-01-29 15:44:31
 * @LastEditors: linbin
 * @Description:
 * @FilePath: /study/练习/my_sort.js
 */
let array = [8, 5, 3, 4, 5, 6, 1]

function swap(array, l, r) {
	;[array[l], array[r]] = [array[r], array[l]]
}
// 冒泡排序
function bubbleSort(array) {
	for (let i = array.length - 1; i > 0; i--) {
		for (let j = 0; j < i; j++) {
			if (array[j] > array[j + 1]) {
				swap(array, j + 1, j)
			}
		}
	}
}
// 插入排序
function insertSort(array) {
	for (let i = 1; i < array.length; i++) {
		for (let j = i; j > 0 && array[j - 1] > array[j]; j--) {
			swap(array, j - 1, j)
		}
	}
}

function quickSort(array, l = 0, r = array.length - 1) {
	if (l >= r) {
		return
	}
	const middle = l + parseInt(Math.random() * (r - l + 1))
	swap(array, middle, r)
	let [start, end] = process(array, l, r)
	quickSort(array, l, start - 1)
	quickSort(array, end + 1, r)
}
function process(array, l, r) {
	let start = l
	let end = r
	while (l < end) {
		if (array[l] < array[r]) {
			swap(array, start++, l++)
		} else if (array[l] > array[r]) {
			swap(array, --end, l)
		} else {
			l++
		}
	}
	swap(array, end, r)
	return [start, end]
}

// insertSort(array)
// quickSort(array)
quickSort(array, 0, array.length - 1)
console.log(array)
