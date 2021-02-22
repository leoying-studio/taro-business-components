import { formatDate } from "@/utils/date";

/*
 * @Author: your name
 * @Date: 2021-01-12 16:09:44
 * @LastEditTime: 2021-02-04 17:37:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /ydk-taro/src/components/PickerView/_utils/date.ts
 */
export default class DateUtils {

  
  /**
   * @param y 年
   * @param m 月
   */
  static createSource = (y?: number, m?: number) => {
    const years: number[] = [];
    const months: number[] = [];
    const days: number[] = [];
    const date = new Date();
    const len = date.getFullYear() + 30;

    for (let i = 1940; i <= len; i++) {
      years.push(i);
    }

    for (let i = 1; i <= 12; i++) {
      months.push(i);
    }

    let numberOfDays = [1, 3, 5, 7, 8, 10, 12].includes(Number(m)) ? 31 : 30;

    if (Number(m)=== 2) {
      if (y &&  DateUtils.isRunYear(y)) {
        numberOfDays = 29;
      } else {
        numberOfDays = 28;
      }
    }

    for (let i = 1; i <= numberOfDays; i++) {
      days.push(i);
    }

    return {
      years,
      months,
      days,
    };
  };

  static isRunYear(fullYear) {
    return fullYear % 4 == 0 && (fullYear % 100 != 0 || fullYear % 400 == 0);
  }

  static adjustDayIndex(y, m) {
    let numberOfDays = [1, 3, 5, 7, 8, 10, 12].includes(Number(m)) ? 31 : 30;
    if (Number(m)=== 2) {
      if (y &&  DateUtils.isRunYear(y)) {
        numberOfDays = 29;
      } else {
        numberOfDays = 28;
      }
    }
   return numberOfDays - 1;
  }

  static getToDayIndexs(): number[] {
    const date = new Date();
    const y = date.getFullYear();
    const m = date.getMonth() + 1;
    const d = date.getDate();
    const { years, months, days } = DateUtils.createSource(y, m);
    const yIndex = years.findIndex((item) => item === y);
    const mIndex = months.findIndex((item, index)=> item === m);
    const dIndex = days.findIndex((item) => item === d);
    return [yIndex, mIndex, dIndex];
  }

  static dateToNumerical(date: string | Date) {
    let stringify = date;
    if (typeof Date !== 'string') {
      stringify = formatDate(date, 'yyyy-MM-dd');
    }
    const [y = 1940, m = 1, d = 1] = (stringify as string)?.split("-") || [];
    return [Number(y), Number(m), Number(d)];
  }
  
  static compare(date: Date, minDate?: Date, maxDate?: Date): "lt" | "gt" | null {
    const dateTime = new Date(date).getTime();
    let minTime = 0, maxTime = 0; 
    if (minDate) {
      minTime = new Date(minDate).getTime();
      if (!minTime) {
        console.error('无法获取到最小时间，minTime 请传入  new Date(yyyy/MM/dd) 的格式解析');
      }
      if (dateTime < minTime) {
        return 'lt';
     }
    }
   
    if (maxDate) {
      maxTime = new Date(maxDate).getTime();
      if (!maxTime) {
        console.error('无法获取到最大时间，maxTime 请传入  new Date(yyyy/MM/dd) 的格式解析');
      }
      if (dateTime > maxTime) {
        return 'gt';
      }
    }

    return null;
  }

  static findIndexs(value: string | Date) {
    const [y, m, d] = DateUtils.dateToNumerical(value);
    const {years, months, days} = DateUtils.createSource(Number(y), Number(m));
    const yIndex = years.findIndex((item) => item === y);
    const mIndex = months.findIndex((item, index)=> item === m);
    const dIndex = days.findIndex((item) => item === d);
    return [yIndex, mIndex, Math.max(dIndex, 0)];
  }
  
}
