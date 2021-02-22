import { PickerView, PickerViewColumn, View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, { useState } from 'react';
import PickerPanel from '../picker-panel';
import utils from './../_utils/age';
interface ChangeEvent {
    minAge: {label: string, value: number},
    maxAge: {label: string, value: number}
}

export interface AgeRangePickerProps {
    onChoose: (event: ChangeEvent, handleType?: string) => void,
    defaultValue?: {
        minAge: number,
        maxAge: number
    }
}

const AgeRangePicker:React.FC<AgeRangePickerProps> = function({defaultValue = {}, onChoose}) {
    const { start, end } = utils.getRange();
    const [pickerValue, setPickerValue] = useState(() => {
        let {minAge, maxAge} = defaultValue || {};
        if (!minAge && !maxAge) {
            return [0, 0];
        }
        const minIndex = start.findIndex(item => item.value === minAge);
        const maxIndex = end.findIndex(item => item.value === maxAge);
        return [Math.max(minIndex, 0), Math.max(maxIndex, 0)]
    });

    const handlChoose = (values, handleType: string = 'onChange') => {
        setPickerValue(values);
        if (values.length) {
            const startIndex = values[0];
            const endIndex = values[1];
            const events = {
                minAge: start[startIndex],
                maxAge: end[endIndex]
            };
            onChoose(events, handleType);
        }
    }

    const onPickerChange = function(e) {
        const values = e.detail.value;
        handlChoose(values);
    }

    return (
        <PickerPanel 
            onConfirm={() => {
                handlChoose(pickerValue, 'onConfirm');
            }}>
            <PickerView 
                    value={pickerValue}
                    indicatorStyle='height: 50rpx;border-color: #FF3C4B;' 
                    style='width: 100%; height: 250rpx; background-color: #ffffff;' 
                    onChange={onPickerChange}>
                <PickerViewColumn style="text-align: center">
                    {start.map(item => {
                        return (
                            <View style={{
                                lineHeight: 34 + 'px'
                            }}>{item.label}</View>
                        );
                    })}
                </PickerViewColumn>
                <PickerViewColumn style="text-align: center">
                    {end.map(item => {
                        return (
                            <View style={{
                                lineHeight: 34 + 'px'
                            }}>{item.label}</View>
                        );
                    })}
                </PickerViewColumn>
            </PickerView>
        </PickerPanel>
    )
}

export default AgeRangePicker;