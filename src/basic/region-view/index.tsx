
import React, { Children, CSSProperties, useEffect, useMemo, useState } from "react";
import Taro from "@tarojs/taro";
import { PickerView, PickerViewColumn, View, Button } from "@tarojs/components";
import { PickerItemAttribute } from "../../interface";
import tool from './tool'

export interface RegionProps {
  unstinted?: boolean, 
  column?: number
  defaultValue?: number | string
  onSelected: (value) => void
}

const RegionView: React.FC<RegionProps> = ({
  defaultValue = "",
  column = 3,
  onChange
}) => {
  const [values, setValues] = useState<number[]>([0, 0, 0]);
  const dataSource = tool.findSource(values);

  useEffect(() => {
    let indexs: number[] = [];
    if (defaultValue) {
      indexs = tool.findIndex(defaultValue, column);
      setValues(indexs);
    }
    const cur = tool.findCurrent(indexs as number[]);
    onChange && onChange(cur);
  }, [defaultValue, column])

  const onPickerViewChange = function(e) {
      const [a, b, c] = e.detail.value;
      const [x, y, z] = values;
      let nextValues = e.detail.value;
      if (a !== x) {
        nextValues = [a, 0, 0];
      } else if (b !== y) {
        nextValues = [a, b, 0];
      } else if (c > dataSource.area.length - 1) {
        nextValues = [a, b, dataSource.area.length - 1];
      }

      setValues(nextValues);
      const cur = tool.findCurrent(nextValues);
      onChange && onChange(cur);
  }

  const getStyle = function (index, col): CSSProperties {
    const active = index === values[col];
    return {
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      width: column === 3 ? '200rpx' : 'auto',
      height: 34 + 'px',
      lineHeight: 34 + 'px',
      fontWeight: active ? 600 : 400,
      color: active ? "#FF3C4B" : '#000000'
    }
  }

  return (
    <View>
      <PickerView
        style={{
          height: 250 + 'rpx'
        }}
        indicatorStyle='height: 34px;'
        onChange={onPickerViewChange}
        value={values}
      >
        <PickerViewColumn style={{ textAlign: 'center' }}>
          {dataSource.province.map((item, index) => {
            return (
              <View
                style={getStyle(index, 0)}
                key={item?.value}
              >
                {item.label}
              </View>
            );
          })}
        </PickerViewColumn>
        <PickerViewColumn style={{ textAlign: 'center' }}>
          {dataSource.city.map((item, index) => {
            return (
              <View
                style={getStyle(index, 1)}
                key={item.value}
              >
                {item.label}
              </View>
            );
          })}
        </PickerViewColumn>
        {
          column === 3 ? <PickerViewColumn style={{ textAlign: 'center' }}>
            {dataSource.area.map((item, index) => {
              return (
                <View
                  style={getStyle(index, 2)}
                  key={item.value}
                >
                  {item.label}
                </View>
              );
            })}
          </PickerViewColumn> : null
        }
      </PickerView>
    </View>
  );
};

export default RegionView;