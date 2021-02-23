import React, { Component, useRef, useState } from 'react'
import { View, Text, Button } from '@tarojs/components'
import { useAgeRangePicker } from '@/hooks/useAgeRangePicker';
import { AtButton, AtList, AtListItem } from 'taro-ui';
import { useOverlay } from '@/hooks/useOverlay';
import Taro from '@tarojs/taro'
import FormConfigurator from './../../business/form-configurator';
export default function FromPage() {
   const overlay = useOverlay()
    console.log(overlay.overlayView)
   return (
     <View>
         <FormConfigurator 
            dataSource={[
             {
                name: "工作地区",
                fields: ["workAddress", 'memberWorkAddressName'],
                hint: "请选择",
                required: true,
                widget: {
                  type: "region-picker",
                  props: {
                    
                  }
                }
              },
              {
                name: "出生年份",
                fields: "birthday",
                hint: "请选择",
                required: true,
                widget: {
                  type: "date-picker",
                  props: {
                  
                  }
                }
              },
         ]} 
         onValueChange={() => {

         }}></FormConfigurator>
         {overlay.overlayView}
     </View>
   )
}
