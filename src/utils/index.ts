/*
 * @Author: your name
 * @Date: 2021-01-06 09:37:19
 * @LastEditTime: 2021-01-11 09:33:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /taro-business-components/src/utils/index.ts
 */
export default class Type {

    static isObject(value: any) {
        return  Object.prototype.toString.call(value) === '[object object]';
    }
    
    static shallowEqual(object1, object2) {
        const keys1 = Object.keys(object1);
        const keys2 = Object.keys(object2);
        if (keys1.length !== keys2.length) {
          return false;
        }
        for (let index = 0; index < keys1.length; index++) {
          const val1 = object1[keys1[index]];
          const val2 = object2[keys2[index]];
          if (val1 !== val2) {
            return false;
          }
        }
        return true;
    }
       
    static shallowArray(a, b) {
      // 判断数组的长度
      if (a.length !== b.length) {
          return false
      } else {
          // 循环遍历数组的值进行比较
          for (let i = 0; i < a.length; i++) {
              if (a[i] !== b[i]) {
                  return false
              }
          }
          return true;
      }
  }
}