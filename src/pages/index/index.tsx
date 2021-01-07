import React, { Component, useRef } from 'react'
import { View, Text, Button } from '@tarojs/components'
// import './index.scss';
import { useAgeRangePicker } from '@/hooks/useAgeRangePicker';
import { AtButton } from 'taro-ui';
import { useOverlay } from '@/hooks/useOverlay';

export default function IndexPage() {
   const overlay = useOverlay();
   const ageRangePicker = useAgeRangePicker();
   const ageRangeValueRef = useRef();

   return (
     <View>
         <View onClick={() => {
            ageRangePicker.show({
              defaultValue: ageRangeValueRef.current,
              onChoose: (value, handleType) => {
                  
              }
            })
          }}>这是一个按钮</View>
          {overlay.overlayView}
     </View>
    
   )
}
