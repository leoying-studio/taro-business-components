import React, { Component, useRef, useState } from 'react'
import { View, Text, Button } from '@tarojs/components'
import { useAgeRangePicker } from '@/hooks/useAgeRangePicker';
import { AtButton, AtList, AtListItem } from 'taro-ui';
import { useOverlay } from '@/hooks/useOverlay';
import { useRegionPicker } from '@/hooks/useRegionPicker';
import './index.scss';
import { useDatePicker } from '@/hooks/useDatePicker';
import Login from './../../business/login';
import { formatDate } from '@/utils/date';
import Taro from '@tarojs/taro'
export default function IndexPage() {
   const overlay = useOverlay();
   const [state, setState] = useState({})
   const ageRangePicker = useAgeRangePicker();
   const regionPicker = useRegionPicker();
   const datePicker = useDatePicker();
  
   const onPopupAge = function() {
      Taro.navigateTo({
        url: '/pages/from/index'
      })
   }

   const onPopupRegion = function() {
    regionPicker.show({
      defaultValue: "",
      onChoose(value, handleType) {
        setState({
          ...state,
          ['region']: value.code
        })
      }
    })
   }

   const onPopupDate = function() {
    datePicker.show({
      mode:"date",
      date: state['date'],
      maxDate: formatDate(new Date(), 'yyyy-MM-dd'),
      onChoose(value, handleType) {
        const {year, month, day} = value
        setState({
          ...state,
          ['date']: year + '-' + month +'-'+ day
        })
      }
    })
   }

   const onPopupLogin = function() {
      overlay.show(() => <Login></Login>, {type: 'slid-up'});
   }

   return (
     <View>
        <View className="panel">
            <View className="panel-title">
                Picker组件
            </View>
            <AtList>
              <AtListItem title='年龄区间' onClick={onPopupAge} arrow="right"/>
              <AtListItem title='地区选择' arrow='right' extraText={state['region']} onClick={onPopupRegion}/>
              <AtListItem title='日期选择' extraText={state['date']} onClick={onPopupDate}/>
            </AtList>
        </View>
        <View className="panel">
            <View className="panel-title">
                登录验证
            </View>
            <AtList>
              <AtListItem title='验证码登录' onClick={onPopupLogin} arrow="right"/>
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
