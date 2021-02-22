/*
 * @Author: your name
 * @Date: 2021-01-08 10:41:42
 * @LastEditTime: 2021-02-02 16:11:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /ydk-taro/src/components/PickerView/tools.ts
 */
import dataSource from "./../_data/region.json";

export interface RegionAttribute {
  id?: number;
  name?: string;
  pinyin?: string;
  children?: RegionAttribute[];
}

interface PickerRegionSource {
  province: RegionAttribute[];
  city: RegionAttribute[];
  area: RegionAttribute[];
}

interface PickerRegionCurrent {
  province: RegionAttribute;
  city: RegionAttribute;
  area?: RegionAttribute;
}

export default class Tools {
  
  /**
   * 默认数据源
   */
  private dataSource:RegionAttribute[] = dataSource;

  public getDataSource():RegionAttribute[] {
    return this.dataSource;
  }
  
  public setSource(source: RegionAttribute[]) {
    this.dataSource = source;
  }

  /**
   * 
   * @param values 查询的当前索引
   */
  public findSource(values: number[]): PickerRegionSource {
    const [a = 0, b = 0, c = 0] = values;
    const city = this.dataSource[a]?.children || this.dataSource[0]?.children || [];
    return {
      province: this.dataSource,
      city,
      area: city[b]?.children || city[0]?.children || [],
    };
  }

  /**
   * 
   * @param values 根据索引查询当前的省市区
   */
  public findCurrent(values: number[]): PickerRegionCurrent {
    const [a = 0, b = 0, c = 0] = values;
    const sources = this.findSource([a, b, c]);
    if (values.length === 2) {
      return {
        province: sources.province[a],
        city: sources?.city[b],
      };
    }
    return {
      province: sources.province[a],
      city: sources?.city[b],
      area: sources?.area[c],
    };
  }

  public findIndex(code, column: number = 3) {
    let parentIndex = 0;
    let lastInex = 0;
    let rootIndex = 0;
    let disabled = false;
    // console.log(code, code + 'code');
    const find = function (list, root?: boolean) {
      for (let i = 0; i < list.length; i++) {
        const item = list[i];
        if (disabled) {
          break;
        }
        if (item.id === Number(code)) {
          disabled = true;
          lastInex = i;
          break;
        } else {
          if (item.children) {
            if (root) {
              rootIndex = i;
            } else {
              parentIndex = i;
            }
            find(item.children);
          }
        }
      }
    };
    find(this.dataSource, true);
    if (column === 2) {
      return [rootIndex, lastInex];
    }
    return [rootIndex, parentIndex, lastInex];
  }

}
