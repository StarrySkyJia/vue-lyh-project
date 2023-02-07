/**
 * 缓存数据优化
 *
 * 导入方式：
 * const storage = request('@/utils/storage')
 * import storage from '@/utils/storage'
 *
 * 使用方法:
 * 1、设置缓存
 *      string    storage.set('key','string类型')
 *      json      storage.set('key',{ "b":"3" })
 *      array     storage.set('key',[1,2,3])
 *      boolean   storage.set('key',true)
 * 2、读取缓存
 *      直接读取 storage.get('key')
 *      直接读取不存在时使用默认值 storage.get('key','string')
 * 3、移除缓存
 *      移除指定缓存 storage.remove('key')
 * 4、清理缓存
 *      清理所有缓存 storage.clear()
 */

// 缓存有效期后缀
// 在存储的时候， 会多存储一份时间记录，如果过时则不会读取到缓存
const postfix = "_expiry";

module.exports = {
    /**
     * 设置缓存
     * @param {*} key 缓存键名
     * @param {*} val 缓存键值
     * @param {*} time 缓存过期时间，单位秒
     */
    set(key, val, time) {
        if (
            Object.prototype.toString.call(val) === "[object Object]" ||
            Array.isArray(val)
        ) {
            localStorage.setItem(key, JSON.stringify(val));
        } else {
            localStorage.setItem(key, val);
        }
        const seconds = parseInt(time);
        if (seconds > 0) {
            // 如果有传入缓存时间，则进行记录
            let timestamp = Date.parse(new Date());
            timestamp = timestamp / 1000 + seconds;
            localStorage.setItem(key + postfix, timestamp + "");
        } else {
            // 如果没有传入时间，则不记录；
            // 如果之前有缓存时间，则清除记录
            localStorage.removeItem(key + postfix);
        }
    },

    /**
     * 获取缓存
     * @param {*} key 缓存键名
     * @param {*} defVal 未读取到时返回的默认值
     * @param {*} isJson 读取时是否需要json转化
     * @returns 返回键值 或者 默认值
     */
    get(key, isJson = false, defVal) {
        // 优先读缓存过期时间
        const deadtime = parseInt(localStorage.getItem(key + postfix));
        if (deadtime) {
            // 如果过期时间小于现在，则过期
            if (parseInt(deadtime) < Date.parse(new Date()) / 1000) {
                // 有默认值则返回默认值，没有则返回false
                if (defVal) {
                    return defVal;
                } else {
                    return false;
                }
            }
        }
        // 走到这一步说明没有过期时间 或者 没有过期，取到真正的值
        let res;
        if (isJson) {
            res = JSON.parse(localStorage.getItem(key));
        } else {
            res = localStorage.getItem(key);
        }

        if (res) {
            return res;
        }

        // 如果没有声明默认值，又读不到值，则返回false
        if (defVal == undefined || defVal == "") {
            defVal = false;
        }
        return defVal;
    },

    /**
     * 移除指定的值
     * @param {*} key 缓存键名，取值为单个字符串或者数组
     */
    remove(key) {
        if (Array.isArray(key)) {
            key.forEach((keyItem) => {
                localStorage.removeItem(keyItem);
                localStorage.removeItem(keyItem + postfix);
            });
        } else {
            localStorage.removeItem(key);
            localStorage.removeItem(key + postfix);
        }
    },

    /**
     * 清除所有缓存
     */
    clear() {
        localStorage.clear();
    },
};