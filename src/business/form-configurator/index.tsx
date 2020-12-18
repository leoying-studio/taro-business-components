import React, { Component, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react'
import { View, Text, Input, Picker, ScrollView, Textarea, Icon } from '@tarojs/components'
import { AtButton, AtIcon, AtImagePicker, AtList, AtListItem, AtSwitch, AtTextarea } from 'taro-ui';
import Taro, { Current, render, useRouter } from '@tarojs/taro';
import CityPicker from '../city-picker';
import './index.scss';
import { ConfigurationItem, FormConfigurationProps, Rule } from './interface';
import ImageUploader from '../basic/image-uploader';
import { sharedLocation } from '@/services/login';
import { getAgeRange, getMonthRange } from './shared-utils';
import ItemRight from './ItemRight';
import FormItem from './FormItem';

const FormConfigurator:React.FC<FormConfigurationProps> = function({dataSource, 
    defaultValues, 
    onValueChange, 
    style, 
    disabled}, ref) {

    const [values, setValues] = useState({});
    const cityRef = useState<CityPicker>();
    // 字段展示值的映射
    const fieldMapRef = useRef({});

    // console.log(values, 'values');

    /**
     * 仅仅用作调用方更新默认值
     */
    useEffect(() => {
        setValues((preValues) => {
            return {
                ...preValues,
                ...defaultValues
            }
        });
    }, [defaultValues])

    const validate = function(callback: (status: boolean, info: {msg?: string, field?: string}, values: {}) => void) {
        const validRules = function(rules:Rule[], value: string) {
            for (let rule of rules) {
                if(!rule.test(value)) {
                    return rule;
                }
            }
        }   
        for (let item of dataSource) {
            let value = values[item.field];
            // 判空处理
            if (item.required) {
                if (typeof value === 'undefined') {
                    let msg = item.name + '不能为空';
                    return callback(false, {msg, field: item.field}, values);
                }
            }
            // 是否存在验证规则
            if (Array.isArray(item.rules)) {
                let rule = validRules(item.rules, value);
                if (rule) {
                    return callback(false, {msg: rule.message, field: item.field}, values);
                }
            }
        }
        callback(true, {}, values);
    }   

    useImperativeHandle(ref, () => {
        return {
            validate
        }
    })

   
    const onChange = useCallback(function(e, item) {
        const { options = [], type } = item.widget || {};
        let value: string | number | string[] | {} = e?.detail?.value;

        if (type === 'city-picker') {
            let name = e.filter((i) => i.id != 0).map((i) => i.name).join('-') || '不限';
            let id = e.filter((i) => i.id != 0).pop()?.id || 0;
         
            return setValues((pre) => {
                const nextState = {
                    ...pre,
                    [item.field]: String(id),
                    [item.mapField as string]: name
                };
                onValueChange && onValueChange(nextState);
               return nextState;
            })
        }

        if (type === 'input') {
            value = e.detail.value;
        } else if (type === 'picker') {
            const pickerIndex = Number(e.detail.value);
            value = options[pickerIndex].value 
        } else if (type === 'age-range-picker') {
            const [a, b] = value as string[];
            const {start, end} = getAgeRange();
            if (start[a].value > end[b].value && end[b].value !== 0) {
                value = {
                    minAge: end[b].value,
                    maxAge: start[a].value
                }; 
            } else if (start[a].value === 0 || end[b].value === 0) {
                value = {
                    minAge: 18,
                    maxAge: 80
                }; 
            } else {
                value = {
                    minAge: start[a].value,
                    maxAge: end[b].value
                }; 
            }
        } else if (type === 'date-month') {
            const [years, months] = getMonthRange();
            value = years[value[0]].value + '-' + months[value[1]].value
        } else if (type === 'image-picker') {
            value = e;
        } else if (type === 'textarea') {
            value = e;
        }
       
        setValues((preValues) => {
            const keyValue = typeof value === 'object' ? value : { [item.field]: value};
            const nextValues = {
                ...preValues,
                ...keyValue
            };
            onValueChange && onValueChange(nextValues);
            return nextValues;
        })
    }, [])

    /**
     * 
     * @param item 
     * @param index 
     */
    const renderListItem = (item: ConfigurationItem, index: number) => {
        return (
           <FormItem 
            key={item.field}
            data={item} 
            disabled={disabled}
            values={values}
            onChange={onChange}
            defaultValues={defaultValues}></FormItem>
        )
    }

    return (
        <View className="root" style={style}>
            <View className="list">
                {dataSource.map(renderListItem)}
            </View>
        </View>
    )
}

export default FormConfigurator;
