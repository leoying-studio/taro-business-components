import React, { Component, useRef } from 'react'
import { View, Text, Button } from '@tarojs/components'
import { useAgeRangePicker } from '@/hooks/useAgeRangePicker';
import { AtButton, AtList, AtListItem } from 'taro-ui';
import { useOverlay } from '@/hooks/useOverlay';
import { useRegionPicker } from '@/hooks/useRegionPicker';
import './index.scss';
import { useDatePicker } from '@/hooks/useDatePicker';

export default function IndexPage() {
   const overlay = useOverlay();
   const ageRangePicker = useAgeRangePicker();
   const regionPicker = useRegionPicker();
   const datePicker = useDatePicker();
   const ageRangeValueRef = useRef({
     minAge: 0,
     maxAge: 0
   });
   const regionPickerRef = useRef({});
  
   const onPopupAge = function() {
    ageRangePicker.show({
      defaultValue: ageRangeValueRef.current,
      onChoose(value, handleType) {
        ageRangeValueRef.current ={
           minAge: value.minAge.value,
           maxAge: value.maxAge.value
        }
      }
    })
   }

   const onPopupRegion = function() {
    regionPicker.show({
      defaultValue: ageRangeValueRef.current,
      onChoose(value, handleType) {
        ageRangeValueRef.current ={
           minAge: value.minAge.value,
           maxAge: value.maxAge.value
        }
      }
    })
   }

   return (
     <View>
        <View className="panel">
            <View className="panel-title">
                Picker组件
            </View>
            <AtList>
              <AtListItem title='年龄区间' onClick={onPopupAge} arrow="right"/>
              <AtListItem title='地区选择' arrow='right' onClick={onPopupRegion}/>
              <AtListItem title='日期选择' extraText='' />
            </AtList>
        </View>
        <View className="panel">
            <View className="panel-title">
                登录验证
            </View>
            <AtList>
              <AtListItem title='验证码登录' onClick={onPopupAge} arrow="right"/>
            </AtList>
        </View>
        <View className="panel">
            <View className="panel-title">
                表单
            </View>
            <AtList>
              <AtListItem title='表单配置器' onClick={onPopupAge} arrow="right"/>
            </AtList>
        </View>
        {overlay.overlayView}
     </View>
   )
}
