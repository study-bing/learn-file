/*
 * @Author: linbin
 * @Date: 2022-01-14 15:03:38
 * @LastEditTime: 2022-01-14 15:23:10
 * @LastEditors: linbin
 * @Description: 
 * @FilePath: /myvite/vite-plugin/jest.config.js
 */
const path = require('path')

module.exports = {
  rootDir: path.resolve(__dirname),
  clearMocks: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  moduleFileExtensions: ['vue', 'js', 'json', 'jsx', 'ts', 'tsx', 'node'],
  // 别名设置
  moduleNameMapper: {
    '@/(.*)$': '<rootDir>/src/components/$1'
  },
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  // 测试文件
  testMatch: ['<rootDir>/tests/unit/*.spec.js?(x)'],
  
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '^.+\\js$': 'babel-jest',
    '^.+\\.(t|j)sx?$': 'ts-jest'
  }
}