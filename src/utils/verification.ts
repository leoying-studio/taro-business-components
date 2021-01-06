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
       
}