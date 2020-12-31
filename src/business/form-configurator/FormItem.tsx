import React, { Component, useEffect, useMemo, useRef, useState } from "react";
import { View, Text, Picker, Input, CommonEventFunction, BaseEventOrig } from "@tarojs/components";
import Taro, { render, useRouter } from "@tarojs/taro";
import { ConfigurationItem } from "./interface";
import { AtIcon, AtSwitch, AtTextarea } from "taro-ui";
import { InputProps } from "@tarojs/components/types/Input";
import { getAgeRange, getMonthRange, shallowEqual } from "./shared-utils";
import ImageUploader from "../basic/image-uploader";
import CityPicker from '../basic/region-View';
import { PickerDateProps, PickerMultiSelectorProps, PickerSelectorProps } from "@tarojs/components/types/Picker";

interface FormItemProps {
    onChange: (e?: string | 
         BaseEventOrig<InputProps.inputEventDetail |
         PickerDateProps.onChangeEventDetail> | 
         PickerSelectorProps.onChangeEventDetail|
         PickerMultiSelectorProps.onChangeEventDetail |
         BaseEventOrig<PickerMultiSelectorProps.onChangeEventDetail> |
         PickerSelectorProps.onChangeEventDetail|
         BaseEventOrig<PickerSelectorProps.onChangeEventDetail> |
         boolean, 
        item?: ConfigurationItem) => void,
    data: ConfigurationItem,
    values: {
        [k: string]: string | number
    }
    defaultValues: { [k: string]: string | number},
    disabled?: boolean
}
/**
 * 使用React.memo的主要作用是缓存，减少渲染, 注意useCallbcak的使用
 */
const FormItem = React.memo(({data, disabled, values, defaultValues, onChange}: FormItemProps) => {

     const [loadWidget, setLoadWidget] = useState(false);
     const timer = useRef<NodeJS.Timeout | number>();

     // 使用懒加载加快首次展示速度
     useEffect(() => {
       timer.current = setTimeout(() => {
            setLoadWidget(true)
        }, 500);
        return () => clearTimeout(timer.current as number);
     }, [])

     // 设置控件懒加载
     const {type, props = {}, options = []} = data.widget || {};
     // 字段值
     const field = data.field;
     // 字段value
     const value = values[field];

     const renderRight = () => {
        if (type === 'input') {
            return <Input
                {...props}
                className="input"
                value={value || ''}
                onInput={(e) => onChange(e, data)}></Input>
        }
        if (type === 'switch') {
            return <AtSwitch checked={!!value} color="#FF345F" onChange={(e) => {
                onChange(e, data)
            }} />
        }
    
        const getClass = function() {
            const className = typeof value !== 'undefined' ? 'placeholder selector' : 'placeholder';
            if (disabled || props.disabled) {
                return 'disabled' +' '+ className;
            }
            return className;
        }
    
        const option = options.find((option) => {
            return option.value === Number(value)
        });
    
        const hideArrow = data.readonly || type === 'textarea' || type === 'input';
    
        let content = option ? option.label : value ? value : data.hint;
        
        if (type === 'city-picker') {
            const name = values[data.mapField as string] as string;
            const code = value;
            if (name) {
                content = name?.split(',').join('-');
            }
            if (code === '0') {
                content = '不限'
            }
        }
    
        if (type === 'age-range-picker') {
            if (value) {
                const {minAge, maxAge} = values;
                const { start, end } = getAgeRange();
                const minOpt = start.find(item => item.value === minAge);
                const maxOpt = end.find(item => item.value === maxAge);
                content = minOpt?.label + '-' + maxOpt?.label;
                if (minOpt?.value === start[1].value && maxOpt?.value === end[end.length -1].value) {
                    content = '不限'
                }
            }
        }
        return (
            <View 
                style={{display: 'flex', alignItems: 'center'}} className="card-right">
                 <Text className={getClass()}>{content}</Text>
                 {hideArrow ? null : <AtIcon value='chevron-right' size='18' color='#999999'></AtIcon>}
            </View>
        )
     }
  
     const pickerValue = options.findIndex((item) => item.value === Number(value));
     const spaceCls = data.required ? 'label required' : 'label';
     const statiCls =  data.required ? 'headline required' : 'headline';
     const innerView = (
         <View className="card card-item">
             <View>
                 <Text className={spaceCls}>{data.name}</Text>
             </View>
            {renderRight()}
         </View>
     )

     /**
      * disabled
      */
     if (disabled || !loadWidget) {
         return innerView;
     }

     if (type === 'picker') {
         let defaultValue = pickerValue < 0 ? 0 : pickerValue;
         if (props.value && !defaultValue) {
             defaultValue = (options).findIndex((option) => {
                 return option.value === props.value;
             })
         }
         return (
             <Picker
                 mode="selector"
                 value={defaultValue}
                 range={options} 
                 rangeKey="label"
                 onChange={(e) => onChange(e, data)}>
                 {innerView}
             </Picker>
         )
     } else if (type === 'date-picker') {
         return (
             <Picker
                 mode="date"
                 value={value as string}
                 onChange={(e) => onChange(e, data)}>
                 {innerView}
             </Picker>
         )
     } else if (type === 'city-picker') {
         const { number } = props;
         const defaultVal = value ? value : number === 2 ?  null;
         return (
             <CityPicker
                 {...props}
                 id={defaultVal}
                 onGetRegion={(e) => onChange(e, data)}>
                 {innerView}
             </CityPicker>
         )
     } else if (type === 'image-picker') {
         const uri = defaultValues[data.field] || '';
         return (
             <View className="card card-photo">
                 <View className={statiCls}>{data.name}（最多{props.count}张）</View>
                 <ImageUploader 
                     onChange={(e) => onChange(e, data)}
                     defaultUris={uri as string} />
             </View>
         )
     } else if (type === 'date-month') {
         const [years, months] = getMonthRange();
         const convertVal = function() {
             const [y, m]= (value as string)?.split('-');
            return  [ Number(y) - 1940, Number(m) - 1]
         }
         const val =  value ? convertVal() : [50, 0]; 
         // 多选日期
         return (
             <Picker
                 mode="multiSelector"
                 value={val}
                 range={[years, months]} rangeKey="label"
                 onChange={(e) => onChange(e, data)}>
            {innerView}
         </Picker>
         )
     } else if (type === 'textarea') {
         return (
             <View className="card">
                 <View className={statiCls}>{data.name}</View>
                 <View style={{marginTop: '10rpx'}}>
                     <AtTextarea
                     value={value || ''}
                     {...props} 
                         onChange={(e) => onChange(e, data)}></AtTextarea>
                 </View>
              </View>
         )
     } else if (type === 'age-range-picker') {
         const {start, end} = getAgeRange();
         const minAge = values['minAge'] ? (values['minAge'] as number) - 17 : 0;
         const maxAge = values['maxAge'] ? (values['maxAge'] as number) - 18 : 0;
         const defaultVal = [minAge, maxAge];
         return (
             <Picker
                 mode="multiSelector"
                 rangeKey="label"
                 value={defaultVal}
                 range={[start, end]}
                 onChange={(e) => onChange(e, data)}>
                 {innerView}
             </Picker>
         )
     }
     return innerView;
}, isEqual);

function isEqual(prevProps,nextProps) {
    const { maxAge, minAge} = prevProps.values || {};
    const nextValues = nextProps.values || {};
    const type = nextProps.data?.widget?.type;
    if (type === 'age-range-picker') {
        return nextValues.maxAge === maxAge && nextValues.minAge === minAge;
    }
    const { field, mapField } = prevProps.data || {};
    const preVal = prevProps.values[field];
    const nextVal = nextProps.values[field];
    const preName = prevProps.values[mapField];
    const nextName = nextProps.values[mapField];
    if (preVal !== nextVal || preName !== nextName) {
        return false;
    }
   return false;
}

export default FormItem;