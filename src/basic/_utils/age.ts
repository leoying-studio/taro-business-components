export default class Options {
    static getRange() {
      const start = Array(63)
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
      const end = Array(63)
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
        end,
      };
    }
  
    static getHeights() {
      return Array(61)
        .fill(null)
        .map((item, index) => {
          return {
            value: index + 140,
            label: index + 140 + "cm",
          };
        });
    }
  
    static getMonthRange() {
      const len = new Date().getFullYear() - 17;
      const years = Array(len - 1940)
        .fill(null)
        .map((item, index) => {
          return {
            value: 1940 + index,
            label: 1940 + index + "年",
          };
        });
      const months = Array(12)
        .fill(null)
        .map((item, index) => {
          return {
            value: index + 1 < 10 ? "0" + (index + 1) : index + 1,
            label: index + 1 + "月",
          };
        });
      return [years, months];
    }
  
    static formateValue(minAge, maxAge) {
      let detail = "请选择";
      let value = { minAge: 0, maxAge: 0 };
      if (!minAge && !maxAge) {
        detail = "不限";
        value = {
          minAge: 18,
          maxAge: 80,
        };
      } else if (minAge && !maxAge) {
        detail = minAge + "岁以上";
        value = {
          minAge: minAge,
          maxAge: 80,
        };
      } else if (maxAge && !minAge) {
        detail = maxAge + "岁以下";
        value = {
          maxAge,
          minAge: 18,
        };
      } else {
        if (minAge > maxAge) {
          detail = maxAge + "岁-" + minAge + "岁";
          value = {
            minAge: maxAge,
            maxAge: minAge,
          };
        } else {
          detail = minAge + "岁-" + maxAge + "岁";
          value = {
            minAge,
            maxAge,
          };
        }
      }
  
      return {
        detail,
        ...value,
      };
    }
  }
  