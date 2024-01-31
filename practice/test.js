// 获取当前时间
var now = new Date();
// 获取当前时间的年份
var year = now.getFullYear();
// 获取当前时间的月份
var month = now.getMonth() + 1;
// 获取当前时间的日期
var date = now.getDate();
// 获取当前时间的小时
var hour = now.getHours();
// 获取当前时间的分钟
var minute = now.getMinutes();
// 获取当前时间的秒数
var second = now.getSeconds();
// 获取当前时间的毫秒数
var millisecond = now.getMilliseconds();
// 获取当前时间的星期
var week = now.getDay();
// 获取当前时间的时间戳
var time = now.getTime();
// 获取本地地址
var local = now.toLocaleString();
// 获取本地日期
var localDate = now.toLocaleDateString();
// 校验是否是数组
var isArray = Array.isArray([1, 2, 3]);
// 一个判断是否为空的方法
var isEmpty = function (value) {
    return value === null || value === undefined || value === '';
}
// 传入时间戳得到时分秒
var formatTime = function (time) { 
    var hour = Math.floor(time / 3600);
    var minute = Math.floor((time - hour * 3600) / 60);
    var second = time - hour * 3600 - minute * 60;
    return [hour, minute, second].map(formatNumber).join(':');
}
// 深拷贝
var deepClone = function (obj) {
    var result = Array.isArray(obj) ? [] : {};
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (typeof obj[key] === 'object') {
                result[key] = deepClone(obj[key]);   //递归复制
            } else {
                result[key] = obj[key];
            }
        }
    }
    return result;
}
// 浅拷贝
var shallowClone = function (obj) {
    if (typeof obj !== 'object') return;
    var newObj = obj instanceof Array ? [] : {};
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            newObj[key] = obj[key];
        }
    }
    return newObj;
}
// 用performanceObserver监听页面性能
var performanceObserver = function () {
    var observer = new PerformanceObserver(function (list) {
        var perfEntries = list.getEntries();
        for (var i = 0; i < perfEntries.length; i++) {
            // 这里可以获取页面性能的数据
            console.log(perfEntries[i]);
        }
    });
    observer.observe({ entryTypes: ['navigation'] });
}
// 用performanceObserver监听页面FMP
var performanceObserverFMP = function () {
    var observer = new PerformanceObserver(function (list) {
        var perfEntries = list.getEntries();
        for (var i = 0; i < perfEntries.length; i++) {
            // 这里可以获取页面性能的数据
            console.log(perfEntries[i]);
        }
    });
    observer.observe({ entryTypes: ['paint'] });
}
// 用performanceObserver监听页面LCP
var performanceObserverLCP = function () {
    var observer = new PerformanceObserver(function (list) {
        var perfEntries = list.getEntries();
        for (var i = 0; i < perfEntries.length; i++) {
            // 这里可以获取页面性能的数据
            console.log(perfEntries[i]);
        }
    });
    observer.observe({ entryTypes: ['largest-contentful-paint'] });
}
// 用performanceObserver监听页面TTI
var performanceObserverTTI = function () {
    var observer = new PerformanceObserver(function (list) {
        var perfEntries = list.getEntries();
        for (var i = 0; i < perfEntries.length; i++) {
            // 这里可以获取页面性能的数据
            console.log(perfEntries[i]);
        }
    });
    observer.observe({ entryTypes: ['first-input'] });
}
// 用performanceObserver监听页面ondomcontentloaded
var performanceObserverondomcontentloaded = function () {
    var observer = new PerformanceObserver(function (list) {
        var perfEntries = list.getEntries();
        for (var i = 0; i < perfEntries.length; i++) {
            // 这里可以获取页面性能的数据
            console.log(perfEntries[i]);
        }
    });
    observer.observe({ entryTypes: ['navigation'] });
}
