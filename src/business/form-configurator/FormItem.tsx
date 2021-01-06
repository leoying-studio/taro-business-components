import React, { Component, useEffect, useMemo, useRef, useState } from "react";
import { View, Text, Picker, Input, CommonEventFunction, BaseEventOrig, CommonEvent } from "@tarojs/components";
import Taro, { render, useRouter } from "@tarojs/taro";
import { ConfigurationItem } from "./interface";
import { AtIcon, AtSwitch, AtTextarea } from "taro-ui";
import { InputProps } from "@tarojs/components/types/Input";
import { getAgeRange, getMonthRange, shallowEqual } from "./shared-utils";
import ImageUploader from "../basic/image-uploader";
import CityPicker from '../basic/region-View';
import { PickerDateProps, PickerMultiSelectorProps, PickerSelectorProps } from "@tarojs/components/types/Picker";

interface FormItemProps {
    onChoose: (e?: CommonEvent, item?: ConfigurationItem, handler?: string) => void,
    data: ConfigurationItem,
    value: (string | number)[]
}
/**
 * 使用React.memo的主要作用是缓存，减少渲染, 注意useCallbcak的使用
 */
const FormItem = React.memo(({data, value = [], onChoose}: FormItemProps) => {
     // 设置控件懒加载
     const {type, props = {}, options = []} = data.widget || {};
     const [widgetValue, setWidgetValue] = useState(value);
     const [valueA, valueB] = widgetValue;

     useEffect(() => {
        setWidgetValue(value);
     }, [value])

     const onChange = function(e, value?: string) {

     }

     const renderRight = () => {
        if (type === 'input') {
            return <Input
                {...props}
                className="input"
                value={value || ''}
                onInput={onChange}></Input>
        }
        if (type === 'switch') {
            return <AtSwitch checked={!!value} color="#FF345F" onChange={onChange} />
        }
    
        const getClass = function() {
            const className = typeof value !== 'undefined' ? 'placeholder selector' : 'placeholder';
            return className;
        }
        const option = options.find((option) => {option.value === Number(value)});
        const hideArrows = data.readonly;
        let content = option ? option.label : value ? value : data.hint;
        
        if (type === 'city-picker') {
            if (valueB) {
                content = (valueB as string).split(',').join('-');
            }
            if (!valueA) {
                content = '不限'
            }
        }
    
        if (type === 'age-picker') {
            if (value) {
                const { start, end } = getAgeRange();
                const minOpt = start.find(item => item.value === valueA);
                const maxOpt = end.find(item => item.value === valueB);
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
                 {hideArrows ? null : <AtIcon value='chevron-right' size='18' color='#999999'></AtIcon>}
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
                 onChange={onChange}>
                 {innerView}
             </Picker>
         )
     } else if (type === 'date-picker') {
         return (
             <Picker
                 mode="date"
                 value={valueA as string}
                 onChange={onChange}>
                 {innerView}
             </Picker>
         )
     } else if (type === 'city-picker') {
         const { number } = props;
        //  const defaultVal = value ? value : number === 2 ?  null;
         return (
             <CityPicker
                 {...props}
                //  id={defaultVal}
                 onGetRegion={(e) => onChange(valueA, e)}>
                 {innerView}
             </CityPicker>
         )
     } else if (type === 'image-picker') {
         return (
             <View className="card card-photo">
                 <View className={statiCls}>{data.name}（最多{props.count}张）</View>
                 <ImageUploader 
                     onChange={onChange}
                     defaultUris={valueA as string} />
             </View>
         )
     } else if (type === 'date-month-picker') {
         const [years, months] = getMonthRange();
         const convertVal = function() {
            const [y, m]= (valueA as string)?.split('-');
            return  [ Number(y) - 1940, Number(m) - 1]
         }
         const val =  value ? convertVal() : [50, 0]; 
         // 多选日期
         return (
             <Picker
                 mode="multiSelector"
                 value={val}
                 range={[years, months]} rangeKey="label"
                 onChange={onChange}>
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
                         onChange={onChange}></AtTextarea>
                 </View>
              </View>
         )
     } else if (type === 'age-picker') {
         const {start, end} = getAgeRange();
         const minAge = valueA ? (valueA as number) - 17 : 0;
         const maxAge = valueB ? (valueB as number) - 18 : 0;
         const defaultVal = [minAge, maxAge];
         return (
             <Picker
                 mode="multiSelector"
                 rangeKey="label"
                 value={defaultVal}
                 range={[start, end]}
                 onChange={onChange}>
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