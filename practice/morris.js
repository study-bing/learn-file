/*
 * @Author: linbin
 * @Date: 2021-11-05 10:17:26
 * @LastEditTime: 2021-11-05 10:50:08
 * @LastEditors: linbin
 * @Description: morris遍历
 * @FilePath: /study/function/morris.js
 */
// 如果cur无左孩子，cur向右移动（cur=cur.right）
// 如果cur有左孩子，找到cur左子树上最右的节点，记为mostright
// 如果mostright的right指针指向空，让其指向cur，cur向左移动（cur=cur.left）
// 如果mostright的right指针指向cur，让其指向null
function morris(head) {
	if (!head) {
		return false
	}
	let cur = head
	while (cur) {
		let mostRight = cur.left
		if (mostRight) {
			while (mostRight && mostRight !== cur) {
				mostRight = mostRight.right
			}
			if (mostRight) {
				mostRight.right = null
			} else {
				mostRight.right = cur
				cur = cur.left
				continue
			}
		}
		cur = cur.right
	}
}
//先序遍历，只出现1次直接打印，出现2次的，第1次打印
function morrisPre(head) {
	if (!head) {
		return false
	}
	let cur = head
	while (cur) {
		let mostRight = cur.left
		if (mostRight) {
			while (mostRight && mostRight !== cur) {
				mostRight = mostRight.right
			}
			if (mostRight) {
				mostRight.right = null
			} else {
				console.log(cur.val)
				mostRight.right = cur
				cur = cur.left
				continue
			}
		} else {
			console.log(cur.val)
		}
		cur = cur.right
	}
}
//中序遍历，只出现1次直接打印，出现2次的，第2次打印
function morrisIn(head) {
	if (!head) {
		return false
	}
	let cur = head
	while (cur) {
		let mostRight = cur.left
		if (mostRight) {
			while (mostRight && mostRight !== cur) {
				mostRight = mostRight.right
			}
			if (mostRight) {
				mostRight.right = null
			} else {
				mostRight.right = cur
				cur = cur.left
				continue
			}
		}
		console.log(cur.val)
		cur = cur.right
	}
}
//后序遍历，出现2次的，第2次出现时候逆序打印自己左树的右边界,最后打印中间节点的逆序右边界
function morrisPost(head) {
	if (!head) {
		return false
	}
	let cur = head
	while (cur) {
		let mostRight = cur.left
		if (mostRight) {
			while (mostRight && mostRight !== cur) {
				mostRight = mostRight.right
			}
			if (mostRight) {
				printEdge(cur.left)
				mostRight.right = null
			} else {
				mostRight.right = cur
				cur = cur.left
				continue
			}
		}
		cur = cur.right
	}
	// 别忘记
	printEdge(head)
}
// 逆序打印
function printEdge(node) {
	let tail = reverseEdge(node)
	let cur = tail
	while (cur != null) {
		console.log(cur.val)
		cur = cur.right
	}
	reverseEdge(tail)
}
// 节点变成链
function reverseEdge(node) {
	let pre = null
	let next = null
	while (node != null) {
		next = node.right
		node.right = pre
		pre = node
		node = next
	}
	return pre
}
