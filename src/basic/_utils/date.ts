import { formatDate, isRunYear, secureDate } from "@/utils/date";

/*
 * @Author: your name
 * @Date: 2021-01-12 16:09:44
 * @LastEditTime: 2021-02-04 17:37:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /ydk-taro/src/components/PickerView/_utils/date.ts
 */
export default class DateUtils {

  private static MAX_MONTH = [1, 3, 5, 7, 8, 10, 12]
  /**
   * @param y 年
   * @param m 月
   */
  static createSource = (y?: number, m?: number) => {
    const years: number[] = [];
    const months: number[] = [];
    const days: number[] = [];

    const date = new Date();
    const len = date.getFullYear() + 100;

    for (let i = 1900; i <= len; i++) {
      years.push(i);
    }

    for (let i = 1; i <= 12; i++) {
      months.push(i);
    }

    let numberOfDays = DateUtils.MAX_MONTH.includes(Number(m)) ? 31 : 30;

    if (Number(m)=== 2) {
      if (y && isRunYear(y)) {
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

  static adjustDayIndex(y, m) {
    let numberOfDays = DateUtils.MAX_MONTH.includes(Number(m)) ? 31 : 30;
    if (Number(m)=== 2) {
      if (y && isRunYear(y)) {
        numberOfDays = 29;
      } else {
        numberOfDays = 28;
      }
    }
   return numberOfDays - 1;
  }

  static getToDayIndexs(): number[] {
    const d = new Date();
    const ye = d.getFullYear();
    const mo = (d.getMonth()+1).toString().padStart(2,'0');
    const da = d.getDate().toString().padStart(2,'0');
    return DateUtils.findIndexs(ye+'-'+mo+'-'+da)
  }

  static split(date: string) {
    let safeDate = secureDate(date) ;
    const [y = 1940, m = 1, d = 1] = (safeDate as string)?.split("/") || [];
    return [Number(y), Number(m), Number(d)];
  }
  
  static compareSize(date: string, minDate?: string, maxDate?: string): "lt" | "gt" | null {
    const dateTime = new Date(secureDate(date)).getTime();
    let minTime = 0, maxTime = 0; 
    if (minDate) {
      minTime = new Date(secureDate(minDate)).getTime();
      if (dateTime < minTime) {
        return 'lt';
     }
    }
   
    if (maxDate) {
      maxTime = new Date( secureDate(maxDate)).getTime();
      if (dateTime > maxTime) {
        return 'gt';
      }
    }

    return null;
  }

  static findIndexs(value: string) {
    const [y, m, d] = DateUtils.split(value);
    const {years, months, days} = DateUtils.createSource(Number(y), Number(m));
    const yIndex = years.findIndex((item) => item === Number(y));
    const mIndex = months.findIndex((item, index)=> item === Number(m));
    const dIndex = days.findIndex((item) => item === Number(d));
    return [yIndex, mIndex, Math.max(dIndex, 0)];
  }
  
}
