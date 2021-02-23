export const getRange = function() {
    const start =  Array(63)
    .fill(null)
    .map((item, index) => {
        if (index === 0) {
            return {
                value: index,
                label: "不限",
            };
        }
        return {
            value: index + 17,
            label: index + 17 + "岁",
        };
    });
    const end =  Array(63)
        .fill(null)
        .map((item, index) => {
            if (index === 0) {
                return {
                    value: index,
                    label: "不限",
                };
            }
        return {
            value: index + 18,
            label: index + 18 + "岁",
        };
    });
    return {
        start,
        end
    }
}


export function shallowEqual(object1, object2) {
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


 export const getMonthRange = function() {
    const years = Array(new Date().getFullYear() - 1940)
     .fill(null)
     .map((item, index) => {
         return {
             value: 1940 + index,
             label: 1940 + index + '年'
         };
     });
    const months = Array(12)
     .fill(null)
     .map((item, index) => {
         return {
             value: index + 1 < 10 ? '0' + (index + 1) : index + 1,
             label: index + 1 + '月'
         };

     });
     return [years, months]
 };