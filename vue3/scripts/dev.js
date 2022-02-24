/*
 * @Author: linbin
 * @Date: 2021-12-27 13:27:32
 * @LastEditTime: 2021-12-27 16:24:19
 * @LastEditors: linbin
 * @Description: package 打包一个
 * @FilePath: /studyVue3/scripts/dev.js
 */
const fs = require('fs')
const execa = require('execa') // !开启子进程
console.log(123213123123);
const target = 'reactivity'

async function build(target) {
	// stdio: 'inherit' 当前打包信息共享给父进程
	// TARGET自定义名称
	await execa('rollup', ['-cw', '--environment', `TARGET:${target}`], { stdio: 'inherit' })
}
build(target)
