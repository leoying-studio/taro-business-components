import React, { Children, CSSProperties, useEffect, useMemo, useRef, useState } from "react";
import { PickerView, PickerViewColumn, View, Button } from "@tarojs/components";
import { PickerItemAttribute } from "./interface";
import Utils, { RegionAttribute } from './../_utils/region';
import PickerPanel from "./../picker-panel";
import { PickerPropsStyle } from "./../_interface/picker";
export interface RegionProps extends PickerPropsStyle {
  column?: number
  code?: number | string
  extraSource?: (dataSource: RegionAttribute[]) => RegionAttribute[]
  onChoose: (value, handleType?: string) => void
}

const COLUMN_COUNT = 3;

const RegionPicker: React.FC<RegionProps> = ({
  code = "",
  column = 3,
  columnStyle = {},
  activeTextStyle,
  textStyle = {},
  style = {},
  extraSource,
  onChoose
}) => {
  const [values, setValues] = useState<number[]>([0, 0, 0]);

  const utils = new Utils();
  if (extraSource) {
      const dataSource = utils.getDataSource();
      const ultimatelySource = extraSource(dataSource)
      if (Array.isArray(ultimatelySource)) {
        utils.setSource(ultimatelySource);
      }
  }

  const currentSource = utils.findSource(values);

  useEffect(() => {
    if (code) {
      let indexs = utils.findIndex(code, column);
      setValues(indexs)
    }
   }, [code, column])

   const columnSource = useMemo(() => {
    if (column === 3) {
       return Object.values(currentSource);
    }
    return [currentSource.province, currentSource.city]
   }, [column, values])

  const onPickerViewChange = function(e) {
      const [a, b, c] = e.detail.value;
      const [x, y, z] = values;
      let nextValues = e.detail.value;
      if (a !== x) {
        nextValues = [a, 0, 0];
      } else if (b !== y) {
        nextValues = [a, b, 0];
      } else if (c > currentSource.area.length - 1) {
        nextValues = [a, b, currentSource.area.length - 1];
      }
      // 动态移除多余的value
      for (let i = 0; i <  COLUMN_COUNT - column; i++) {
        if (nextValues.length !== column && nextValues.length >1) {
          nextValues.pop();
        }
      }
      setValues(nextValues);
      const cur = utils.findCurrent(nextValues);
      onChoose && onChoose(cur, 'onChange');
  }

  const getStyle = function (index, col): CSSProperties {
    const active = index === values[col];
    if (active && activeTextStyle) {
       return activeTextStyle;
    }
    return {
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      width: column === 3 ? '200rpx' : 'auto',
      height: 34 + 'px',
      lineHeight: 34 + 'px',
      fontWeight: active ? 600 : 400,
      color: active ? "#FF3C4B" : '#000000',
      ...textStyle
    }
  }

  return (
    <PickerPanel 
      onCancel={() => {}}
      onConfirm={() => {
        const cur = utils.findCurrent(values);
        onChoose && onChoose(cur, 'onChange');
      }}>
      <PickerView
        style={{
          height: 250 + 'rpx',
          backgroundColor: '#ffffff',
          ...style
        }}
        indicatorStyle='height: 34px;'
        onChange={onPickerViewChange}
        value={values}
      >
        {
          columnSource.map((list, col) => {
            return (
              <PickerViewColumn style={{ textAlign: 'center', ...columnStyle }}>
                {list.map((item, index) => {
                  return (
                    <View
                      style={getStyle(index, col)}
                      key={item.id as number}
                    >
                      {item?.name}
                    </View>
                  );
                })}
              </PickerViewColumn>
            )
          })
        }
      </PickerView>
    </PickerPanel>
  );
};

export default RegionPicker;