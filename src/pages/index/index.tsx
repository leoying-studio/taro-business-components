import React, { Component, useRef } from 'react'
import { View, Text, Button } from '@tarojs/components'
import { useAgeRangePicker } from '@/hooks/useAgeRangePicker';
import { AtButton, AtList, AtListItem } from 'taro-ui';
import { useOverlay } from '@/hooks/useOverlay';
import { useRegionPicker } from '@/hooks/useRegionPicker';
import './index.scss';

export default function IndexPage() {
   const overlay = useOverlay();
   const ageRangePicker = useAgeRangePicker();
   const regionPicker = useRegionPicker();
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
        <AtList>
          <AtListItem title='年龄区间' onClick={onPopupAge} arrow="right"/>
          <AtListItem title='地区选择' arrow='right' onClick={onPopupRegion}/>
          <AtListItem title='标题文字' extraText='详细信息' />
          <AtListItem title='禁用状态' disabled extraText='详细信息' />
        </AtList>
        {overlay.overlayView}
     </View>
   )
}
