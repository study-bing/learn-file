/*
 * @Author: linbin
 * @Date: 2021-12-27 13:27:32
 * @LastEditTime: 2021-12-31 15:02:46
 * @LastEditors: linbin
 * @Description: package 目录下的所有包都进行打包
 * @FilePath: /studyVue3/scripts/build.js
 */
const fs = require('fs')
const execa = require('execa') // !开启子进程

// !获取packages目录下的文件夹
const targets = fs.readdirSync('packages').filter(file => {
	return fs.statSync(`packages/${file}`).isDirectory()
})

// !循环一次打包
async function build(target) {
	// stdio: 'inherit' 当前打包信息共享给父进程
	// TARGET自定义名称
	await execa('rollup', ['-wc', '--environment', `TARGET:${target}`], { stdio: 'inherit' })
}

function runParallel(targets, iteratorFn) {
	let res = []
	for (const item of targets) {
		const p = iteratorFn(item)
		res.push(p)
	}
	return Promise.all(res)
}

runParallel(targets, build)
