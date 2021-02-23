interface DateMode{
    year: number | string
    month: number | string
    day: number | string
}

/**
 * 时间格式化
 * 调用：formatDate('2019-07-03 13:00:00', "yyyy-M-d");
 * @export
 * @param {Date} date 类型必须是时间 new Date()
 * @param {string} fmt 时间格式 yyyy-MM-dd  yyyy-M-d yyyy/MM/dd   yyyy-MM-dd hh:mm:ss
 * @returns
 */
export function formatDate(date: Date | number | string, fmt: string) {
    var currentDate = new Date(date)
    var o = {
        'M+': currentDate.getMonth() + 1, //月份
        'd+': currentDate.getDate(), //日
        'h+': currentDate.getHours(), //小时
        'm+': currentDate.getMinutes(), //分
        's+': currentDate.getSeconds(), //秒
        'q+': Math.floor((currentDate.getMonth() + 3) / 3), //季度
        S: currentDate.getMilliseconds(), //毫秒
    }
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (currentDate.getFullYear() + '').substr(4 - RegExp.$1.length))
    for (var k in o)
        if (new RegExp('(' + k + ')').test(fmt))
            fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
    return fmt
}


export function secureDate(date: string) {
    return date.replace(/-/g, "/")
}


export function isRunYear(fullYear) {
    return fullYear % 4 == 0 && (fullYear % 100 != 0 || fullYear % 400 == 0);
}


export function bunchy(date: DateMode): string {
   return Object.values(date).filter(value => typeof value === 'number').map((value) => {
       return value < 10 ? '0' + value : value
   }).join('-')
}