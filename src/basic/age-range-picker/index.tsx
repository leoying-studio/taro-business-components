import { PickerView, PickerViewColumn, View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, { useState } from 'react';
import { OptionTools } from '../_tools';

interface ChangeEvent {
    minAge: {label: string, value: number},
    maxAge: {label: string, value: number}
}

interface PickerProps {
    onChange: (event: ChangeEvent) => void,
    defaultValue?: {
        minAge: number,
        maxAge: number
    }
}

const AgeRangePicker:React.FC<PickerProps> = function({defaultValue = {}, onChange}) {
    const { start, end } = OptionTools.getAgeRange();
    const [pickerValue, setPickerValue] = useState(() => {
        let {minAge, maxAge} = defaultValue || {};
        if (!minAge && !maxAge) {
            return [0, 0];
        }
        const minIndex = start.findIndex(item => item.value === minAge);
        const maxIndex = end.findIndex(item => item.value === maxAge);
        return [Math.max(minIndex, 0), Math.max(maxIndex, 0)]
    });

    const onPickerChange = function(e) {
        const values = e.detail.value;
        setPickerValue(values);
        if (values.length) {
            const startIndex = values[0];
            const endIndex = values[1];
            const events = {
                minAge: start[startIndex],
                maxAge: end[endIndex]
            };
            onChange(events);
        }
    }

    return (
        <View>
            <PickerView 
                    value={pickerValue}
                    indicatorStyle='height: 50rpx;border-color: #FF3C4B;' 
                    style='width: 100%; height: 250px; background-color: #ffffff;' 
                    onChange={onPickerChange}>
                <PickerViewColumn style="text-align: center">
                    {start.map(item => {
                        return (
                            <View>{item.label}</View>
                        );
                    })}
                </PickerViewColumn>
                <PickerViewColumn style="text-align: center">
                    {end.map(item => {
                        return (
                            <View>{item.label}</View>
                        );
                    })}
                </PickerViewColumn>
            </PickerView>
        </View>
    )
}

export default AgeRangePicker;