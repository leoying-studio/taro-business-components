// 提供通用底层支持

export default class PickerTools {

    // static findIndex(value: string | number, dataSource: []) {
    //     const tier = {};
    //     let disabled = false;
    //     const find = function (list, deps: number = 0) {
    //         for (let i = 0; i < list.length; i++) {
    //           const item = list[i];
    //           if (disabled) {
    //             break;
    //           }
    //           if (item.value === value) {
    //             tier[deps] = i;
    //             disabled = true;
    //             break;
    //           } else {
    //             if (item.children) {
    //               tier[deps] = i;
    //               find(item.children, deps + 1);
    //             }
    //           }
    //         }
    //       }
    //     find(dataSource);
    //     return Object.values(tier);
    // }

}