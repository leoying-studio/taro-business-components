
import React, { Children, CSSProperties, useEffect, useMemo, useState } from "react";
import Taro from "@tarojs/taro";
import { PickerView, PickerViewColumn, View, Button } from "@tarojs/components";
import { PickerItemAttribute } from "../../interface";
import {RegionTools, PickerTools} from './../_tools';
import PickerPanel from "../picker-panel";
import './index.scss'
export interface RegionProps {
  column?: number
  code?: number | string
  onChoose: (value, handleType?: string) => void
}

const RegionView: React.FC<RegionProps> = ({
  code = "",
  column = 3,
  onChoose
}) => {
  const [values, setValues] = useState<number[]>([0, 0, 0]);
  const dataSource = RegionTools.findSource(values);

  useEffect(() => {
    if (code) {
      let indexs = RegionTools.findIndex(code, column);
      setValues(indexs);
    }
   }, [code, column])

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
      const cur = RegionTools.findCurrent(nextValues);
      onChoose && onChoose(cur, 'onChange');
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
    <PickerPanel 
      onCancel={() => {}}
      onConfirm={() => {
        const cur = RegionTools.findCurrent(values);
        onChoose && onChoose(cur, 'onChange');
      }}>
      <PickerView
        style={{
          height: 250 + 'rpx',
          backgroundColor: '#ffffff'
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
                key={item.id as number}
              >
                {item?.name}
              </View>
            );
          })}
        </PickerViewColumn>
        <PickerViewColumn style={{ textAlign: 'center' }}>
          {dataSource.city.map((item, index) => {
            return (
              <View
                style={getStyle(index, 1)}
                key={item.id}
              >
                {item.name}
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
                  key={item.id}
                >
                  {item.name}
                </View>
              );
            })}
          </PickerViewColumn> : null
        }
      </PickerView>
    </PickerPanel>
  );
};

export default RegionView;