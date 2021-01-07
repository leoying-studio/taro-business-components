import dataSource from "./../_data/region.json";

interface RegionAttribute {
    id?: number,
    name?: string,
    pinyin?: string,
    children?: RegionAttribute[]
}

interface PickerRegionSource {
    province: RegionAttribute[]
    city: RegionAttribute[]
    area: RegionAttribute[]
}

interface PickerRegionCurrent {
    province: RegionAttribute
    city: RegionAttribute
    area?: RegionAttribute
}

export default class Region {

  static findSource(values: number[]):PickerRegionSource   {
    const [a = 0, b = 0, c = 0] = values;
    const city = dataSource[a]?.children || dataSource[0]?.children;
    return {
      province: dataSource,
      city,
      area: city[b]?.children || city[0]?.children,
    };
  }

  static findCurrent(values: number[]): PickerRegionCurrent {
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

  static findIndex(code, column: number = 3) {
    let parentIndex = 0;
    let lastInex = 0;
    let rootIndex = 0;
    let disabled = false;
    const find = function (list, root?: boolean) {
      for (let i = 0; i < list.length; i++) {
        const item = list[i];
        if (disabled) {
          break;
        }
        if (item.value === Number(code)) {
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
    find(dataSource, true);
    if (column === 2) {
      return [rootIndex, lastInex];
    }
    return [rootIndex, parentIndex, lastInex];
  }

}
