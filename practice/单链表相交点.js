/*
 * @Author: linbin
 * @Date: 2021-10-19 10:02:21
 * @LastEditTime: 2021-11-03 17:57:18
 * @LastEditors: linbin
 * @Description:
 * @FilePath: /study/test/单链表相交点.js
 */
// 给定2条链表，找出相交的点，没有则返回null

// 解题思路：首先判断是有环链表还是无环链表，有环则找到入环第一个节点

// 找到入环的第一个节点,用快慢指针，当快慢指针相等时，快指针回到初始位置，快慢指针一起走，相遇的时候就是第一个入环节点
function getLoopNode(head) {
    if (head === null || head.next === null || head.next.next === null) {
        return null
    }
    let n1 = head.next
    let n2 = head.next.next
    while (n1 !== n2) {
        if (n2.next === null || n2.next.next === null) {
            return null
        }
        n2 = n2.next.next
        n1 = n1.next
    }
    n2 = head
    while (n1 !== n2) {
        n1 = n1.next
        n2 = n2.next
    }
    return n1
}

// 最后节点相同的情况下代表有交点，则长的链表从差值处开始走
function noLoop(head1, head2) {
    if (head1 === null || head2 === null) {
        return null
    }
    let cur1 = head1
    let cur2 = head2
    let n = 0
    while (cur1.next !== null) {
        n++
        cur1 = cur1.next
    }
    while (cur2.next !== null) {
        n--
        cur2 = cur2.next
    }
    if (cur1 !== cur2) {
        return null
    }
    // 使cur1位长链表 cur2为短链表
    cur1 = n > 0 ? head1 : head2
    cur2 = cur1 === head1 ? head2 : head1
    n = Math.abs(n)
    while (n !== 0) {
        cur1 = cur1.next
        n--
    }
    while (cur1 !== cur2) {
        cur1 = cur1.next
        cur2 = cur2.next
    }
    return cur1
}
// 两个都有环的情况下
function bothLoop(head1, loop1, head2, loop2) {
    let cur1 = null
    let cur2 = null
    // 相等情况下和noloop情况一样 只是终点取到loop1
    if (loop1 === loop2) {
        cur1 = head1
        cur2 = head2
        let n = 0
        while (cur1.next !== loop1) {
            n++
            cur1 = cur1.next
        }
        while (cur2.next !== loop2) {
            n--
            cur2 = cur2.next
        }
        if (cur1 !== cur2) {
            return null
        }
        // 使cur1位长链表 cur2为短链表
        cur1 = n > 0 ? head1 : head2
        cur2 = cur1 === head1 ? head2 : head1
        n = Math.abs(n)
        while (n !== 0) {
            cur1 = cur1.next
            n--
        }
        while (cur1 !== cur2) {
            cur1 = cur1.next
            cur2 = cur2.next
        }
    } else {
        cur1 = loop1.next
        while (cur1 !== loop1) {
            if (cur1 === loop2) {
                return loop1
            }
            cur1 = cur1.next
        }
        return null
    }
}
function getIntersectNode(head1, head2) {
    if (head1 === null || head2 === null) {
        return null
    }
    let loop1 = getLoopNode(head1)
    let loop2 = getLoopNode(head2)
    if (loop1 === null && loop2 === null) {
        noLoop(head1, head2)
    }
    if (loop1 !== null && loop2 !== null) {
        bothLoop(loop1, loop2,head1, head2)
    }
    return null
}
